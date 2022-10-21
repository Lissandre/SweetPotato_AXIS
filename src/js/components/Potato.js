import { Object3D, Vector3 } from 'three'
import Assets from '@utils/Loader'
import gsap from 'gsap'
import PlayerManager from '../PlayerManager'
import getForwardVector from '@utils/GetForwardVector'
import { createNoise3D } from 'simplex-noise'
import AppManager from '../AppManager'
import InterfaceManager from '../InterfaceManager'

export default class Potato extends Object3D {
  constructor(options) {
    super()
    this.name = `Potato ${options.name}`
    this.speed = 1.1
    this.duration = 1

    const min = 1
    const max = 3
    const randomValue = Math.floor(Math.random() * (max - min + 1)) + min
    this.createPotato(randomValue)
  }
  setDuration(duration) {
    this.duration = duration
  }
  createPotato(potatoType = 1) {
    this.zNoise3d = createNoise3D()
    this.xNoise3d = createNoise3D()

    const potato =
      potatoType === 1
        ? Assets.models.patate_1.scene.clone()
        : potatoType === 2
        ? Assets.models.patate_2.scene.clone()
        :  Assets.models.patate_3.scene.clone()
    this.add(potato)
    return potato
  }
  update(time, deltaTime) {
    const potatoPosition = this.position
    const targetPosition = PlayerManager.COSMIC_POTATO_POSITION.position

    const xNoiseValue = this.xNoise3d(
      time * 0.1,
      time,
      time * 0.3
    )

    const zNoiseValue = this.zNoise3d(
      time * 0.3,
      time * 0.1,
      time
    )

    gsap.to(potatoPosition, {
      x:
        targetPosition.x > 0
          ? Math.abs(targetPosition.x + xNoiseValue * 4)
          : -Math.abs(targetPosition.x + xNoiseValue * 4),
      duration: this.duration,
      ease: 'power.in',
    })
    gsap.to(potatoPosition, {
      z:
        targetPosition.z > 0
          ? Math.abs(targetPosition.z + zNoiseValue * 4)
          : -Math.abs(targetPosition.z + zNoiseValue * 4),
      duration: 1,
      ease: 'power.in',
    })
    gsap.to(potatoPosition, {
      y: Math.abs(zNoiseValue * 7),
      duration: this.duration,
      ease: 'power.in',
    })

    this.speed *= Math.random() % 2 ? 1 * xNoiseValue : 2 * xNoiseValue

    // console.log(potatoPosition, targetPosition);
    // console.log(potatoPosition.distanceTo(targetPosition));
    if ((Math.abs(targetPosition.x - potatoPosition.x) < 0.1) && (Math.abs(targetPosition.z - potatoPosition.z) < 0.1) && !AppManager.IS_GAME_OVER) {
      this.lost = true
      AppManager.removeUpdate()
      InterfaceManager.setScores()
    }

    // potatoPosition.add(
    //   getForwardVector(this).multiplyScalar(
    //     (potatoPosition.x + xNoiseValue * time) - this.speed
    //   )
    // )

    // potatoPosition.add(
    //   getForwardVector(this).multiplyScalar(
    //     (potatoPosition.y * time) - this.speed
    //   )
    // )

    // potatoPosition.add(
    //   getForwardVector(this).multiplyScalar(
    //     (potatoPosition.z + zNoiseValue * time) - this.speed
    //   )
    // )
  }
}
