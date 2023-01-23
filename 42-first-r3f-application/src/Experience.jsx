import {extend, useFrame, useThree} from "@react-three/fiber";
import {useRef} from "react";
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import {CustomObject} from "./CustomObject";

extend({OrbitControls: OrbitControls})

export const Experience = () => {

    const boxRef = useRef();
    const groupRef = useRef();
    const {camera, gl} = useThree();
    console.log(gl)

    useFrame((state, delta) => {
        boxRef.current.rotation.y += delta

        /*state.camera.position.x = Math.sin(state.clock.elapsedTime) * 5
        state.camera.position.z = Math.cos(state.clock.elapsedTime) * 5
        state.camera.lookAt(0,0,0)*/
    })

    return <>

        <orbitControls args={[camera, gl.domElement]}/>

        <directionalLight position={[1,2,3]}/>
        <ambientLight intensity={0.5}/>

        <group ref={groupRef}>
            <mesh position-x={-2}>
                <sphereGeometry args={[1.5, 32, 32]}/>
                <meshStandardMaterial color={"orange"}/>
            </mesh>
            <mesh  ref={boxRef}  position-x={2}>
                <boxGeometry args={[3,3,3]}/>
                <meshStandardMaterial color={"purple"}/>
            </mesh>
        </group>
        <mesh rotation-x={- Math.PI / 2}  position={[0,-2, 0]}>
            <planeGeometry args={[10, 10]}/>
            <meshBasicMaterial color={"green"}/>
        </mesh>

        <CustomObject/>
    </>
}
