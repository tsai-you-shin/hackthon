(function (root) {
  var Asteroids = root.Asteroids = (root.Asteroids || {});

  function randomVelocity () {
    var dx = Math.random() * -10 - 2;
    return [ dx, 0 ];
  }

  var Asteroid =
  Asteroids.Asteroid =
  function (pos, vel) {
    COLOR = 'green';
    RADIUS = 12;
    IMAGE = './asteroid.png';
    Asteroids.MovingObject.call(this, pos, vel, RADIUS, COLOR, IMAGE);
  };

  Asteroid.inherits(Asteroids.MovingObject);

  Asteroid.prototype.randomAsteroid = function (dimX, dimY) {
    var x = dimX;
    var y = Math.random() * dimY;
    return (
      new Asteroid( [x, y], randomVelocity() )
    );
  };



})(this);
