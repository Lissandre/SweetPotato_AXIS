import { Scene, sRGBEncoding, WebGLRenderer } from 'three'
import gsap from 'gsap'
import { Pane } from 'tweakpane'

import Assets from '@utils/Loader'
import CameraManager from './CameraManager'
import PlayerManager from './PlayerManager'
import WorldManager from './WorldManager'

class AppManager {
  constructor() {
    this.assets = Assets
  }
  // GETTERS
  get DEBUG() {
    return this._debug
  }
  get SCENE() {
    return this._scene
  }
  get RENDERER() {
    return this._renderer
  }
  // PUBLIC
  setup(canvas = document.querySelector('#_canvas')) {
    this.canvas = canvas
    this._debug = this._setConfig()
    this._scene = this._setScene()
    this._renderer = this._setRenderer()
    this._cameraManager = this._setCameraManager()
    this._playerManager = this._setPlayerManager()
    this._worldManager = this._setWorldManager()
    this._setTicker()
    this._setEvents()
  }
  update() {
    this._renderer.render(this._scene, this._cameraManager.CAMERA)
  }
  // PRIVATE
  _setScene() {
    const scene = new Scene()
    return scene
  }
  _setRenderer() {
    const renderer = new WebGLRenderer({
      canvas: this.canvas,
      alpha: true,
      antialias: true,
      powerPreference: 'high-performance',
    })
    renderer.outputEncoding = sRGBEncoding
    renderer.gammaFactor = 2.2
    renderer.setClearColor(0x000000, 1)
    renderer.setPixelRatio(Math.min(2, window.devicePixelRatio))
    renderer.setSize(window.innerWidth, window.innerHeight)
    return renderer
  }
  _setCameraManager() {
    const cameraManager = CameraManager
    cameraManager.setup()
    return cameraManager
  }
  _setPlayerManager() {
    const playerManager = PlayerManager
    playerManager.setup()
    return playerManager
  }
  _setWorldManager() {
    const worldManager = WorldManager
    worldManager.setup()
    return worldManager
  }
  _setConfig() {
    if (window.location.hash === '#debug') {
      const debug = new Pane({
        title: 'DEBUG',
        expanded: false,
      })
      return debug
    }
    return false
  }
  _setTicker() {
    // gsap.ticker.fps(60)
    gsap.ticker.add(() => {
      this.update()
    })
  }
  _setEvents() {
    window.addEventListener(
      'resize',
      () => {
        this._cameraManager.setSizes()
        this._renderer.setSize(window.innerWidth, window.innerHeight)
      },
      false
    )
  }
}

export default new AppManager()