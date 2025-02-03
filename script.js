let scene, camera, renderer, model;
const loadingElement = document.getElementById('loading');

function init() {
    // Scene setup
    scene = new THREE.Scene();
    
    // Camera setup
    camera = new THREE.PerspectiveCamera(
        75,
        window.innerWidth / window.innerHeight,
        0.1,
        1000
    );
    camera.position.set(0, 0, 5);

    // Renderer setup
    renderer = new THREE.WebGLRenderer({
        antialias: true,
        alpha: true
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    document.body.appendChild(renderer.domElement);

    // Lighting (Essential for 3D visibility)
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(5, 5, 5);
    scene.add(directionalLight);

    // Model loader
    const loader = new THREE.GLTFLoader();
    
    // Load your model (REPLACE 'model.glb' with your actual filename)
    loader.load(
        './model.glb',
        (gltf) => {
            model = gltf.scene;
            
            // Adjust model position/scale if needed
            model.position.set(0, 0, 0);
            model.scale.set(1, 1, 1);
            
            scene.add(model);
            loadingElement.style.display = 'none';
            animate();
        },
        (xhr) => {
            // Loading progress
            console.log((xhr.loaded / xhr.total * 100) + '% loaded');
        },
        (error) => {
            console.error('Error loading model:', error);
            loadingElement.textContent = 'Error loading model! Check console.';
        }
    );
}

function animate() {
    requestAnimationFrame(animate);
    
    // Add rotation animation
    if (model) {
        model.rotation.y += 0.005;
    }
    
    renderer.render(scene, camera);
}

// Window resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Initialization
init();

// Double-check WebGL support
if (!WEBGL.isWebGLAvailable()) {
    const warning = WEBGL.getWebGLErrorMessage();
    document.body.appendChild(warning);
