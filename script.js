class Character{
	constructor(name, hp, xPos, yPos, id, element){
		this.name = name;
		this.hp = hp;
		this.recharge = false;
		this.x = xPos;
		this.y = yPos;
		this.id = id;
		this.image = document.getElementById(id);
		this.element = element;
	}
}

class Element{
	constructor(weakness, resistance){
		this.weakness = weakness;
		this.resistance = resistance;
		this.power = 10;
	}
}

var player = new Character("Vado", 100, 50, 175, "player", "neutral");

var enemy1 = new Character("Dio", 100, 600, 100, "enemy1", "neutral");
var enemy2 = new Character("Bokcho", 150, 600, 160, "enemy2", "neutral");
var enemy3 = new Character("Millek", 150, 650, 120, "enemy3", "water");
var enemy4 = new Character("Corget", 200, 620, 65, "enemy4", "grass");
var enemy5 = new Character("Frossot", 200, 590, 120, "enemy5", "water");
var enemy6 = new Character("Darrek", 250, 640, 110, "enemy6", "fire");

var currentEnemy = enemy4;

var rightImg = ["enemy1.png","enemy2.png","enemy3.png","enemy4.png","enemy5-portrait.png","enemy6.png"];

var neutral = new Element("none", "none");
var fire = new Element("water", "grass");
var water = new Element("grass", "fire");
var grass = new Element("fire", "water");

var battleNumber = 4;

var actionName;

/** atk names:
 *  neutral: Paragon Punch || Throat Chop
 *  water: Hydro Missile   || Muddy Duster
 *  fire:  Inferno Smash   || Foul Flare
 *  grass: Blooming Blade  || Solar Pulse
 */

window.onload = function() {
	//drawMap();
	startBattle(battleNumber);
};

/*
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
*/

function neutralAttack(user){
	switch (user){
		case player:
			actionName = "Paragon Punch";
			document.getElementById('line1').innerHTML = player.name+" used Paragon Punch!";
			currentEnemy.hp -= neutral.power;
			newHP(currentEnemy);
			break;
		case currentEnemy:
			actionName = "Throat Chop";
			document.getElementById('line1').innerHTML = currentEnemy.name+" used Throat Chop!";
			player.hp -= neutral.power;
			newHP(player);
			break;
	}
}

function fireAttack(user){
	var damage = fire.power;
	switch (user){
		case player:
			actionName = "Inferno Smash";
			document.getElementById('line1').innerHTML = player.name+" used Inferno Smash!";
			if(currentEnemy.element == "water"){
				damage /= 2;
				document.getElementById('line2').innerHTML = "It was not very effective!";
			}else if(currentEnemy.element == "grass"){
				damage *= 2;
				document.getElementById('line2').innerHTML = "It was super effective!";
			}
			currentEnemy.hp -= damage;
			newHP(currentEnemy);
			break;
		case currentEnemy:
			actionName = "Foul Flare";
			document.getElementById('line1').innerHTML = currentEnemy.name+" used Foul Flare!";
			if(currentEnemy.element == "fire"){
				damage *= 1.5;
			}
			player.hp -= damage;
			newHP(player);
			break;
	}
}

function waterAttack(user){
	var damage = water.power;
	switch (user){
		case player:
			actionName = "Hydro Missile";
			document.getElementById('line1').innerHTML = player.name+" used Hydro Missile!";
			if(currentEnemy.element == "grass"){
				damage /= 2;
				document.getElementById('line2').innerHTML = "It was not very effective!";
			}else if(currentEnemy.element == "fire"){
				damage *= 2;
				document.getElementById('line2').innerHTML = "It was super effective!";
			}
			currentEnemy.hp -= damage;
			newHP(currentEnemy);
			break;
		case currentEnemy:
			actionName = "Muddy Duster";
			document.getElementById('line1').innerHTML = currentEnemy.name+" used Muddy Duster!";
			if(currentEnemy.element == "water"){
				damage *= 1.5;
			}
			player.hp -= damage;
			newHP(player);
			break;
	}
}

function grassAttack(user){
	var damage = grass.power;
	switch (user){
		case player:
			actionName = "Blooming Blade";
			document.getElementById('line1').innerHTML = player.name+" used Blooming Blade!";
			if(currentEnemy.element == "fire"){
				damage /= 2; 
				document.getElementById('line2').innerHTML = "It was not very effective!";
			}else if(currentEnemy.element == "water"){
				damage *= 2;
				document.getElementById('line2').innerHTML = "It was super effective!";
			}
			currentEnemy.hp -= damage;
			newHP(currentEnemy);
			break;
		case currentEnemy:
			actionName = "Solar Pulse";
			document.getElementById('line1').innerHTML = player.name+" used Solar Pulse!";
			if(currentEnemy.element == "grass"){
				damage *= 1.5;
			}
			player.hp -= damage;
			newHP(player);
			break;
	}
}

