class InterfaceManager {
  constructor() {}
  // PUBLIC
  setup() {
    this._container = document.querySelector("#_container")
    this._input = document.querySelector("#_username")
  }
  showInput() {
    this._container.classList.add("active")
    this._input.classList.add("active")

  }
  hideInput() {
    this._container.classList.remove("active")
    this._input.classList.remove("active")
  }
}

export default new InterfaceManager()