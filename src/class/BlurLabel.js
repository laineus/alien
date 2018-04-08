export default {
  superClass: 'Label',
  init(option) {
    this.superInit(option);
    this.blendMode = 'lighter';
    this.shadowOffsetX = option.shadowOffsetX ? option.shadowOffsetX : 0;
    this.shadowOffsetY = option.shadowOffsetY ? option.shadowOffsetY : 0;
    this.shadowBlur = option.shadowBlur ? option.shadowBlur : 10;
    this.shadowColor = option.shadowColor ? option.shadowColor : '#E82';
  },
  renderFill(canvas) {
    canvas.context.shadowOffsetX = this.shadowOffsetX;
    canvas.context.shadowOffsetY = this.shadowOffsetY;
    canvas.context.shadowBlur = this.shadowBlur;
    canvas.context.shadowColor = this.shadowColor;
    this.superMethod('renderFill', canvas);
  }
}
