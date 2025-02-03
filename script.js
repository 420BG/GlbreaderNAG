// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);
renderer.setClearColor(0x000000, 1); // Black background
document.body.appendChild(renderer.domElement);

// Enhanced Lighting System
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.6);
directionalLight.position.set(3, 5, 2).normalize();
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 0.5);
scene.add(hemisphereLight);

// Model Loading with proper material handling
const loader = new THREE.GLTFLoader();
let model;

loader.load(
    'model.glb',
    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // Proper material initialization
        model.traverse((child) => {
            if (child.isMesh) {
                // Ensure materials are properly configured
                child.material.envMapIntensity = 0.8;
                child.material.needsUpdate = true;
                
                if (child.material.map) {
                    child.material.map.encoding = THREE.sRGBEncoding;
                }
                
                // Enable proper transparency handling
                child.material.transparent = true;
                child.material.depthWrite = true;
                child.material.alphaTest = 0.5;
            }
        });

        // Adjusted positioning and scale
        model.position.set(0, -0.5, 0);
        model.scale.set(1.5, 1.5, 1.5);
        
        // Camera positioning
        camera.position.set(0, 1.2, 3);
        controls.update();
        
        animate();
    },
    undefined,
    (error) => {
        console.error('Error loading model:', error);
        alert('Error loading 3D model. Please check console for details.');
    }
);

// Enhanced OrbitControls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.1;
controls.minDistance = 1.5;
controls.maxDistance = 6;
controls.enablePan = false;
controls.enableZoom = true;

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Responsive handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});

// Prevent default touch events
document.addEventListener('touchstart', (e) => e.preventDefault(), { passive: false });
document.addEventListener('touchmove', (e) => e.preventDefault(), { passive: false });
