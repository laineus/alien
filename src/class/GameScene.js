phina.globalize();
import config from '../config/config.js'
const STAGE = [
  { lv: 1, name: 'EASY', frame: 30 },
  { lv: 2, name: 'NORMAL', frame: 20 },
  { lv: 3, name: 'HARD', frame: 10 }
]
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option)
    this.backgroundColor = '#111'
    this.bg = Sprite('bg').setOrigin(0, 0).addChildTo(this)
    this.player = Player().setPosition(200, 100).addChildTo(this)
    this.stage = STAGE[2]
    this.max = 60 * 30 / this.stage.frame
    this.count = this.max
    this.score = 0
    this.lost = 0
    this.scoreLabel = Label({
      fill: '#BD2',
      fontSize: 16,
      align: 'left'
    }).setOrigin(0.5, 0).setPosition(25, 20).addChildTo(this)
  },
  update(app) {
    if(this.count > 0 && app.frame % this.stage.frame === 0) {
      const name = Math.randint(1, 100) < 90 ? 'cow' : 'wolf'
      Animal(name).addChildTo(this)
      this.count--
    }
    this.scoreLabel.text = `Lv: ${this.stage.lv}
Abducts: ${this.score} / ${this.max}
Lost: ${this.lost}`
  }
}
