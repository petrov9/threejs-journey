import './style.css'
import * as THREE from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import * as dat from "dat.gui";
import {BufferAttribute} from "three";

let textureLoader = new THREE.TextureLoader();
const doorColorTexture = textureLoader.load("textures/door/color.jpg")
const alphaColorTexture = textureLoader.load("textures/door/alpha.jpg")
const ambientOcclusionColorTexture = textureLoader.load("textures/door/ambientOcclusion.jpg")
const heightColorTexture = textureLoader.load("textures/door/height.jpg")
const normalColorTexture = textureLoader.load("textures/door/normal.jpg")
const metalnessColorTexture = textureLoader.load("textures/door/metalness.jpg")
const roughnessTexture = textureLoader.load("textures/door/roughness.jpg")
const matcapTexture = textureLoader.load("textures/matcaps/8.png")
const gradientTexture = textureLoader.load("textures/gradients/5.jpg")
gradientTexture.minFilter =THREE.NearestFilter
gradientTexture.magFilter =THREE.NearestFilter
gradientTexture.generateMipmaps = false

let cubeTextureLoader = new THREE.CubeTextureLoader();
const envMapTexture = cubeTextureLoader.load(
    [
        "textures/environmentMaps/0/px.jpg",
        "textures/environmentMaps/0/nx.jpg",
        "textures/environmentMaps/0/py.jpg",
        "textures/environmentMaps/0/ny.jpg",
        "textures/environmentMaps/0/pz.jpg",
        "textures/environmentMaps/0/nz.jpg",
    ]
)


/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

// const material = new THREE.MeshBasicMaterial({
//     // map: doorColorTexture,
//     // color: "red",
//     // wireframe: true,
//     // opacity: 0.5,
//     // transparent: true
// });
// material.alphaMap = alphaColorTexture
// material.side = THREE.DoubleSide

// const material = new THREE.MeshNormalMaterial()
// material.flatShading = true

// const material = new THREE.MeshMatcapMaterial()
// material.matcap = matcapTexture

// const material = new THREE.MeshDepthMaterial()

// let material = new THREE.MeshLambertMaterial();
// let material = new THREE.MeshPhongMaterial();
// material.shininess = 100
// material.specular = new THREE.Color("red")

// let material = new THREE.MeshToonMaterial();
// material.gradientMap = gradientTexture

// let material = new THREE.MeshStandardMaterial();
// material.metalness = 0.45
// material.roughness = 0.65
// material.map = doorColorTexture
// material.aoMap = ambientOcclusionColorTexture
// material.aoMapIntensity = 2
// material.displacementMap = heightColorTexture
// material.displacementScale = 0.1
// material.metalnessMap = metalnessColorTexture
// material.roughnessMap = roughnessTexture
// material.normalMap = normalColorTexture
// material.normalScale.set(0.5, 0.1)
// material.alphaMap = alphaColorTexture
// material.transparent = true

let material = new THREE.MeshStandardMaterial();
material.metalness = 0.7
material.roughness = 0.2
material.envMap = envMapTexture

let gui = new dat.GUI();
gui.add(material, "metalness").min(0).max(1).step(0.1)
gui.add(material, "roughness").min(0).max(1).step(0.1)
gui.add(material, "aoMapIntensity").min(0).max(100).step(0.1)
gui.add(material, "displacementScale").min(0).max(1).step(0.001)
gui.add(material, "wireframe")
scene.add(gui)


const sphere = new THREE.Mesh(
    new THREE.SphereGeometry(0.5, 64, 64),
    material
)
sphere.position.x = -1.5
sphere.geometry.setAttribute("uv2", new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2))

const plane = new THREE.Mesh(
    new THREE.PlaneGeometry(1,1, 100,100),
    material
)
plane.geometry.setAttribute("uv2", new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2))

const torus = new THREE.Mesh(
    new THREE.TorusGeometry(0.3, 0.2, 16, 32),
    material
)
torus.position.x = 1.5
torus.geometry.setAttribute("uv2", new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2))

scene.add(sphere, plane, torus)

let ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
scene.add(ambientLight)

let pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2
pointLight.position.y = 3
pointLight.position.z = 4
scene.add(pointLight)


/**
 * Sizes
 */
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () =>
{
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
camera.position.z = 2
scene.add(camera)

// Controls
const controls = new OrbitControls(camera, canvas)
controls.enableDamping = true

/**
 * Renderer.js
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

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()

    // sphere.rotation.y = 0.1 * elapsedTime
    // plane.rotation.y = 0.1 * elapsedTime
    // torus.rotation.y = 0.1 * elapsedTime
    //
    // sphere.rotation.x = 0.1 * elapsedTime
    // plane.rotation.x = 0.1 * elapsedTime
    // torus.rotation.x = 0.1 * elapsedTime

    // Update controls
    controls.update()

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()