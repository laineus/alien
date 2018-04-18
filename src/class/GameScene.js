phina.globalize()
import config from '../config/config'
import state from '../config/state'
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option)
    this.backgroundColor = '#111'
    this.bg = Sprite('bg').setOrigin(0, 0).addChildTo(this)
    this.enemies = DisplayElement().addChildTo(this)
    this.player = Player().addChildTo(this)
    this.stage = config.STAGE[state.stageIndex]
    this.max = 60 * 30 / this.stage.frame
    this.count = this.max
    this.score = 0
    this.lost = 0
    this.clear = false
    setTimeout(() => {
      this.onpointend = e => {
        state.pointer.x = e.pointer.x
        state.pointer.y = e.pointer.y < 180 ? 180 : e.pointer.y
      }
    }, 100)
    this.setSystemGraphics()
  },
  update(app) {
    if(this.count > 0 && app.frame % this.stage.frame === 0) {
      const name = Math.randint(1, 100) < 90 ? 'cow' : 'sheep'
      Animal(name).addChildTo(this.enemies)
      this.count--
    }
    this.status.value.text = `${this.stage.name}\n${this.score} / ${this.max}\n${this.lost}`
    if(!this.clear && (this.score + this.lost) === this.max) {
      this.gameOver()
    }
  },
  gameOver() {
    const result = this.lost === 0
    if(result && !state.cleared.includes(state.stageIndex)) {
      state.cleared.push(state.stageIndex)
    }
    this.blackBg.show()
    this.blackBg.label.text = result ? 'Mission Completed !' : 'Mission Failed...'
    this.blackBg.tweener.to({
      alpha: 1
    }, 1000)
    this.status.tweener.to({
      x: config.SCREEN_WIDTH_C,
      y: config.SCREEN_HEIGHT_C - 20
    }, 500)
    this.clear = true
  },
  setSystemGraphics () {
    // game over ui
    this.blackBg = RectangleShape({
      width: config.SCREEN_WIDTH,
      height: config.SCREEN_HEIGHT,
      fill: 'rgba(0, 0, 0, 0.5)',
      strokeWidth: 0
    }).addChildTo(this).setOrigin(0.5, 0.5).setPosition(config.SCREEN_WIDTH_C, config.SCREEN_HEIGHT_C)
    this.blackBg.alpha = 0
    this.blackBg.hide()
    this.blackBg.label = BlurLabel({
      text: '',
      fontFamily: 'aldrich',
      fill: '#FFF',
      fontSize: 36,
      shadowBlur: 6,
      shadowColor: '#BD2'
    }).addChildTo(this.blackBg).setOrigin(0.5, 0.5).setPosition(0, -120)
    this.blackBg.button = Button({
      text: '',
      width: 240,
      height: 36,
      fill: 'rgba(0, 0, 0, 0.5)',
      strokeWidth: 0,
      fontSize: 18,
      fontFamily: 'aldrich'
    }).addChildTo(this.blackBg).setOrigin(0.5, 0.5).setPosition(0, 80)
    this.blackBg.button.cornerRadius = 5
    this.blackBg.button.label = BlurLabel({
      text: 'Back To Title',
      fontFamily: 'aldrich',
      fill: '#BD2',
      fontSize: 18,
      shadowBlur: 6,
      shadowColor: '#BD2'
    }).addChildTo(this.blackBg.button).setOrigin(0.5, 0.5)
    this.blackBg.button.onpointover = () => this.blackBg.button.fill = 'rgba(0, 0, 0, 0.8)'
    this.blackBg.button.onpointout = () => this.blackBg.button.fill = 'rgba(0, 0, 0, 0.5)'
    this.blackBg.button.onpointend = () => this.exit('Title')
    // status ui
    this.status = RectangleShape({
      width: 180,
      height: 85,
      fill: 'rgba(0, 0, 0, 0.5)',
      strokeWidth: 0
    }).addChildTo(this).setOrigin(0.5, 0.5).setPosition(110, 62)
    this.status.cornerRadius = 5
    this.status.term = BlurLabel({
      fill: '#FFF',
      fontSize: 15,
      lineHeight: 1.5,
      align: 'left',
      shadowBlur: 6,
      shadowColor: '#BD2',
      text: `Lv:\nAbduct:\nLost:`
    }).addChildTo(this.status).setOrigin(0.5, 0.5).setPosition(-75, 0)
    this.status.value = BlurLabel({
      fill: '#FFF',
      fontSize: 15,
      lineHeight: 1.5,
      align: 'right',
      shadowBlur: 6,
      shadowColor: '#BD2'
    }).addChildTo(this.status).setOrigin(0.5, 0.5).setPosition(75, 0)
  }
}
