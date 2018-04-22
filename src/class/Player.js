import config from '../config/config'
import state from '../config/state'
const SPEED = 4
const MAX_SPEED = 20
export default {
  superClass: 'DisplayElement',
  z: config.LIGHT_LENGTH,
  init(option) {
    this.superInit(option)
    this.setPosition(config.SCREEN_WIDTH / 2, (config.SCREEN_HEIGHT / 2) + 50)
    this.physical.friction = 0.9
    this.light = Sprite('light').addChildTo(this).setOrigin(0.5, 1).setScale(0.3, 0.35).setPosition(0, 0)
    this.light.blendMode = 'lighter'
    this.light.alpha = 0.8
    this.body = Sprite('ufo').addChildTo(this).setOrigin(0.5, 1).setPosition(0, -this.z).setScale(0.3, 0.3)
  },
  update(app) {
    this.move()
    this.abduct()
  },
  addVelocity (key) {
    const diff = state.pointer[key] - this[key]
    const direction = diff < 0 ? -1 : 1
    this.physical.velocity[key] += SPEED * direction
    if(Math.abs(this.physical.velocity[key]) > Math.abs(diff)) {
      this.physical.velocity[key] = diff
    }
    if(Math.abs(this.physical.velocity[key]) > MAX_SPEED) {
      this.physical.velocity[key] = this.physical.velocity[key] < 0 ? -MAX_SPEED : MAX_SPEED
    }
    return diff
  },
  move() {
    if(state.pointer.x !== null && state.pointer.y !== null) {
      const diffX = this.addVelocity('x')
      const diffY = this.addVelocity('y')
      if(Math.abs(diffX) < 5 && Math.abs(diffY) < 5) {
        state.pointer.x = null
        state.pointer.y = null
      }
    }
  },
  abduct() {
    const width = 10 - Math.abs(this.physical.velocity.x) < 0 ? 0 : 10 - Math.abs(this.physical.velocity.x)
    this.light.scale.x = width / 10 * 0.3
    this.abducting = Math.abs(this.physical.velocity.x) < 2
  }
}
