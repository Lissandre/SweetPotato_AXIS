import Axis from "axis-api"
import gsap from "gsap"

class LeaderboardManager {
  constructor() {
    this._input = document.querySelector("#username")
    this.username = ''
    this._score = 0
  }
  // SETTERS
  set SCORE(score) {
    this._score = score
  }
  // GETTERS
  get LEADERBOARD() {
    return this._leaderboard
  }
  get SCORES() {
    return this._getScores()
  }
  get BEST_SCORE() {
    return this._getBestScore()
  }
  get SCORE() {
    return this._score
  }
  // PUBLIC
  setup() {
    this._leaderboard = this._setLeaderboard()
    this._setEvents()
  }
  setUsernameAndScore() {
    this._openKeyboard()
  }
  setTimer() {
    gsap.ticker.add((time) => {this._incrementScore(time)})
  }
  // PRIVATE
  _incrementScore(time) {
    this._score = (time * 10).toFixed(0)
  }
  _setEvents() {
    Axis.virtualKeyboard.addEventListener("input", (username) => { this._input.value = username })
    Axis.virtualKeyboard.addEventListener("validate", (username) => { this._saveUsername(username) })
  }
  _openKeyboard() {
    Axis.virtualKeyboard.open()
  }
  _saveUsername(username) {
    Axis.virtualKeyboard.close()
    this._username = username
    this._postScore(this._username, this._score)
  }
  _getScores() {
    let scores
    this._leaderboard.getScores().then((response) => {
      scores = response
    })
    return scores
  }
  _getBestScore() {
    let score
    this._leaderboard.getScores().then((response) => {
      score = response[0]
    })
    return score
  }
  _setLeaderboard() {
    const leaderboard = Axis.createLeaderboard({
      id: 'Keep-The-Patate-fecb4c10-14b0-4783-accb-bac8b1ca15a1',
    })
    return leaderboard
  }
  _postScore(username, score) {
    this._leaderboard
      .postScore({
        username: username,
        value: score,
      })
      .then(() => {
        return this._getScores()
      })
      .catch((error) => {
        return error
      })
  }
}

export default new LeaderboardManager()