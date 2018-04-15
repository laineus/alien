phina.globalize()
import config from '../config/config'
const AXES = [
  { key: config.KEY_LEFT, x: -1, y: 0 },
  { key: config.KEY_RIGHT, x: 1, y: 0 },
  { key: config.KEY_UP, x: 0, y: -1 },
  { key: config.KEY_DOWN, x: 0, y: 1 }
]
const SPEED = 4
const MAX_SPEED = 20
export default {
  superClass: 'DisplayElement',
  z: config.LIGHT_LENGTH,
  init(option) {
    this.superInit(option)
    this.physical.friction = 0.9
    this.light = RectangleShape({
        width: 70,
        height: config.LIGHT_LENGTH,
        fill: '#BD2',
        strokeWidth: 0
      })
      .setOrigin(0.5, 1)
      .addChildTo(this)
      this.light.blendMode = 'lighter'
    this.body = Sprite('ufo')
                .setScale(0.3, 0.3)
                .setOrigin(0.5, 1)
                .setPosition(0, -this.z)
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
        this.physical.velocity.y += axis.y * SPEED
      }
      if(this.physical.velocity.x > MAX_SPEED) this.physical.velocity.x = MAX_SPEED
      else if(this.physical.velocity.x < -MAX_SPEED) this.physical.velocity.x = -MAX_SPEED
      if(this.physical.velocity.y > MAX_SPEED) this.physical.velocity.y = MAX_SPEED
      else if(this.physical.velocity.y < -MAX_SPEED) this.physical.velocity.y = -MAX_SPEED
    }
  },
  abduct() {
    const width = 10 - Math.abs(this.physical.velocity.x) < 0 ? 0 : 10 - Math.abs(this.physical.velocity.x)
    this.light.scale.x = width / 10
    this.abducting = Math.abs(this.physical.velocity.x) < 2
  }
}
