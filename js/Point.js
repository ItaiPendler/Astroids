class Point{

  x;
  y;

  constructor(x = 0, y=0) {
    this.x = x;
    this.y = y;
  }

  floor(){
    return new Point(Math.floor(this.x), Math.floor(this.y));
  }

  add(point = new Point()){
      return new Point(this.x + point.x, this.y + point.y);
  }

  static add(point=new Point(), point0 = new Point()){
    return point.add(point0);
  }

}
