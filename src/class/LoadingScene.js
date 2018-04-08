phina.globalize();
export default {
  superClass: 'DisplayScene',
  init(option) {
    this.superInit(option);
    this.backgroundColor = '#111';
    const loader = AssetLoader();
    const label = Label({
      text: 'NOW LOADING...',
      fontFamily: 'ome',
      fontSize: 15,
      fill: '#BD2',
      x: 480,
      y: 260
    }).addChildTo(this);
    const gauge = Gauge({
      width: 120,
      height: 2,
      cornerRadius: 0,
      maxValue: 1,
      value: 0,
      fill: '#431',
      gaugeColor: '#BD2',
      x: 480,
      y: 280,
      strokeWidth: 0
    }).addChildTo(this);
    loader.onprogress = e => gauge.value = e.progress;
    loader.onload = e => setTimeout(() => this.flare('loaded'), 100);
    loader.load(option.assets);
  }
}
