import { OrthographicCamera, PerspectiveCamera } from 'three'
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js'
import AppManager from './AppManager'

class CameraManager {
  constructor() {}
  // GETTERS
  get CAMERA() {
    return this._camera
  }
  // PUBLIC
  setup() {
    this._debug = AppManager.DEBUG
    // this._camera = this._setCamera()
    this._camera = this._setOrthoCamera()
    this.setScene()
    this.setPosition()
    this.setDirection()

    if (this._debug) {
      this.debugFolder = this._debug.addFolder({
        title: 'Camera',
        expanded: false,
      })
      this._setDebug()
    }
  }
  setScene(scene = AppManager.SCENE) {
    scene.add(this._camera)
  }
  setPosition(x = 0, y = 20, z = 0) {
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
    const camera = new PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 )
    return camera
  }
  _setOrthoCamera() {
    const ratio = window.innerWidth / window.innerHeight
    const camera = new OrthographicCamera(-50, 50, 50 / ratio, -50 / ratio, 0.1, 1000)
    return camera
  }
  _setDebug() {
    new OrbitControls(this._camera, document.querySelector('canvas'))
    // this.debugFolder.addInput(this._camera, 'fov').on('change', () => {
    //   this._camera.updateProjectionMatrix()
    // })
    this.debugFolder.addInput(this._camera, 'position', {
      label: 'x, y, z',
      x: { min: -100, max: 100 },
      y: { min: -100, max: 100 },
      z: { min: -100, max: 100 },
    })
  }
}

export default new CameraManager()