import { AxesHelper, Object3D } from 'three'

import PointLightSource from './PointLight'
import Cube from './Cube'

export default class World {
  constructor(options) {
    // Set options
    this.debug = options.debug
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'World'

    if (this.debug) {
      this.container.add(new AxesHelper(5))
      this.debugFolder = this.debug.addFolder({
        title: 'World',
        expanded: false
      })
    }

    this.setLoader()
  }
  init() {
    this.setPointLight()
    this.setCube()
  }
  setLoader() {
    this.assets.on('ressourcesReady', () => {
      this.init()
    })
  }
  setPointLight() {
    this.light = new PointLightSource({
      debug: this.debugFolder,
    })
    this.container.add(this.light.container)
  }
  setCube() {
    this.cube = new Cube({
      assets: this.assets,
    })
    this.container.add(this.cube.container)
  }
}
