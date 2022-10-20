import { Object3D, Vector3 } from 'three'
import Assets from '@utils/Loader'
import gsap from 'gsap'
import PlayerManager from '../PlayerManager'
import getForwardVector from '@utils/GetForwardVector'

export default class Potato extends Object3D {
  constructor(options) {
    super()
    this.name = `Potato ${options.name}`
    this.speed = 1

    const min = 1
    const max = 3
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min
    this.createPotato(randomValue)
    this.setMovement()
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
  setMovement() {
    gsap.ticker.add((time, deltaTime) => {
      const targetPosition = PlayerManager.COSMIC_POTATO_POSITION.position
      const potatoPosition = this.position

      gsap.to(potatoPosition, {
        x:
          targetPosition.x > 0
            ? Math.abs(targetPosition.x)
            : -Math.abs(targetPosition.x),
        duration: 0.7,
        ease: 'power.in',
      })
      gsap.to(potatoPosition, {
        z:
          targetPosition.z > 0
            ? Math.abs(targetPosition.z)
            : -Math.abs(targetPosition.z),
        duration: 0.3,
        ease: 'power.in',
      })

      this.position.add(
        getForwardVector(this).multiplyScalar(
          ((potatoPosition.x * deltaTime) / 300) * this.speed
        )
      )

      this.position.add(
        getForwardVector(this).multiplyScalar(
          ((potatoPosition.y * deltaTime) / 300) * this.speed
        )
      )

      //   const minRand = 0
      //   const maxRand = 100
      //   const randValue =
      //     Math.floor(Math.random() * (maxRand - minRand + 1)) + minRand
      //   const chanceOfNotFailDirection = randValue < 85 ? true : false

      //   this.rotation.y -= (targetPosition.x * deltaTime) / 200
    })
  }
}
