import { BoxGeometry, Mesh, MeshBasicMaterial, Object3D } from 'three'
import gsap from 'gsap'

export default class Cube {
  constructor(options) {
    // Options
    this.assets = options.assets

    // Set up
    this.container = new Object3D()
    this.container.name = 'Cube'

    this.createCube()
    gsap.ticker.add((time, deltaTime) => {this.setMovement(time, deltaTime)})
  }
  createCube() {
    this.cube = new Mesh(new BoxGeometry(1, 1, 1), new MeshBasicMaterial({ color: 0xff0000 }))
    this.container.add(this.cube)
  }
  setMovement(time, deltaTime) {
    this.cube.rotation.y += 0.001 * deltaTime
  }
}
