import Axis from 'axis-api'
import Assets from '@utils/Loader'
import AppManager from './AppManager'
import LeaderboardManager from './LeaderboardManager'
import gsap from 'gsap'

class InterfaceManager {
  constructor() {}
  // GETTERS
  get CURRENT_SCORE() {
    return this._currentScore
  }
  // PUBLIC
  setup() {
    Assets.on('ressourcesReady', () => {
      this.init()
      AppManager.setup()
    })
    this._container = document.querySelector("#_container")
    this._input = document.querySelector("#_username")
    this._endGame = document.querySelector("#_scores")
    this._teaser = document.querySelector("#_teaser")
    this._currentScore = document.querySelector(".currentScore")
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
  setScore() {
    // console.log(LeaderboardManager.SCORE);
    if(this._currentScore.innerText != LeaderboardManager.SCORE) {
      this._currentScore.innerText = LeaderboardManager.SCORE
    }
  }
  update() {
    this.setScore()
  }
  // PRIVATE
  _setEvents() {
    function startTimer() {
      AppManager.setUpdate()
      Axis.removeEventListener("keydown", startTimer)
      Axis.removeEventListener("joystick:move", startTimer)
    }
    function hideStart() {
      Axis.removeEventListener("keyup", hideStart)
      document.querySelector('button').removeEventListener("click", hideStart)
      document.querySelector("#_start").remove()
      document.querySelector('video').play()
    }
    document.querySelector('button').addEventListener("click", hideStart)
    document.querySelector('video').addEventListener('ended', () => {
      this._teaser.classList.add('hidden')
      // setTimeout(() => {
        AppManager.init()
        Axis.addEventListener("keydown", startTimer)
        Axis.addEventListener("joystick:move", startTimer)
      // }, 1000)
    }, {once: true})
    Axis.addEventListener("keyup", hideStart)
  }
}

export default new InterfaceManager()