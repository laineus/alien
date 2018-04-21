const bgmButton = Button({
  text: 'BGM: ON',
  width: 100,
  height: 24,
  fill: 'rgba(0, 0, 0, 0.5)',
  strokeWidth: 0,
  fontSize: 12,
  fontFamily: 'aldrich'
})
bgmButton.onpointover = () => bgmButton.fill = 'rgba(0, 0, 0, 0.8)'
bgmButton.onpointout = () => bgmButton.fill = 'rgba(0, 0, 0, 0.5)'
bgmButton.onpointend = () => {
  if(SoundManager.isMute()) {
    bgmButton.text = 'BGM: ON'
    SoundManager.unmute()
  } else {
    bgmButton.text = 'BGM: OFF'
    SoundManager.mute()
  }
}
export default bgmButton
