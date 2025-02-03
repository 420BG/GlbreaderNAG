let scene, camera, renderer, controls, currentModel;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    scene.background = new THREE.Color(0xeeeeee);

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(2, 2, 2);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ 
        canvas: document.getElementById('canvas3d'),
        antialias: true,
        preserveDrawingBuffer: true // For screenshots
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);

    // Controls
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Event listeners
    window.addEventListener('resize', onWindowResize);
    document.getElementById('fileInput').addEventListener('change', handleFileUpload);
    document.getElementById('screenshotBtn').addEventListener('click', takeScreenshot);
    document.getElementById('resetBtn').addEventListener('click', resetViewer);

    // Load initial model
    const loader = new THREE.GLTFLoader();
    loader.load(
        'model.glb', // Change this path to your model file
        (gltf) => {
            currentModel = gltf.scene;
            scene.add(currentModel);
            centerModel(currentModel);
        },
        undefined,
        (error) => {
            console.error('Error loading initial model:', error);
        }
    );

    animate();
}

function handleFileUpload(event) {
    const file = event.target.files[0];
    if (!file) return;

    // Clear previous model
    if (currentModel) {
        scene.remove(currentModel);
        disposeModel(currentModel);
    }

    // Load new model
    const loader = new THREE.GLTFLoader();
    const url = URL.createObjectURL(file);

    loader.load(
        url,
        (gltf) => {
            currentModel = gltf.scene;
            scene.add(currentModel);
            centerModel(currentModel);
            URL.revokeObjectURL(url);
        },
        (progress) => {
            const percent = (progress.loaded / progress.total * 100).toFixed(2);
            document.getElementById('progressBar').style.width = `${percent}%`;
        },
        (error) => {
            console.error('Error loading model:', error);
            alert('Error loading model. Please check the file format.');
            URL.revokeObjectURL(url);
        }
    );
}

function centerModel(model) {
    const box = new THREE.Box3().expandByObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());
    
    model.position.sub(center);
    camera.position.copy(center);
    camera.position.add(new THREE.Vector3(size.length(), size.length(), size.length()));
    controls.update();
}

function disposeModel(model) {
    model.traverse(child => {
        if (child.isMesh) {
            child.geometry.dispose();
            if (child.material) {
                Object.values(child.material).forEach(value => {
                    if (value && typeof value.dispose === 'function') {
                        value.dispose();
                    }
                });
            }
        }
    });
}

function takeScreenshot() {
    const link = document.createElement('a');
    link.download = `screenshot_${Date.now()}.png`;
    link.href = renderer.domElement.toDataURL('image/png');
    link.click();
}

function resetViewer() {
    controls.reset();
    if (currentModel) {
        scene.remove(currentModel);
        disposeModel(currentModel);
        currentModel = null;
    }
    document.getElementById('progressBar').style.width = '0%';
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}

function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Initialize the viewer
init();
