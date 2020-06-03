const confetti = () => {
    //-----------Var Inits--------------
    
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'confetti';
    document.body.appendChild(this.canvas);

    this.animationFrameId = null;

    this.ctx = this.canvas.getContext("2d");
    this.canvas.width = window.innerWidth;
    this.canvas.height = window.innerHeight;
    let cx = this.ctx.canvas.width/2;
    let cy = this.ctx.canvas.height/2;

    this.confetti = [];
    const confettiCount = 400;
    const gravity = 0.5;
    const terminalVelocity = 5;
    const drag = 0.075;
    const colors = [
    { front : 'red', back: 'darkred'},
    { front : 'green', back: 'darkgreen'},
    { front : 'blue', back: 'darkblue'},
    { front : 'yellow', back: 'darkyellow'},
    { front : 'orange', back: 'darkorange'},
    { front : 'pink', back: 'darkpink'},
    { front : 'purple', back: 'darkpurple'},
    { front : 'turquoise', back: 'darkturquoise'},
    ];



    //-----------Functions--------------
    this.resizeCanvas = () => {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        cx = this.ctx.canvas.width/2;
        cy = this.ctx.canvas.height/2;
    }

    this.randomRange = (min, max) => Math.random() * (max - min) + min

    this.initConfetti = () => {
        for (let i = 0; i < confettiCount; i++) {
            this.confetti.push({
            color      : colors[Math.floor(this.randomRange(0, colors.length))],
            dimensions : {
                x: this.randomRange(10, 20),
                y: this.randomRange(10, 30),
            },
            position   : {
                x: this.randomRange(0, this.canvas.width),
                y: this.canvas.height - 1,
            },
            rotation   : this.randomRange(0, 2 * Math.PI),
            scale      : {
                x: 1,
                y: 1,
            },
            velocity   : {
                x: this.randomRange(-25, 25),
                y: this.randomRange(0, -50),
            },
            });
        }
    }

    //---------Render-----------
    this.render = () => {
        this.canvas.style.display = 'block';
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        this.confetti.forEach((confetto, index) => {
            let width = (confetto.dimensions.x * confetto.scale.x);
            let height = (confetto.dimensions.y * confetto.scale.y);
            
            // Move canvas to position and rotate
            this.ctx.translate(confetto.position.x, confetto.position.y);
            this.ctx.rotate(confetto.rotation);
            
            // Apply forces to velocity
            confetto.velocity.x -= confetto.velocity.x * drag;
            confetto.velocity.y = Math.min(confetto.velocity.y + gravity, terminalVelocity);
            confetto.velocity.x += Math.random() > 0.5 ? Math.random() : -Math.random();
            
            // Set position
            confetto.position.x += confetto.velocity.x;
            confetto.position.y += confetto.velocity.y;
            
            // Delete confetti when out of frame
            if (confetto.position.y >= this.canvas.height) {
                this.confetti.splice(index, 1);
            }

            // Loop confetto x position
            if (confetto.position.x > this.canvas.width) confetto.position.x = 0;
            if (confetto.position.x < 0) confetto.position.x = this.canvas.width;

            // Spin confetto by scaling y
            confetto.scale.y = Math.cos(confetto.position.y * 0.1);
            this.ctx.fillStyle = confetto.scale.y > 0 ? confetto.color.front : confetto.color.back;
            
            // Draw confetto
            this.ctx.fillRect(-width / 2, -height / 2, width, height);
            
            // Reset transform matrix
            this.ctx.setTransform(1, 0, 0, 1, 0, 0);
        });

        // Fire off another round of confetti
        if (this.confetti.length == 0) {
            this.canvas.style.display = 'none';
            window.cancelAnimationFrame(this.animationFrameId);
        } else if (this.animationFrameId) {
            window.cancelAnimationFrame(this.animationFrameId);
        }

        if (this.confetti.length > 0) {
            this.animationFrameId = window.requestAnimationFrame(this.render);
        }
    }

    this.execute = () => {
        this.initConfetti();
        this.render();
    }

    //---------Execution--------
    

    //----------Resize----------
    window.addEventListener('resize', () => {
        this.resizeCanvas();
    });

    return this;
}


export default new confetti();