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
    this.z = 0
    this.direction = Math.randint(0, 1) === 0 ? 1 : -1
    this.setPosition(this.direction === 1 ? LEFT : RIGHT, Math.randint(150, 480))
    this.scale.x *= -this.direction
    this.shadow = Sprite('shadow')
                  .setOrigin(0.5, 0.5)
                  .setPosition(0, 15)
                  .addChildTo(this)
    this.shadow.alpha = 0.5
  },
  update(app) {
    this.shadow.scale.x = 0.7 - (this.z / 200);
    this.shadow.scale.y = 0.7 - (this.z / 200);
    const diffX = this.parent.player.x - this.x
    const diffY = this.parent.player.y - this.y
    if(this.parent.player.abducting && Math.abs(diffX) < 70 && Math.abs(diffY + 200) < 100) {
      if(Math.abs(diffX) > 2) this.x += diffX > 0 ? 2 : -2
      if(Math.abs(diffY) > 2) this.y += diffY + 200 > 0 ? 2 : -2
      this.z += 7
      if(Math.abs(this.parent.player.y - (this.y - this.z)) < 10) {
        this.remove()
      }
    } else {
      this.x += this.direction
      if(this.z > 0) this.z -= 10
    }
    if(this.position.x < LEFT || this.position.x > RIGHT) {
      this.remove()
    }
    this.body.y = -this.z
  }
}
