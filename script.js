
// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true });

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Lighting
const light = new THREE.AmbientLight(0xffffff, 1);
scene.add(light);

// Load GLB model with GitHub Pages-friendly URL
const loader = new THREE.GLTFLoader();
const modelURL = 'https://cdn.jsdelivr.net/gh/420bg/GlbreaderNAG@main/model.glb';  // Update with the correct GitHub raw path

loader.load(modelURL, function(gltf) {
    scene.add(gltf.scene);
    gltf.scene.position.set(0, -1, 0);
    camera.position.z = 3;
    animate();
}, undefined, function(error) {
    console.error('Error loading GLB model:', error);
});

// Animation loop
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// Resize event
window.addEventListener('resize', function() {
    renderer.setSize(window.innerWidth, window.innerHeight);
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
});
