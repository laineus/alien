phina.globalize();
import config from '../config/config.js'
import state from '../config/state.js'
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option)
    this.backgroundColor = '#111'
    this.bg = Sprite('bg').setOrigin(0, 0).addChildTo(this)
    this.player = Player().addChildTo(this)
    this.stage = config.STAGE[state.stageIndex]
    this.max = 60 * 30 / this.stage.frame
    this.count = this.max
    this.score = 0
    this.lost = 0
    this.status = RectangleShape({
        width: 180,
        height: 85,
        fill: 'rgba(0, 0, 0, 0.5)',
        strokeWidth: 0
      })
      .setOrigin(0, 0)
      .setPosition(20, 20)
      .addChildTo(this)
    this.status.cornerRadius = 5
    this.status.label = Label({
      fill: '#BD2',
      fontSize: 15,
      lineHeight: 1.5,
      align: 'left'
    }).setOrigin(0.5, 0).setPosition(25, 10).addChildTo(this.status)
  },
  update(app) {
    if(this.count > 0 && app.frame % this.stage.frame === 0) {
      const name = Math.randint(1, 100) < 90 ? 'cow' : 'wolf'
      Animal(name).addChildTo(this)
      this.count--
    }
    this.status.label.text = `Lv: ${this.stage.name}
Abducts: ${this.score} / ${this.max}
Lost: ${this.lost}`
  }
}
