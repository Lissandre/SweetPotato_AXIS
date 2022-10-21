import Potato from './components/Potato'
import AppManager from './AppManager'
import gsap from 'gsap'

class FoeManager {
  constructor(options) {
    this._foes = []
    this._foesNumber = 0
    this._lastFoesNumber = 0
    this._foesNumberHasChanged = false
  }
  // GETTERS
  // PUBLIC
  setup() {
    this._foes = this._setFoes(3)
  }
  setFoesNumber(foesNumber) {
    this._lastFoesNumber = this._foesNumber
    this._foesNumber = foesNumber
    this._foesNumberHasChanged = true
    return this._foesNumber
  }
  update() {
    if (this._foesNumberHasChanged === true) {
      this._setFoes(this.foesNumber - this._lastFoesNumber)
      this._foesNumberHasChanged = false
    }
  }
  // PRIVATE
  _setFoes(foesNumberToInit) {
    for (let i = 0; i < foesNumberToInit; i++) {
      const foeId = this._foes.length + 1
      const newFoe = new Potato({ name: `potato${foeId}` })
      newFoe.position.set(-100, 0, 0)
      newFoe.position.set(100, 0, 0)
      this._foes.push(newFoe)
      AppManager.SCENE.add(newFoe)
      this._incrementFoesNumber()
    }
    const foes = this._foes
    return { foes }
  }
  _incrementFoesNumber() {
    this.setFoesNumber(this._foesNumber + 1)
    return this._foesNumber
  }
}

export default new FoeManager()
