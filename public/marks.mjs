
import * as THREE from 'three'
import { addMaterials, getMaterial } from './materials.mjs'
import { BaseMesh } from './baseMesh.js'
import { Cube } from './cubes.mjs'

var sliceX = -1000;
var sliceZ = -1000;
var sliceY = -1000;

addMaterials({
    "availableMark": new THREE.MeshPhysicalMaterial({
        color: 0x0000ff, // Mark color
        transparent: true, // Enable transparency
        opacity: 0.5, // Semi-transparent
        specular: 0x050505,
        shininess: 100,
        metalness: 0.3,
        roughness: 0.1,
        //envMap: environmentMap,
        reflectivity: 1
    }),

    "busyMark": new THREE.MeshPhysicalMaterial({
        color: 0xff00ff, // Mark color
        transparent: true, // Enable transparency
        opacity: 0.6, // Semi-transparent
        specular: 0xFF00ff,
        shininess: 10,
        emissive: 0xff00ff, // Neon color
        emissiveIntensity: 1
    }),
    "availableMark:hover":
        new THREE.MeshPhysicalMaterial({
            color: 0x0000ff, // Mark color
            transparent: true, // Enable transparency
            opacity: 1, // Semi-transparent
            specular: 0x050505,
            shininess: 100,
            metalness: 0.3,
            roughness: 0.1,
            //envMap: environmentMap,
            reflectivity: 1
        }),

    'busyMark:hover':
        new THREE.MeshPhysicalMaterial({
            color: 0xff00ff, // Mark color
            transparent: true, // Enable transparency
            opacity: 1, // Semi-transparent
            specular: 0xFF0000,
            shininess: 100,
            emissive: 0xff0000, // Neon color
            emissiveIntensity: 1
        }),
    'edgeMark':
        new THREE.LineBasicMaterial({
            color: 0x000000, transparent: true, // Enable transparency
            opacity: 0.5 // Semi-transparent
        })

})

export class Mark extends BaseMesh {
    constructor(x, y, z, size, axis) {
        super(new THREE.BoxGeometry(size, size / 4, size), getMaterial('availableMark'));
        this.position.set(x, y, z);
        this.castShadow = true;      // This object will cast shadows
        this.receiveShadow = true;  // This object will receive shadows  
        const edgeGeometry = new THREE.EdgesGeometry(this.geometry);

        const edges = new THREE.LineSegments(edgeGeometry, getMaterial('edgeMark'));
        this.available = true;
        this.axis = axis;
        this.add(edges);
    }

    onclick(scene) {
        if (this.available) {
            this.material = getMaterial('busyMark');
            this.available = false;
        } else {
            this.material = getMaterial('availableMark');
            this.available = true;
        }

        if (this.axis == "x")
            sliceX = this.position.x - 1
        else if (this.axis == "y")
            sliceZ = this.position.z - 1
        else if (this.axis == "z")
            sliceY = this.position.z - 1

        for (let i = 0; i < scene.children.length; i++) {
            if (scene.children[i] instanceof Cube) {
                scene.children[i].visible = scene.children[i].position.z > sliceZ &&
                    scene.children[i].position.x > sliceX &&
                    scene.children[i].position.y > sliceY
            }
        }
    }
}

function createLayer(scene, y, numOfmarks, numOfmarks2) {
    for (let i = 0; i < numOfmarks; i++) {
        const mark = new Mark(i - numOfmarks / 2, y, - numOfmarks2 / 2 - 2, 0.9, "x");
        scene.add(mark);
    }

    for (let j = 0; j < numOfmarks2; j++) {
        const mark = new Mark(- numOfmarks / 2 - 2, y, j - numOfmarks2 / 2, 0.9, "y");
        scene.add(mark);
    }
}

export function addMarks(scene, layers = 8, marksPerLayer = 10, marksPerLayer2 = 20) {
    createLayer(scene, 0, marksPerLayer, marksPerLayer2);

} 