import {
  DoubleSide,
  Mesh,
  MeshBasicMaterial,
  Object3D,
  PlaneGeometry,
  RepeatWrapping,
  sRGBEncoding,
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
    this._layerStars1 = this._setLayerStars1()
    this._layerStars2 = this._setLayerStars2()
    this._setMovementFloor()
    this._setMovementLayerStars1()
    this._setMovementLayerStars2()
    this.add(this._floor, this._layerStars1, this._layerStars2)
  }
  // PRIVATE
  _setFloor() {
    Assets.textures.background.encoding = sRGBEncoding
    Assets.textures.background.wrapS = RepeatWrapping
    Assets.textures.background.wrapT = RepeatWrapping

    const floor = new Mesh(
      new PlaneGeometry(100, 100),
      new MeshBasicMaterial({
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
  _setLayerStars1() {
    Assets.textures.stars1.encoding = sRGBEncoding
    Assets.textures.stars1.wrapS = RepeatWrapping
    Assets.textures.stars1.wrapT = RepeatWrapping

    const layerStars1 = new Mesh(
      new PlaneGeometry(100, 100),
      new MeshBasicMaterial({
        map: Assets.textures.stars1,
        side: DoubleSide,
        transparent: true,
      })
    )

    layerStars1.rotation.x = Math.PI / 2
    layerStars1.position.y = -0.8

    return layerStars1
  }
  _setMovementLayerStars1() {
    gsap.ticker.add((time, deltaTime) => {
      //add sin opacity
      //add rotate

      const scrollOffsetLayerStars1 = () => {
        if (PlayerManager.JOYSTICK_POSITION.player1.y > 0.5) {
          // hard speed
          const speedPlayerStarsOffset = { x: 0.00005, y: 0.000055 }
          Assets.textures.stars1.offset.x +=
            PlayerManager.JOYSTICK_POSITION.player1.x *
            speedPlayerStarsOffset.x *
            deltaTime
          Assets.textures.stars1.offset.y -=
            PlayerManager.JOYSTICK_POSITION.player1.y *
            speedPlayerStarsOffset.y *
            deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y > 0) {
          // medium speed
          const speedPlayerStarsOffset = { x: 0.00004, y: 0.0000035 }
          Assets.textures.stars1.offset.x +=
            PlayerManager.JOYSTICK_POSITION.player1.x *
            speedPlayerStarsOffset.x *
            deltaTime
          Assets.textures.stars1.offset.y -=
            PlayerManager.JOYSTICK_POSITION.player1.y *
            speedPlayerStarsOffset.y *
            deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y === 0) {
          // normal speed
          const speedStarsOffset = { x: 0.000004, y: 0.000001 }
          Assets.textures.stars1.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars1.offset.y -= speedStarsOffset.y * deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y < 0) {
          // medium slow mo speed
          const speedStarsOffset = { x: 0.00003, y: 0.00003 }
          Assets.textures.stars1.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars1.offset.y -= speedStarsOffset.y * deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y < -0.5) {
          // hard slow mo speed
          const speedStarsOffset = { x: 0.00001, y: 0.00001 }
          Assets.textures.stars1.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars1.offset.y -= speedStarsOffset.y * deltaTime
        }
      }
      scrollOffsetLayerStars1()
    })
  }
  _setLayerStars2() {
    Assets.textures.stars2.encoding = sRGBEncoding
    Assets.textures.stars2.wrapS = RepeatWrapping
    Assets.textures.stars2.wrapT = RepeatWrapping

    const layerStars2 = new Mesh(
      new PlaneGeometry(100, 100),
      new MeshBasicMaterial({
        map: Assets.textures.stars2,
        side: DoubleSide,
        transparent: true,
      })
    )

    layerStars2.rotation.x = Math.PI / 2
    layerStars2.position.y = -0.5

    return layerStars2
  }
  _setMovementLayerStars2() {
    gsap.ticker.add((time, deltaTime) => {
      //add sin opacity
      //add rotate

      const scrollOffsetLayerStars2 = () => {
        if (PlayerManager.JOYSTICK_POSITION.player1.y > 0.5) {
          // hard speed
          const speedPlayerStarsOffset = { x: 0.00004, y: 0.000045 }
          Assets.textures.stars2.offset.x +=
            PlayerManager.JOYSTICK_POSITION.player1.x *
            speedPlayerStarsOffset.x *
            deltaTime
          Assets.textures.stars2.offset.y -=
            PlayerManager.JOYSTICK_POSITION.player1.y *
            speedPlayerStarsOffset.y *
            deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y > 0) {
          // medium speed
          const speedPlayerStarsOffset = { x: 0.00002, y: 0.0000025 }
          Assets.textures.stars2.offset.x +=
            PlayerManager.JOYSTICK_POSITION.player1.x *
            speedPlayerStarsOffset.x *
            deltaTime
          Assets.textures.stars2.offset.y -=
            PlayerManager.JOYSTICK_POSITION.player1.y *
            speedPlayerStarsOffset.y *
            deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y === 0) {
          // normal speed
          const speedStarsOffset = { x: 0.000001, y: 0.000009 }
          Assets.textures.stars2.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars2.offset.y -= speedStarsOffset.y * deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y < 0) {
          // medium slow mo speed
          const speedStarsOffset = { x: 0.000003, y: 0.000003 }
          Assets.textures.stars2.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars2.offset.y -= speedStarsOffset.y * deltaTime
        } else if (PlayerManager.JOYSTICK_POSITION.player1.y < -0.5) {
          // hard slow mo speed
          const speedStarsOffset = { x: 0.000001, y: 0.000001 }
          Assets.textures.stars2.offset.x += speedStarsOffset.x * deltaTime
          Assets.textures.stars2.offset.y -= speedStarsOffset.y * deltaTime
        }
      }
      scrollOffsetLayerStars2()
    })
  }
}
