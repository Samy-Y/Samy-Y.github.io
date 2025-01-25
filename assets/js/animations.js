import * as THREE from 'three';

// if i don't wait for dom to load the code wont work. today i learned
document.addEventListener('DOMContentLoaded', () => {
    const canvas = document.getElementById('canvas');

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(50, canvas.offsetWidth / canvas.offsetHeight, 0.1, 10);

    const renderer = new THREE.WebGLRenderer({ 
        canvas: canvas,
        alpha: false,
        antialias: true 
    });

    const directionalLight = new THREE.DirectionalLight(0xfffff2, 15);
    directionalLight.position.set(-30, 0, 10);
    scene.add(directionalLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 1);
    scene.add(ambientLight);

    const earth_texture = new THREE.TextureLoader().load('./assets/textures/earth.jpg');
    earth_texture.encoding = THREE.sRGBEncoding;


    const sphere = new THREE.Mesh(
        new THREE.SphereGeometry(3,100,100),
        new THREE.MeshStandardMaterial({
            map: earth_texture,
            roughness: 1,
            metalness: 0.7,
        })
    );

    scene.add(sphere);

    sphere.rotation.x = Math.PI / 6;
    sphere.rotation.y = 250;
    
    renderer.setPixelRatio(window.devicePixelRatio * 1.5);
    renderer.setSize(canvas.offsetWidth, canvas.offsetHeight);
    renderer.setClearColor(0xffffff, 1);
    renderer.outputEncoding = THREE.sRGBEncoding;

    camera.position.z = 7;

    camera.lookAt(-1.5,2,0);

    function animate() {
        requestAnimationFrame(animate);
        sphere.rotation.y -= 0.0005;
        renderer.render(scene, camera);
    }

    animate();
});