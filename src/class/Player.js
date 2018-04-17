phina.globalize()
import config from '../config/config'
import state from '../config/state'
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
    this.setPosition(config.SCREEN_WIDTH / 2, (config.SCREEN_HEIGHT / 2) + 50)
    this.physical.friction = 0.9
    this.light = RectangleShape({
      width: 70,
      height: config.LIGHT_LENGTH,
      fill: '#BD2',
      strokeWidth: 0
    }).addChildTo(this).setOrigin(0.5, 1)
    this.light.blendMode = 'lighter'
    this.light.alpha = 0.8
    this.body = Sprite('ufo').addChildTo(this).setOrigin(0.5, 1).setPosition(0, -this.z).setScale(0.3, 0.3)
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
    }
    if(state.pointer.x !== null && state.pointer.y !== null) {
      const diffX = state.pointer.x - this.x
      if(diffX < 0) {
        this.physical.velocity.x -= SPEED
        if(this.physical.velocity.x < diffX) this.physical.velocity.x = diffX
      } else if(diffX > 0) {
        this.physical.velocity.x += SPEED
        if(this.physical.velocity.x > diffX) this.physical.velocity.x = diffX
      }
      const diffY = state.pointer.y - this.y
      if(diffY < 0) {
        this.physical.velocity.y -= SPEED
        if(this.physical.velocity.y < diffY) this.physical.velocity.y = diffY
      } else if(diffY > 0) {
        this.physical.velocity.y += SPEED
        if(this.physical.velocity.y > diffY) this.physical.velocity.y = diffY
      }
      if(Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {
        state.pointer.x = null
        state.pointer.y = null
      }
    }
    if(this.physical.velocity.x > MAX_SPEED) this.physical.velocity.x = MAX_SPEED
    else if(this.physical.velocity.x < -MAX_SPEED) this.physical.velocity.x = -MAX_SPEED
    if(this.physical.velocity.y > MAX_SPEED) this.physical.velocity.y = MAX_SPEED
    else if(this.physical.velocity.y < -MAX_SPEED) this.physical.velocity.y = -MAX_SPEED
  },
  abduct() {
    const width = 10 - Math.abs(this.physical.velocity.x) < 0 ? 0 : 10 - Math.abs(this.physical.velocity.x)
    this.light.scale.x = width / 10
    this.abducting = Math.abs(this.physical.velocity.x) < 2
  }
}
