import Axis from 'axis-api'
import Assets from '@utils/Loader'
import AppManager from './AppManager'
import LeaderboardManager from './LeaderboardManager'

class InterfaceManager {
  constructor() {}
  // PUBLIC
  setup() {
    Assets.on('ressourcesReady', () => {
      this.init()
    })
    this._container = document.querySelector("#_container")
    this._input = document.querySelector("#_username")
    this._endGame = document.querySelector("#_scores")
  }
  init() {
    document.querySelector('#_start button').classList.remove('hidden')
    this._setEvents()
  }
  setScores() {
    this._endGame.classList.remove("hidden")
    this._endGame.querySelector('.best span').innerHTML = LeaderboardManager.SCORE
    this._endGame.querySelector('.now span').innerHTML = LeaderboardManager.BEST_SCORE
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