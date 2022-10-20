import { Object3D, Vector3 } from 'three'
import gsap from 'gsap'
import Assets from '@utils/Loader'
import PlayerManager from '@js/PlayerManager'

export default class Starship extends Object3D {
  constructor(options) {
    super()
    // Set up
    this.user = options.name
    this.name = `Starship ${options.name}`
    // this.speed = 0.09
    this.speed = 0
    this.direction = new Vector3()

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
    this.add(this.starship)
  }
  setMovement() {
    gsap.ticker.add((time, deltaTime) => {
      this.rotation.y -=
        (PlayerManager.JOYSTICK_POSITION[this.user].x * deltaTime) / 300
      this.position.add(this._getForwardVector().multiplyScalar((-PlayerManager.JOYSTICK_POSITION[this.user].y * deltaTime) / 300 - this.speed))

      gsap.to(this.starship.rotation, {
        x: -PlayerManager.JOYSTICK_POSITION[this.user].y / 4,
        duration: 0.03,
        repeat: 1,
        ease: 'expo.in',
      })

      gsap.to(this.starship.rotation, {
        z: -PlayerManager.JOYSTICK_POSITION[this.user].x / 3,
        duration: 0.06,
        repeat: 1,
        ease: 'circ.in',
      })
    })
  }
  // PRIVATE
  _getForwardVector() {
    this.getWorldDirection(this.direction)
    this.direction.y = 0
    this.direction.normalize()
    return this.direction
  }
}
