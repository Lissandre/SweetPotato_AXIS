import { Object3D } from 'three'
import Assets from '@utils/Loader'
import PlayerManager from '@js/PlayerManager'
import gsap from 'gsap'

export default class Starship {
  constructor(options) {
    // Set up
    this.assets = Assets
    this.container = new Object3D()
    this.name = options.name
    this.container.name = `Starship ${this.name}`

    this.createStarship()
    this.setMovement()
  }
  createStarship() {
    this.starship = this.assets.models.ship.scene.clone()
    this.container.add(this.starship)
  }
  setMovement() {
    gsap.ticker.add((time, deltaTime) => {
      this.container.position.x += PlayerManager.JOYSTICK_POSITION[this.name].x * deltaTime / 100
      this.container.position.z -= PlayerManager.JOYSTICK_POSITION[this.name].y * deltaTime / 100
      this.starship.rotation.x = -PlayerManager.JOYSTICK_POSITION[this.name].y / 4
      this.starship.rotation.z = -PlayerManager.JOYSTICK_POSITION[this.name].x / 2
    })
  }
}
