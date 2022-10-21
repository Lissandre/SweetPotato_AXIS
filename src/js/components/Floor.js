import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  NearestFilter,
  Object3D,
  PlaneGeometry,
  RepeatWrapping,
  sRGBEncoding,
  TextureLoader,
} from 'three'
import Assets from '@utils/Loader'
import gsap from 'gsap'
import PlayerManager from '../PlayerManager'

export default class Floor extends Object3D {
  constructor(options) {
    super()
    // Set up
    this.name = 'Floor'
    this.setup()
  }
  // PUBLIC
  setup() {
    this._floor = this._setFloor()
    this._layerStars = this._setLayerStars()
    this._setMovementFloor()
    this._setMovementLayerStars()
    this.add(this._floor, this._layerStars)
  }
  // PRIVATE
  _setFloor() {
    Assets.textures.background.encoding = sRGBEncoding
    Assets.textures.background.wrapS = RepeatWrapping
    Assets.textures.background.wrapT = RepeatWrapping

    const floor = new Mesh(
      new PlaneGeometry(100, 100),
      new MeshBasicMaterial({
        color: 0xff8844,
        map: Assets.textures.background,
        side: DoubleSide,
      })
    )
    floor.rotation.x = Math.PI / 2
    floor.position.y = -1

    return floor
  }
  _setMovementFloor() {
    gsap.ticker.add((time, deltaTime) => {
      const scrollOffsetFloor = () => {
        const speedFloorOffset = { x: 0.00001, y: 0.0001 }
        Assets.textures.background.offset.x += speedFloorOffset.x * deltaTime
        // Assets.textures.background.offset.y += speedFloorOffset.y * deltaTime
      }
      scrollOffsetFloor()
    })
  }
  _setLayerStars() {
    Assets.textures.stars.encoding = sRGBEncoding
    Assets.textures.stars.wrapS = RepeatWrapping
    Assets.textures.stars.wrapT = RepeatWrapping

    const layerStars = new Mesh(
      new PlaneGeometry(100, 100),
      new MeshBasicMaterial({
        color: 0xff8844,
        map: Assets.textures.stars,
        side: DoubleSide,
        transparent: true,
        opacity: 0.7,
      })
    )

    layerStars.rotation.x = Math.PI / 2
    layerStars.position.y = -0.8

    return layerStars
  }
  _setMovementLayerStars() {
    gsap.ticker.add((time, deltaTime) => {
      //add sin opacity
      //add rotate

      const scrollOffsetLayerStars = () => {
        if (PlayerManager.JOYSTICK_POSITION.player1.y > 0.5) {
          // hard speed
          const speedPlayerStarsOffset = { x: 0.0001, y: 0.0003 }
          Assets.textures.stars.offset.x +=
            PlayerManager.JOYSTICK_POSITION.player1.x *
            speedPlayerStarsOffset.x *
            deltaTime
          Assets.textures.stars.offset.y +=
            PlayerManager.JOYSTICK_POSITION.player1.y *
            speedPlayerStarsOffset.y *
            deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y > 0) {
          // medium speed
          const speedPlayerStarsOffset = { x: 0.0001, y: 0.00025 }
          Assets.textures.stars.offset.x +=
            PlayerManager.JOYSTICK_POSITION.player1.x *
            speedPlayerStarsOffset.x *
            deltaTime
          Assets.textures.stars.offset.y +=
            PlayerManager.JOYSTICK_POSITION.player1.y *
            speedPlayerStarsOffset.y *
            deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y === 0) {
          // normal speed
          const speedStarsOffset = { x: 0.00001, y: 0.00009 }
          Assets.textures.stars.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars.offset.y += speedStarsOffset.y * deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y < 0) {
          // medium slow mo speed
          const speedStarsOffset = { x: 0.00003, y: 0.00003 }
          Assets.textures.stars.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars.offset.y += speedStarsOffset.y * deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y < -0.5) {
          // hard slow mo speed
          const speedStarsOffset = { x: 0.00001, y: 0.00001 }
          Assets.textures.stars.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars.offset.y += speedStarsOffset.y * deltaTime
        }
      }
      scrollOffsetLayerStars()
    })
  }
}
