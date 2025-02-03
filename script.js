let scene, camera, renderer, model;

function init() {
    // Scene setup
    scene = new THREE.Scene();

    // Camera setup
    camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 1); // Bring the camera closer (adjusted to 1)

    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee); // Light gray background
    document.body.appendChild(renderer.domElement);

    // Add lights (CRUCIAL FOR VISIBILITY)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8); // Soft white light
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Bright white light
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Load GLB model
    const loader = new THREE.GLTFLoader();
    loader.load(
        './model.glb', // Replace with your GLB file path
        (gltf) => {
            model = gltf.scene;
            model.scale.set(0.5, 0.5, 0.5); // Scale the model down
            scene.add(model);
            animate();
        },
        undefined,
        (error) => {
            console.error('Error loading model:', error);
        }
    );
}

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

init();
