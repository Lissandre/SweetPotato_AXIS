import { PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'

class CameraManager {
  constructor(options) {
    
  }
  // GETTERS
  get CAMERA() {
    return this._camera
  }
  // PUBLIC
  setup(options) {
    this.debug = options.debug
    this._camera = this._setCamera()
    this.setPosition()
    this.setDirection()

    if (this.debug) {
      this.debugFolder = this.debug.addFolder({
        title: 'Camera',
        expanded: false,
      })
      this._setDebug()
    }
  }
  setPosition(x = 0, y = 5, z = 0) {
    this._camera.position.set(x, y, z)
  }
  setDirection(x = 0, y = 0, z = 0) {
    this._camera.lookAt(x, y, z)
  }
  setSizes() {
    this._camera.aspect = window.innerWidth / window.innerHeight
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
    this.debugFolder.addInput(this._camera, 'fov').on('change', () => {
      this._camera.updateProjectionMatrix()
    })
    this.debugFolder.addInput(this._camera, 'position', {
      label: 'x, y, z',
      x: { min: -5, max: 5 },
      y: { min: -5, max: 5 },
      z: { min: -5, max: 5 },
    })
  }
}

export default new CameraManager()