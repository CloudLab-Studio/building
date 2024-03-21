
import * as THREE from 'three'
import { getMaterial } from './materials.mjs'

export class Cube extends THREE.Mesh {
    constructor(x, y, z, size) {
        super(new THREE.BoxGeometry(size, size, size), getMaterial('availableCube'));
        this.position.set(x, y, z);
        this.castShadow = true;      // This object will cast shadows
        this.receiveShadow = true;  // This object will receive shadows  
        const edgeGeometry = new THREE.EdgesGeometry(this.geometry);

        const edges = new THREE.LineSegments(edgeGeometry, getMaterial('edgeCube'));
        this.available = true;
        this.add(edges);
    }

    toggle() {
        if (this.available) {
            this.material = getMaterial('busyCube');
            this.available = false;
        } else {
            this.material = getMaterial('availableCube');
            this.available = true;
        }
    }

    bump(state) {
        console.log(state);
        if (state == 1) {
            if (this.available)
                this.material = getMaterial('availableCubeHover');
            else
                this.material = getMaterial('busyCubeHover');
        } else
            if (this.available)
                this.material = getMaterial('availableCube');
            else
                this.material = getMaterial('busyCube');
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

export function addCubes(scene) {
    const layers = 8;
    const cubesPerLayer = 10;
    const cubesPerLayer2 = 20;
    for (let i = 0; i < layers; i++) {
        createLayer(scene, i, cubesPerLayer, cubesPerLayer2);
    }
} 