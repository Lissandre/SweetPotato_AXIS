import Axis from "axis-api"

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
  // PUBLIC
  setup() {
    this._leaderboard = this._setLeaderboard()
    this._setEvents()
  }
  setUsernameAndScore() {
    this._openKeyboard()
  }
  // PRIVATE
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
  _setLeaderboard() {
    const leaderboard = Axis.createLeaderboard({
      id: process.env.ID,
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