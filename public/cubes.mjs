
import * as THREE from 'three'
import { getMaterial } from './materials.mjs'
import { BaseMesh } from './baseMesh.js'

export class Cube extends BaseMesh {
    constructor(x, y, z, size) {
        super(new THREE.BoxGeometry(size, size, size), getMaterial('availableCube'));
        this.position.set(x, y, z);
        this.castShadow = true;      // This object will cast shadows
        this.receiveShadow = true;  // This object will receive shadows  
        const edgeGeometry = new THREE.EdgesGeometry(this.geometry);

        const edges = new THREE.LineSegments(edgeGeometry, getMaterial('edgeCube'));
        this.available = true;
        this.add(edges);
        this.bumpTick = 0;
    }

    click() {
        if (this.available) {
            this.material = getMaterial('busyCube');
            this.available = false;
        } else {
            this.material = getMaterial('availableCube');
            this.available = true;
        }
    }

    moveIn() {
        if (this.available)
            this.material = getMaterial('availableCubeHover');
        else
            this.material = getMaterial('busyCubeHover');

    }

    moveOut() {
        if (this.available)
            this.material = getMaterial('availableCube');
        else
            this.material = getMaterial('busyCube');
    }

    onBeforeRender() {
        // console.log(this.bumpTick);
        // if (this.bumpTick > 0) {
        //     this.bumpTick -= 10;
        //     console.log(this.bumpTick);
        // } else
        //     this.bumpTick = 0;
        // if (this.available)
        //     this.material = getMaterial('availableCube', this.bumpTick);
        // else
        //     this.material = getMaterial('busyCube', this.bumpTick);
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