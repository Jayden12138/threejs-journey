import * as THREE from 'three'

// console.log(THREE)

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// Object
const geometry = new THREE.BoxGeometry(1, 1, 1) // 几何
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true}) // 材质
const mesh = new THREE.Mesh(geometry, material) // 网格
scene.add(mesh)

// Camera
const sizes = {
  width: 800,
  height: 600
}
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
camera.position.z = 3
camera.position.x = 1
scene.add(camera)

// Renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)

renderer.render(scene, camera)