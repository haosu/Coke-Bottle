CokeBottle = {};

CokeBottle.Wave = function() { return {
  head_str : "M0,450",
  tail_str : "L200,450 L0,450",
  base_arr : ["L","0","0","S","50","0","100","0","S","150","0","200","0"],
  attr : {},
  wave : {},
  incrementRate : 0,
  baseHeight : 0,
  variance : 0,

  initialize : function(attr, baseHeight, incrementRate, variance) {
    this.attr = attr;
    this.baseHeight = baseHeight;
    this.incrementRate = incrementRate;
    this.variance = variance;
  },

  create : function() {
    this.wave = CokeBottle.Utils.paper.path(
      this.head_str + 
      CokeBottle.Utils.createPathString(this.base_arr, 0, this.baseHeight, 0, this.variance) +
      this.tail_str
    ).attr(this.attr);

    return this.wave;
  },

  animate : function() {
    var parent = this;

    parent.wave.animate({
      path : 
        parent.head_str + 
        CokeBottle.Utils.createPathString(parent.base_arr, 0, parent.baseHeight, 0, parent.variance) +
        parent.tail_str
    }, 1500, function(){parent.animate()});
  },

  raiseWave : function(height) {
    this.baseHeight -= (height*this.incrementRate);
    // taking path from wave's path attribute
    var pathArr = [];
    var path = this.wave.attr("path");

    for(var i=1; i<path.length-1; i++) {
      var pathElement = path[i];

      for(var j=0; j<pathElement.length; j++) {
        pathArr.push(pathElement[i]);
      }
    }

    /*
    this.wave.animate({
      path :
        this.head_str + 
        CokeBottle.Utils.createPathString(this.base_arr, 0, this.baseHeight, 0, 0) +
        this.tail_str
      }, 1);

      */
  }
};};

CokeBottle.Bottle = function(){ return {
  outline_str : "M135.595,384.568c-2.634-10.231-9.257-29.969-10.382-38.842c-0.688-5.419-0.201-21.409,0-26.813c0.201-5.401,9.239-60.818,9.036-67.633c-0.137-4.617-1.605-6.602-1.003-13.205c0.602-6.604,2.008-17.409,1.406-24.012c-0.603-6.604-1.205-16.408-1.807-21.01c-0.603-4.602-3.414-16.208-4.418-21.01c-1.004-4.802-1.607-5.803-1.607-10.004c0-4.203,0-11.205-0.804-13.206c-0.802-2-18.874-47.221-21.083-54.426c-2.209-7.203-4.418-19.809-5.021-27.013c-0.602-7.203-1.607-21.21-1.607-23.811s1.406-4,3.212-6.402c1.808-2.402,1.808-7.004,0.201-9.805c-1.607-2.802-2.812-6.003-3.013-7.404c-0.2-1.401,0.335-1.583,0.603-4.203c0.179-1.752,0.197-3.257-1.205-5.603c-1.307-2.188-5.021-4.401-5.021-4.401h-44.53c0,0-3.713,2.213-5.021,4.401c-1.4,2.345-1.384,3.85-1.205,5.603c0.268,2.619,0.803,2.802,0.603,4.203c-0.202,1.4-1.406,4.602-3.012,7.404c-1.607,2.801-1.607,7.403,0.2,9.805c1.807,2.401,3.213,3.801,3.213,6.402s-1.004,16.608-1.607,23.811c-0.603,7.204-2.811,19.81-5.021,27.013c-2.209,7.205-20.281,52.425-21.084,54.426c-0.803,2.001-0.804,9.003-0.804,13.206c0,4.201-0.603,5.202-1.606,10.004c-1.005,4.802-3.816,16.408-4.418,21.01c-0.603,4.603-1.204,14.407-1.806,21.01c-0.603,6.603,0.803,17.408,1.405,24.012c0.603,6.604-0.865,8.589-1.004,13.205c-0.202,6.815,8.836,62.232,9.037,67.633c0.202,5.404,0.688,21.394,0,26.813c-1.125,8.873-7.749,28.611-10.382,38.842c-3.12,12.117,0.914,25.339,10.182,34.392c8.557,8.357,25.859,11.806,38.155,11.806h32.879c12.297,0,29.599-3.448,38.155-11.806C134.682,409.907,138.714,396.685,135.595,384.568z",
  bubbleInterval : [],
  waves : [],
  outline : {},
  highlights : [],

  paperBlock : {},
  clipPath : {},
  clipShape : {},


  waveCount : 5,

  initialize : function() {
  },

  createBottle : function() {
    this.outline = 
      CokeBottle.Utils.paper.path(this.outline_str)
        .attr({fill:"red", stroke:"#eee", "stroke-width":10, "stroke-opacity":1});

    this.paperBlock = $(CokeBottle.Utils.paper.canvas);

    // clipping mask
    this.clipPath = CokeBottle.Utils.makeSVG("clipPath", {id:"clipping"});
    this.clipShape = CokeBottle.Utils.makeSVG("path", {
      x:0, y:0, 
      fill:"#000",
      d: this.outline_str
    });
    $(this.clipPath).append(this.clipShape);
    this.paperBlock.append(this.clipPath);
  },

  createHighlights : function() {
    var attr = {fill:"#fff", opacity : 0.20, stroke:0};

    var strings = [
      "M51.167,69.833c0,0-9.333,83.667-18.667,90.333l9-5 C41.5,155.167,53.167,117.167,51.167,69.833z",
      "M28.5,242.5c0,0,0,47.334,4,62.667s7.333,57.333,0,70c0,0,15-15.333,12.333-38 s-1.292-47.667-4.813-62.333S36.826,266.684,28.5,242.5z,",
      "M107.167,242.5l-4.667,4c0,0-8,62.333-8,67.333C94.5,313.833,106.5,267.167,107.167,242.5z",
      ""
    ];

    for(var i=0;i < strings.length; i++) {
      highlight = CokeBottle.Utils.paper.path(strings[i]).attr(attr);

      this.highlights.push(highlight);
    }
  },

  createWaves : function() {
    var attr = {fill:CokeBottle.Utils.C_BASE, stroke:0};
    this.waves.push(this.createWave(attr, 500, 1, 25));

    attr.fill = CokeBottle.Utils.C_DARK;
    attr.opacity = 0.2;

    for(var i=1; i<this.waveCount; i++) {
      this.waves.push(this.createWave(attr, 500, 1-(0.1*i), 25));
    }
  },

  createWave : function(attr, x, incrementRate, variance) {
    var wave = new CokeBottle.Wave();
    wave.initialize(attr, x, incrementRate, variance);
    wave.create();
    this.maskWave(wave);
    return wave;
  },

  maskWave : function(wave) {
    $(wave.wave.node).attr({"clip-path":"url(#clipping)"});
  },

  animateWaves : function() {
    for(var i=0; i < this.waveCount; i ++) {
      this.waves[i].animate();
    }
  },

  growWaves : function(dx) {
    for(var i=0; i<this.waveCount; i++) {
      //this.waves[i].raiseWave(dx*(1-0.1*i));
      this.waves[i].raiseWave(dx);
    }
  },

  stackWave : function(dx, color) {
    var attr = {fill:color, stroke:0, opacity:0.4}
    var wave = this.createWave(attr, 500, 1, 25);
    wave.animate();
    this.waves.push(wave);
    this.waveCount ++;

    this.growWaves(dx);
  },

  startBubbles : function() {
    var bubbleRepeat = function(x, y, r){
      var bubble = CokeBottle.Bubble();
      bubble.initialize(x, y, r);
      bubble.createBubble();
    };

    this.bubbleInterval = setInterval(function(){
      bubbleRepeat(Math.random()*130+10, 500, Math.random()*5+1);
    }, 50);
  }

};};

