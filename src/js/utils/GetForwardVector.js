
import { Vector3 } from 'three'
const direction = new Vector3()

export default function getForwardVector(object) {
  object.getWorldDirection(direction)
  direction.y = 0
  direction.normalize()
  return direction
}