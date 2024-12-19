import * as THREE from 'three'

const canvas = document.querySelector('canvas.webgl')
// console.log(canvas)

// scene 场景
const scene = new THREE.Scene()

const sizes = {
  width: 800,
  height: 600
}

// camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.z = 3
camera.position.set(0, 0, 3)

// objects
// const mesh = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({
//     color: 0xff0000,
//     wireframe: true
//   })
// )
// scene.add(mesh)

// mesh.position.set(-1, 1, 1)

// mesh.rotation.reorder('YXZ')
// mesh.rotation.y = Math.PI * 0.25 // 45°
// mesh.rotation.x = -Math.PI * 0.25 // 45°


// group
const group = new THREE.Group()
scene.add(group)
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x8acefe
  })
)
cube1.position.set(-2, 1, 0)
cube1.rotation.reorder('YXZ')
cube1.rotation.x = Math.PI * 0.25
cube1.rotation.y = Math.PI * 0.25
group.add(cube1)
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x4cdd7c
  })
)
cube2.position.set(2, 1, 0)
cube2.rotation.reorder('YXZ')
cube2.rotation.x = Math.PI * 0.25
cube2.rotation.y = -Math.PI * 0.25
group.add(cube2)


group.position.z = -2

// lookat
// camera.lookAt(cube1.position)
// camera.lookAt(cube2.position)

// helper
const axesHelper = new THREE.AxesHelper()
scene.add(axesHelper)

// renderer
const renderer = new THREE.WebGLRenderer({
  canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
