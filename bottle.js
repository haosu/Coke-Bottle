CokeBottle = {};

CokeBottle.Wave = function() { return {
  head_str : "M0,500",
  tail_str : "L300,500 L0,500",
  base_arr : ["L","0","0","S","50","0","125","0","S","200","0","300","0"],
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
    this.baseHeight -= height;
    // taking path from wave's path attribute
    var pathArr = [];
    var path = this.wave.attr("path");

    for(var i=1; i<path.length-1; i++) {
      var pathElement = path[i];

      for(var j=0; j<pathElement.length; j++) {
        pathArr.push(pathElement[i]);
      }
    }

    this.wave.animate({
      path :
        this.head_str + 
        CokeBottle.Utils.createPathString(this.base_arr, 0, this.baseHeight, 0, 0) +
        this.tail_str
      }, 1);
  }
};};

CokeBottle.Bottle = function(){ return {
  outline_str : "M157.936,450.649c-3.084-12.037-10.841-35.258-12.159-45.696 c-0.805-6.376-0.236-25.188,0-31.543c0.235-6.357,10.819-71.553,10.582-79.569c-0.161-5.433-1.88-7.768-1.175-15.537 c0.705-7.769,2.352-20.48,1.646-28.249c-0.706-7.769-1.41-19.304-2.116-24.718c-0.706-5.415-3.998-19.068-5.174-24.717 c-1.177-5.649-1.882-6.827-1.882-11.77c0-4.944,0-13.183-0.941-15.536c-0.941-2.355-22.104-55.555-24.691-64.031 c-2.587-8.474-5.173-23.304-5.878-31.779c-0.707-8.474-1.882-24.954-1.882-28.013c0-3.06,1.646-4.708,3.762-7.532 c2.118-2.826,2.118-8.24,0.236-11.536c-1.882-3.296-3.292-7.062-3.528-8.71c-0.235-1.648,0.393-1.863,0.706-4.944 c0.21-2.062,0.229-3.832-1.411-6.591C112.5,7.604,108.151,5,108.151,5H56.004c0,0-4.349,2.604-5.88,5.178 c-1.64,2.759-1.621,4.529-1.411,6.591c0.312,3.081,0.941,3.296,0.706,4.944c-0.236,1.648-1.646,5.414-3.528,8.71 c-1.881,3.295-1.881,8.709,0.235,11.536c2.116,2.824,3.763,4.472,3.763,7.532c0,3.06-1.176,19.539-1.881,28.013 c-0.706,8.475-3.292,23.305-5.88,31.779c-2.587,8.476-23.75,61.676-24.69,64.031c-0.941,2.353-0.942,10.591-0.942,15.536 c0,4.943-0.706,6.121-1.881,11.77s-4.468,19.303-5.173,24.717c-0.706,5.414-1.41,16.949-2.115,24.718 c-0.706,7.768,0.94,20.48,1.645,28.249c0.706,7.769-1.014,10.104-1.176,15.537c-0.236,8.017,10.348,73.212,10.583,79.569 c0.236,6.355,0.805,25.167,0,31.543c-1.317,10.438-9.074,33.659-12.159,45.696c-3.653,14.257,1.07,29.812,11.924,40.463 C28.164,500.943,48.426,505,62.826,505h38.503c14.401,0,34.662-4.057,44.683-13.888 C156.866,480.462,161.589,464.906,157.936,450.649z",
  bubbleInterval : [],
  waves : [],
  outline : {},
  highlights : [],

  waveCount : 5,

  initialize : function() {
    
  },

  createBottle : function() {
    this.outline = 
      CokeBottle.Utils.paper.path(this.outline_str)
        .attr({fill:"red", stroke:"#eee", "stroke-width":10, "stroke-opacity":1});
  },

  createHighlights : function() {
    var attr = {fill:"#fff", opacity : 0.10, stroke:0};

    var strings = [
      "M60.834,15.833c-1.421,3.909,1.661,22.16,0.445,40.167 c-3.348,49.567-10.111,127.166-10.111,127.166l16-102l3.333-42c0,0,2-17.501,0-25.333S66.168,1.165,60.834,15.833z",
      "M24.061,257.34c-5.561-17.84-3.89-27.09,8.109-6.84s9.375,23.792,10.33,36.666 s11.334,147.332,6.667,163.333s-17.333,36.667-17.333,36.667s-12.499,12.832-16.667,3.333s19.333-35.333,27.333-47.666 s-1.5-116.001-6-133.667S29.622,275.181,24.061,257.34z",
      //"M103.834,11.166c1.181,2.584,0.145,28.9,0.905,45.367s13.095,60.633,13.095,60.633 s-12.166-19.501-18-45.333S101.168,5.332,103.834,11.166z",
      //"M112.277,127.435c-8.777-10.935-11.061,33.113-3.919,48.089s11.029,17.828,18.835,33.902 s5.974,65.784,0.573,74.651s-7.647,13.555-14.957,21.989c-5.509,10.763-7.033,18.537-8.171,40.235s13.398,28.593,14.13,54.646 s-8.159,27.289-7.463,47.671s24.447,40.631,31.39,24.78c-4.067-13.757-10.742-8.521-15.194-32.398s0.653-70.914,0.653-70.914 S123.063,346.64,129.5,315s8.479-24.785,12.489-35.643s3.785-52.979-1.852-67.918s-1.231-7.964-13.184-34.702 S116.5,145,112.277,127.435z",
      //"M87.834,301.166c0,0-5.198,22.333-5.516,39.333s5.516,34,5.516,34s-3.198,8.167-4.516,24.333 s2.758,32.333,2.758,32.333l1.758-44V301.166z"
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

  createWave : function(attr) {
    var wave = new CokeBottle.Wave();
    wave.initialize(attr, 500, 1, 25);
    wave.create();
    return wave;
  },

  maskWaves : function() {
    var paperBlock = $(CokeBottle.Utils.paper.canvas);

    // clipping mask
    var clipPath = CokeBottle.Utils.makeSVG("clipPath", {id:"clipping"});
    var clipShape = CokeBottle.Utils.makeSVG("path", {
      x:0, y:0, 
      fill:"#000",
      d:"M157.936,450.649c-3.084-12.037-10.841-35.258-12.159-45.696 c-0.805-6.376-0.236-25.188,0-31.543c0.235-6.357,10.819-71.553,10.582-79.569c-0.161-5.433-1.88-7.768-1.175-15.537 c0.705-7.769,2.352-20.48,1.646-28.249c-0.706-7.769-1.41-19.304-2.116-24.718c-0.706-5.415-3.998-19.068-5.174-24.717 c-1.177-5.649-1.882-6.827-1.882-11.77c0-4.944,0-13.183-0.941-15.536c-0.941-2.355-22.104-55.555-24.691-64.031 c-2.587-8.474-5.173-23.304-5.878-31.779c-0.707-8.474-1.882-24.954-1.882-28.013c0-3.06,1.646-4.708,3.762-7.532 c2.118-2.826,2.118-8.24,0.236-11.536c-1.882-3.296-3.292-7.062-3.528-8.71c-0.235-1.648,0.393-1.863,0.706-4.944 c0.21-2.062,0.229-3.832-1.411-6.591C112.5,7.604,108.151,5,108.151,5H56.004c0,0-4.349,2.604-5.88,5.178 c-1.64,2.759-1.621,4.529-1.411,6.591c0.312,3.081,0.941,3.296,0.706,4.944c-0.236,1.648-1.646,5.414-3.528,8.71 c-1.881,3.295-1.881,8.709,0.235,11.536c2.116,2.824,3.763,4.472,3.763,7.532c0,3.06-1.176,19.539-1.881,28.013 c-0.706,8.475-3.292,23.305-5.88,31.779c-2.587,8.476-23.75,61.676-24.69,64.031c-0.941,2.353-0.942,10.591-0.942,15.536 c0,4.943-0.706,6.121-1.881,11.77s-4.468,19.303-5.173,24.717c-0.706,5.414-1.41,16.949-2.115,24.718 c-0.706,7.768,0.94,20.48,1.645,28.249c0.706,7.769-1.014,10.104-1.176,15.537c-0.236,8.017,10.348,73.212,10.583,79.569 c0.236,6.355,0.805,25.167,0,31.543c-1.317,10.438-9.074,33.659-12.159,45.696c-3.653,14.257,1.07,29.812,11.924,40.463 C28.164,500.943,48.426,505,62.826,505h38.503c14.401,0,34.662-4.057,44.683-13.888 C156.866,480.462,161.589,464.906,157.936,450.649z"
    });
    $(clipPath).append(clipShape);
    paperBlock.append(clipPath);

    // apply mask
    for(var i=0; i < this.waveCount; i ++) {
      $(this.waves[i].wave.node).attr({"clip-path":"url(#clipping)"});
    }
  },

  animateWaves : function() {
    for(var i=0; i < this.waveCount; i ++) {
      this.waves[i].animate();
    }
  },

  growWaves : function(dx) {
    for(var i=0; i<this.waveCount; i++) {
      this.waves[i].raiseWave(dx*(1-0.1*i));
    }
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