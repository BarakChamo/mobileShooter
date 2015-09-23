import WORLD from 'constants/world'

export default function clouds(ctx2){
  const c1 = document.createElement('CANVAS'),
        // c2 = document.createElement('CANVAS'),
        c3 = document.createElement('CANVAS')

  const ctx1 = c1.getContext('2d'),
        // ctx2 = c2.getContext('2d'),
        ctx3 = c3.getContext('2d')

  const w = WORLD.width  / 2, 
        h = WORLD.height / 2
 
  let dt, 
      nt, 
      ot = 0

  let img = new Image()

  class Cloud {
    constructor(p, ctx){
      this.ctx = ctx
      this.p   = p
      this.sy  = ( Math.random() * h ) >> 0
      this.sx  = ( Math.random() * w ) >> 0
    }

    move(dt){
      let p = this.p + 0.3 * dt,
          o = Math.sin( p * 0.05 ) * 0.5

      if(o < 0) {
        p = o = 0
        this.sy = ( Math.random() * h ) >> 0
        this.sx = ( Math.random() * w ) >> 0
      }

      this.p = p
      
      this.ctx.globalAlpha = o
      this.ctx.drawImage(c3, this.sy + this.p, this.sy + this.p, w - ( this.p * 2 ), h - ( this.p * 2 ), 0, 0, w, h)
    }
  }

  let clouds = [
    new Cloud(0,  ctx1),
    new Cloud(20, ctx1),
    new Cloud(40, ctx1)
  ]

  c1.width  = WORLD.width  / 2
  c1.height = WORLD.height / 2
  c3.width  = WORLD.width
  c3.height = WORLD.height
      
  function loop() {
    nt = new Date().getTime()

    if(ot === 0 ) ot = nt

    dt = (nt - ot) * 0.1

    if(dt > 3) dt = 3

    ot = nt

    clouds.sort( (p1, p2) => p1.p - p2.p )
    
    for(var i=0; i < clouds.length; i++) {
      clouds[i].move(dt)
    } 

    ctx2.drawImage( c1 ,0,0, WORLD.width, WORLD.height)

    setTimeout( loop, 10 )
  }

  img.onload = function() {
    ctx3.drawImage(img, 0,0, w * 2, h * 2)
    loop()
  }

  img.src = '/images/clouds.jpg'
}