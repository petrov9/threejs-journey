import { useFrame } from '@react-three/fiber'
import {Center, meshBounds, OrbitControls, useGLTF} from '@react-three/drei'
import { useRef } from 'react'
import * as THREE from 'three'

export default function Experience()
{
    const cube = useRef()
    
    useFrame((state, delta) =>
    {
        cube.current.rotation.y += delta * 0.2
    })

    const eventHandler = (event) => {
        event.eventObject.material.color = new THREE.Color(Math.random(), Math.random(), Math.random())
        event.stopPropagation()
    }

    const model = useGLTF("./hamburger.glb")

    return <>

        <OrbitControls makeDefault />

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <mesh position-x={ - 2 } onClick={eventHandler}>
            <sphereGeometry />
            <meshStandardMaterial color="orange" />
        </mesh>

        <mesh
            ref={ cube }
            raycast={meshBounds}
            position-x={ 2 }
            scale={ 1.5 }
            onClick={eventHandler}
            onPointerEnter={() => {document.body.style.cursor = "pointer"}}
            onPointerLeave={() => {document.body.style.cursor = "default"}}
        >
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            <meshStandardMaterial color="greenyellow" />
        </mesh>

        <Center>
            <primitive
                object={model.scene}
                scale={0.5}
                onClick={(event) => {
                    console.log("click")
                    event.stopPropagation()
                }}
            />
        </Center>

    </>
}