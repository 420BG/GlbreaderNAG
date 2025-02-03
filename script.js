// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setClearColor(0xf0f0f0, 1);
document.body.appendChild(renderer.domElement);

// Improved Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

// Create a bedroom background
const textureLoader = new THREE.TextureLoader();
const backgroundTexture = textureLoader.load('IMG_1684.jpeg'); // Replace with your texture path
const backgroundGeometry = new THREE.PlaneGeometry(100, 100);
const backgroundMaterial = new THREE.MeshBasicMaterial({ map: backgroundTexture });
const backgroundMesh = new THREE.Mesh(backgroundGeometry, backgroundMaterial);
backgroundMesh.rotation.x = -Math.PI / 2; // Rotate to be horizontal
scene.add(backgroundMesh);

// Model Loading
const loader = new THREE.GLTFLoader();
let model;

loader.load(
    'model.glb',
    (gltf) => {
        model = gltf.scene;
        scene.add(model);

        // Original materials will be used, so no need to set color manually
        model.traverse((child) => {
            if (child.isMesh) {
                // Ensure the model uses its original material
                child.material.needsUpdate = true; // Update material if needed
            }
        });

        // Adjust model position and scale
        model.position.set(0, -1, 0);
        model.scale.set(1.5, 1.5, 1.5);
        
        // Adjust camera position
        camera.position.set(0, 1, 5);
        controls.update();
        
        animate();
    },
    undefined,
    (error) => {
        console.error('Error loading model:', error);
        alert('Error loading 3D model. Please check console for details.');
    }
);

// Controls
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.minDistance = 2;
controls.maxDistance = 10;

// Animation
function animate() {
    requestAnimationFrame(animate);
    controls.update();
    renderer.render(scene, camera);
}

// Responsive Handling
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
});