CokeBottle.Bubble = function(){ return {
  x : 0,
  y : 0,
  r : 0,

  initialize : function(x, y, r) {
    this.x = x;
    this.y = y;
    this.r = r;

    this.createBubble();
  },

  // expertly placed circles to look like a bubble
  createBubble : function() {
    var x = this.x,
        y = this.y,
        r = this.r;

    var bubble = CokeBottle.Utils.paper.set();
    bubble.push(
      CokeBottle.Utils.paper.circle(x, y, r).attr({fill : "#ccc", opacity:0.1, stroke:"#333"}),
      //paper.circle(x, y, r).attr({fill : "#333", opacity:0.1,}),
      //paper.ellipse(x, y+r*1/10, r*9/10, r*9/10).attr({fill:"#ccc", opacity: 0.05, stroke:"white"}),
      //paper.ellipse(x, y+r*1/3, r*4/5, r*2/3).attr({fill:"#333", opacity: 0.05, stroke:0}),
      CokeBottle.Utils.paper.circle(x-r*3/7, y-r*3/7, r/3).attr({fill : "#ccc", opacity:0.15, stroke:"white"})
    );

    bubble.animate({transform:"t0,-520"}, Math.random()*3000+2000, 
      function(){
        bubble.remove();
      }
    );

    return bubble;
  }

};};

CokeBottle.WaveLabel = function(){ return{
  textValue : "",
  imgUrl : "",

  text : {},
  img : {},

  initialize : function(text, imgUrl) {
    this.textValue = text;
    this.imgUrl = imgUrl;
  },

  draw : function() {
    this.text = CokeBottle.Utils.paper.text(this.textValue);
    this.img = CokeBottle.Utils.paper.image(this.imgUrl);
  },

  move : function(dx) {

  }
};};

CokeBottle.Utils = {
  C_DARK : "#330303",
  C_BASE : "#a52a2a",

  // creates an SVG element from provided attributes
  makeSVG : function(tag, attrs) {
    var el= document.createElementNS('http://www.w3.org/2000/svg', tag);
    for (var k in attrs)
      el.setAttribute(k, attrs[k]);
    return el;
  }, 

  // creates a path string from path array with options for x,y adjustment
  // and position variance
  createPathString : function(pathArray, dx, dy, vx, vy) {
    dx = dx || 0; dy = dy || 0;
    var str = "";
    var marker = 0;

    for(var i=0; i<pathArray.length; i++) {
      var c = pathArray[i];

      if(!(!isNaN(parseFloat(c)) && isFinite(c))) {
        marker = 0;
      }

      if(marker == 0){}
      else if(marker % 2 == 0) {
        c = parseFloat(c) + dy + (vy * Math.random());
      }
      else {
        c = parseFloat(c) + dx + (vx * Math.random());
      }

      str += c + ',';
      marker ++;
    }

    return str.slice(0, str.length-1);
  },

  paper : {}
};