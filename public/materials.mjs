import * as THREE from 'three'

var materials = {};

export function addMaterials(newMaterials) {
    materials = { ...materials, ...newMaterials };
    for (let key in newMaterials) {
        if (!newMaterials[key].name)
            newMaterials[key].name = key;
    }
}

export function addMaterial(name, material) {
    materials[name] = material;
    if (!material.name)
        material.name = name;
}

export function getMaterial(name) {
    if (materials[name]) {
        return materials[name];
    }

    if (name.includes(':hover') && materials[name.replace(':hover', '')]) {
        addMaterial(name, materials[name.replace(':hover', '')])
        return materials[name.replace(':hover', '')];
    }

    console.log('Material not found: ' + name);
    return new THREE.MeshPhysicalMaterial();
}