const REGEX_HEX = /(^#[0-9A-F]{6}$)|(^#[0-9A-F]{3}$)/i;
const REGEX_IMAGE = /\.(gif|jpg|jpeg|tiff|png)$/i;

class Particle {
  constructor(parent) {
    this.canvas = parent.canvas;
    this.ctx = parent.ctx;
    this.particleColor = parent.options.particleColor;

    this.x = Math.random() * this.canvas.width;
    this.y = Math.random() * this.canvas.height;
    this.velocity = {
      x: (Math.random() - 0.5) * parent.options.velocity,
      y: (Math.random() - 0.5) * parent.options.velocity
    };
  }

  update() {
    //Change direction if outside map
    if (this.x > this.canvas.width + 20 || this.x < -20) {
      this.velocity.x = -this.velocity.x;
    }

    if (this.y > this.canvas.height + 20 || this.y < -20) {
      this.velocity.y = -this.velocity.y;
    }

    //Update position
    this.x += this.velocity.x;
    this.y += this.velocity.y;
  }

  draw() {
    //Draw particle
    this.ctx.beginPath();
    this.ctx.fillStyle = this.particleColor;
    this.ctx.globalAlpha = 1;
    this.ctx.arc(this.x, this.y, 1.5, 0, 2 * Math.PI);
    this.ctx.fill();
  }
}

export default class ParticleNetwork {
  constructor(canvas, options = {}) {
    this.canvasWrapper = canvas;
    this.canvasWrapper.size = {
      width: this.canvasWrapper.offsetWidth,
      height: this.canvasWrapper.offsetHeight
    };

    //Set options
    this.options = {
      particleColor: options.particleColor ? options.particleColor : "#fff",
      background: options.background ? options.background : "transparent",
      interactive: options.interactive ? options.interactive : false,
      velocity: this.setVelocity(options.speed),
      density: this.setDensity(options.density)
    };

    this.init();
  }

  init() {
    this.canvasBackground = document.createElement("div");
    this.setStyles(this.canvasBackground, {
      position: "absolute",
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      height: "100%",
      width: "100%"
    });

    this.setCanvasBackground(this.options.background);
    if (!this.isParticleColorValid(this.options.particleColor)) return false;

    //Create canvas & context
    this.canvas = document.createElement("canvas");
    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = this.canvasWrapper.size.width;
    this.canvas.height = this.canvasWrapper.size.height;
    this.setStyles(this.canvasWrapper, { position: "relative" });
    this.setStyles(this.canvas, {
      position: "absolute",
      top: 0,
      left: 0,
      "z-index": 0
    });

    this.canvasWrapper.insertBefore(
      this.canvasBackground,
      this.canvasWrapper.firstElementChild
    );
    this.canvasWrapper.insertBefore(
      this.canvas,
      this.canvasWrapper.firstElementChild.nextSibling
    );

    //Add resize listener to canvas
    window.addEventListener(
      "resize",
      () => {
        //Check if div has changed size
        if (
          this.canvasWrapper.offsetWidth === this.canvasWrapper.size.width &&
          this.canvasWrapper.offsetHeight === this.canvasWrapper.size.height
        ) {
          return false;
        }

        //Scale canvas
        this.canvas.width = this.canvasWrapper.size.width = this.canvasWrapper.offsetWidth;
        this.canvas.height = this.canvasWrapper.size.height = this.canvasWrapper.offsetHeight;

        //Set timeout to wait until end of resize event
        clearTimeout(this.resetTimer);
        this.resetTimer = setTimeout(
          () => {
            //Reset Particles
            this.initParticles();

            if (this.options.interactive) {
              this.particles.push(this.mouseParticle);
            }

            //Update canvas
            requestAnimationFrame(this.update.bind(this));
          },
          500
        );
      }
    );

    //Initialize particles
    this.initParticles();

    if (this.options.interactive) {
      //Add mouse particle if interactive
      this.mouseParticle = new Particle(this);
      this.mouseParticle.velocity = {
        x: 0,
        y: 0
      };
      this.particles.push(this.mouseParticle);

      //Mouse event listeners
      this.canvas.addEventListener(
        "mousemove",
        function(e) {
          this.mouseParticle.x = e.clientX - this.canvas.offsetLeft;
          this.mouseParticle.y = e.clientY - this.canvas.offsetTop;
        }.bind(this)
      );

      this.canvas.addEventListener(
        "mouseup",
        function(e) {
          this.mouseParticle.velocity = {
            x: (Math.random() - 0.5) * this.options.velocity,
            y: (Math.random() - 0.5) * this.options.velocity
          };
          this.mouseParticle = new Particle(this);
          this.mouseParticle.velocity = {
            x: 0,
            y: 0
          };
          this.particles.push(this.mouseParticle);
        }.bind(this)
      );
    }

    //Update canvas
    requestAnimationFrame(this.update.bind(this));
  }

  update() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.canvas.globalAlpha = 1;

    //Draw particles
    for (let i = 0; i < this.particles.length; i++) {
      this.particles[i].update();
      this.particles[i].draw();

      //Draw connections
      for (let j = this.particles.length - 1; j > i; j--) {
        const distance = Math.sqrt(
          Math.pow(this.particles[i].x - this.particles[j].x, 2) +
            Math.pow(this.particles[i].y - this.particles[j].y, 2)
        );
        if (distance <= 120) {
          
        this.ctx.beginPath();
        this.ctx.strokeStyle = this.options.particleColor;
        this.ctx.globalAlpha = (120 - distance) / 120;
        this.ctx.lineWidth = 0.7;
        this.ctx.moveTo(this.particles[i].x, this.particles[i].y);
        this.ctx.lineTo(this.particles[j].x, this.particles[j].y);
        this.ctx.stroke();
        }

      }
    }
    if (this.options.velocity !== 0) {
      requestAnimationFrame(this.update.bind(this));
    }
  }

  initParticles() {
    this.particles = [];
    const particlesCount =
      (this.canvas.width * this.canvas.height) / this.options.density;

    for (let i = 0; i < particlesCount; i++) {
      this.particles.push(new Particle(this));
    }
  }

  isParticleColorValid(color) {
    if (!REGEX_HEX.test(color)) {
      console.error("Please specify a valid particleColor hexadecimal color");
      return false;
    }
    return true;
  }

  setVelocity(speed) {
    if (speed === "fast") {
      return 1;
    } else if (speed === "slow") {
      return 0.33;
    } else if (speed === "none") {
      return 0;
    } else return 0.66;
  }

  setCanvasBackground(background) {
    if (REGEX_HEX.test(background)) {
      this.setStyles(this.canvasBackground, {
        background: background
      });
    } else if (REGEX_IMAGE.test(background)) {
      this.setStyles(this.canvasBackground, {
        background: `url("${background}") no-repeat center`,
        "background-size": "cover"
      });
    } else {
      this.setStyles(this.canvasBackground, {
        background: "transparent"
      });
    }
  }

  setDensity(density) {
    if (density === "high") {
      return 5000;
    } else if (density === "medium") {
      return 10000;
    } else if (density === "low") {
      return 20000;
    }
    return !isNaN(parseInt(density, 10)) ? density : 1000;
  }

  setStyles(div, styles) {
    for (let property in styles) {
      div.style[property] = styles[property];
    }
  }
}
