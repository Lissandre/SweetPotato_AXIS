import { Object3D } from 'three'
import Assets from '@utils/Loader'
import gsap from 'gsap'

export default class Starship {
  constructor(options) {
    // Set up
    this.assets = Assets
    this.container = new Object3D()
    this.container.name = 'Potato'

    this.createPotato('potato3')
    this.setMovement()
  }
  createPotato(potatoType = 'potato1') {
    this.potato =
      potatoType === 'potato1'
        ? this.assets.models.patate_1.scene.clone()
        : potatoType === 'potato2'
        ? this.assets.models.patate_2.scene.clone()
        : potatoType === 'potato3'
        ? this.assets.models.patate_3.scene.clone()
        : this.assets.models.patate_1.scene.clone()
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
