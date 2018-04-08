phina.globalize()
import config from '../config/config'
const AXES = [
  { key: config.KEY_LEFT, x: -1 },
  { key: config.KEY_RIGHT, x: 1 }
]
const SPEED = 4
const MAX_SPEED = 20
export default {
  superClass: 'DisplayElement',
  init(option) {
    this.superInit(option)
    this.physical.friction = 0.9
    this.light = RectangleShape({
        width: 70,
        height: 540,
        fill: '#BD2',
        strokeWidth: 0,
        blendMode: 'lighter'
      })
      .setOrigin(0.5, 0)
      .addChildTo(this)
    this.opcity = 0.7
    this.body = Sprite('ufo')
                .setScale(0.3, 0.3)
                .addChildTo(this)
  },
  update(app) {
    this.move(app.keyboard)
    this.abduct()
  },
  move(keyboard) {
    for(let axis of AXES) {
      if(keyboard.getKey(axis.key)) {
        this.physical.velocity.x += axis.x * SPEED
      }
      if(this.physical.velocity.x > MAX_SPEED) this.physical.velocity.x = MAX_SPEED
      else if(this.physical.velocity.x < -MAX_SPEED) this.physical.velocity.x = -MAX_SPEED
    }
  },
  abduct() {
    const width = 10 - Math.abs(this.physical.velocity.x) < 0 ? 0 : 10 - Math.abs(this.physical.velocity.x)
    this.light.scale.x = width / 10
    this.abducting = Math.abs(this.physical.velocity.x) < 2
  }
}
