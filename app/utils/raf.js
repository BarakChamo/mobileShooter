import WORLD from 'constants/world'

// Holds last iteration timestamp.
var time = 0;

/**
 * Calls `fn` on next frame.
 *
 * @param  {Function} fn The function
 * @return {int} The request ID
 * @api private
 */
function raf(fn) {
  return setTimeout(function() {
    var now = Date.now()
    var elapsed = now - time

    if (elapsed > 999) {
      elapsed = 1 / 60
    } else {
      elapsed /= 1000
    }

    time = now
    fn(elapsed)
  }, 1000/WORLD.framerate)
}

export default class Raf {
  /**
   * Calls `fn` on every frame with `elapsed` set to the elapsed
   * time in milliseconds.
   *
   * @param  {Function} fn The function
   * @return {int} The request ID
   * @api public
   */
  start(fn) {
    return raf(function tick(elapsed) {
      fn(elapsed)
      raf(tick)
    })
  }

  /**
   * Cancels the specified animation frame request.
   *
   * @param {int} id The request ID
   * @api public
   */
  stop(id) {
    window.cancelAnimationFrame(id)
  }
}