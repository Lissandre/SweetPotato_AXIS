import { Object3D } from 'three'
import Assets from '@utils/Loader'
import gsap from 'gsap'

export default class Potato {
  constructor(options) {
    // Set up
    this.assets = Assets
    this.container = new Object3D()
    this.name = options.name
    this.container.name = `Potato ${this.name}`

    const min = 1
    const max = 3
    const randValue = Math.floor(Math.random() * (max - min + 1)) + min
    this.createPotato(randValue)
    this.setMovement()
  }
  createPotato(potatoType = 1) {
    this.potato =
      potatoType === 1
        ? this.assets.models.patate_1_V02.scene.clone()
        : potatoType === 2
        ? this.assets.models.patate_2.scene.clone()
        : potatoType === 3
        ? this.assets.models.patate_3.scene.clone()
        : this.assets.models.patate_1_V02.scene.clone()
    this.container.add(this.potato)
  }
  setMovement() {
    gsap.ticker.add((time, deltaTime) => {
      this.potato.rotation.x += 0.001 * deltaTime
      this.potato.rotation.y += 0.001 * deltaTime
      this.potato.rotation.z += 0.001 * deltaTime
    })
  }
}
