import Axis from 'axis-api'
import Assets from '@utils/Loader'
import AppManager from './AppManager'

class InterfaceManager {
  constructor() {}
  // PUBLIC
  setup() {
    Assets.on('ressourcesReady', () => {
      this.init()
    })
    this._container = document.querySelector("#_container")
    this._input = document.querySelector("#_username")
  }
  init() {
    document.querySelector('#_start button').classList.remove('hidden')
    this._setEvents()
  }
  showInput() {
    this._container.classList.add("active")
    this._input.classList.add("active")
  }
  hideInput() {
    this._container.classList.remove("active")
    this._input.classList.remove("active")
  }
  // PRIVATE
  _setEvents() {
    function hideStart() {
      Axis.removeEventListener("keyup", hideStart)
      document.querySelector('button').removeEventListener("click", hideStart)
      document.querySelector("#_start").remove()
      AppManager.setup()
    }
    document.querySelector('button').addEventListener("click", hideStart)
    Axis.addEventListener("keyup", hideStart)
  }
}

export default new InterfaceManager()