import EventEmitter from "./EventEmitter";
import {GLTFLoader} from "three/examples/jsm/loaders/GLTFLoader";
import {CubeTextureLoader, TextureLoader} from "three";
import * as THREE from 'three'
import sources from "../sources";

export default class Resources extends EventEmitter {
    constructor(sources) {
        super();

        this.sources = sources

        // Setup
        this.items = {}
        this.toLoad = this.sources.length
        this.loaded = 0

        this.setLoaders()
        this.startLoading()

    }

    setLoaders() {
        this.loaders = {}
        this.loaders.gltfLoader = new GLTFLoader()
        this.loaders.textureLoader = new TextureLoader()
        this.loaders.cubeTextureLoader = new CubeTextureLoader()
    }

    startLoading() {
        // load each source

        for (const source of this.sources) {
            if (source.type === 'gltfModel') {
                this.loaders.gltfLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoader(source, file)
                    }
                )
            } else if (source.type === 'texture') {
                this.loaders.textureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoader(source, file)
                    }
                )
            } else if (source.type === 'cubeTexture') {
                this.loaders.cubeTextureLoader.load(
                    source.path,
                    (file) => {
                        this.sourceLoader(source, file)
                    }
                )
            }
        }
    }

    sourceLoader(source, file) {
        this.items[source.name] = file

        this.loaded++

        if (this.loaded === this.toLoad) {
            this.trigger("ready")
        }

    }
}