import './style.css'
import * as THREE from 'three'
import * as dat from 'lil-gui'
import gsap from 'gsap'

/**
 * Debug
 */
const gui = new dat.GUI()

const parameters = {
    materialColor: '#ffeded'
}

gui
    .addColor(parameters, 'materialColor')
    .onChange(() => {
        meshToonMaterial.color.set(parameters.materialColor)
        particleMaterial.color.set(parameters.materialColor)
    })

/**
 * Base
 */
// Canvas
const canvas = document.querySelector('canvas.webgl')

// Scene
const scene = new THREE.Scene()

/**
 * Test cube
 */
/*const cube = new THREE.Mesh(
    new THREE.BoxGeometry(1, 1, 1),
    new THREE.MeshBasicMaterial({ color: '#ff0000' })
)
scene.add(cube)*/

let textureLoader = new THREE.TextureLoader();
let gradientTexture = textureLoader.load("textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter

let meshToonMaterial = new THREE.MeshToonMaterial({
    color: parameters.materialColor,
    gradientMap: gradientTexture
});

const objectDistance = 4
let mesh1 = new THREE.Mesh(
    new THREE.TorusGeometry(1, 0.4, 15,60),
    meshToonMaterial,
);

let mesh2 = new THREE.Mesh(
    new THREE.ConeGeometry(1, 2, 15,60),
    meshToonMaterial,
);


let mesh3 = new THREE.Mesh(
    new THREE.TorusKnotGeometry(0.8, 0.35, 100,16),
    meshToonMaterial
);

mesh1.position.y = - objectDistance * 0
mesh2.position.y = - objectDistance * 1
mesh3.position.y = - objectDistance * 2

mesh1.position.x = 2
mesh2.position.x = -2
mesh3.position.x = 2

scene.add(mesh1, mesh2, mesh3)

const sectionMeshes = [mesh1, mesh2, mesh3]

/*particles*/
const particleCount = 200
const particles = new Float32Array(particleCount * 3)

for (let i = 0; i < particleCount; i++) {
    const i3 = i * 3;

    particles[i3] = (Math.random() - 0.5) * 10
    particles[i3 + 1] = objectDistance * 0.5 - Math.random() * objectDistance * sectionMeshes.length
    particles[i3 + 2] = (Math.random() - 0.5) * 10
}

const particleGeometry = new THREE.BufferGeometry()
particleGeometry.setAttribute("position", new THREE.BufferAttribute(particles, 3))

const particleMaterial = new THREE.PointsMaterial()
particleMaterial.color = new THREE.Color(parameters.materialColor)
particleMaterial.size = 0.03
particleMaterial.sizeAttenuation = true
// particleMaterial.blending = THREE.AdditiveBlending

const particleMesh = new THREE.Points(particleGeometry, particleMaterial)
scene.add(particleMesh)


/**
 * Lights
* */

let directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(1,1,0)
scene.add(directionalLight)

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

let cameraGroup = new THREE.Group();
scene.add(cameraGroup)

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100)
camera.position.z = 6
cameraGroup.add(camera)

/**
 * Renderer.js
 */
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height)
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2))

/**
 * Scroll
 * */

let scrollY = window.scrollY
let currentSection = 0
window.addEventListener("scroll", () => {
    scrollY = window.scrollY
    const newSection = Math.round(scrollY / sizes.height)

    if (newSection !== currentSection) {
        currentSection = newSection

        gsap.to(
            sectionMeshes[currentSection].rotation,
            {
                duration: 1.5,
                ease: "power2.inOut",
                x: '+=6',
                y: '+=3',
                z: '+=1.5',
            }
        )
    }
})

const cursor = {}
cursor.x = 0
cursor.y = 0

window.addEventListener("mousemove", (event) => {
    cursor.x = event.clientX / sizes.width - 0.5
    cursor.y = event.clientY / sizes.height - 0.5
})

/**
 * Animate
 */
const clock = new THREE.Clock()
let previousTime = 0

const tick = () =>
{
    const elapsedTime = clock.getElapsedTime()
    const deltaTime = elapsedTime - previousTime
    previousTime = elapsedTime

    // animate camera
    camera.position.y = - scrollY / sizes.height * objectDistance

    const parallaxX = cursor.x * 0.5
    const parallaxY = - cursor.y * 0.5
    cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * 3 * deltaTime
    cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * 3 * deltaTime

    for (const mesh of sectionMeshes) {
        mesh.rotation.x += deltaTime * 0.4
        mesh.rotation.y += deltaTime * 0.48
    }

    // Render
    renderer.render(scene, camera)

    // Call tick again on the next frame
    window.requestAnimationFrame(tick)
}

tick()