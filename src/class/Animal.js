phina.globalize()
import config from '../config/config'
const MARGIN = 20
const LEFT = -MARGIN
const RIGHT = config.SCREEN_WIDTH + MARGIN
export default {
  superClass: 'DisplayElement',
  init(option) {
    this.superInit(option)
    this.physical.friction = 0.9
    this.body = Sprite('cow')
                  .setScale(0.15, 0.15)
                  .addChildTo(this)
    this.direction = Math.randint(0, 1) === 0 ? 1 : -1
    this.baseY = Math.randint(450, 480)
    this.setPosition(this.direction === 1 ? LEFT : RIGHT, this.baseY)
    this.scale.x *= -this.direction
  },
  update(app) {
    const diffX = Math.abs(this.parent.player.x - this.x)
    if(this.parent.player.abducting && diffX < 25) {
      this.y -= 5
      const diffY = Math.abs(this.parent.player.y - this.y)
      if(diffY < 20) {
        this.remove()
      }
    } else {
      this.x += this.direction
      if(this.y < this.baseY) this.y += 10
    }
    if(this.position.x < LEFT || this.position.x > RIGHT) {
      this.remove()
    }
  }
}
