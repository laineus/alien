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
  { x: 320, y: 226 },
  { x: 680, y: 280 },
  { x: 400, y: 420 }
]
export default {
  superClass: 'DisplayElement',
  init(name) {
    this.superInit()
    this.physical.friction = 0.9
    this.body = Spine(name, 'default').addChildTo(this).setOrigin(0.5, 1).setScale(0.2, 0.2)
    this.z = 0
    this.direction = Math.randint(0, 1) === 0 ? 1 : -1
    this.speed = ANIMALS[name].speed
    const house = HOUSES[Math.floor(Math.random() * HOUSES.length)]
    this.setPosition(house.x, Math.randint(house.y, house.y + 50))
    this.scale.x *= -this.direction
    this.shadow = Sprite('shadow').addChildTo(this).setOrigin(0.5, 0.5)
    this.shadow.alpha = 0.3
  },
  update(app) {
    const gameScene = this.parent.parent
    this.shadow.scale.x = 0.7 - (this.z / config.LIGHT_LENGTH)
    this.shadow.scale.y = 0.7 - (this.z / config.LIGHT_LENGTH)
    const diffX = gameScene.player.x - this.x
    const diffY = gameScene.player.y - this.y
    if(gameScene.player.abducting && Math.abs(diffX) < 100 && Math.abs(diffY) < 100) {
      if(Math.abs(diffX) > 2) this.x += diffX > 0 ? 3 : -3
      if(Math.abs(diffY) > 2) this.y += diffY > 0 ? 3 : -3
      this.z += 10
      if(Math.abs((gameScene.player.y - gameScene.player.z) - (this.y - this.z)) < 10) {
        gameScene.score++
        if(!SoundManager.isMute()) SoundManager.play('abduct')
        this.remove()
      }
    } else {
      this.x += this.direction * this.speed
      if(this.z > 0) this.z = this.z < 10 ? 0 : this.z - 10
    }
    if(this.position.x < LEFT || this.position.x > RIGHT) {
      gameScene.lost++
      this.remove()
    }
    this.body.y = -this.z
  }
}
