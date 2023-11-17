import * as THREE from './three.module.js'

//starting position of the images from the top
const STARTY = 20;

//create a new scene
const scene = new THREE.Scene();

//create and position the camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

// creating a list of images in the 'img' folder
let imgList = [
    'code.png',
    'dirt.png'
]

//adds every image as a plane mesh with texture to the scene
for (const image in imgList) {
    //every mesh has a geometry, texture, and material
    const geometry = new THREE.PlaneGeometry(30, 20);
    const texture = new THREE.TextureLoader().load('img/' + imgList[image]);
    const material = new THREE.MeshBasicMaterial({ 
        color: 0xffffff, 
        side: THREE.DoubleSide,
        map: texture //adds the texture image here 
    });
    const plane = new THREE.Mesh(geometry, material);
    // adds the new plane to your scene
    scene.add(plane);

}

// moves the camera with your scrollbar
function moveCamera() {
    const top = document.body.getBoundingClientRect().top;
    camera.position.y = -10 + top * 0.10
}

// adds scrollbar event to move the camera
document.body.onscroll = moveCamera;

// resize the threejs canvas with the window
//AND adjust for phone sizes
function resizeWindow() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    // adjust for phone or desktop size
    if (window.innerWidth <= 600)  {  
        camera.position.x = 0;
        for (const child  in scene.children) {
            scene.children[child].rotation.y = 0;
            scene.children[child].position.y = child * -50;
        } 
    } else {
        camera.position.x = 15;
        for (const child  in scene.children) {
            scene.children[child].rotation.y = 15 * (Math.PI / 180);
            scene.children[child].position.y = child * -30;
        } 
    }
}

// resize canvas on window resize
window.addEventListener('resize', resizeWindow, false)

// creates the renderer and attaches to the canvas
const renderer = new THREE.WebGLRenderer(
    { canvas: document.querySelector('#bg') }
    );

// sets initial canvas size
resizeWindow();

// set renderer size and add it to the page
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

// animation loop that calls itself recursively
function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
}

// starts the animation
animate()