let objs = (function (){
    function Enemy(loadedImgs){
        var percent = funs.randomInt(0, 100);
        if(percent < 70){
            this.style = 1;
            this.w = loadedImgs.enemy1.width/5;
            this.speed = bSpeed * funs.tfmH(funs.randomInt(2, 4));
            this.hp = 1;
            this.score = 1;
        }else if(percent < 90){
            this.style = 2;
            this.w = loadedImgs.enemy2.width/6;
            this.speed = bSpeed * funs.tfmH(funs.randomInt(2, 3));
            this.hp = 40;
            this.score = 3;
        }else{
            this.style = 3;
            this.w = loadedImgs.enemy3.width/10;
            this.speed = bSpeed * funs.tfmH(funs.randomInt(1, 2));
            this.hp = 80;
            this.score = 6;
        }
        this.enemy = true;
        this.speedPre = this.speed;
        this.imgX = 0;
        this.statue = false;
        this.ping = 0;
        this.allW = loadedImgs[`enemy${ this.style }`].width;
        this.h = loadedImgs[`enemy${ this.style }`].height;
        this.wD = funs.tfmW(this.w);
        this.hD = funs.tfmH(this.h);
        this.X = funs.randomInt(funs.tfmW(5), canvas.width - this.wD -funs.tfmW(5));
        this.Y = -this.hD;
        this.img = loadedImgs[`enemy${ this.style }`];
    }

    function Bullet (loadedImgs, style, X, Y){
        this.style = style;
        this.judgeCrash = "enemys";
        this.allW = loadedImgs[`bullet${ this.style }`].width;
        this.w = loadedImgs[`bullet${ this.style }`].width;
        this.h = loadedImgs[`bullet${ this.style }`].height;
        this.wD = funs.tfmW(this.w);
        this.hD = funs.tfmH(this.h);
        this.speed = bSpeed * funs.tfmH(-6);
        this.imgX = 0;
        this.statue = false;
        this.ping = 0;
        this.X = X;
        this.Y = Y;
        this.atk = this.style == 1 ? 2 : 1.5;
        this.img = loadedImgs[`bullet${ this.style }`];
    }

    function Prop (loadedImgs){
        var percent = funs.randomInt(0, 100);
        if(percent < 50){
            this.propstyle = 1;
        }else if(percent < 80){
            this.propstyle = 2;
        }else{
            this.propstyle = 3;
        }
        this.speed = bSpeed * funs.tfmH(funs.randomInt(3, 6));
        this.allW = loadedImgs.prop.width/3;
        this.statue = false;
        this.ping = 0;
        this.w = loadedImgs.prop.width/3;
        this.h = loadedImgs.prop.height;
        this.wD = funs.tfmW(this.w);
        this.hD = funs.tfmH(this.h);
        this.X = funs.randomInt(funs.tfmW(5), canvas.width - this.wD -funs.tfmW(5));
        this.Y = -this.hD;
        this.img = loadedImgs.prop;
        this.imgX = this.propstyle == 1 ? 0 : this.propstyle == 2 ? this.w : this.w * 2;
    }

    function Herofly(loadedImgs){
        this.allW = loadedImgs.herofly.width;
        this.statue = false;
        this.judgeCrash = "enemys&&props";
        this.handMove = true;
        this.bombs = 0;
        this.doubleBullets = false;
        this.doubleBulletsPing = 0;
        this.randomEffect = false;
        this.invincible = false;
        this.invinciblePing = 0;
        this.ping = 0;
        this.img = loadedImgs.herofly;
        this.imgX = 0;
        this.w =  this.allW/5;
        this.h = loadedImgs.herofly.height;
        this.wD = funs.tfmW(this.w);
        this.hD = funs.tfmH(this.h);
        this.X = canvas.width/2 -this.wD/2;
        this.Y = nowHeight - canvas.offsetTop - this.hD - funs.tfmH(20);
        this.l = this.X;
        this.t = this.Y;
        this.b = this.Y + this.hD;
        this.r = this.X + this.wD ;
        this._move();
    }
    Herofly.prototype = {
        _move: function (){
            var self = this;
            canvas.addEventListener("touchstart", self.addEvent = function (ev){
                var ev = ev || event;
                var touch = ev.touches[0];
                var startClinetX = touch.clientX,
                    startClinetY = touch.clientY,
                    startX = self.X,
                    startY = self.Y;
                var tX = touch.clientX - canvas.offsetLeft,
                    tY = touch.clientY - canvas.offsetTop;
                var foo;
                if(tX > self.l && tX < self.r && tY > self.t && tY < self.b){
                    document.addEventListener("touchmove", foo = function(ev){
                        var ev = ev || event;
                        var touch = ev.touches[0];
                        var XMore = touch.clientX - startClinetX,
                            YMore = touch.clientY - startClinetY;
                        self.X = (startX + XMore < 0) ? 0
                            : startX + XMore > canvas.width - self.wD ? canvas.width - self.wD
                            : startX + XMore;
                        self.Y = (startY + YMore < 0) ? 0
                            : startY + YMore > canvas.height - self.hD ? canvas.height - self.hD
                            : startY + YMore;
                        self.l = self.X;
                        self.t = self.Y;
                        self.b = self.Y + self.hD;
                        self.r = self.X + self.wD ;
                        ev.stopPropagation();
                    });
                    document.addEventListener("touchend", function (){
                        document.removeEventListener("touchmove", foo);
                    });
                }
                ev.stopPropagation();
            });
        }
    };

    function Bgd (loadedImgs, Y){
        this.img = loadedImgs.background;
        this.speed = funs.tfmH(2);
        this.speedPre = funs.tfmH(2);
        this.selfMove = true;
        this.X = 0;
        this.Y = Y;
        this.imgX = 0;
        this.w = loadedImgs.background.width;
        this.h = loadedImgs.background.height;
        this.wD = canvas.width;
        this.hD = canvas.height;
    }
    Bgd.prototype = {
        move: function (){
            this.Y += this.speed;
            if(this.Y >= canvas.height){
                this.Y = this.Y - 2 * this.hD;
            }
        }
    };

    return {
        Enemy: Enemy,
        Bullet: Bullet,
        Prop: Prop,
        Herofly : Herofly,
        Bgd : Bgd
    }
}());