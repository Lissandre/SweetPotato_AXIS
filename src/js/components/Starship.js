import { Object3D } from 'three'
import Assets from '@utils/Loader'
// import gsap from 'gsap'

export default class Starship {
  constructor(options) {
    // Set up
    this.assets = Assets
    this.container = new Object3D()
    this.container.name = 'Starship'

    this.createStarship()
    // gsap.ticker.add((time, deltaTime) => {
    //   this.setMovement(time, deltaTime)
    // })
  }
  createStarship() {
    this.starship = this.assets.models.ship.scene.clone()
    this.container.add(this.starship)
  }
  setMovement(time, deltaTime) {
    this.starship.rotation.y += 0.001 * deltaTime
  }
}
