// Scene setup
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({
    antialias: true,
    alpha: true
});

renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// Improved Lighting
const ambientLight = new THREE.AmbientLight(0xffffff, 0.8);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
directionalLight.position.set(5, 5, 5).normalize();
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xffffbb, 0x080820, 1);
scene.add(hemisphereLight);

// Model Loading
const loader = new THREE.GLTFLoader();
let model;

loader.load(
    'model.glb',
    (gltf) => {
        model = gltf.scene;
        scene.add(model);
        
        // Remove the color modification code to keep original colors
        // model.traverse((child) => {
        //     if (child.isMesh) {
        //         child.material.color.set(0xff0000);
        //     }
        // });

        // Adjust model position and scale
        model.position.set(0, -1, 0);
        model.scale.set(1.5, 1.5, 1.5);
        
        // Adjust camera position
        camera.position.set(0, 0, 5);
        controls.update();
        
        animate();
    },
    undefined,
    (error) => {
        console.error('Error loading model:', error);
        alert('Error loading 3D model. Please check console for details.');
    }
);

// ... rest of the script.js remains the same ...
