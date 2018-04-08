phina.globalize();
import config from './config/config.js';
import assets from './config/assets.js';
import scenes from './config/scenes.js';
import parts from './config/parts.js';

for(let i in parts) {
  phina.define(parts[i].className, parts[i].class);
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
    fit: false
  });
  document.getElementById(config.DOM_ID).appendChild(game.domElement);
  game.run();
  game.update = () => {
    if(game.updater.app.keyboard.getKeyUp('0')) {
      config.DEV = !config.DEV;
    }
  }
});
