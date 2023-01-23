import {
    Float,
    Html,
    MeshReflectorMaterial,
    OrbitControls,
    PivotControls,
    Text,
    TransformControls
} from "@react-three/drei";
import {useRef} from "react";

export default function Experience()
{
    // const { camera, gl } = useThree()
    const cube = useRef()
    const sphere = useRef()

    return <>

        <OrbitControls enableDamping={true} makeDefault/>

        <directionalLight position={ [ 1, 2, 3 ] } intensity={ 1.5 } />
        <ambientLight intensity={ 0.5 } />

        <PivotControls
            anchor={[0,0,0]}
            depthTest={false}
            lineWidth={2}
            scale={100}
            fixed={true}
        >
            <mesh ref={sphere} position-x={ - 2 }>
                <sphereGeometry />
                <meshStandardMaterial color="orange" />
                <Html
                    position={[1,1,0]}
                    wrapperClass={"label"}
                    center
                    distanceFactor={3}
                    occlude={[sphere, cube]}
                >
                    That's is sphere
                </Html>
            </mesh>
        </PivotControls>

        <mesh ref={cube} position-x={ 2 } scale={ 1.5 }>
            <boxGeometry />
            <meshStandardMaterial color="mediumpurple" />
        </mesh>

        <TransformControls object={cube} mode={"translate"}/>

        <mesh position-y={ - 1 } rotation-x={ - Math.PI * 0.5 } scale={ 10 }>
            <planeGeometry />
            {/*<meshStandardMaterial color="greenyellow" />*/}
            <MeshReflectorMaterial
                resolution={512}
                blur={[1000, 1000]}
                mixBlur={0}
                mirror={0.6}
                color={"greenyellow"}
            />
        </mesh>

        <Float
            speed={10}
            floatIntensity={2}
        >
            <Text
                fontSize={1}
                color={"red"}
                font={"./bangers-v20-latin-regular.woff"}
                position-y={2}
                maxWidth={2}
                textAlign={"center"}
            >
                I LOVE 3D
            </Text>
        </Float>


    </>
}