import Axis from "axis-api"
import gsap from "gsap"

import AppManager from "./AppManager"
import Starship from "./components/Starship"

class PlayerManager {
  constructor(options) {
    this._joystickPosition = {
      player1: { x: 0, y: 0 },
      player2: { x: 0, y: 0 },
    }
  }
  // GETTERS
  get JOYSTICK_POSITION() {
    return this._joystickPosition
  }
  // PUBLIC
  setup() {
    this._starships = this._setStarships()
    this._players = this._setPlayers()
    this._setEvents(this._players)
    if (process.env.NODE_ENV === "development") {
      this._setKeys()
      this._gamepadEmulator = this._setGamepadEmulator()
      gsap.ticker.add(() => { this._gamepadEmulator.update() })
    }
  }
  // PRIVATE
  _setStarships() {
    const starship1 = new Starship({name: 'player1'})
    const starship2 = new Starship({name: 'player2'})
    AppManager.SCENE.add(starship1.container)
    AppManager.SCENE.add(starship2.container)
    return { starship1, starship2 }
  }
  _setPlayers() {
    const player1 = Axis.createPlayer({
      id: 1,
      joysticks: Axis.joystick1,
      buttons: Axis.buttonManager.getButtonsById(1)
      // buttons: Axis.buttonManager.getButton("w", 1),
    })
    const player2 = Axis.createPlayer({
      id: 2,
      joysticks: Axis.joystick2,
      buttons: Axis.buttonManager.getButtonsById(2)
      // buttons: Axis.buttonManager.getButton("w", 2),
    })
    return { player1, player2 }
  }
  _setEvents({ player1, player2 }) {
    player1.addEventListener("joystick:move", (e) => {this._joystickMoveHandler('player1', e)})
    player2.addEventListener("joystick:move", (e) => {this._joystickMoveHandler('player2', e)})
    player1.addEventListener("keydown", this._player1KeydownHandler)
    player2.addEventListener("keydown", this._player2KeydownHandler)
  }
  _setKeys() {
    // Player 1
    Axis.registerKeys("q", "a", 1)
    Axis.registerKeys("d", "x", 1)
    Axis.registerKeys("z", "i", 1)
    Axis.registerKeys("s", "s", 1)
    Axis.registerKeys(" ", "w", 1)
    // Player 2
    Axis.registerKeys("ArrowLeft", "a", 2)
    Axis.registerKeys("ArrowRight", "x", 2)
    Axis.registerKeys("ArrowUp", "i", 2)
    Axis.registerKeys("ArrowDown", "s", 2)
    Axis.registerKeys("Enter", "w", 2)
  }
  _setGamepadEmulator() {
    const gamepadEmulator = Axis.createGamepadEmulator(0)
    Axis.joystick1.setGamepadEmulatorJoystick(gamepadEmulator, 0)
    Axis.joystick2.setGamepadEmulatorJoystick(gamepadEmulator, 1)
    return gamepadEmulator
  }
  _joystickMoveHandler(player, e) {
    this._joystickPosition[player] = e.position
  }
  _player1KeydownHandler(e) {
    console.log('Player 1', e)
  }

  _player2KeydownHandler(e) {
    console.log('Player 2', e)
  }
}

export default new PlayerManager()