class Character{
	constructor(name, hp, xPos, yPos, id){
		this.name = name;
		this.hp = hp;
		this.recharge = false;
		this.x = xPos;
		this.y = yPos;
		this.id = id;
		this.image = document.getElementById(id);
	}
}

var player = new Character("player", 100, 50, 175, "player");

var enemy1 = new Character("Dio", 100, 600, 100, "enemy1");

var enemy2 = new Character("jeff", 100, 600, 160, "enemy2");

var enemy3 = new Character("john", 100, 650, 120, "enemy3");

var enemy4 = new Character("fred", 100, 620, 65, "enemy4");

var enemy5 = new Character("shaggy", 100, 590, 120, "enemy5");

var enemy6 = new Character("scoob", 100, 640, 110, "enemy6");

var currentEnemy = enemy6;

var actionName;

window.onload = function() {
	//drawMap();
	drawBattle(1);
};

function punch(attacker, target){
	actionName = "punch";
	var dmg = 8;
	if((Math.floor((Math.random() * 100) + 1)) > 10){
		switch (target){
		case player:
			player.hp -= dmg;
			break;
		
		case currentEnemy:
			currentEnemy.hp -= dmg;
			break;
		}
		document.getElementById('line1').innerHTML = attacker.name + " used "+ actionName + "!";
		newHP(target);
	}else{
		document.getElementById('line1').innerHTML = attacker.name + "'s attack missed!";
	}
}
	
function throwObject(attacker, target){
	actionName = "throw Object";
	var dmg = 5;
	if((Math.floor((Math.random() * 100) + 1)) > 5){
		switch (target){
		case player:
			player.hp -= dmg;
			break;
		
		case currentEnemy:
			currentEnemy.hp -= dmg;
			break;
		}	
		document.getElementById('line1').innerHTML = attacker.name + " used "+ actionName + "!";
		newHP(target);
	}else{
		document.getElementById('line1').innerHTML = attacker.name + "'s thrown object missed!";
	}
}

function punchBarrage(attacker, target){
	actionName = "Punch Barrage";
	var hits = 0;
	var dmg = 4;
	for(var i = 0; i < 5; i++){
		if((Math.floor((Math.random() * 100) + 1)) > (5 + i*12)){
			switch (target){
				case player:
					player.hp -= dmg;
					break;
			
				case currentEnemy:
					currentEnemy.hp -= dmg;
					break;
			}
			newHP(target);
			hits++;
		}else{
			break;
		}
	}
	document.getElementById('line1').innerHTML = attacker.name + " used "+ actionName + "!";
	document.getElementById('line2').innerHTML = attacker.name + " hit " + hits + " times";
	attacker.recharge = true;
}

function newHP(target){
	switch (target){
		case player:
			if(player.hp <= 0){
				alert("Your HP reached 0, you lose");
				player.hp = 0;
			}
			document.getElementById('jojoHP').innerHTML = player.hp;
			break;
		
		case currentEnemy:
			if(currentEnemy.hp <= 0){
				alert("Your enemy's HP reached 0, you win");
				currentEnemy.hp = 0;
			}
			document.getElementById('dioHP').innerHTML = currentEnemy.hp;
			break;
	}
}

function turn(playerAction){
	disableButtons();
	if(!player.recharge){
		switch (playerAction){
			case punch:
				punch(player, currentEnemy);
				break;
			case throwObject:
				throwObject(player, currentEnemy);
				break;
			case punchBarrage:
				punchBarrage(player, currentEnemy);
				break;
		}
	}else{
		document.getElementById('line1').innerHTML = "player is tired and needs to recharge!";
		player.recharge = false;
	}
	setTimeout(function(){
		document.getElementById('line2').innerHTML = "";
	}, 1990)
	if(!dead() && !currentEnemy.recharge){
		setTimeout(function(){
			//insert pseudo AI here
			var enemyAction = Math.floor(Math.random()*3)+1;
			switch (enemyAction){
				case 1:
					punch(currentEnemy, player);
					break;
				case 2:
					throwObject(currentEnemy, player);
					break;
				case 3:
					punchBarrage(currentEnemy, player);
					break;
			}
		}, 2000);
	}else if(!dead()){
		setTimeout(function(){
			document.getElementById('line1').innerHTML = currentEnemy.name + " is tired and needs to recharge!";
			currentEnemy.recharge = false;
		}, 2000);
	}
	setTimeout(function(){
		document.getElementById('line2').innerHTML = "";
	}, 3990);
	setTimeout(function(){
		newTurn();
	}, 4000);
}

function newTurn(){
	document.getElementById('line1').innerHTML = 'What will player do?';
	enableButtons();
}

function gameOver(){
	var c = document.getElementById("mainCanvas");
	var ctx = c.getContext("2d");
	var text = document.getElementById("gameover");
	ctx.fillRect(0,0,900,500);
	ctx.drawImage(text, 320, 200);
	document.getElementById('line1').innerHTML = "Press any button to try again";
	document.getElementById('button1').setAttribute('onclick','reload()');
	document.getElementById('button2').setAttribute('onclick','reload()');
	document.getElementById('button3').setAttribute('onclick','reload()');

}

