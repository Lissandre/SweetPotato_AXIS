import { Object3D, Vector3 } from 'three'
import Assets from '@utils/Loader'
import gsap from 'gsap'
import PlayerManager from '../PlayerManager'
import getForwardVector from '@utils/GetForwardVector'
import { createNoise3D } from 'simplex-noise'

export default class Potato extends Object3D {
  constructor(options) {
    super()
    this.name = `Potato ${options.name}`
    this.speed = 0.85

    const min = 1
    const max = 3
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min
    this.createPotato(randomValue)
  }
  createPotato(potatoType = 1) {
    const potato =
      potatoType === 1
        ? Assets.models.patate_1_V02.scene.clone()
        : potatoType === 2
        ? Assets.models.patate_2.scene.clone()
        : potatoType === 3
        ? Assets.models.patate_3.scene.clone()
        : Assets.models.patate_1_V02.scene.clone()
    this.add(potato)
    return potato
  }
  update(time, deltaTime) {
    const potatoPosition = this.position
    const targetPosition = PlayerManager.COSMIC_POTATO_POSITION.position

    const xNoise3d = createNoise3D()
    const xNoiseValue = xNoise3d(
      targetPosition.x,
      targetPosition.y,
      targetPosition.z
    )

    const zNoise3d = createNoise3D()
    const zNoiseValue = zNoise3d(
      targetPosition.x,
      targetPosition.y,
      targetPosition.z
    )

    gsap.to(potatoPosition, {
      x:
        targetPosition.x > 0
          ? Math.abs(targetPosition.x)
          : -Math.abs(targetPosition.x),
      duration: Math.random() % 2 ? 2.9 : 4.9,
      ease: 'power.in',
    })
    gsap.to(potatoPosition, {
      z:
        targetPosition.z > 0
          ? Math.abs(targetPosition.z)
          : -Math.abs(targetPosition.z),
      duration: Math.random() % 2 ? 2.6 : 7,
      ease: 'power.in',
    })

    this.speed *= Math.random() % 2 ? 0.3 * xNoiseValue : 2 * xNoiseValue

    potatoPosition.add(
      getForwardVector(this).multiplyScalar(
        (potatoPosition.x + xNoiseValue * deltaTime) / 300 - this.speed
      )
    )

    potatoPosition.add(
      getForwardVector(this).multiplyScalar(
        (potatoPosition.y * deltaTime) / 300 - this.speed
      )
    )

    potatoPosition.add(
      getForwardVector(this).multiplyScalar(
        (potatoPosition.z + zNoiseValue * deltaTime) / 300 - this.speed
      )
    )
  }
}
