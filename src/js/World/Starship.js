import { TorusKnotGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three'
import gsap from 'gsap'

export default class Starship {
  constructor(options) {
    // Options
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Starship'

    this.createStarship()
    gsap.ticker.add((time, deltaTime) => {
      this.setMovement(time, deltaTime)
    })
  }
  createStarship() {
    // Replace  torus by future model
    this.starship = new Mesh(
      new TorusKnotGeometry(0.75, 1, 60, 6),
      new MeshBasicMaterial({ color: 0xff0000 })
    )
    this.container.add(this.starship)
  }
  setMovement(time, deltaTime) {
    this.starship.rotation.y += 0.001 * deltaTime
  }
}
