import * as THREE from 'three'

export class BaseMesh extends THREE.Mesh {
    constructor(geometry, material, hoverMaterial = null) {
        super(geometry, material);

        this.castShadow = true;      // This object will cast shadows
        this.receiveShadow = true;  // This object will receive shadows  
        this.normalMaterial = material;
        if (hoverMaterial) {
            this.hoverMaterial = hoverMaterial;
        }else{
            this.hoverMaterial = material;
        }
    }

    click(){
        console.log('click');
    }

    moveIn(){
        console.log('moveIn');
    }

    moveOut(){
        console.log('moveOut');
    }
}