let scene, camera, renderer, model;

function init() {
    // Create a scene, camera, and renderer
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);  // Ensure full screen
    renderer.setClearColor(0xeeeeee);
    document.body.appendChild(renderer.domElement);

    // Add lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.6);  // Soft light
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);  // Strong directional light
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load the 3D model (Ensure the correct model path)
    const loader = new THREE.GLTFLoader();
    loader.load(
        './model.glb',  // Model file path
        (gltf) => {
            model = gltf.scene;
            scene.add(model);

            // Center model and adjust camera
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            camera.position.z = box.getSize(new THREE.Vector3()).length * 1.5;  // Adjust camera distance

            // Hide loading text
            document.getElementById('loading').style.display = 'none';
        },
        undefined,
        (error) => {
            console.error('Model load error:', error);
            document.getElementById('loading').innerText = 'Error loading model.';
        }
    );

    // Animate the scene
    animate();
}

function animate() {
    requestAnimationFrame(animate);

    // Rotate model if it exists
    if (model) {
        model.rotation.y += 0.01;  // Slowly rotate
    }

    // Render the scene
    renderer.render(scene, camera);
}

// Adjust on window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialize the scene
init();
