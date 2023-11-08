import * as THREE from './three.module.js';

const scene = new THREE.Scene()

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
);

const renderer = new THREE.WebGLRenderer(
  { canvas: document.querySelector('#bg') }
);

renderer.setPixelRatio( window.devicePixelRatio );
renderer.setSize( window.innerWidth, window.innerHeight );
camera.position.z = 100;
camera.position.y = 20;

//LIGHTS
const pointLight = new THREE.PointLight(0xFFFFFF, 1000, 1000)
pointLight.position.set(0, 0, 50)

const ambientLight = new THREE.PointLight(0xFFFFFF, 0.5)

scene.add(pointLight)
scene.add(ambientLight)

const back = new THREE.TextureLoader().load('nothing.png')
scene.background = back

//HELPERS
const lightHelper = new THREE.PointLightHelper(pointLight);
const axesHelper = new THREE.AxesHelper(20, 20, 20);
scene.add(lightHelper, axesHelper );

const geoPog = new THREE.CylinderGeometry(41.37, 41.37, 6, 64);
const texturePog = new THREE.TextureLoader().load('JOE.png')
const matPog = new THREE.MeshStandardMaterial(
  {
    color: 0xFFFFFF,
    wireframe: false,
    map: texturePog
  }
)
const pog = new THREE.Mesh( geoPog, matPog );

const geoDirt = new THREE.BoxGeometry(50,50, 50, 50)
const textureDirt = new THREE.TextureLoader().load('dirt.png')
const matDirt = new THREE.MeshStandardMaterial(
  {
    color: 0xFFFFFF,
    wireframe: false,
    map: textureDirt
  }
)
const dirt = new THREE.Mesh( geoDirt, matDirt )

scene.add(pog)
scene.add(dirt)

dirt.position.x = 100;
dirt.position.z = 100

function moveCamera() {
  const pos = document.body.getBoundingClientRect().top;
  dirt.rotation.x += 0.05;
  dirt.rotation.y += 0.075;
  dirt.rotation.z += 0.05;

  camera.position.z = pos * -0.1;
  camera.position.x = pos * -0.002;
  camera.position.y = pos * -0.002;
}


document.body.onscroll = moveCamera
moveCamera()

function animate(time) {
  requestAnimationFrame( animate );

pog.rotation.x += 0.005

  renderer.render( scene, camera );
}

animate()