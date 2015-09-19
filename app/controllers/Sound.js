class SoundController {
  constructor(){
    this.sounds = {}
  }

  load(id, route){
    this.sounds[id] = new Audio(route)
    document.body.appendChild(this.sounds[id])
  }

  play(id){
    // this.playing && this.playing.pause()
    this.sounds[id].play()
    // this.playing = this.sounds[id]
  }
}

export default new SoundController()