import './style.css'
import ReactDOM from 'react-dom/client'
import {Canvas, useFrame} from "@react-three/fiber";
import {Experience} from "./Experience";
import * as THREE from 'three'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        // orthographic
        dpr={[1, 2]} // if device pixel ratio > 2 pixel ratio will be 2
        flat
        gl={{
            antialias: true,
            toneMapping: THREE.ACESFilmicToneMapping,
            outputEncoding: THREE.sRGBEncoding
        }}
        camera={{
            fov: 45,
            // zoom: 100,
            near: 0.1,
            far: 200,
            position: [3, 2, 6]

        }}>
        <Experience/>
    </Canvas>
)