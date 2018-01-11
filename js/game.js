	
	//global variables
	var player = null; 
	var height = 480;
	var width = 640;
	var arrOfenemy = [];
	var boss = [];
	var teleport = null;
	var wallDistance = 50;
	var speedOfBullet = 400;
	var blindInterval = null;
	var bossInterval = null;
	var targetedInterval = null;
	var animationInterval = null;
	var blindIntervalLower = null;
	var hpInterval = null;
	var health_bar = null;
	var boss_hp = null;
	var hp = false;

window.onload = function() {
	Crafty.init(width,height);
	Crafty.canvasLayer.init();

	Crafty.defineScene("hub",function(){
		//Crafty.canvasLayer._canvas.addEventListener("click",shootOnclick, true);
		//Crafty.canvasLayer._canvas.addEventListener("contextmenu",teleportOnClick);
		Crafty.canvasLayer._canvas.addEventListener("mousemove",keepShooting);
		Crafty.background("#f0f8ff");

		var newZero = wallDistance;
		var newWidth = width-wallDistance;
		var newHeight = height-wallDistance;

		Boundaries(width, height,
			[0,0],[newWidth,0],[0,newHeight],[newWidth,newHeight],"#9e9478",wallDistance);

		Crafty.e("2D,Canvas,Color,Collision,Motion").
		attr({x : width-wallDistance-1  , y : height/2 - 15  , w:26 , h:25}).
		color("black")
		.onHit("Player",() => {
			delete player;
			player = null;
			Crafty.enterScene("level1");
		});
		if(player === null){
			player = new Player(100,height/2);
			let tracker = Crafty.e("2D, Canvas, Collision, Motion, Color")
			.attr({x : player.attr("x") - 10, y : player.attr("y") - 10, w : player.attr("w") + 20, h : player.attr("h") + 20})
			.color("black");
			player.attach(tracker);
		}
		

		
	});
	//**********//
	//define levels
	
	Crafty.defineScene("level1",function(){
		//Crafty.canvasLayer._canvas.addEventListener("click",shootOnclick);
		Crafty.canvasLayer._canvas.addEventListener("mousemove",keepShooting);
		//Crafty.canvasLayer._canvas.addEventListener("contextmenu",teleportOnClick);
		var newZero = wallDistance;
		var newWidth = width-wallDistance;
		var newHeight = height-wallDistance;
		Crafty.background("#f0f8ff");

		Boundaries(width, height,
			[0,0],[newWidth,0],[0,newHeight],[newWidth,newHeight],"#9e9478",wallDistance);

		health_bar = new Health(120,10,20,5,"green");
		player = new Player(100,height/2);
		let tracker = Crafty.e("2D, Canvas, Collision, Motion, Color")
		.attr({x : player.attr("x") - 10, y : player.attr("y") - 10, w : player.attr("w") + 20, h : player.attr("h") + 20})
		.color("black");
		player.attach(tracker);

		health_bar.bind("EnterFrame",function(){
			this.w = player.attr("hp");
		});
		var text = Crafty.e("2D,Text,DOM").
		attr({x: 5, y: 5})
		.text(function () { return "HP:"; })
		.textColor("green");
		boss = BossType1();
		
		var circleCoords = getCircleCoordinates(boss[0].attr("w") / 2);
		boss.forEach((circle) => {
			circle.collision(circleCoords);
			circle.vy = 100;
		});

		player.one("BlindSpotON",blindspotON);
		player.one("BlindSpotONLower",blindspotONLower);
		player.bind("EnterFrame", function() {
			if(this.x > 390){
				if(this.y < height / 2){
					player.trigger("BlindSpotOFFLower")
					player.trigger("BlindSpotON");
				}
				else{
					player.trigger("BlindSpotOFF");
					player.trigger("BlindSpotONLower");
				}
			}
			else{
				player.trigger("BlindSpotOFF");
				player.trigger("BlindSpotOFFLower");
			}
		});

		//phaseTwo();
		phaseOne();
	});

	Crafty.defineScene("GameOver",function(){
		clearPhase();
		clearInterval(animationInterval);
		Crafty.canvasLayer._canvas.removeEventListener("mousemove",keepShooting);
		//Crafty.canvasLayer._canvas.removeEventListener("contextmenu",teleportOnClick);
		var isRestart = confirm("You lost, try again?");
		if(isRestart){
			Crafty.enterScene("level1");
		}

	});

	Crafty.defineScene("Win",function(){
		//Crafty.canvasLayer._canvas.removeEventListener("mousemove",keepShooting);
		clearPhase();
		var newZero = wallDistance;
		var newWidth = width-wallDistance;
		var newHeight = height-wallDistance;
		Crafty.background("#f0f8ff");

		Boundaries(width, height,
			[0,0],[newWidth,0],[0,newHeight],[newWidth,newHeight],"#9e9478",wallDistance);

		player = new Player(100,height/2);
		let tracker = Crafty.e("2D, Canvas, Collision, Motion, Color")
		.attr({x : player.attr("x") - 10, y : player.attr("y") - 10, w : player.attr("w") + 20, h : player.attr("h") + 20})
		.color("black");
		player.attach(tracker);

		Crafty.e("2D,Text,DOM").
		attr({x: width/2-30, y: height/2-30})
		.text("End")
		.textFont({ size: "30px", family: "Comic Sans MS"})
		.textColor("black");

	});
	
	Crafty.enterScene("hub");	
	//Crafty.enterScene("level1");	
}