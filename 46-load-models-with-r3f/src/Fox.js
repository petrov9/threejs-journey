import {useAnimations, useGLTF} from "@react-three/drei";
import {useEffect} from "react";
import {useControls} from "leva";
import {Leva} from "leva";

export default function Fox() {
    const model = useGLTF("./fox/glTF/fox.gltf")

    const animations = useAnimations(model.animations, model.scene);

    const {animationName} = useControls("d", {
        animationName: {
            options: animations.names
        }
    })

    useEffect(() => {
        const action = animations.actions[animationName]
        action
            .reset()
            .fadeIn(0.5)
            .play()

        // cleanup phase
        return () => {
            action.fadeOut(0.5)
        }

    }, [animationName])

    return <>

        <primitive
            object={model.scene}
            scale={0.02}
            position={[-2.5, 0, 2.5]}
            rotation-y={0.3}
        />
    </>
}