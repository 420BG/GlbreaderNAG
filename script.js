let scene, camera, renderer, model, controls;

function init() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup (increase initial distance)
    camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 10); // x, y, z position
    
    // Renderer setup
    renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setClearColor(0xeeeeee);
    document.body.appendChild(renderer.domElement);

    // Add lights
    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Add OrbitControls for zoom/pan
    controls = new THREE.OrbitControls(camera, renderer.domElement);
    controls.enableDamping = true;
    controls.dampingFactor = 0.05;

    // Load model
    const loader = new THREE.GLTFLoader();
    loader.load(
        './model.glb', // REPLACE WITH YOUR MODEL NAME
        (gltf) => {
            model = gltf.scene;
            
            // Scale model if too small/big
            model.scale.set(1, 1, 1); // Adjust these values
            
            // Center model in view
            const box = new THREE.Box3().setFromObject(model);
            const center = box.getCenter(new THREE.Vector3());
            model.position.sub(center);

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
    controls.update(); // Required for OrbitControls
    renderer.render(scene, camera);
}

// Handle window resize
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth
