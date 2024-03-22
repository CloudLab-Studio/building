import * as THREE from 'three'
import { OrbitControls } from './jsm/controls/OrbitControls.js'
import Stats from './jsm/libs/stats.module.js'
import { GUI } from './jsm/libs/lil-gui.module.min.js'
import { addLight, syncSun, getSunPosition } from './light.mjs'
import { getMaterial } from './materials.mjs'
import { addCubes, Cube } from './cubes.mjs'
import { addGround } from './ground.js'
import { addMarks, Mark } from './marks.mjs'
import { BaseMesh } from './baseMesh.js'

const scene = new THREE.Scene()

addLight(scene)
addCubes(scene)
addGround(scene)
addMarks(scene)

const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;
camera.position.x = 0;
camera.position.y = 10;

const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.setClearColor(0xffffff);
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
document.body.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement)


window.addEventListener(
    'resize',
    function () {
        camera.aspect = window.innerWidth / window.innerHeight
        camera.updateProjectionMatrix()
        renderer.setSize(window.innerWidth, window.innerHeight)
        render()
    },
    false
)

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();

var oldObject = null;

function onMouseMove(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        if (oldObject != intersects[i].object) {
            if (intersects[i].object instanceof BaseMesh)
                intersects[i].object.moveIn();

            if (oldObject instanceof BaseMesh)
                oldObject.moveOut();
        }

        oldObject = intersects[i].object;
        if (intersects[i].object instanceof BaseMesh)
            break;
        
    }
}



function onMouseClick(event) {
    // Calculate mouse position in normalized device coordinates (-1 to +1)
    mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
    mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

    // Update the picking ray with the camera and mouse position
    raycaster.setFromCamera(mouse, camera);

    // Calculate objects intersecting the picking ray
    const intersects = raycaster.intersectObjects(scene.children);

    for (let i = 0; i < intersects.length; i++) {
        // If we've clicked on a cube (assuming the cubes are the only meshes in the scene)
        if (intersects[i].object instanceof BaseMesh) {
            intersects[i].object.click(); // Set the color of the intersected object to red
            break; // Uncomment this line if you want only the first object to be affected
        }
    }
}

// Add event listener to the window for mouse clicks
window.addEventListener('click', onMouseClick, false);
window.addEventListener('mousemove', onMouseMove, false);

const stats = Stats()
document.body.appendChild(stats.dom)

const gui = new GUI()
const lightFolder = gui.addFolder('Light')
var sunPosition = getSunPosition()
lightFolder.add(sunPosition, 'x', -100, 100)
lightFolder.add(sunPosition, 'y', -100, 100)
lightFolder.add(sunPosition, 'z', -100, 100)
lightFolder.open()
const cameraFolder = gui.addFolder('Camera')
cameraFolder.add(camera.position, 'z', 0, 10)
cameraFolder.open()

function animate() {
    requestAnimationFrame(animate)
    //cube.rotation.x += 0.01
    syncSun()
    controls.update()
    render()
    stats.update()
}

function render() {
    renderer.render(scene, camera)
}

animate()
