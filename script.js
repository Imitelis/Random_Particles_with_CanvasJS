const canvas = document.getElementById("canvas");
const ctx = canvas.getContext("2d");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let mouse = {
	x: undefined,
	y: undefined
}

function getRandomInt(min, max) {
	return Math.round(Math.random() * (max - min)) + min;
}

function getAngle(x1, y1, x2, y2) {
	let rad = Math.atan2(x2 - x1, y2 - y1);
	return (rad * 180) / Math.PI;
}

class Particle {
	constructor() {
		this.x = Math.random() * canvas.width;
		this.y = Math.random() * canvas.height;
		this.angle = Math.random() * 360;
		this.speed = 9.5;
		this.blur = Math.random() * 7.5;
		this.style = "hsla(215, 100%, 50%, 1)";
	}

	draw() {
		ctx.save();
		ctx.beginPath();
		ctx.moveTo(this.px, this.py);
		ctx.lineTo(this.x, this.y);
		ctx.lineWidth = 1;
		ctx.shadowBlur = this.blur;
		ctx.shadowColor = this.style;
		ctx.strokeStyle = this.style;
		ctx.stroke();
		ctx.closePath();
		ctx.restore();
	}

	update() {
		this.px = this.x;
		this.py = this.y;

		if (mouse.x !== undefined) {
			this.angle = getAngle(this.x, this.y, mouse.x, mouse.y);
		} else {
			this.angle += getRandomInt(-9, 9);
		}

		this.radian = (Math.PI / 180) * this.angle;
		this.x += this.speed * Math.sin(this.radian);
		this.y += this.speed * Math.cos(this.radian);

		if (this.x < 0 || this.x > canvas.width || this.y < 0 || this.y > canvas.height) {
			this.angle += 90;
		}
	}
}

class init {
  constructor() {
    this.animate = this.animate.bind(this);
    this.particles = [];
    this.particleCount = Math.floor((canvas.width + canvas.height) * 0.25);

    this.resize();
    this.animate();
  }

  resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
	
    ctx.fillStyle = "#222";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  }

  animate() {
	if (this.particles.length < this.particleCount) {
		this.particles.push(new Particle());
	}

	this.particles.map((p) => {
		p.update();
		p.draw();
	});

	ctx.globalCompositeOperation = "source-over";
	ctx.fillStyle = "rgba(0, 0, 0, .05)";
	ctx.fillRect(0, 0, canvas.width, canvas.height);
	ctx.globalCompositeOperation = "lighter";

	requestAnimationFrame(this.animate);
  }
}

const animation = new init();

window.addEventListener('resize',
  function () {
    animation.resize();
  })

window.addEventListener('mousemove',
function(e){
    mouse.x = e.x;
    mouse.y = e.y;
})

window.addEventListener('mouseout',
function(){
    mouse.x = undefined;
    mouse.y = undefined;
})
