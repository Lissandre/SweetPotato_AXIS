import { Object3D } from 'three'
import gsap from 'gsap'
import Assets from '@utils/Loader'
import PlayerManager from '@js/PlayerManager'

export default class Starship {
  constructor(options) {
    // Set up
    this.container = new Object3D()
    this.name = options.name
    this.container.name = `Starship ${options.name}`

    this.createStarship()
    this.setMovement()
  }
  // GETTERS
  get FOURCHETTE() {
    return this.starship.children.find((object) => object.name === 'Fourchette')
  }
  // PUBLIC
  createStarship() {
    this.starship = Assets.models.ship.scene.clone()
    this.container.add(this.starship)
  }
  setMovement() {
    gsap.ticker.add((time, deltaTime) => {
      this.container.position.x +=
        (PlayerManager.JOYSTICK_POSITION[this.user].x * deltaTime) / 100
      this.container.position.z -=
        (PlayerManager.JOYSTICK_POSITION[this.user].y * deltaTime) / 100

      gsap.to(this.starship.rotation, {
        x: -PlayerManager.JOYSTICK_POSITION[this.user].y / 4,
        duration: 0.03,
        repeat: 1,
        ease: 'expo.in',
      })

      gsap.to(this.starship.rotation, {
        z: -PlayerManager.JOYSTICK_POSITION[this.user].x / 2,
        duration: 0.06,
        repeat: 1,
        ease: 'circ.in',
      })
    })
  }
}
