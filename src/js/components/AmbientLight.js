import { Object3D, AmbientLight, Color } from 'three'
import AppManager from '../AppManager'

export default class AmbientLightSource extends Object3D {
  constructor() {
    super()
    // Set up
    this.name = 'AmbientLightSource'
    this._debug = AppManager.DEBUG
    this.params = {
      color: 0xffffff,
      positionX: 0,
      positionY: 10,
      positionZ: 0,
    }
  }
  setup() {
    this.createAmbientLight()
    if (this._debug) {
      this._setDebug()
    }
  }
  createAmbientLight() {
    this.light = new AmbientLight(this.params.color, 1)
    this.add(this.light)
  }
  _setDebug() {
    // Color debug
    this.debugFolder = this._debug.addFolder({
      title: 'Ambient Light',
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
  }
}
