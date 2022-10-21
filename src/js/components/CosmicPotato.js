import { DoubleSide, Object3D } from "three"
import gsap from "gsap"
import PlayerManager from "@js/PlayerManager"
// import AppManager from "../AppManager"
import Assets from '@utils/Loader'

export default class CosmicPotato extends Object3D {
  constructor() {
    super()
    // Set up
    this.setup()
  }
  // PUBLIC
  setup() {
    this._potato = this._setMesh()
    this._animate()
    this.add(this._potato)
  }
  // PRIVATE
  _setMesh() {
    const potato = Assets.models.cosmic.scene.clone()
    // potato.position.z = -0.25
    return potato
  }
  _animate() {
    gsap.ticker.add(() => {
      this.position.copy(PlayerManager.ACTIVE_STARSHIP.position)
      this._potato.position.copy(PlayerManager.ACTIVE_STARSHIP.FOURCHETTE.position)
      this.rotation.y = PlayerManager.ACTIVE_STARSHIP.rotation.y
      // this.rotation.x = PlayerManager.ACTIVE_STARSHIP.starship.rotation.x
    })
  }
}