
import * as THREE from 'three'
import { getMaterial } from './materials.mjs'
import { BaseMesh } from './baseMesh.js'

export class Mark extends BaseMesh {
    constructor(x, y, z, size) {
        super(new THREE.BoxGeometry(size, size / 4, size), getMaterial('availableMark'));
        this.position.set(x, y, z);
        this.castShadow = true;      // This object will cast shadows
        this.receiveShadow = true;  // This object will receive shadows  
        const edgeGeometry = new THREE.EdgesGeometry(this.geometry);

        const edges = new THREE.LineSegments(edgeGeometry, getMaterial('edgeMark'));
        this.available = true;
        this.add(edges);
    }

    click() {
        if (this.available) {
            this.material = getMaterial('busyMark');
            this.available = false;
        } else {
            this.material = getMaterial('availableMark');
            this.available = true;
        }
    }

    moveIn() {
        if (this.available)
            this.material = getMaterial('availableMarkHover');
        else
            this.material = getMaterial('busyMarkHover');

    }

    moveOut() {
        if (this.available)
            this.material = getMaterial('availableMark');
        else
            this.material = getMaterial('busyMark');
    }
}

function createLayer(scene, y, numOfmarks, numOfmarks2) {
    for (let i = 0; i < numOfmarks; i++) {
        const mark = new Mark(i - numOfmarks / 2, y, - numOfmarks2 / 2 - 2, 0.9);
        scene.add(mark);
    }

    for (let j = 0; j < numOfmarks2; j++) {
        const mark = new Mark(- numOfmarks / 2 - 2, y, j - numOfmarks2 / 2, 0.9);
        scene.add(mark);
    }
}

export function addMarks(scene, layers = 8, marksPerLayer = 10, marksPerLayer2 = 20) {
    createLayer(scene, 0, marksPerLayer, marksPerLayer2);

} 