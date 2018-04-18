phina.globalize()
import config from '../config/config'
import state from '../config/state'
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option)
    this.backgroundColor = '#111'
    this.bg = Sprite('title', 960, 540).addChildTo(this).setOrigin(0, 0)
    this.buttons = []
    for(const i in config.STAGE) {
      this.buttons[i] = Button({
        text: '',
        width: 240,
        height: 36,
        fill: 'rgba(0, 0, 0, 0.5)',
        strokeWidth: 0,
        fontSize: 18,
        fontFamily: 'aldrich'
      }).addChildTo(this).setOrigin(0.5, 0.5).setPosition(480, 300 + (i * 45))
      this.buttons[i].cornerRadius = 5
      this.buttons[i].label = BlurLabel({
        text: config.STAGE[i].name,
        fontFamily: 'aldrich',
        fill: state.cleared.includes(i) ? '#BD2' : '#FFF',
        fontSize: 18,
        shadowBlur: 6,
        shadowColor: '#BD2'
      }).addChildTo(this.buttons[i]).setOrigin(0.5, 0.5)
      this.buttons[i].onpointover = () => this.buttons[i].fill = 'rgba(0, 0, 0, 0.8)'
      this.buttons[i].onpointout = () => this.buttons[i].fill = 'rgba(0, 0, 0, 0.5)'
      this.buttons[i].onpointend = () => {
        state.stageIndex = i
        this.exit('Game')
      }
    }
  }
}
