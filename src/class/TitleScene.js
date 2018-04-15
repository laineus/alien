phina.globalize()
import config from '../config/config.js'
import state from '../config/state.js'
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option)
    this.backgroundColor = '#111'

    const bg = Sprite('bg', 960, 540).setOrigin(0, 0).addChildTo(this)

    const blurlabel = BlurLabel({
      text: 'Alien Abduction',
      fontFamily: 'ome',
      fill: '#FFF',
      fontSize: 32,
      shadowBlur: 6,
      shadowColor: '#BD2'
    }).addChildTo(this).setPosition(480, 180).setOrigin(0.5, 0.5)

    this.buttons = []
    for (const i in config.STAGE) {
      this.buttons[i] = Button({
          text: '',
          width: 180,
          height: 36,
          fill: 'rgba(0, 0, 0, 0.5)',
          strokeWidth: 0,
          fontSize: 18,
          fontFamily: 'ome'
        })
        .setOrigin(0.5, 0.5)
        .setPosition(480, 300 + (i * 45))
        .addChildTo(this)
      this.buttons[i].cornerRadius = 5
      this.buttons[i].label = BlurLabel({
        text: config.STAGE[i].name,
        fontFamily: 'ome',
        fill: '#FFF',
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
