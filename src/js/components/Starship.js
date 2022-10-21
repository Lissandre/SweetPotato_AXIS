import { Object3D, UVMapping, Vector3 } from 'three'
import gsap from 'gsap'
import Assets from '@utils/Loader'
import getForwardVector from '@utils/GetForwardVector'
import PlayerManager from '@js/PlayerManager'
import CameraManager from '../CameraManager'

export default class Starship extends Object3D {
  constructor(options) {
    super()
    // Set up
    this.user = options.name
    this.name = `Starship ${options.name}`
    this.speed = 0.09
    // this.speed = 0
    this.direction = new Vector3()
    this.pSize = CameraManager.SIZE
    this.pRatio = CameraManager.RATIO
    this.margin = 2
    this.canRotate = true

    this.createStarship()
  }
  // GETTERS
  get FOURCHETTE() {
    // return this
    return this.starship.children.find((object) => object.name === 'Fourchette')
  }
  // PUBLIC
  createStarship() {
    this.starship = Assets.models[this.user].scene.clone()
    // this.starship.material = Assets.textures[this.user]
    this.add(this.starship)
  }
  update(time, deltaTime) {
    // const pos = this.position
    // if (
    //   (pos.x + this.margin < this.pSize || pos.x - this.margin > -this.pSize)
    //   && (pos.z + this.margin < this.pSize / this.pRatio || pos.z - this.margin > -this.pSize / this.pRatio)
    // ) {
    //   this.position.copy(pos)
    // }
    this.position.add(getForwardVector(this).multiplyScalar((-PlayerManager.JOYSTICK_POSITION[this.user].y * deltaTime) / 250 - this.speed))
    this.position.x + this.margin >= this.pSize ? this.position.x = this.pSize - this.margin : null
    this.position.x - this.margin <= -this.pSize ? this.position.x = -this.pSize + this.margin : null
    this.position.z + this.margin >= this.pSize / this.pRatio ? this.position.z = this.pSize / this.pRatio - this.margin : null
    this.position.z - this.margin <= -this.pSize / this.pRatio ? this.position.z = -this.pSize / this.pRatio + this.margin : null

    this.rotation.y -=
      (PlayerManager.JOYSTICK_POSITION[this.user].x * deltaTime) / 200
    
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
  }
}
