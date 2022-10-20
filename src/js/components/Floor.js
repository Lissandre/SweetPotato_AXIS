import { DoubleSide, Mesh, MeshStandardMaterial, Object3D, PlaneGeometry } from "three"

export default class Floor extends Object3D {
  constructor(options) {
    super()
    // Set up
    this.name = "Floor"
    this.setup()
  }
  // PUBLIC
  setup() {
    this._floor = this._setMesh()
    this.add(this._floor)
  }
  // PRIVATE
  _setMesh() {
    const floor = new Mesh(
      new PlaneGeometry(100, 100),
      new MeshStandardMaterial({
        color: 0xff00ff,
        side: DoubleSide,
      })
    )
    floor.rotation.x = Math.PI / 2
    floor.position.y = -1
    return floor
  }
}