function newHP(target){
	switch (target){
		case player:
			if(player.hp <= 0){
				gameOver();
				player.hp = 0;
			}
			document.getElementById('playerHP').innerHTML = player.hp;
		break;
		
		case currentEnemy:
			if(currentEnemy.hp <= 0){
				victory();
				currentEnemy.hp = 0;
			}
			document.getElementById('enemyHP').innerHTML = currentEnemy.hp;
		break;
	}
}

function getEnemyAction(){
	var number = Math.floor((Math.random() * 20) + 1);
	switch (currentEnemy.element){
		case "neutral":
			if(number <= 5){
				return "neutral";
			}else if(number > 5 && number <= 10){
				return "fire";
			}else if(number > 10 && number <= 15){
				return "water";
			}else if(number > 15){
				return "grass";
			}

		case "fire":
			if(number <= 8){
				return "fire";
			}else if(number <= 13){
				return "neutral";
			}else if(number <= 18){
				return "grass";
			}else{
				return "water";
			}
			
		case "water":
			if(number <= 8){
				return "water";
			}else if(number <= 13){
				return "neutral";
			}else if(number <= 18){
				return "fire";
			}else{
				return "grass";
			}

		case "grass":
			if(number <= 8){
				return "grass";
			}else if(number <= 13){
				return "neutral";
			}else if(number <= 18){
				return "water";
			}else{
				return "fire";
			}
	}
}

function turn(playerAction){
	disableButtons();
	if((Math.floor((Math.random() * 100) + 1)) >= 15){
		switch (playerAction){
			case "neutral":
				neutralAttack(player);
				break;
			case "fire":
				fireAttack(player);
				break;
			case "water":
				waterAttack(player);
				break;
			case "grass":
				grassAttack(player);
				break;
		}
	}else{
		document.getElementById('line1').innerHTML = player.name+"'s attack missed!"; 
	}
	setTimeout(function(){
		document.getElementById('line2').innerHTML = "";
	}, 1990)
	if(!dead()&&(Math.floor((Math.random() * 100) + 1) >= 15)){
		setTimeout(function(){
			//insert pseudo AI here
			var enemyAction = getEnemyAction();
			switch (enemyAction){
				case "neutral":
					neutralAttack(currentEnemy);
					break;
				case "fire":
					fireAttack(currentEnemy);
					break;
				case "water":
					waterAttack(currentEnemy);
					break;
				case "grass":
					grassAttack(currentEnemy);
					break;
			}
		}, 2000);
	}else if(!dead()){
		setTimeout(function(){
			document.getElementById('line1').innerHTML = currentEnemy.name+"'s attack missed!"
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
	document.getElementById('line1').innerHTML = 'What will you do?';
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
	document.getElementById('button4').setAttribute('onclick','reload()');

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
	drawBattle(battleNo);
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

function getCurrentEnemy(){
	switch(battleNumber){
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

function startBattle(battleNo){
	getCurrentEnemy(battleNo);
	player.hp = currentEnemy.hp;
	document.getElementById('playerMaxHp').innerHTML = "/" + player.hp;
	document.getElementById('enemyMaxHp').innerHTML = "/" + currentEnemy.hp;
	document.getElementById('playerHP').innerHTML = player.hp;
	document.getElementById('enemyHP').innerHTML = currentEnemy.hp;
	drawBattle(battleNo);
}

function drawBattle(battleNo){
	var c = document.getElementById("mainCanvas");
	var ctx = c.getContext("2d");
	var playerImage = document.getElementById("player");
	var bg = document.getElementById("bg");
	var enemyImage = document.getElementById(currentEnemy.id);
	document.getElementById("enemyFace").src = rightImg[battleNo-1];
	ctx.drawImage(bg, 0, 0);
	drawEllipse(170);
	drawEllipse(700);
	ctx.drawImage(playerImage, player.x, player.y);
	ctx.drawImage(enemyImage, currentEnemy.x, currentEnemy.y);
	document.getElementById('enemyHeadline').innerHTML = currentEnemy.name;
	document.getElementById('button1').setAttribute('onclick','turn("neutral")');
	document.getElementById('button2').setAttribute('onclick','turn("fire")');
	document.getElementById('button3').setAttribute('onclick','turn("water")');
	document.getElementById('button4').setAttribute('onclick','turn("grass")');
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