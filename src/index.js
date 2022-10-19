import '@style/style.styl'
import Assets from '@utils/Loader'
import AppManager from '@js/AppManager'

// LOADER TEMPLATE
const loader = `
<div class="loaderScreen">
  <div class="loaderScreen__progressBar">
    <div class="loaderScreen__progress"></div>
  </div>
  <h1 class="loaderScreen__load">0%</h1>
  <div class="loaderScreen__progressBar">
    <div class="loaderScreen__progress"></div>
  </div>
</div>
`
// SET TOOLS
const assets = Assets
assets.loads(loader)

// SET APP
assets.on('ressourcesReady', () => {
  AppManager.setup()
})