import Axis from 'axis-api'
import gsap from 'gsap'

import AppManager from './AppManager'
import Starship from '@components/Starship'
import CosmicPotato from '@components/CosmicPotato'

class PlayerManager {
  constructor() {
    this._joystickPosition = {
      player1: { x: 0, y: 0 },
      player2: { x: 0, y: 0 },
    }
    this._keydownValue = {
      player1: null,
      player2: null,
    }
    this._users = ['player1', 'player2']
    this._activeUser = 'player1'
  }
  // GETTERS
  get JOYSTICK_POSITION() {
    return this._joystickPosition
  }
  get KEYDOWN_VALUE() {
    return this._keydownValue
  }
  get ACTIVE_USER() {
    return this._activeUser
  }
  get ACTIVE_STARSHIP() {
    return this._starships[this._activeUser]
  }
  get COSMIC_POTATO_POSITION() {
    return this._cosmicPotato
  }

  // PUBLIC
  setup() {
    this._starships = this._setStarships()
    this._players = this._setPlayers()
    this._cosmicPotato = this._setCosmicPotato()
    this._setEvents(this._players)
    if (AppManager.DEBUG) {
      this._setKeys()
      this._gamepadEmulator = this._setGamepadEmulator()
      gsap.ticker.add(() => {
        this._gamepadEmulator.update()
      })
    }
  }
  changeActiveUser() {
    this._activeUser = this._activeUser === 'player1' ? 'player2' : 'player1'
  }
  // PRIVATE
  _setStarships() {
    const starship1 = new Starship({ name: 'player1' })
    const starship2 = new Starship({ name: 'player2' })
    starship1.position.set(-1, 0, 0)
    starship2.position.set(1, 0, 0)
    AppManager.SCENE.add(starship1)
    AppManager.SCENE.add(starship2)
    return { player1: starship1, player2: starship2 }
  }
  _setPlayers() {
    const player1 = Axis.createPlayer({
      id: 1,
      joysticks: Axis.joystick1,
      buttons: Axis.buttonManager.getButtonsById(1),
      // buttons: Axis.buttonManager.getButton("w", 1),
    })
    const player2 = Axis.createPlayer({
      id: 2,
      joysticks: Axis.joystick2,
      buttons: Axis.buttonManager.getButtonsById(2),
      // buttons: Axis.buttonManager.getButton("w", 2),
    })
    return { player1, player2 }
  }
  _setCosmicPotato() {
    const cosmicPotato = new CosmicPotato()
    AppManager.SCENE.add(cosmicPotato)
    return cosmicPotato
  }
  _setEvents({ player1, player2 }) {
    player1.addEventListener('joystick:move', (e) => {
      this._joystickMoveHandler('player1', e)
    })
    player2.addEventListener('joystick:move', (e) => {
      this._joystickMoveHandler('player2', e)
    })
    player1.addEventListener('keydown', (e) => {
      this._keydownHandler('player1', e)
    })
    player2.addEventListener('keydown', (e) => {
      this._keydownHandler('player2', e)
    })
  }
  _setKeys() {
    // Player 1
    Axis.registerKeys('q', 'a', 1)
    Axis.registerKeys('d', 'x', 1)
    Axis.registerKeys('z', 'i', 1)
    Axis.registerKeys('s', 's', 1)
    Axis.registerKeys(' ', 'w', 1)
    // Player 2
    Axis.registerKeys('ArrowLeft', 'a', 2)
    Axis.registerKeys('ArrowRight', 'x', 2)
    Axis.registerKeys('ArrowUp', 'i', 2)
    Axis.registerKeys('ArrowDown', 's', 2)
    Axis.registerKeys('Enter', 'w', 2)
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
  _keydownHandler(player, e) {
    this._keydownValue[player] = e.key
    if (player === this._activeUser) {
      this.changeActiveUser()
    }
  }
}

export default new PlayerManager()
