
import * as THREE from 'three'
import { addMaterials, getMaterial } from './materials.mjs'
import { BaseMesh } from './baseMesh.js'

addMaterials({
    'availableCube':
        new THREE.MeshPhysicalMaterial({
            color: 0x00ff00, // Cube color
            transparent: true, // Enable transparency
            opacity: 0.5, // Semi-transparent
            specular: 0x050505,
            shininess: 100,
            metalness: 0.3,
            roughness: 0.1,
            //envMap: environmentMap,
            reflectivity: 1
        }),
    'busyCube': new THREE.MeshPhysicalMaterial({
        color: 0xff0000, // Cube color
        transparent: true, // Enable transparency
        opacity: 0.5, // Semi-transparent
        specular: 0xFF0000,
        shininess: 10,
        emissive: 0xff0000, // Neon color
        emissiveIntensity: 1
    }),
    
    'availableCube:hover': new THREE.MeshPhysicalMaterial({
        color: 0x00ff00, // Cube color
        transparent: true, // Enable transparency
        opacity: 1, // Semi-transparent
        specular: 0x050505,
        shininess: 100,
        metalness: 0.3,
        roughness: 0.1,
        //envMap: environmentMap,
        reflectivity: 1
    }),
    'busyCube:hover': new THREE.MeshPhysicalMaterial({
        color: 0xff0000, // Cube color
        transparent: true, // Enable transparency
        opacity: 1, // Semi-transparent
        specular: 0xFF0000,
        shininess: 100,
        emissive: 0xff0000, // Neon color
        emissiveIntensity: 1
    }),
    'selectedCube': new THREE.MeshPhysicalMaterial({
        color: 0xffff00, // Cube color
        transparent: true, // Enable transparency
        opacity: 0.7, // Semi-transparent
        specular: 0xFFff00,
        shininess: 20,
        emissive: 0xffff00, // Neon color
        emissiveIntensity: 1
    }),
    'edgeCube': new THREE.LineBasicMaterial({
        color: 0x000000, transparent: true, // Enable transparency
        opacity: 0.5 // Semi-transparent
    }),
    'edgeCube:hover':
        new THREE.LineBasicMaterial({
            color: 0x000000,
            transparent: false, // Enable transparency
            opacity: 1 // Semi-transparent
        })
})


export class Cube extends BaseMesh {
    constructor(x, y, z, size) {
        super(new THREE.BoxGeometry(size, size, size), getMaterial('availableCube'));
        this.position.set(x, y, z);
        this.castShadow = true;      // This object will cast shadows
        this.receiveShadow = true;  // This object will receive shadows  
        const edgeGeometry = new THREE.EdgesGeometry(this.geometry);

        const edges = new THREE.LineSegments(edgeGeometry, getMaterial('edgeCube'));
        
        this.available = Math.random() < 0.8;
        this.selected = false;
        this.add(edges);
        this.bumpTick = 0;
    }

    get available() {
        return this._available;
    }

    set available(value) {
        this._available = value;
        this.material = getMaterial((value ? 'availableCube' : 'busyCube') + this.hoveredPostfix);
    }

    get selected() {
        return this._selected;
    }

    set selected(value) {
        if (!this.available)
            return;
        this._selected = value;
        this.material = value? getMaterial('selectedCube'):getMaterial('availableCube');
    }

    onclick() {
        this.selected = !this.selected;
    }
}

function createLayer(scene, y, numOfCubes, numOfCubes2) {
    for (let i = 0; i < numOfCubes; i++) {
        for (let j = 0; j < numOfCubes2; j++) {
            const cube = new Cube(i - numOfCubes / 2, y, j - numOfCubes2 / 2, 0.9);
            scene.add(cube);
        }
    }
}

export function addCubes(scene, layers = 8, cubesPerLayer = 10, cubesPerLayer2 = 20) {
    for (let i = 0; i < layers; i++) {
        createLayer(scene, i, cubesPerLayer, cubesPerLayer2);
    }
} 