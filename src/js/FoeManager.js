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
    this._foes = this.setFoes(15)
  }
  reset() { 
    this._foes.forEach((foe) => {
      AppManager.SCENE.remove(foe)
    })
    this._foes = []
    this._foesNumber = 0
    this._lastFoesNumber = 0
    this._foesNumberHasChanged = false
  }
  setFoesNumber(foesNumber) {
    this._lastFoesNumber = this._foesNumber
    this._foesNumber = foesNumber
    this._foesNumberHasChanged = true
    return this._foesNumber
  }
  animate(time, deltaTime) {
    this._foes.forEach((foe) => {
      // console.log(foe);
      foe.update(time, deltaTime)
    })
  }
  setduration(duration) {
    this._foes.forEach((foe) => {
      // console.log(foe);
      foe.setDuration(duration)
    })
  }
  update() {
    if (this._foesNumberHasChanged === true) {
      this.setFoes(this.foesNumber - this._lastFoesNumber)
      this._foesNumberHasChanged = false
    }
  }
  // PRIVATE
  setFoes(foesNumberToInit) {
    // console.log('ok');
    for (let i = 0; i < foesNumberToInit; i++) {
      const min = 0
      const max = 50
      const randomX =
        Math.random() % 2
          ? Math.floor(Math.random() * (max - min + 1)) + min
          : -Math.floor(Math.random() * (max - min + 1)) + min
      const randomZ =
        Math.random() % 2
          ? Math.floor(Math.random() * (max - min + 1)) + min
          : -Math.floor(Math.random() * (max - min + 1)) + min

      const foeId = this._foes.length + 1
      const newFoe = new Potato({ name: `potato${foeId}` })
      newFoe.position.set(randomX, 0, randomZ)
      this._foes.push(newFoe)
      AppManager.SCENE.add(newFoe)
      this._incrementFoesNumber()
    }
    const foes = this._foes
    return foes
  }
  _incrementFoesNumber() {
    this.setFoesNumber(this._foesNumber + 1)
    return this._foesNumber
  }
}

export default new FoeManager()
