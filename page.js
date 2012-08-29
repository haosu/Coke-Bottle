var bottle;

window.onload = function() {
  CokeBottle.Utils.paper = Raphael("bottle", 300, 600);

  bottle = new CokeBottle.Bottle();

  bottle.createBottle();
  bottle.createWaves();
  bottle.maskWaves();
  bottle.animateWaves();
  bottle.growWaves(500);

  bottle.startBubbles();
}
