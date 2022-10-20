import Potato from './components/Potato'
import AppManager from './AppManager'

class FoeManager {
  constructor(options) {}
  // GETTERS

  // PUBLIC
  setup() {
    this._foes = this._setPotatoes()
  }
  // PRIVATE
  _setPotatoes() {
    const maxFoes = 3
    let foes = []
    for (let i = 0; i < maxFoes; i++) {
      const newFoe = new Potato({ name: `potato${i + 1}` })
      foes.push(newFoe)
      AppManager.SCENE.add(newFoe.container)
    }
    return { foes }
  }
}

export default new FoeManager()
