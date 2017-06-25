let funs = (function (){
    function randomInt (a,b) { //生成随机整数
        if(b>=a){
            return parseInt(Math.random()*(b-a+1))+a;
        }
    }
    function tfmW(num){
        return wPer * num;
    }
    function tfmH(num){
        return hPer * num;
    }
    function loadingImg(obj){
        var loadedImg = {};
        var len = 0;
        for (var i in obj.loadImg){
            len++;
        }
        var prog = 0;
        for (var i in obj.loadImg){
            var imgObj = new Image();
            imgObj.src = obj.loadImg[i];
            imgObj.key = i;
            imgObj.onload = function (){
                loadedImg[this.key] = this;
                prog++;
                if (obj.prog){
                    obj.prog(parseInt(prog/len*100));
                }
                if (prog>=len){ //加载完成
                    if (obj.complete){
                        obj.complete(loadedImg);
                    }
                }
            }
        }
    }
    function move(self){
        if(!self.statue){
            self.Y += self.speed;
            self.l = self.X;
            self.t = self.Y;
            self.r = self.X + self.wD;
            self.b = self.Y + self.hD;
            if(self.Y > canvas.height || self.Y < -self.hD){
                self.statue = true;
            }
        }
    }
    function draw(self){
        ctx.drawImage(self.img, self.imgX, 0, self.w, self.h, self.X, self.Y, self.wD, self.hD);
    }
    function judgeCrash(self, enemys, props, herofly){
        if(!self.invincible){
            for(var i = 0; i < enemys.length; i++){
                if(self.l < enemys[i].r && self.r > enemys[i].l && self.t < enemys[i].b && self.b > enemys[i].t && !enemys[i].statue){
                    self.statue = true;
                    self.atk && (enemys[i].hp -= self.atk);
                    if((enemys[i].hp + 1) && enemys[i].hp <= 0){
                        enemys[i].statue = true;
                        score += enemys[i].score;
                    }
                    return;
                }
            }
        }
        if(!self.atk){
            for(var i = 0; i < props.length; i++){
                if(self.l < props[i].r && self.r > props[i].l && self.t < props[i].b && self.b > props[i].t && !props[i].statue){
                    props[i].statue = true;
                    if(props[i].propstyle == 1){
                        herofly.bombs += 1;
                    }else if(props[i].propstyle == 2){
                        herofly.doubleBullets = true;
                        herofly.doubleBulletsPing = 0;
                    }else{
                        herofly.randomEffect = true;
                    }
                }
            }
        }
    }
    function disappear(self, selfArr){
        if(++self.ping % 5 == 0){
            self.imgX += self.w;
        }
        if(self.imgX >= self.allW){
            self.enemy && self.style == 1 && enemy1_down_sound.play();
            self.enemy && self.style == 2 && enemy2_down_sound.play();
            self.enemy && self.style == 3 && enemy3_down_sound.play();
            selfArr.splice(selfArr.indexOf(self), 1);
            return true;
        }
        funs.draw(self);
    }
    function move_draw (allEles, enemys, props, herofly){
        for(var i = 0; i < allEles.length; i++){
            if(allEles[i].selfMove){
                allEles[i].move();
            }else if(allEles[i].handMove){
            }else{
                funs.move(allEles[i]);
            }
            allEles[i].judgeCrash && funs.judgeCrash(allEles[i], enemys, props, herofly);
            if(allEles[i].statue){
                funs.disappear(allEles[i], allEles) && i--;
            }else{
                funs.draw(allEles[i]);
            }
        }
    }
    return {
        randomInt : randomInt,
        tfmW: tfmW,
        tfmH: tfmH,
        loadingImg: loadingImg,
        move: move,
        draw: draw,
        judgeCrash: judgeCrash,
        disappear: disappear,
        move_draw: move_draw
    }
}());