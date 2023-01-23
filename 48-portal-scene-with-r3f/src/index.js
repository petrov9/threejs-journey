import './style.css'
import ReactDOM from 'react-dom/client'
import { Canvas } from '@react-three/fiber'
import Experience from './Experience.js'

const root = ReactDOM.createRoot(document.querySelector('#root'))

root.render(
    <Canvas
        flat // stop using toneMapping
        camera={ {
            fov: 45,
            near: 0.1,
            far: 200,
            position: [ 1, 2, 6 ]
        } }
    >
        <Experience />
    </Canvas>
)