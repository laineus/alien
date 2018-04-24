export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option)
    this.backgroundColor = '#111'
    const loader = AssetLoader()
    this.label = Label({
      text: 'NOW LOADING...',
      fontFamily: 'aldrich',
      fontSize: 15,
      fill: '#BD2',
      x: 480,
      y: 260
    }).addChildTo(this)
    this.gauge = Gauge({
      width: 124,
      height: 2,
      cornerRadius: 0,
      maxValue: 1,
      value: 0,
      fill: '#333',
      gaugeColor: '#BD2',
      x: 480,
      y: 280,
      strokeWidth: 0
    }).addChildTo(this)
    loader.onprogress = e => this.gauge.value = e.progress
    loader.onload = e => setTimeout(() => this.onLoad(), 1000)
    loader.load(option.assets)
  },
  onLoad() {
    this.flare('loaded')
    // this.label.y += 10
    // this.label.fontSize += 2
    // this.label.text = 'TAP TO START !'
    // this.gauge.alpha = 0
    // this.onpointstart = () => this.flare('loaded')
  }
}
