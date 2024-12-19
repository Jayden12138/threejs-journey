import * as THREE from 'three'
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';


const canvas = document.querySelector('canvas.webgl')

const sizes = {
  width: 800,
  height: 600
}

const scene = new THREE.Scene()

// OrthographicCamera
const aspectRatio = sizes.width / sizes.height
const camera = new THREE.OrthographicCamera(-2 * aspectRatio, 2 * aspectRatio, 2, -2, 0.1, 100)
camera.position.z = 1;
scene.add(camera)

// // PerspectiveCamera
// const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
// camera.position.z = 3;
// scene.add(camera)

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x8acefe,
    wireframe: true
  })
)
scene.add(mesh)

mesh.rotation.y = - Math.PI * 0.25
mesh.rotation.x = Math.PI * 0.25

const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true


const axesHelper = new THREE.AxesHelper(2)
scene.add(axesHelper)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
// renderer.render(scene, camera)


function tick() {
  controls.update()

  renderer.render(scene, camera)

  requestAnimationFrame(tick)
}

tick()

