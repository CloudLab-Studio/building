
import * as THREE from 'three'
import { getMaterial, addMaterials } from './materials.mjs'

addMaterials({
    'ground': new THREE.MeshPhysicalMaterial({
        color: 0xffffff, // Base color of the ground
        metalness: 0.3, // Adjust metalness to control reflectivity
        roughness: 0.1, // A lower roughness makes the surface more reflective
        //envMap: textureCube, // Environment map for reflections
        reflectivity: 1, // Adjust reflectivity level
        side: THREE.DoubleSide
    })
});

export function addGround(scene) {
    const groundGeometry = new THREE.PlaneGeometry(50, 50); // Adjust size as needed

    const ground = new THREE.Mesh(groundGeometry, getMaterial('ground'));
    ground.rotation.x = -Math.PI / 2; // Rotate the plane to be horizontal
    ground.position.y = -0.5; // Adjust the Y position as needed
    ground.receiveShadow = true; // This allows the ground to receive shadows

    scene.add(ground);
}
