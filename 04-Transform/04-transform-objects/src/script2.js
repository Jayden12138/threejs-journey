import * as THREE from 'three'

// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Objects
 */
const geometry = new THREE.BoxGeometry(1, 1, 1)
const material = new THREE.MeshBasicMaterial({ color: 0xff0000, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
// mesh.position.x = 0.7;
// mesh.position.y = -0.6;
// mesh.position.z = 1;

mesh.position.set(0.7, -0.6, 1)

scene.add(mesh)

// Scale https://threejs.org/docs/index.html?q=mesh#api/en/core/Object3D.scale
mesh.scale.x = 2
// mesh.scale.y = 0.5
// mesh.scale.z = 0.5
// mesh.scale.set(2, 0.5, 0.5)

// Rotation https://threejs.org/docs/index.html?q=mesh#api/en/core/Object3D.rotation`
mesh.rotation.reorder('YXZ')
mesh.rotation.y = 0.25 * Math.PI;
mesh.rotation.x = 0.25 * Math.PI;

// Axes helper
const axesHelper = new THREE.AxesHelper(1)
scene.add(axesHelper)

// console.log('before normalize: ', mesh.position, mesh.position.length())
// mesh.position.normalize() // 转换为单位向量
// console.log('after normalize: ', mesh.position, mesh.position.length())

// console.log(mesh.position.length()) // 距离原点的距离 https://threejs.org/docs/index.html?q=vector3#api/en/math/Vector3.length
// console.log(mesh.position.distanceTo(new THREE.Vector3(0, 0, 0)))

/**
 * Sizes
 */
const sizes = {
    width: 800,
    height: 600
}

/**
 * Camera
 */
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height)
// camera.position.x = 1
// camera.position.y = 1
camera.position.z = 3
scene.add(camera)

// lookAt
camera.lookAt(mesh.position)
// camera.lookAt(new THREE.Vector3(3, 0, 0))

// console.log(camera.position) // {x: 0, y: 0, z: 3}
// console.log(mesh.position.distanceTo(camera.position)) // 计算距离相机的距离

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.render(scene, camera)
