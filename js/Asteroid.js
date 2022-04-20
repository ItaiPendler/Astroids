class Asteroid{

  position = new Point();
  x;
  y;
  xVelocity = Number;
  yVelocity = Number;
  radius = Number;
  angle = Number;
  verticesNum = Number;

  constructor(x,y, xVelocity = 0, yVelocity =0 , radius = 0, angle =0 , points =1) {
    this.x = x;
    this.y = y;
    this.xVelocity =xVelocity;
    this.yVelocity = yVelocity;
    this.radius = radius;
    this.angle = angle;
    this.verticesNum = points;
  }

  isInRadius(point = new Point()) {
    let distance = getDistance(point.x, point.y, this.position.x, this.position.y);
    return distance < this.radius;
  }


}
