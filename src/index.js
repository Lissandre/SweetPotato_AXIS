import '@style/style.styl'
import Assets from '@utils/Loader'
import InterfaceManager from './js/InterfaceManager'

// LOADER TEMPLATE
const loader = `
<div class="loaderScreen">
  <div class="loaderScreen__progressBar">
    <div class="loaderScreen__progress"></div>
  </div>
  <h1 class="loaderScreen__load">0</h1>
</div>
`
// SET TOOLS
const assets = Assets
assets.loads(loader)

// SET APP
InterfaceManager.setup()