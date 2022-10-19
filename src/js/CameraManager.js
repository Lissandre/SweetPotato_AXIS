import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

export default class CameraManager {
  constructor(options) {
    this.debug = options.debug
  }
  // GETTERS
  get CAMERA() {
    return this._camera
  }
  // PUBLIC
  setup() {
    this._camera = this._setCamera()
    this.setPosition()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Camera',
        expanded: false,
      })
      this._setDebug()
    }
  }
  setPosition(x = 0, y = 0, z = 5) {
    this._camera.position.x = x
    this._camera.position.y = y
    this._camera.position.z = z
  }
  setSizes() {
    this._camera.aspect =
      window.innerWidth / window.innerHeight
    this._camera.updateProjectionMatrix()
  }
  // PRIVATE
  _setCamera() {
    const camera = new PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    )
    return camera
  }
  _setDebug() {
    new OrbitControls(this._camera, document.querySelector('canvas'))
    this.debugFolder
      .addInput(this._camera, 'fov')
      .on('change', () => {
        this._camera.updateProjectionMatrix()
      })
    this.debugFolder
      .addInput(this._camera, 'position', {
        label: 'x, y, z',
        x: {min: -5, max: 5},
        y: {min: -5, max: 5},
        z: {min: -5, max: 5},
      })
  }
}
