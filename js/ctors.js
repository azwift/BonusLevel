//Ctors
	
	//Helper Functions
	function blindspotON(){
		blindInterval = setInterval(() => {
				let e = Enemy(boss[0].x,boss[0].y,0,-150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,-20,-150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,-40,-150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,-60,-150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,-80,-150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,20,-150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,40,-150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,60,-150);
				e.trigger("startMoving");
				e = towardsEnemy(boss[0].x,boss[0].y, -300,8,8);
				e.trigger("startMoving");
			},1000);
		player.one("BlindSpotOFF", blindspotOFF);
	}
	function blindspotOFF(){
		clearInterval(blindInterval);
		player.one("BlindSpotON", blindspotON);
	}
	function blindspotONLower(){
		blindIntervalLower = setInterval(() => {
				let e = Enemy(boss[0].x,boss[0].y,0,150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,-20,150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,-40,150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,-60,150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,-80,150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,20,150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,40,150);
				e.trigger("startMoving");
				e = Enemy(boss[0].x,boss[0].y,60,150);
				e.trigger("startMoving");
				e = towardsEnemy(boss[0].x,boss[0].y, -300,8,8);
				e.trigger("startMoving");
			},1000);
		player.one("BlindSpotOFFLower", blindspotOFFLower);
	}
	function blindspotOFFLower(){
		clearInterval(blindIntervalLower);
		player.one("BlindSpotONLower", blindspotONLower);
	}

	function animateDamage(){
		this.tween({alpha: 0.4},0);
		setTimeout(() => {
			this.tween({alpha: 1},0);
			setTimeout(() => {
				this.tween({alpha: 0.4},0);
				setTimeout(() => {
					this.tween({alpha: 1},0);
					this.one("AnimateDamage", animateDamage);
				},100)
			},100)
		},100)
	}

	//*****************
	//Boss type constructor
	function BossType1(){
		var boss = [];
	    boss.push(Crafty.e("2D, Image, Canvas, Enemy, Collision,Color,Tween,Motion")
		.attr({x : 500 , y : 200 , w: 32 ,h:32 , hp: 1000, phase: 3})
		.image("img/circle.png")
		.bind("EnterFrame", function(){
			if(this.y >= 279 || this.y <= 184 ){
				this.vy = -1 * this.vy;
			}
		})
		.one("NextPhase", function(){
			clearPhase();
			phaseTwo();
		}));
		boss_hp = new Health(10, 470, 630, 0,"yellow");
		boss_hp.bind("EnterFrame",function(){
			this.h = boss[0].attr("hp") * 0.47;
		});
		boss[0].one("AnimateDamage", animateDamage);
		boss[0].onHit("Bullet",() => {
			boss[0].trigger("AnimateDamage");
			boss[0].hp--;
			if(boss[0].hp <= 0){
				if(boss[0].phase == 0){
					clearPhase();
					Crafty.enterScene("Win");
				}
				else{
					boss[0].phase--;
					boss[0].hp = 1000;
					changeColourofHP(boss[0].phase);
				}
			}
		});
		boss.push(Crafty.e("2D, Image, Canvas, Enemy, Collision,Color,Tween,Motion")
		.attr({x : 516 , y : 216  , w: 32 , h:32})
		.image("img/circle1.png")
		.bind("EnterFrame", phaseFrame));
		boss[1].one("AnimateDamage", animateDamage);
		boss[1].onHit("Bullet",() => {
			boss[1].trigger("AnimateDamage");
			boss[0].hp--;
			if(boss[0].hp <= 0){
				if(boss[0].phase == 0){
					clearPhase();
					Crafty.enterScene("Win");
				}
				else{
					boss[0].phase--;
					boss[0].hp = 1000;
					changeColourofHP(boss[0].phase);
				}
			}
		});
		boss.push(Crafty.e("2D, Image, Canvas, Enemy, Collision,Color,Tween, Motion")
		.attr({x : 516 , y : 216  , w: 32 , h:32})
		.image("img/circle2.png")
		.bind("EnterFrame", phaseFrame));
		boss[2].one("AnimateDamage", animateDamage);
		boss[2].onHit("Bullet",() => {
			boss[2].trigger("AnimateDamage");
			boss[0].hp--;
			if(boss[0].hp <= 0){
				if(boss[0].phase == 0){
					clearPhase();
					Crafty.enterScene("Win");
				}
				else{
					boss[0].phase--;
					boss[0].hp = 1000;
					changeColourofHP(boss[0].phase);
				}
			}
		});
		boss.push(Crafty.e("2D, Image, Canvas, Enemy, Collision,Color,Tween, Motion")
		.attr({x : 516 , y : 216  , w: 32 , h:32, rotation: 180})
		.image("img/circle3.png")
		.bind("EnterFrame", phaseFrame2));
		boss[3].one("AnimateDamage", animateDamage);
		boss[3].onHit("Bullet",() => {
			boss[3].trigger("AnimateDamage");
			boss[0].hp--;
			if(boss[0].hp <= 0){
				if(boss[0].phase == 0){
					Crafty.enterScene("Win");
				}
				else{
					boss[0].phase--;
					boss[0].hp = 1000;
					changeColourofHP(boss[0].phase);										
				}
			}
		});

		return boss;
	}

	//helper for boss
	function phaseFrame(){
		if(this.rotation === 360){
			this.rotation = 0;
			this.tween({rotation : 360}, 1000, "smootherStep");
		}
		if(this.y >= 295 || this.y <= 200){
			this.vy = -1 * this.vy;
		}
	}

	function phaseFrame2(){
		if(this.rotation === 540){
			this.rotation = 180;
			this.tween({rotation:540}, 1000, "smootherStep");
		}
		if(this.y >= 295 || this.y <= 200){
				this.vy = -1 * this.vy; 			
			} 	
	}

	//******************************
	//smaller Enemies
	Crafty.c("EnemyBullet", {
		Circle: function(x,y,src,w,h,path) {
		    this.x = x;
		    this.y = y;
		    this.w = w;
		    this.h = h; 
		   	this.vx = -175;
			this.vy = 0;
		    this.src = src;
		    this.path = path;
		    return this;
		},
		draw: function(){
			let img = document.createElement("img");
			//img.crossOrigin = "Anonymous";
			img.src = "img/circle4.png";
			img.height = this.h;
			img.width = this.w;
			Crafty.canvasLayer.context.drawImage(img,this.x,this.y);
			//console.log(Crafty.canvasLayer.context.getImageData(0,0,1,1));
			this.move();
		},
		clearY: function(oldY){
			Crafty.canvasLayer.context.clearRect(this.x,oldY,this.w,this.h);
		},
		clearX: function(oldX){
			Crafty.canvasLayer.context.clearRect(oldX,this.y,this.w,this.h);
		},
		move: function(){
			if(this.path === 0){
				//this.ax = -10;
				this.ay = 150;
			}
			else if(this.path === 1){
				//this.ax = -10;
				this.ay = -150;
			}
			else if(this.path === 2){
				//this.ax = -10;
				//this.ay = 50;
				this.ay = 75;
			}
			else if(this.path === 3){
				//this.ax = -10;
				this.ay = -75;
			}
			else if(this.path === 4){
				//this.ay = 25
				this.ay = 50;
			}
			else if(this.path === 5){
				//this.ax = -10;
				this.ay = -50;
			}
			else if(this.path === 6){
				//this.ax = -10;
				this.ay = 10;
			}
			else if(this.path === 7){
				//this.ax = -10;
				this.ay = -10;
			}
			
		},
		events:
		{
			"Moved": function(event) {
				if(event.axis === "x")
					this.clearX(event.oldValue);
				else 
					this.clearY(event.oldValue);
				if(this.x < 10 || this.y < 10 || this.y > height - 40){
					this.destroy();
				}
				else{
					this.draw();
				}
				
			} 
		}
	});

	function Enemy(startx,starty,startvx,startvy){
		return Crafty.e("Enemy,2D,Canvas,Color,Collision,Motion").
		attr({x:startx,y:starty,w:8,h:16})
		.color("blue")
		.bind("startMoving",function(){
			this.vx = startvx;
			this.vy = startvy;
			this.color(Crafty.math.randomInt(0,256), Crafty.math.randomInt(0,256), Crafty.math.randomInt(0,256));
		})
		.onHit("Platform",function (solid){
			this.destroy();
		});
	}

	function towardsEnemy(xp,yp,speedu,width, height){
		if(height !== undefined && width !== undefined){ 
			return Crafty.e("Enemy,2D,Canvas,Color,Collision,Motion").
			attr({x:xp,y:yp,w:width,h:height})
			.color("blue")
			.bind("startMoving",function(){
				var initX = player.attr("x");
				var initY = player.attr("y");
				var theta = Math.atan((this.y-initY)/(this.x-initX));
				
				if(this.x-initX < 0 ){
					this.vx = -1 * speedu * Math.cos(theta);
					this.vy = -1 * speedu * Math.sin(theta);

				}
				else{
					this.vx = speedu * Math.cos(theta);
					this.vy = speedu * Math.sin(theta);
				}
			})
			.onHit("Platform",function (solid){
				setTimeout(() => {
					this.destroy();
				},100);
			});
		}
		return Crafty.e("Enemy,2D,Canvas,Color,Collision,Motion").
		attr({x:xp,y:yp,w:20,h:5})
		.color("blue")
		.bind("startMoving",function(){
			var initX = player.attr("x");
			var initY = player.attr("y");
			var theta = Math.atan((this.y-initY)/(this.x-initX));
			
			if(this.x-initX < 0 ){
				this.vx = -1 * speedu * Math.cos(theta);
				this.vy = -1 * speedu * Math.sin(theta);

			}
			else{
				this.vx = speedu * Math.cos(theta);
				this.vy = speedu * Math.sin(theta);
			}
		})
		.onHit("Platform",function (solid){
			this.destroy();
		});
	}

	//unused
	function trackingEnemy (xp,yp,speedu){
		return Crafty.e("Enemy,2D,Canvas,Color,Collision,Motion").
		attr({x:xp,y:yp,w:10,h:10,timelimit:100,time:0})
		.color("blue")
		.bind("EnterFrame",function(){
			this.time++;
			if(this.time >= this.timelimit){
				this.destroy();
				return;
			}
			var initX = player.attr("x");
			var initY = player.attr("y");
			var theta = Math.atan((this.y-initY)/(this.x-initX));
			
			if(this.x-initX < 0 ){
				this.vx = -1 * speedu * Math.cos(theta);
				this.vy = -1 * speedu * Math.sin(theta);

			}
			else{
				this.vx = speedu * Math.cos(theta);
				this.vy = speedu * Math.sin(theta);
			}
		})
		.onHit("Platform",function (solid){
			if(this.vx!==0){
				this.vx=-this.vx;
			}
			if(this.vy!==0){
				this.vy=-this.vy;
			}
			
		});
	}
	//Smaller Enemies End**************************************


	function Platform(a,b,wth,hgt){
		return Crafty.e("Platform,2D,Canvas,Color,Collision,Motion").
		attr({x : a *10 +20 , y : b *15 +20 , w: wth * 10, h: hgt * 10}).
		color("brown");
	}
	function Boundaries (wid,hei,topLeft,topRight,bottomLeft,bottomRight,color,wallDistance){
		Crafty.e("Platform,2D,Canvas,Color,Collision,Motion").
		attr({x :topLeft[0]  , y :topLeft[1]  , w:wid , h:wallDistance}).
		color(color);
		Crafty.e("Platform,2D,Canvas,Color,Collision,Motion").
		attr({x :topLeft[0]  , y :topLeft[1]  , w:wallDistance , h:hei}).
		color(color);
		Crafty.e("Platform,2D,Canvas,Color,Collision,Motion").
		attr({x :topRight[0]  , y :topRight[1]  , w:wallDistance , h:hei}).
		color(color);
		Crafty.e("Platform,2D,Canvas,Color,Collision,Motion").
		attr({x :bottomLeft[0]  , y :bottomLeft[1]  , w:wid , h:wallDistance}).
		color(color);
	}
	function Player(xCor,yCor){
		var tempPlayer = Crafty.e("2D,DOM,Collision,Motion,Fourway,Color,Player,Tween")
		.attr({x : xCor, y:yCor, w: 5, h: 5, hp: 100, maxHp: 100})
		.color("#FF0000")
		.multiway({W: -90, S: 90, D: 0, A: 180})
		.onHit("Platform",function (arrayOfObj){
			//return;
			if(this.vx>0){
				this.x=this.x-5;
			}
			else if(this.vx<0){
				this.x=this.x+5;
			}
			if(this.vy>0){
				this.y=this.y-5;
			}
			else if(this.vy<0){
				this.y=this.y+5;
			}

			if(this.vx === 0 && this.x > 570){
				this.x -= 10;
			}

			if(this.vy === 0 && this.y > 410){
				this.y -= 10;
			}

		})
		.onHit("Enemy",function (enemy){
			player.hp = player.hp - 1;
			if(player.hp <= 0){
				Crafty.enterScene("GameOver");
			}
			player.trigger("AnimateDamage");
			health_bar.color("red");
			setTimeout(() => {
				health_bar.color("green");
			},50);
			if(player.hp <= 25 && hp === false){
				healthPack();
				hp = true;
			}
		});
		tempPlayer.onHit("EnemyBullet",function (enemy){
			player.hp = player.hp - 1;
			if(player.hp <= 0){
				Crafty.enterScene("GameOver");
			}
			health_bar.color("red");
			setTimeout(() => {
				health_bar.color("green");
			},50);
			player.trigger("AnimateDamage");
			if(player.hp <= 25 && hp === false){
				healthPack();
				hp = true;
			}
		});
		tempPlayer.one("AnimateDamage", animateDamage);

		return tempPlayer;
	}

	function getCircleCoordinates(radius){
		var coordinates = [];
		var increment = 0.5; //the smaller the increment the higher the accuracy
		if(radius <= 0){
			console.log("Error radius must be greater than 0");
			return;
		}
		for(var x = -1 * radius; x < radius; x += increment){
			y = Math.sqrt(radius * radius - x * x);
			coordinates.push(radius + x); //add the radius to shift the center
			coordinates.push(radius + y);
		}
		for(var x = radius; x > -1 * radius; x-= increment){
			y = Math.sqrt(radius * radius - x * x);
			coordinates.push(radius + x);
			coordinates.push(radius + -1 * y);
		}
		return coordinates;
	}

	function Health(width,height,x,y,color){
		return Crafty.e("2D,Canvas, Color")
		.attr({x:x,y:y,w:width,h:height})
		.color(color);
	}

	function healthPack(){
		let startx = Crafty.math.randomInt(50, width/2);
		let starty = Crafty.math.randomInt(100, height-150);
		let color = "green";
		let colors = ["green", "orange"];
		let text = Crafty.e("2D,Text,DOM").
		attr({x: startx + 4, y: starty})
		.text(function () { return "+"; })
		.textFont({ size: "20px"})
		.textColor("black");
		let healthp = Crafty.e("2D,Canvas, Color, Collision")
		.attr({x:startx,y:starty,w:20,h:20})
		.color("green")
		.onHit("Player",function(data){
			player.hp +=20;
			hp = false;
			clearInterval(hpInterval);
			this.destroy();
		});
		healthp.attach(text);
		hpInterval = setInterval(() => {
			health.color(color);
			if(color === colors[0])
				color = colors[1];
			else
				color = colors[0];
		}, 500);

	}

	function keepShooting(mouseEvent){
		var initX = player.attr("x");
		var initY = player.attr("y");
	    var theta = Math.atan((mouseEvent.clientY-initY)/(mouseEvent.clientX-initX));
	    let start = 0;
		let end = width;
		if(mouseEvent.clientX-initX < 0 ){
			bulletVx = -1 * speedOfBullet * Math.cos(theta);
			bulletVy = -1 * speedOfBullet * Math.sin(theta);
		}
		else{
			bulletVx = speedOfBullet * Math.cos(theta);
			bulletVy = speedOfBullet * Math.sin(theta);
		}
		Crafty.e("2D,Canvas,Color,Bullet,Motion,Collision")
		.attr({x:initX,y:initY,w:5,h:5, vx : bulletVx, vy : bulletVy})
		.color("red")
		.onHit("Platform", function(){
			this.destroy();
		});
	}
	function changeColourofHP(phase){
		if (phase == "2"){
			boss_hp.color("orange");
		}
		else if(phase == "1"){
			boss_hp.color("yellow");
			boss[0].trigger("NextPhase");
		}
		else if(phase == "0"){
			boss_hp.color("green");
		}
	}

	//****************************************
	//phase management for boss types
	function phaseOne(){
		//boss[1].tween({rotation:360}, 500, "smootherStep");
		boss[1].tween({rotation:360}, 1000, "smootherStep");
		animationInterval = setTimeout(() => {
			boss[2].tween({rotation:360}, 1000, "smootherStep")
			boss[3].tween({rotation:540}, 1000, "smootherStep")
		},400); //or 200

		bossInterval = setInterval(() => {
			Crafty.e("2D, Canvas, Collision, Motion,EnemyBullet")
			.Circle(boss[1].x,boss[1].y,"img/circle4.png",16,16,0);
			Crafty.e("2D, Canvas, Collision, Motion,EnemyBullet")
			.Circle(boss[1].x,boss[1].y,"img/circle4.png",16,16,1);
			Crafty.e("2D, Canvas, Collision, Motion,EnemyBullet")
			.Circle(boss[1].x,boss[1].y,"img/circle4.png",16,16,2);
			setTimeout(() => {
				Crafty.e("2D, Canvas, Collision, Motion,EnemyBullet")
				.Circle(boss[1].x,boss[1].y,"img/circle4.png",16,16,3);
				Crafty.e("2D, Canvas, Collision, Motion,EnemyBullet")
				.Circle(boss[1].x,boss[1].y,"img/circle4.png",16,16,4);
				Crafty.e("2D, Canvas, Collision, Motion,EnemyBullet")
				.Circle(boss[1].x,boss[1].y,"img/circle4.png",16,16,5);
			},200);
			Crafty.e("2D, Canvas, Collision, Motion,EnemyBullet")
			.Circle(boss[1].x,boss[1].y,"img/circle4.png",16,16,6);
			Crafty.e("2D, Canvas, Collision, Motion,EnemyBullet")
			.Circle(boss[1].x,boss[1].y,"img/circle4.png",16,16,7);
		}, 800);

		targetedInterval = setInterval(() => {
			let e = towardsEnemy(boss[1].x,boss[1].y,-300,8,8);
			e.trigger("startMoving");
			setTimeout(() => {
				e = towardsEnemy(boss[1].x,boss[1].y,-300,8,8);
				e.trigger("startMoving");
			},100)
			/*setTimeout(() => {
				e = towardsEnemy(boss[1].x,boss[1].y,-300);
				e.trigger("startMoving");
			},200)*/
		}, 1500);
	}

	function phaseTwo(){
		//clearPhase();
		boss[1].tween({x: width/2, y: height - 100 - 32},1000);
		boss[2].tween({x: width/2, y: 100},1000);
		boss[3].destroy();
		boss.splice(3,1);

		setTimeout(() => {
			bossInterval = setInterval(() => {
			let e = towardsEnemy(boss[2].x, boss[2].y, -200, 8,8);
			e.trigger("startMoving");
			e = towardsEnemy(boss[1].x, boss[1].y, -200, 8,8);
			e.trigger("startMoving");
			e = Enemy(boss[0].x, boss[0].y + 8, -100, -100);
			e.trigger("startMoving");
			e = Enemy(boss[0].x, boss[0].y + 8, -100, 100);
			e.trigger("startMoving");
			},300);
			targetedInterval = setInterval(() => {
				let e = towardsEnemy(boss[0].x, boss[0].y + 8, -100, 8,8);
				e.trigger("startMoving");
			},100);
		}, 500);
	}

	function clearPhase(){
		clearInterval(bossInterval);
		clearInterval(targetedInterval);
		clearInterval(blindInterval);
		clearInterval(blindIntervalLower);
		clearInterval(hpInterval);
		boss.forEach((b) => {
			b.vy = 0;
			b.unbind("EnterFrame",phaseFrame);
			b.unbind("EnterFrame",phaseFrame2);

		});
	}
	//***************************************************
