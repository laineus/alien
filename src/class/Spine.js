import config from '../config/config'
const DEBUG_RENDERING = false
const TRIANGLE_RENDERING = false
const DIR = '/spine/'
export default {
  superClass: 'PlainElement',
  name: null,
  anime_name: '',
  skin_name: null,
  base_scale: 1,
  load_completed: false,
  renderer: null,
  asset_manager: null,
  skeleton: null,
  state: null,
  init(name, skin_name) {
    this.superInit()
    this.name = name
    this.skin_name = skin_name

    this.renderer = new spine.canvas.SkeletonRenderer(this.canvas.context)
    this.renderer.debugRendering = DEBUG_RENDERING
    this.renderer.triangleRendering = TRIANGLE_RENDERING

    this.asset_manager = new spine.canvas.AssetManager()
    this.asset_manager.loadText(DIR + this.name + '.json')
    this.asset_manager.loadText(DIR + this.name + '.atlas')
    this.asset_manager.loadTexture(DIR + this.name + '.png')
  },
  update() {
    if(this.load_completed) {
      if(!this.anime_name) this.setAnimation('animation', true)
      this.render()
    } else if(this.asset_manager.isLoadingComplete()) {
      this.loadSkeleton()
      this.load_completed = true
    }
  },
  setAnimation(name, loop, force = false) {
    if(!this.load_completed) return
    const current = this.state.getCurrent(0)
    if(force || !current || current.animation.name != name) {
      this.state.setAnimation(0, name, loop)
      this.anime_name = name
    }
  },
  loadSkeleton() {
    const atlas = new spine.TextureAtlas(this.asset_manager.get(DIR + this.name + '.atlas'), path => {
      return this.asset_manager.get(DIR + path)
    })
    const atlasLoader = new spine.AtlasAttachmentLoader(atlas)
    const skeletonJson = new spine.SkeletonJson(atlasLoader)
    const skeletonData = skeletonJson.readSkeletonData(this.asset_manager.get(DIR + this.name + '.json'))

    this.skeleton = new spine.Skeleton(skeletonData)
    this.skeleton.setSkinByName(this.skin_name)
    this.skeleton.setToSetupPose()
    this.skeleton.updateWorldTransform()
    this.skeleton.flipY = true

    this.state = new spine.AnimationState(new spine.AnimationStateData(this.skeleton.data))
    this.state.addListener({
      event: this.event,
      complete: this.complete,
      start: this.start,
      end: this.end
    })
  },
  render() {
    this.resize()
    this.state.update(1 / config.FPS)
    this.state.apply(this.skeleton)
    this.skeleton.updateWorldTransform()
    this.renderer.draw(this.skeleton)
  },
  resize() {
    this.canvas.canvas.width = config.SCREEN_WIDTH
    this.canvas.canvas.height = config.SCREEN_HEIGHT
    this.canvas.context.setTransform(1, 0, 0, 1, 0, 0)
    this.canvas.context.scale(this.base_scale, this.base_scale)
    this.canvas.context.translate(config.SCREEN_WIDTH / this.base_scale / 2, config.SCREEN_HEIGHT / this.base_scale)
  }
}
