export default {
  DEV: false,
  GAME_TITLE: 'Alien Abduction',
  DOM_ID: 'game',
  SCREEN_WIDTH: 960,
  SCREEN_HEIGHT: 540,
  get SCREEN_WIDTH_C() {
    return this.SCREEN_WIDTH / 2
  },
  get SCREEN_HEIGHT_C() {
    return this.SCREEN_HEIGHT / 2
  },
  FPS: 30,
  KEY_UP: 'up',
  KEY_DOWN: 'down',
  KEY_LEFT: 'left',
  KEY_RIGHT: 'right',
  KEY_ACTION: 'Z',
  KEY_CANCEL: 'X',
  KEY_OPTION: 'C',
  KEY_SPACE: 'space',
  KEY_ESCAPE: 'escape',
  LIGHT_LENGTH: 150,
  STAGE: [
    { lv: 1, name: 'Easy', frame: 30 },
    { lv: 2, name: 'Normal', frame: 20 },
    { lv: 3, name: 'Hard', frame: 10 }
  ]
}
