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
    this.status.term = BlurLabel({
      fill: '#FFF',
      fontSize: 15,
      lineHeight: 1.5,
      align: 'left',
      shadowBlur: 6,
      shadowColor: '#BD2',
      text: `Lv:\nAbduct:\nLost:`
    }).setOrigin(0.5, 0).setPosition(25, 10).addChildTo(this.status)
    this.status.value = BlurLabel({
      fill: '#FFF',
      fontSize: 15,
      lineHeight: 1.5,
      align: 'right',
      shadowBlur: 6,
      shadowColor: '#BD2'
    }).setOrigin(0.5, 0).setPosition(170, 10).addChildTo(this.status)
    this.onpointend = e => {
      state.pointer.x = e.pointer.x
      state.pointer.y = e.pointer.y
    }
  },
  update(app) {
    if(this.count > 0 && app.frame % this.stage.frame === 0) {
      const name = Math.randint(1, 100) < 90 ? 'cow' : 'wolf'
      Animal(name).addChildTo(this)
      this.count--
    }
    this.status.value.text = `${this.stage.name}\n${this.score} / ${this.max}\n${this.lost}`
  }
}
