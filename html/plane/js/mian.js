var start = document.getElementById("start");
var canvas = document.querySelector("#myCanvas");
var progress = document.getElementById("progress");
var bullet_sound = document.getElementById("bullet_sound");
var enemy1_down_sound = document.getElementById("enemy1_down_sound");
var enemy2_down_sound = document.getElementById("enemy2_down_sound");
var enemy3_down_sound = document.getElementById("enemy3_down_sound");
var enemy3_out_sound = document.getElementById("enemy3_out_sound");
var game_over_sound = document.getElementById("game_over_sound");
var ctx = canvas.getContext("2d");
var base, nowHeight, bSpeed = 1, score = 0;

var windowWidth = window.innerWidth||document.documentElement.clientWidth; //获取屏幕宽度
var windowHeight = window.innerHeight||document.documentElement.clientHeight; //获取屏幕的高度
var preWidth = 320, preHeight = 568;
var wPer = 1, hPer = 1;
if((navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i))) {
    wPer = windowWidth / preWidth;
    hPer = windowHeight / preHeight;
}else{
    document.body.innerHTML = "请使用移动端设备打开";
}
canvas.width = funs.tfmW(preWidth);
canvas.height = funs.tfmH(preHeight);
nowHeight = canvas.height + canvas.offsetTop;
start.style.top =(nowHeight - funs.tfmH(100)) + "px";
document.addEventListener("touchstart", function (ev){
    ev.preventDefault();
});
document.addEventListener("touchmove", function (ev){
    ev.preventDefault();
});
document.addEventListener("DOMContentLoaded", function (){
    [].slice.call(document.querySelectorAll("input, select, button")).forEach(function (ele){
        ele.addEventListener(("ontouchstart" in window) ? "touchstart" : "mousedown", function (ev){
            ev.stopPropagation();
        });
    });
}, false);
window.onload = function (){
    funs.loadingImg({
        loadImg: {
            background: "./planeImg/background.png",
            herofly: "./planeImg/herofly.png",
            enemy1: "./planeImg/enemy1.png",
            enemy2: "./planeImg/enemy2.png",
            enemy3: "./planeImg/enemy3.png",
            bullet1: "./planeImg/bullet1.png",
            bullet2: "./planeImg/bullet2.png",
            bomb: "./planeImg/bomb.png",
            prop: "./planeImg/prop.png",
            loading: "./planeImg/loading.gif"
        },
        prog: function (num){ //num为加载的进度
            progress.style.display = "block";
            progress.children[2].innerHTML = `加载进度 ${ num }%`;
            if(num == 100){
                progress.style.display = "none";
                start.style.display = "block";
            }
        },
        complete: init
    });
    function init(loadedImgs){
        start.onclick = function (){
            start.style.display = "none";
            bullet_sound.play();
            bullet_sound.loop = "loop";
            var herofly = new objs.Herofly(loadedImgs);
            var bgds = [new objs.Bgd(loadedImgs, 0), new objs.Bgd(loadedImgs, -canvas.height)];
            var frame = 0, stop = false, stopId, bomb_stop;
            var bullets = [], enemys = [], props = [];
            var enemy = new objs.Enemy(loadedImgs);
            enemys.push(enemy);
            canvas.addEventListener("touchstart", bomb_stop = function (ev){
                var ev = ev || event;
                var touch = ev.touches[0];
                var tX = touch.clientX - canvas.offsetLeft,
                    tY = touch.clientY - canvas.offsetTop;
                var bombL = canvas.width - funs.tfmW(loadedImgs.bomb.width) - funs.tfmW(10),
                    bombR = canvas.width - funs.tfmW(10),
                    bombT = nowHeight - canvas.offsetTop - funs.tfmH(loadedImgs.bomb.height) - funs.tfmH(10),
                    bombB = nowHeight - canvas.offsetTop - funs.tfmH(10);
                if(tX > bombL && tX < bombR && tY > bombT && tY < bombB && herofly.bombs){
                    herofly.bombs -= 1;
                    for(var i = 0; i < enemys.length; i++){
                        enemys[i].statue = true;
                        score += enemys[i].score;
                    }
                }
                var stopL = funs.tfmW(10),
                    stopR = funs.tfmW(46),
                    stopT = nowHeight - canvas.offsetTop - funs.tfmH(46),
                    stopB = nowHeight - canvas.offsetTop - funs.tfmH(10);
                if(tX > stopL && tX < stopR && tY > stopT && tY < stopB && !stop){
                    stop = true;
                    bullet_sound.pause();
                    run();
                    canvas.removeEventListener("touchstart", herofly.addEvent);
                    // cancelAnimationFrame(stopId);
                    return;
                }
                if(tX > stopL && tX < stopR && tY > stopT && tY < stopB && stop){
                    stop = false;
                    bullet_sound.play();
                    herofly._move();
                    requestAnimationFrame(run);
                }
                ev.stopPropagation();
            });
            function run(){
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                frame++;
                    if(!herofly.statue && frame % 8 == 0){
                    herofly.imgX = herofly.imgX ? 0 : herofly.w;
                }
                if(frame % parseInt(10/bSpeed) == 0){
                    if(!herofly.doubleBullets){
                        var bullet = new objs.Bullet(loadedImgs, 1, herofly.X + herofly.wD/2 - funs.tfmW(loadedImgs.bullet1.width/2),
                            herofly.Y - funs.tfmH(loadedImgs.bullet1.height));
                        bullets.push(bullet);
                        bullet_sound.playbackRate = 1;
                    }else{
                        var bullet1 = new objs.Bullet(loadedImgs, 2, herofly.X + funs.tfmW(19), herofly.Y - funs.tfmH(loadedImgs.bullet1.height));
                        var bullet2 = new objs.Bullet(loadedImgs, 2, herofly.X + herofly.wD - funs.tfmW(25), herofly.Y - funs.tfmH(loadedImgs.bullet1.height));
                        bullets.push(bullet1);
                        bullets.push(bullet2);
                        !herofly.invincible && (bullet_sound.playbackRate = 2);
                    }
                }
                if(frame % parseInt(30/bSpeed) == 0){
                    var enemy = new objs.Enemy(loadedImgs);
                    preDrop = enemy;
                    enemys.push(enemy);
                    if(enemy.style == 3){
                        enemy3_out_sound.play();
                    }
                }
                if(frame % parseInt(200/bSpeed) == 0){
                    var prop = new objs.Prop(loadedImgs);
                    preDrop = prop;
                    props.push(prop);
                }
                funs.move_draw(bgds);
                if(herofly.bombs){
                    ctx.drawImage(loadedImgs.bomb, 0, 0, loadedImgs.bomb.width, loadedImgs.bomb.height,
                        canvas.width -funs.tfmW(loadedImgs.bomb.width) -funs.tfmW(10), nowHeight - canvas.offsetTop - funs.tfmH(loadedImgs.bomb.height) - funs.tfmH(10),
                        funs.tfmW(loadedImgs.bomb.width), funs.tfmH(loadedImgs.bomb.height));
                    ctx.font = `${ funs.tfmW(16) }px 微软雅黑`;
                    ctx.fillStyle = "black";
                    if(herofly.bombs < 10){
                        ctx.fillText(herofly.bombs, canvas.width - funs.tfmW(loadedImgs.bomb.width)/2 -funs.tfmW(14), nowHeight - canvas.offsetTop - funs.tfmH(loadedImgs.bomb.height)/2 - funs.tfmH(8));
                    }else{
                        ctx.fillText(herofly.bombs, canvas.width - funs.tfmW(loadedImgs.bomb.width)/2 -funs.tfmW(20), nowHeight - canvas.offsetTop - funs.tfmH(loadedImgs.bomb.height)/2 - funs.tfmH(8));
                    }
                }
                if(herofly.doubleBullets){
                    if(++herofly.doubleBulletsPing % 400 == 0){
                        herofly.doubleBullets = false;
                        herofly.doubleBulletsPing = 0;
                    }
                }
                if(herofly.randomEffect){
                    var percent = funs.randomInt(0, 100);
                    if(percent < 70){
                        herofly.invincible = true;
                        bSpeed = 3;
                        bullet_sound.playbackRate = bSpeed;
                        bgds[0].speed = bSpeed * bgds[0].speedPre;
                        bgds[1].speed = bSpeed * bgds[1].speedPre;
                        herofly.doubleBullets = true;
                        herofly.invinciblePing = 0;
                        herofly.doubleBulletsPing = 0;
                        for(var i = 0; i < enemys.length; i++){
                            enemys[i].speed = bSpeed * enemys[i].speedPre;
                        }
                    }else if(percent < 90){
                        herofly.doubleBullets = true;
                        herofly.doubleBulletsPing = 0;
                    }else{
                        herofly.bombs += 1;
                    }
                    herofly.randomEffect = false;
                }
                if(herofly.invincible){
                    if(++herofly.invinciblePing % 400 == 0){
                        bSpeed = 1;
                        bullet_sound.playbackRate = bSpeed;
                        bgds[0].speed = bSpeed * bgds[0].speedPre;
                        bgds[1].speed = bSpeed * bgds[1].speedPre;
                        !(herofly.doubleBulletsPing < 400) && (herofly.doubleBullets = false);
                        herofly.invincible = false;
                        herofly.randomEffect = false;
                        for(var i = 0; i < enemys.length; i++){
                            enemys[i].speed = bSpeed * enemys[i].speedPre;
                        }
                    }
                }
                funs.move_draw(bullets, enemys);
                funs.move_draw(enemys);
                funs.move_draw([herofly], enemys, props, herofly);
                funs.move_draw(props);

                if(frame >= 10000){
                    frame = 0;
                }
                if(herofly.imgX < herofly.allW){
                    ctx.fillStyle = "#fff";
                    ctx.font = `${ funs.tfmW(20) }px 微软雅黑`;
                    ctx.textAlign = "left";
                    ctx.textBaseline = "alphabetic";
                    ctx.fillText(score, funs.tfmW(5), funs.tfmH(23));

                    ctx.save();
                    // ctx.textAlign = "end";
                    ctx.font = `${ funs.tfmW(16) }px 微软雅黑`;
                    if(herofly.doubleBullets){
                        ctx.fillText(`双排子弹倒计时：${400 - herofly.doubleBulletsPing}`, 6, funs.tfmH(46));
                    }
                    if(herofly.invincible){
                        ctx.fillText(`无敌时间倒计时：${400 - herofly.invinciblePing}`, 6, funs.tfmH(69));
                    }
                    ctx.restore();

                    ctx.beginPath();
                    ctx.lineWidth = 4;
                    ctx.strokeStyle = "black";
                    ctx.fillStyle = "black";
                    ctx.lineCap = "round";
                    ctx.lineJoin = "round";
                    if(!stop){
                        ctx.moveTo(funs.tfmW(18), nowHeight - canvas.offsetTop - funs.tfmH(38));
                        ctx.lineTo(funs.tfmW(18), nowHeight - canvas.offsetTop - funs.tfmH(18));
                        ctx.stroke();
                        ctx.beginPath();
                        ctx.moveTo(funs.tfmW(34), nowHeight - canvas.offsetTop - funs.tfmH(38));
                        ctx.lineTo(funs.tfmW(34), nowHeight - canvas.offsetTop - funs.tfmH(18));
                        ctx.stroke();
                    }else{
                        ctx.moveTo(funs.tfmW(18), nowHeight - canvas.offsetTop - funs.tfmH(38));
                        ctx.lineTo(funs.tfmW(18), nowHeight - canvas.offsetTop - funs.tfmH(18));
                        ctx.lineTo(funs.tfmW(34), nowHeight - canvas.offsetTop - funs.tfmH(28));
                        ctx.closePath();
                        ctx.stroke();
                        ctx.fill();
                    }
                    !stop && (stopId = requestAnimationFrame(run));
                }else{
                    game_over_sound.play();
                    bullet_sound.pause();
                    // herofly.imgX = 0;
                    // herofly.statue = false;
                    canvas.removeEventListener("touchstart", herofly.addEvent);
                    canvas.removeEventListener("touchstart", bomb_stop);
                    ctx.textAlign = "center";
                    ctx.font = `${ funs.tfmW(30) }px 微软雅黑`;
                    ctx.textBaseline = "middle";
                    ctx.fillStyle = "purple";
                    ctx.fillText(`恭喜你获得 ${ score } 分`, canvas.width/2, canvas.height/2);
                    start.style.display = "block";
                    score = 0;
                    start.innerHTML = "重新开始";
                }

                if(herofly.invincible){
                    ctx.save();
                    ctx.beginPath();
                    ctx.shadowColor = "purple";
                    ctx.shadowBlur = 20;
                    ctx.shadowOffsetX = 0;
                    ctx.shadowOffsetY = 0;
                    ctx.lineWidth = 1;
                    ctx.arc(herofly.X + herofly.wD/2, herofly.Y + herofly.hD/2, 55, 0, Math.PI * 2);
                    ctx.closePath();
                    ctx.stroke();
                    ctx.restore();
                }
            }
            run();
        };
    }
};