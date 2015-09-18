import Player from '../components/Player'
import Bullet from '../components/Bullet'
import Marker from '../components/Marker'

export default {
  Player: Player.prototype.draw,
  Bullet: Bullet.prototype.draw,
  Marker: Marker.prototype.draw
}