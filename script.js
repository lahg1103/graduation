window.addEventListener("DOMContentLoaded", ()=> {
    let wrapper = document.querySelector(".cap-wrapper");
    let cap = wrapper.querySelector(".cap");
    let gradient = document.querySelector(".main-gradient");
    let main = document.querySelector("main");


    cap.addEventListener("click", ()=> {
        let tassel = cap.querySelector(".tassel");
        [wrapper, tassel, cap, gradient].forEach((e) => {
            e.classList.toggle("active");
        });
        for (let i = 0; i < 100; i++) {
            particles.push(new Particle());
        }
        animate();
        main.classList.toggle("hidden");
        setTimeout(()=> {
            cap.classList.toggle("hidden");
            wrapper.classList.toggle("done");
            gradient.classList.toggle("done");
        }, 3500)
    });

    const canvas = document.getElementById('confettiCanvas');
    const ctx = canvas.getContext('2d');
    let particles = [];
    const colors = ['rgb(237, 115, 58)', 'rgb(255, 247, 0)', 'rgb(198, 183, 138)', 'rgb(209, 209, 80)', 'rgb(244, 109, 36)', 'rgb(185, 195, 195)'];
    function resizeCanvas() {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    }


    window.addEventListener('resize', resizeCanvas);
    resizeCanvas();

    
    class Particle {
        constructor() {
            this.x = canvas.width / 2 + (Math.random() * 40 - 20);
            this.y = canvas.height; 
            
            this.size = Math.random() * 8 + 5;
            this.color = colors[Math.floor(Math.random() * colors.length)];
            
            this.speedX = Math.random() * 10 - 5;
            this.speedY = Math.random() * -6 - 12; 
            
            this.gravity = 0.3; 
            this.rotation = Math.random() * 360;
            this.rotationSpeed = Math.random() * 8 - 4;
        }

        update() {
            this.speedY += this.gravity; 
            this.x += this.speedX;
            this.y += this.speedY;
            this.rotation += this.rotationSpeed;
        }


        draw() {
            ctx.save();
            ctx.translate(this.x + this.size / 2, this.y + this.size / 2);
            ctx.rotate((this.rotation * Math.PI) / 180);
            ctx.fillStyle = this.color;
            ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size);
            ctx.restore();
        }
    }

    function animate() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach((particle, index) => {
        particle.update();
        particle.draw();

        if (particle.y > canvas.height) {
          particles.splice(index, 1);
        }
      });

      if (particles.length > 0) {
        requestAnimationFrame(animate);
      }
    }



})