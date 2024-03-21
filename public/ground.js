
import * as THREE from 'three'
import { getMaterial } from './materials.mjs'


export function addGround(scene) {
    const groundGeometry = new THREE.PlaneGeometry(50, 50); // Adjust size as needed

    const ground = new THREE.Mesh(groundGeometry, getMaterial('ground'));
    ground.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
    ground.position.y = -0.5; // Adjust the Y position as needed
    ground.receiveShadow = true; // This allows the ground to receive shadows

    scene.add(ground);
}
