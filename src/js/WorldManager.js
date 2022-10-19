import { AxesHelper } from 'three'

import AppManager from './AppManager'
import PointLightSource from '@components/PointLight'

class WorldManager {
  constructor() {
    this._objects = []
  }
  // GETTERS
  get OBJECTS() {
    return this._objects
  }
  // PUBLIC
  setup() {
    this._debug = AppManager.DEBUG
    this._scene = AppManager.SCENE
    this._pointLight = this._setPointLight()
    this._addToScene()
    if (this._debug) {
      this._scene.add(new AxesHelper(5))
    }
  }
  // PRIVATE
  _setPointLight() {
    const light = new PointLightSource()
    this._objects.push(light)
    return light
  }
  _addToScene() {
    this._objects.forEach((object) => {
      object.setup()
      this._scene.add(object)
    })
  }
}

export default new WorldManager()