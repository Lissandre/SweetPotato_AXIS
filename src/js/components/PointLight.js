import { Object3D, PointLight, Color } from 'three'
import AppManager from '../AppManager'

export default class PointLightSource extends Object3D {
  constructor() {
    super()
    // Set up
    this.name = 'PointLightSource'
    this._debug = AppManager.DEBUG
    this.params = {
      color: 0xffffff,
      positionX: 0,
      positionY: 10,
      positionZ: 0,
    }
  }
  setup() {
    this.createPointLight()
    this.setPosition()
    if (this._debug) {
      this._setDebug()
    }
  }
  createPointLight() {
    this.light = new PointLight(this.params.color, 2, 100)
    this.add(this.light)
  }
  setPosition(x = this.params.positionX, y = this.params.positionY, z = this.params.positionZ) {
    this.light.position.set(x, y, z)
  }
  _setDebug() {
    // Color debug
    this.debugFolder = this._debug.addFolder({
      title: 'Point Light',
      expanded: false
    })
    this.debugFolder
      .addInput(this.params, 'color', {
        view: 'color',
        expanded: false,
        picker: 'inline',
      })
      .on('change', () => {
        this.light.color = new Color(this.params.color)
      })
    //Position debug
    this.debugFolder
      .addInput(this.light, 'position', {
        label: 'x, y, z',
        x: {min: -5, max: 5},
        y: {min: -5, max: 5},
        z: {min: -5, max: 5},
      })
  }
}
