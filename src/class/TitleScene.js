phina.globalize()
import config from '../config/config'
import state from '../config/state'
import SoundButton from './SoundButton'
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option)
    if(!SoundManager.isMute()) SoundManager.playMusic('bgm')
    this.backgroundColor = '#111'
    this.bg = Sprite('title', 960, 540).addChildTo(this).setOrigin(0, 0)
    this.bgmButton = SoundButton.addChildTo(this).setOrigin(1, 0).setPosition(960 - 20, 20)
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
        // if(!SoundManager.isMute() && /iP(hone|(o|a)d)/.test(window.navigator.userAgent)) SoundManager.playMusic('bgm')
        if(!SoundManager.isMute()) SoundManager.play('action')
        this.exit('Game')
      }
      this.description = Label({
        text: 'Tap to select difficulty.',
        fontFamily: 'aldrich',
        fill: '#FFF',
        fontSize: 12
      }).addChildTo(this).setOrigin(0.5, 1).setPosition(config.SCREEN_WIDTH_C, config.SCREEN_HEIGHT - 20)
    }
  }
}
