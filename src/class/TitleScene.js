phina.globalize();
import config from '../config/config.js';
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option);
    this.backgroundColor = '#111';

    // const bg = Sprite('title', 960, 540).setOrigin(0, 0).addChildTo(this);

    const blurlabel = BlurLabel({
      text: 'Alien Abduction',
      fontFamily: 'ome',
      fill: '#FFF',
      fontSize: 32,
      shadowBlur: 6,
      shadowColor: '#BD2'
    }).addChildTo(this).setPosition(480, 180).setOrigin(0.5, 0.5);
  },
  update(app) {
    if(app.keyboard.getKeyUp(config.KEY_ACTION)) {
      this.exit('Game');
    }
  }
};
