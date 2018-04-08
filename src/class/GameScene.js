phina.globalize();
import config from '../config/config.js'
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option)
    this.backgroundColor = '#111'
    this.player = Player()
                    .setPosition(200, 100)
                    .addChildTo(this)
    l(this)
  },
  update(app) {
    if(app.frame % 30 === 0) {
      if(Math.randint(1, 1) === 1) {
        Animal().addChildTo(this)
      }
    }
  }
}
