import { Scene, sRGBEncoding, WebGLRenderer } from 'three'
import { Pane } from 'tweakpane'
import gsap from 'gsap'
import Axis from 'axis-api'

import Assets from '@utils/Loader'
import CameraManager from './CameraManager'
import PlayerManager from './PlayerManager'
import FoeManager from './FoeManager'
import WorldManager from './WorldManager'
import LeaderboardManager from './LeaderboardManager'
import InterfaceManager from './InterfaceManager'

class AppManager {
  constructor() {
    this.assets = Assets
    this.gameOver = false
  }
  // GETTERS
  get IS_GAME_OVER() {
    return this.gameOver
  }
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
    this._worldManager = this._setWorldManager()
    this._interfaceManager = this._setInterfaceManager()
  }
  init() {
    this._foeManager = this._setFoeManager()
    this._leaderboardManager = this._setLeaderboardManager()
    this._playerManager = this._setPlayerManager()
    this._setTicker()
    this._setEvents()
  }
  update() {
    this._renderer.render(this._scene, this._cameraManager.CAMERA)
  }
  replay() {
    this.gameOver = false
    this._leaderboardManager.reset()
    this._playerManager.reset()
    this._interfaceManager.reset()
    this._foeManager.reset()
  }
  setUpdate() {
    const upd = (time, deltaTime) => {
      this._leaderboardManager.update(time, deltaTime)
      this._playerManager.update(time, deltaTime)
      this._interfaceManager.update()
      this._foeManager.update()
      setTimeout(() => {
        this._foeManager.animate(time, deltaTime)
      }, 2000)
    }
    this.upd = upd
    gsap.ticker.add(upd)
  }
  removeUpdate() {
    gsap.ticker.remove(this.upd)
    this.gameOver = true
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
  _setFoeManager() {
    const foeManager = FoeManager
    foeManager.setup()
    return FoeManager
  }
  _setWorldManager() {
    const worldManager = WorldManager
    worldManager.setup()
    return worldManager
  }
  _setLeaderboardManager() {
    const loaderboardManager = LeaderboardManager
    loaderboardManager.setup()
    return loaderboardManager
  }
  _setInterfaceManager() {
    const interfaceManager = InterfaceManager
    return interfaceManager
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
    gsap.ticker.add(() => {this.update()})
    gsap.ticker.add(() => {this._playerManager.EMULATOR.update()})
  }
  _exitAttemptHandler() {
    gsap.ticker.sleep()
  }
  _exitCanceledHandler() {
    gsap.ticker.wake()
  }
  _exitCompletedHandler() {
    console.log('exit completed')
  }
  _setEvents() {
    window.addEventListener('resize', () => {
      this._cameraManager.setSizes()
      this._renderer.setSize(window.innerWidth, window.innerHeight)
    })
    Axis.addEventListener('exit:attempted', this._exitAttemptHandler)
    Axis.addEventListener('exit:canceled', this._exitCanceledHandler)
    Axis.addEventListener('exit:completed', this._exitCompletedHandler)
  }
}

export default new AppManager()