function victory(){
	var c = document.getElementById("mainCanvas");
	var ctx = c.getContext("2d");
	var text = document.getElementById("victory");
	ctx.fillRect(0,0,900,500);
	ctx.drawImage(text, 350, 235);
	document.getElementById("line1").innerHTML = "Press any button to continue";
	
}

function reload(){
	player.hp = 100;
	newHP(player);
	currentEnemy.hp = 100;
	newHP(currentEnemy);
	drawBattle(currentBattle);
	console.log(currentBattle);
}

var currentBattle = function(){
	var parameters = location.search.substring(1).split("&");
	return parameters;
}

function disableButtons(){
	document.getElementById("buttonDiv").style.display = "none";
}

function enableButtons(){
	document.getElementById("buttonDiv").style.display = "block";
}

var dead = function(){
	if(currentEnemy.hp == 0){
		return true;
	}else{
		return false;
	}
}

function drawEllipse(xPos){
	var c = document.getElementById("mainCanvas");
	var ctx = c.getContext("2d");
	ctx.save();
	ctx.scale(1, 0.5);
	ctx.beginPath();
	ctx.arc(xPos, 830, 110, 0, Math.PI*2, false);
	ctx.fillStyle = "#313131";
	ctx.fill();
	ctx.closePath();
	ctx.restore();
}

function getCurrentEnemy(battleNo){
	switch(battleNo){
		case 1:
			currentEnemy = enemy1;
			break;
		case 2:
			currentEnemy = enemy2;
			break;
		case 3:
			currentEnemy = enemy3;
			break;
		case 4:
			currentEnemy = enemy4;
			break;
		case 5:
			currentEnemy = enemy5;
			break;
		case 6:
			currentEnemy = enemy6;
			break;
	}
}

function drawBattle(battleNo){
	getCurrentEnemy(battleNo);
	var c = document.getElementById("mainCanvas");
	var ctx = c.getContext("2d");
	var playerImage = document.getElementById("player");
	var bg = document.getElementById("bg");
	var enemyImage = document.getElementById(currentEnemy.id);
	document.getElementById("enemyFace").src = enemyImage.src;
	ctx.drawImage(bg, 0, 0);
	drawEllipse(170);
	drawEllipse(700);
	ctx.drawImage(playerImage, player.x, player.y);
	ctx.drawImage(enemyImage, currentEnemy.x, currentEnemy.y);
	document.getElementById('button1').setAttribute('onclick','turn(punch)');
	document.getElementById('button2').setAttribute('onclick','turn(throwObject)');
	document.getElementById('button3').setAttribute('onclick','turn(punchBarrage)');
	newTurn();
}

function changeButtonColor(colorIndex){
	for(var i = 1; i <= 4; i++){
		var targetButton = "button" + i;
		document.getElementById(targetButton).style.backgroundColor = buttonColor[colorIndex];
		document.getElementById(targetButton).style.borderColor = buttonBorderColor[colorIndex];	
	}
	console.log("buttons changed");
}

function drawMap(){
	var map = document.getElementById("map");
	var path = document.getElementById("path");
	var castle = document.getElementById("castle");
	var bottomY = 505;
	var middleY = 256;
	var topY = 9;
	var leftX = 169;
	var midLeftX = 510;
	var midRightX = 825;
	var rightX = 1140;
	var c = document.getElementById("mapCanvas");
	var ctx = c.getContext("2d");
	ctx.drawImage(map,0,0);
	ctx.drawImage(path,0,0);
	ctx.drawImage(castle,midLeftX,bottomY);
	ctx.drawImage(castle,rightX,bottomY);
	ctx.drawImage(castle,leftX,middleY);
	ctx.drawImage(castle,midRightX,middleY);
	ctx.drawImage(castle,midLeftX,topY);
	ctx.drawImage(castle,rightX,topY);
}

function outputXY(){
	var x = event.clientX;     // Get the horizontal coordinate
	var y = event.clientY;     // Get the vertical coordinate
	var coor = "X coords: " + x + ", Y coords: " + y;
	console.log(coor);
}

var getX = function(){
	var x = event.clientX;
	return x;
}

var getY = function(){
	var y = event.clientY;
	return y;
}

function levelSelect(){
	var bottomY = 505;
	var middleY = 256;
	var topY = 9;
	var leftX = 169;
	var midLeftX = 510;
	var midRightX = 825;
	var rightX = 1140;
	var mouseX = getX();
	var mouseY = getY();
	if((mouseX > midLeftX)&&(mouseX < (midLeftX + 128)) && (mouseY > bottomY) && (mouseY < (bottomY + 128))){
		alert("level 1 starts now");
	}else{
		alert("X coords: " + mouseX + ", Y coords: " + mouseY);
	}
}