import * as THREE from 'three'

var directionalLight;
var sun;

export function addLight(scene) {
    directionalLight = new THREE.DirectionalLight(0xffffff, 1);

    directionalLight.position.set(100, 100, 100); // Position the light above and in front of the scene
    directionalLight.target.position.set(0, 0, 0); // This light points to the center of the scene
    directionalLight.castShadow = true; // Enable shadows for the light
    directionalLight.shadow.mapSize.width = 512;  // Default is 512, increase for better shadow resolution
    directionalLight.shadow.mapSize.height = 512; // Default is 512, increase for better shadow resolution
    directionalLight.shadow.camera.near = 0.1;    // Default is 0.5
    directionalLight.shadow.camera.far = 1000;     // Default is 500
    scene.add(directionalLight);

    
    // Sun properties
    const sunRadius = 1; // Size of the sun, adjust as needed
    const sunWidthSegments = 8; // Number of segments, higher for a smoother sun
    const sunHeightSegments = 8;

    // Sun material and geometry
    const sunMaterial = new THREE.MeshBasicMaterial({ color: 0xffff00 }); // Bright yellow
    const sunGeometry = new THREE.SphereGeometry(sunRadius, sunWidthSegments, sunHeightSegments);

    // Sun mesh
    sun = new THREE.Mesh(sunGeometry, sunMaterial);

    // Position the sun at the same position as the directional light
    sun.position.copy(directionalLight.position); // Match this position with your directional light's position

    scene.add(sun);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

} 

export function getSunPosition() {
    return directionalLight.position;
}

export function syncSun() {
    sun.position.copy(directionalLight.position);
}