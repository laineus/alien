import config from './config/config'
import assets from './config/assets'
import scenes from './config/scenes'
import parts from './config/parts'

for(let i in parts) {
  phina.define(parts[i].className, parts[i].class)
}
phina.main(() => {
  const game = GameApp({
    title: config.GAME_TITLE,
    width: config.SCREEN_WIDTH,
    height: config.SCREEN_HEIGHT,
    startLabel: scenes[0].label,
    scenes: scenes,
    assets: assets,
    fps: config.FPS,
    fit: FIT
  })
  document.getElementById(config.DOM_ID).appendChild(game.domElement)
  game.run()
})
