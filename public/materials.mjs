import * as THREE from 'three'

var availableCubeMaterial;
var busyCubeMaterial;
var availableCubeMaterialHover;
var busyCubeMaterialHover;

var availableMarkMaterial;
var busyMarkMaterial;
var availableMarkMaterialHover;
var busyMarkMaterialHover;

var edgeCubeMaterial;
var edgeCubeMaterialHover;
var groundMaterial;

export function getMaterial(type, bumpTick = 0) {
    switch (type) {
        case 'availableCube':
            if (!availableCubeMaterial || bumpTick > 0) {
                availableCubeMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0x00ff00, // Cube color
                    transparent: true, // Enable transparency
                    opacity: 0.5 + bumpTick / 200, // Semi-transparent
                    specular: 0x050505,
                    shininess: 100,
                    metalness: 0.3,
                    roughness: 0.1,
                    //envMap: environmentMap,
                    reflectivity: 1
                });
            }
            return availableCubeMaterial;
        case 'busyCube':
            if (!busyCubeMaterial || bumpTick > 0) {
                busyCubeMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0xff0000, // Cube color
                    transparent: true, // Enable transparency
                    opacity: 0.5 + bumpTick / 200, // Semi-transparent
                    specular: 0xFF0000,
                    shininess: 10,
                    emissive: 0xff0000, // Neon color
                    emissiveIntensity: 1
                });
            }
            return busyCubeMaterial;
        case 'availableCubeHover':
            if (!availableCubeMaterialHover) {
                availableCubeMaterialHover = new THREE.MeshPhysicalMaterial({
                    color: 0x00ff00, // Cube color
                    transparent: true, // Enable transparency
                    opacity: 1, // Semi-transparent
                    specular: 0x050505,
                    shininess: 100,
                    metalness: 0.3,
                    roughness: 0.1,
                    //envMap: environmentMap,
                    reflectivity: 1
                });
            }
            return availableCubeMaterialHover;
        case 'busyCubeHover':
            if (!busyCubeMaterialHover) {
                busyCubeMaterialHover = new THREE.MeshPhysicalMaterial({
                    color: 0xff0000, // Cube color
                    transparent: true, // Enable transparency
                    opacity: 1, // Semi-transparent
                    specular: 0xFF0000,
                    shininess: 100,
                    emissive: 0xff0000, // Neon color
                    emissiveIntensity: 1
                });
            }
            return busyCubeMaterialHover;

        case 'availableMark':
            if (!availableMarkMaterial) {
                availableMarkMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0x0000ff, // Mark color
                    transparent: true, // Enable transparency
                    opacity: 0.5, // Semi-transparent
                    specular: 0x050505,
                    shininess: 100,
                    metalness: 0.3,
                    roughness: 0.1,
                    //envMap: environmentMap,
                    reflectivity: 1
                });
            }
            return availableMarkMaterial;
        case 'busyMark':
            if (!busyMarkMaterial) {
                busyMarkMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0xff00ff, // Mark color
                    transparent: true, // Enable transparency
                    opacity: 0.6, // Semi-transparent
                    specular: 0xFF00ff,
                    shininess: 10,
                    emissive: 0xff00ff, // Neon color
                    emissiveIntensity: 1
                });
            }
            return busyMarkMaterial;
        case 'availableMarkHover':
            if (!availableMarkMaterialHover) {
                availableMarkMaterialHover = new THREE.MeshPhysicalMaterial({
                    color: 0x0000ff, // Mark color
                    transparent: true, // Enable transparency
                    opacity: 1, // Semi-transparent
                    specular: 0x050505,
                    shininess: 100,
                    metalness: 0.3,
                    roughness: 0.1,
                    //envMap: environmentMap,
                    reflectivity: 1
                });
            }
            return availableMarkMaterialHover;
        case 'busyMarkHover':
            if (!busyMarkMaterialHover) {
                busyMarkMaterialHover = new THREE.MeshPhysicalMaterial({
                    color: 0xff00ff, // Mark color
                    transparent: true, // Enable transparency
                    opacity: 1, // Semi-transparent
                    specular: 0xFF0000,
                    shininess: 100,
                    emissive: 0xff0000, // Neon color
                    emissiveIntensity: 1
                });
            }
            return busyMarkMaterialHover;

        case 'edgeCube':
            if (!edgeCubeMaterial) {
                edgeCubeMaterial = new THREE.LineBasicMaterial({
                    color: 0x000000, transparent: true, // Enable transparency
                    opacity: 0.5 // Semi-transparent
                });
            }
            return edgeCubeMaterial;
        case 'edgeMark':
            if (!edgeCubeMaterial) {
                edgeCubeMaterial = new THREE.LineBasicMaterial({
                    color: 0x000000, transparent: true, // Enable transparency
                    opacity: 0.5 // Semi-transparent
                });
            }
            return edgeCubeMaterial;
        case 'edgeCubeHover':
            if (!edgeCubeMaterialHover) {
                edgeCubeMaterial = new THREE.LineBasicMaterial({
                    color: 0x000000,
                    transparent: false, // Enable transparency
                    opacity: 1 // Semi-transparent
                });
            }
            return edgeCubeMaterialHover;
        case 'ground':
            if (!groundMaterial)
                groundMaterial = new THREE.MeshPhysicalMaterial({
                    color: 0xffffff, // Base color of the ground
                    metalness: 0.3, // Adjust metalness to control reflectivity
                    roughness: 0.1, // A lower roughness makes the surface more reflective
                    //envMap: textureCube, // Environment map for reflections
                    reflectivity: 1, // Adjust reflectivity level
                    side: THREE.DoubleSide
                });
            return groundMaterial;
        default:
            return null;
    }
}