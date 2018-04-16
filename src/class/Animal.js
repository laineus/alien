phina.globalize()
import config from '../config/config'
const MARGIN = 20
const LEFT = -MARGIN
const RIGHT = config.SCREEN_WIDTH + MARGIN
const ANIMALS = {
  cow: {
    speed: 1
  },
  sheep: {
    speed: 1.5
  }
}
const HOUSES = [
  { x: 280, y: 180 },
  { x: 670, y: 260 },
  { x: 460, y: 410 }
]
export default {
  superClass: 'DisplayElement',
  init(name) {
    this.superInit()
    this.physical.friction = 0.9
    this.body = Spine(name, 'default')
                .setOrigin(0.5, 1)
                .setPosition(0, 0)
                .setScale(0.2, 0.2)
                .addChildTo(this);
    this.z = 0
    this.direction = Math.randint(0, 1) === 0 ? 1 : -1
    this.speed = ANIMALS[name].speed
    const house = HOUSES[Math.floor(Math.random() * HOUSES.length)]
    this.setPosition(house.x, Math.randint(house.y, house.y + 50))
    this.scale.x *= -this.direction
    this.shadow = Sprite('shadow')
                  .setOrigin(0.5, 0.5)
                  .setPosition(0, 0)
                  .addChildTo(this)
    this.shadow.alpha = 0.3
  },
  update(app) {
    this.shadow.scale.x = 0.7 - (this.z / config.LIGHT_LENGTH);
    this.shadow.scale.y = 0.7 - (this.z / config.LIGHT_LENGTH);
    const diffX = this.parent.player.x - this.x
    const diffY = this.parent.player.y - this.y
    if(this.parent.player.abducting && Math.abs(diffX) < 100 && Math.abs(diffY) < 100) {
      if(Math.abs(diffX) > 2) this.x += diffX > 0 ? 3 : -3
      if(Math.abs(diffY) > 2) this.y += diffY > 0 ? 3 : -3
      this.z += 10
      if(Math.abs((this.parent.player.y - this.parent.player.z) - (this.y - this.z)) < 10) {
        this.parent.score++
        this.remove()
      }
    } else {
      this.x += this.direction * this.speed
      if(this.z > 0) this.z = this.z < 10 ? 0 : this.z - 10
    }
    if(this.position.x < LEFT || this.position.x > RIGHT) {
      this.parent.lost++
      this.remove()
    }
    this.body.y = -this.z
  }
}
