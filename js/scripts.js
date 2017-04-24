

// Calculator Functionality //
var keys = document.querySelectorAll('p');
var operators = ['+', '-', 'x', '÷'];
var decimalAdded = false;

for(var i = 0; i < keys.length; i++) {
	keys[i].onclick = function(e) {

		var input = document.querySelector('.result span');
		var inputValue = input.innerHTML;
		var btnValue = this.innerHTML;

		if (btnValue == 'C') {
			input.innerHTML = '';
			decimalAdded = false;

		}	else if (btnValue == '=') {
			var equation = inputValue;
			var lastChar = equation[equation.length - 1];

			equation = equation.replace(/x/g, '*').replace(/÷/g, '/');

			if (operators.indexOf(lastChar) > -1 || lastChar == '.') {
				equation = equation.replace(/.$/, '');
			}

			if (equation) {
				input.innerHTML = eval(equation);
			}

			decimalAdded = false;

		} else if (operators.indexOf(btnValue) > -1) {

			var lastChar = inputValue[inputValue.length - 1];

			if (inputValue != '' && operators.indexOf(lastChar) == -1) {
				input.innerHTML += btnValue;
			} else if (inputValue == '' && btnValue == '-') {
				input.innerHTML += btnValue;
			}

			if (operators.indexOf(lastChar) > -1 && inputValue.length > 1) {
				input.innerHTML = inputValue.replace(/.$/, btnValue);
			}

			decimalAdded =false;

		} else if (btnValue == '.') {
			if (!decimalAdded) {
				input.innerHTML += btnValue;
				decimalAdded = true;
			}

		} else {
			input.innerHTML += btnValue;
		}
		e.preventDefault();
	}
}

// Music //
function playMusic() {
  music.play();
}

function stopMusic() {
  music.pause();
  music.currentTime = 0;
}

function toggleMuteBtn() {
  var muteState = 0;
  $('#musicMute').click(function() {
    if(muteState === 0) {
      $('#musicMute').html('<i class="fa fa-volume-up" aria-hidden="true"></i><span> play</span>');
      stopMusic();
      muteState = 1;
    } else {
      $('#musicMute').html('<i class="fa fa-volume-off" aria-hidden="true"></i><span> mute</span>');
      playMusic();
      muteState = 0;
    }
  });
}
toggleMuteBtn();

// Initialise jQuery.textfill //
// $('.result').textfill({
// 	maxFontPixels: 36,
// });

// ZenRainAnimation Start //
setTimeout(function() {

  function resizeCanvas() {
    ch = window.innerHeight;
    cw = window.innerWidth;
    zenBackground.width = cw;
    zenBackground.height = ch;
  };

  var cw, ch,
      zenBackground = document.getElementById('zenBackground'),
      ctx = zenBackground.getContext('2d'),
      parts = [],
      globalTick = 0,
      rand = function(min, max){
          return Math.floor( (Math.random() * (max - min + 1) ) + min);
      };

  var Part = function(){
    this.reset();
  };

  Part.prototype.reset = function(){
    this.startRadius = rand(1, 10);
    // this.startRadius = rand(20, 25);
    this.radius = this.startRadius;
    this.x = rand(0, zenBackground.width);
    this.y = rand(0, zenBackground.height);
    this.hue = 210;
    this.saturation = rand(40, 60);
    this.lightness = rand(70, 80);
    this.startAlpha = 0.5;
    this.alpha = this.startAlpha;
    this.decayRate = .3;
    this.startLife = rand(20, 30);
    // this.startLife = 15;
    this.life = this.startLife;
    this.lineWidth = 1;
  }

  Part.prototype.update = function(){
    this.alpha = this.startAlpha * (this.life / this.startLife);
    this.radius = this.radius+1;
    this.life -= this.decayRate;
  };

  Part.prototype.render = function(){
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
    ctx.fillStyle = ctx.strokeStyle = 'hsla('+this.hue+', '+this.saturation+'%, '+this.lightness+'%, '+this.alpha+')';
    ctx.lineWidth = this.lineWidth;
    ctx.fill();
    // ctx.stroke();
  };

  var createParts = function(){
    parts.push(new Part());
  };

  var updateParts = function(){
    var i = parts.length;
    while(i--){
      if (parts[i].life < 0){
        parts.splice(i, 1)
      }
      parts[i].update();
    }
  };

  var renderParts = function(){
    var i = parts.length;
    while(i--){
      parts[i].render();
    }
  };

  var clear = function(){
    ctx.globalCompositeOperation = 'destination-out';
    ctx.fillStyle = 'hsla(0, 0%, 0%, 1)';
    ctx.fillRect(0, 0, cw, ch);
    ctx.globalCompositeOperation = 'source-over';
  };

  //Run through the first iterations to get all the parts ready for rendering.
  for (i = 0 ; i < 200 ; i++){
    if (globalTick % 15 == 0){
      createParts();
    }
    updateParts();
    globalTick++;
  }

  var loop = function(){
    window.requestAnimFrame(loop, zenBackground);
    clear();

    if (globalTick % 15 == 0){
      createParts();
    }

		updateParts();
		renderParts();
		globalTick++;
  };

  window.requestAnimFrame=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||window.oRequestAnimationFrame||window.msRequestAnimationFrame||function(a){window.setTimeout(a,1E3/60)}}();

  resizeCanvas();
  window.onresize = resizeCanvas;

  loop();
}, 1);
