import * as THREE from 'three'
import gsap from 'gsap'


const canvas = document.querySelector('canvas.webgl')

const scene = new THREE.Scene()

const sizes = {
  width: 800,
  height: 600
}

const mesh = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x8acefe
  })
)
scene.add(mesh)

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.set(0, 0, 3)

const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)


// // 
// function tick() {
//   mesh.rotation.y += 0.01

//   renderer.render(scene, camera)

//   requestAnimationFrame(tick)
// }

// tick()


// // Date
// let time = Date.now()
// function tick() {
//   const currentTime = Date.now()
//   const deltaTime = currentTime - time;
//   time = currentTime;

//   mesh.rotation.y += 0.01 * deltaTime / 5

//   renderer.render(scene, camera)

//   requestAnimationFrame(tick)
// }

// tick()

// Clock
const clock = new THREE.Clock()
function tick() {
  const deltaTime = clock.getElapsedTime()

  mesh.rotation.y = deltaTime

  renderer.render(scene, camera)

  requestAnimationFrame(tick)
}

tick()


// GSAP
gsap.to(mesh.position, {
  duration: 2,
  delay: 1,
  x: 2,
  y: 2
})
