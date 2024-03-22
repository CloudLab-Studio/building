import * as THREE from 'three'
import { getMaterial } from './materials.mjs'

export class BaseMesh extends THREE.Mesh {
    constructor(geometry, material) {
        super(geometry, material);

        this.castShadow = true;      // This object will cast shadows
        this.receiveShadow = true;  // This object will receive shadows
        this.hovered = false;  
    }

    get hoveredPostfix(){
        return this.hovered ? ':hover' : '';
    }

    onclick(){
        console.log('click');
    }

    onmouseIn(){
        if (!this.material.name.includes(':hover'))
            this.material = getMaterial(this.material.name + ':hover');
        this.hovered = true;
    }

    onmouseOut(){
        if (this.material.name.includes(':hover'))
            this.material = getMaterial(this.material.name.replace(':hover', ''));
        this.hovered = false;
    }
}