// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0x404040, 1);  // Soft light
const directionalLight = new THREE.DirectionalLight(0xffffff, 1); // Directional light
directionalLight.position.set(1, 1, 1).normalize();
scene.add(light);
scene.add(directionalLight);

// Load GLB model with GitHub Pages-friendly URL
const loader = new THREE.GLTFLoader();
const modelURL = 'https://cdn.jsdelivr.net/gh/420bg/GlbreaderNAG@main/model.glb';  // Update with the correct GitHub raw path

let model;
loader.load(modelURL, function(gltf) {
    model = gltf.scene;
    scene.add(model);
    model.position.set(0, -1, 0);
    camera.position.z = 3;
    animate();
}, undefined, function(error) {
    console.error('Error loading GLB model:', error);
});

// OrbitControls for movement
const controls = new THREE.OrbitControls(camera, renderer.domElement);

// Animation loop
function animate() {
    requestAnimationFrame(animate);

    // Rotate the model for some basic animation
    if (model) {
        model.rotation.y += 0.01; // Slow rotation of the model
    }

    controls.update(); // Update controls for smooth interaction
    renderer.render(scene, camera);
}

// Resize event
window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
