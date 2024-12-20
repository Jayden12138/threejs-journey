import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import gsap from 'gsap'
// import GUI from 'lil-gui'
import * as dat from 'lil-gui'

const debugObject = {}
/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Object
 */
debugObject.color = '#8acefe'
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2)
const material = new THREE.MeshBasicMaterial({ color: debugObject.color, wireframe: true })
const mesh = new THREE.Mesh(geometry, material)
scene.add(mesh)

/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth
    sizes.height = window.innerHeight

    // Update camera
    camera.aspect = sizes.width / sizes.height
    camera.updateProjectionMatrix()

    // Update renderer
    renderer.setSize(sizes.width, sizes.height)
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))
})

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100)
camera.position.x = 1
camera.position.y = 1
camera.position.z = 5
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Animate
 */
const clock = new THREE.Clock()

const tick = () => {
    const elapsedTime = clock.getElapsedTime()

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()

// helper
const axesHelper = new THREE.AxesHelper(3)
scene.add(axesHelper)


/**
 * Debug
 */
// const gui = new GUI()
const gui = new dat.GUI({
    width: 300,
    title: 'Nice debug UI',
    closeFolders: false, // 默认是否关闭所有文件夹(不包括顶层)
})
// gui.close() // 顶层关闭
// gui.hide() // 隐藏debugUI

// toggle
window.addEventListener('keydown', (event) => {
    if (event.key == 'h')
        gui.show(gui._hidden)
})

// gui.add(mesh.position, 'y')
// gui.add(mesh.position, 'y', - 3, 3, 0.01)
gui
    .add(mesh.position, 'y')
    .max(3)
    .min(-3)
    .step(0.01)
    .name('elevation')


const myObject = {
    myVariable: 1337
}
gui.add(myObject, 'myVariable')

// checkbox
gui.add(mesh, 'visible')
gui.add(material, 'wireframe')

// color
// gui.addColor(material, 'color')
// gui
//     .addColor(material, 'color')
//     .onChange((value) => {
//         // console.log(material.color)
//         // console.log(value)

//         console.log(value.getHexString())
//     })
gui
    .addColor(debugObject, 'color')
    .onChange(() => {
        material.color.set(debugObject.color)
    })


// Function
debugObject.spin = () => {
    gsap.to(mesh.rotation, { duration: 1, y: mesh.rotation.y + Math.PI * 2 })
}
gui.add(debugObject, 'spin')

// tweaking the geometry
const cubeTweaks = gui.addFolder('Awesome cube')

debugObject.subdivision = 2
cubeTweaks
    .add(debugObject, 'subdivision')
    .min(1)
    .max(20)
    .step(1)
    .onChange(() => {
        console.log('subdivision changed')
    })
    .onFinishChange(() => {
        console.log('subdivision finished changing')
        // 销毁之前的
        mesh.geometry.dispose()
        // 重新创建
        mesh.geometry = new THREE.BoxGeometry(
            1, 1, 1,
            debugObject.subdivision, debugObject.subdivision, debugObject.subdivision
        )
    })

// 关闭文件夹
// cubeTweaks.close()
