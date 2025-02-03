let scene, camera, renderer, model;

function init() {
    scene = new THREE.Scene();
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);  // Fixed renderer size
    renderer.setClearColor(0xeeeeee);
    document.body.appendChild(renderer.domElement);

    // Lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);  // Adjusted intensity
    scene.add(ambientLight);
    const directionalLight = new THREE.DirectionalLight(0xffffff, 1.5);  // Adjusted intensity
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load model (Ensure the correct model path)
    const loader = new THREE.GLTFLoader();
    loader.load(
        './model.glb',  // Ensure this is the correct path
        (gltf) => {
            model = gltf.scene;
            scene.add(model);

            // Center model and adjust camera position
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);
            camera.position.z = box.getSize(new THREE.Vector3()).length * 1.5;  // Adjust camera distance
        },
        undefined,
        (error) => {
            console.error('Model load error:', error);
            document.getElementById('loading').innerText = 'Model failed to load';
        }
    );

    animate();
}

function animate() {
    requestAnimationFrame(animate);
    if (model) model.rotation.y += 0.01;  // Adding rotation to the model
    renderer.render(scene, camera);
}

window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
