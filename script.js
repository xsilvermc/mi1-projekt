class Character{
	constructor(name, hp){
		this.name = name;
		this.hp = hp;
		this.recharge = false;
	}
}

var player = new Character("player", 100);

var enemy1 = new Character("Dio", 100);

var currentEnemy = enemy1;

var actionName;

window.onload = function() {
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
		document.getElementById('line1').innerHTML = 'What will player do?';
	}, 4000);
}

function newTurn(){
	document.getElementById('line1').innerHTML = 'What will player do?';
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

/*
function disableButtons(){
	document.getElementById('button1').setAttribute('onclick','console.log("do not get impatient now")');
	document.getElementById('button2').setAttribute('onclick','console.log("do not get impatient now")');
	document.getElementById('button3').setAttribute('onclick','console.log("do not get impatient now")');
}
*/

var dead = function(){
	if(currentEnemy.hp == 0){
		return true;
	}else{
		return false;
	}
}

function drawBattle(battleNo){
	var c = document.getElementById("mainCanvas");
	var ctx = c.getContext("2d");
	var player = document.getElementById("player");
	var bg = document.getElementById("bg");
	var enemy = document.getElementById("enemy1");
	ctx.drawImage(bg, 0, 0);
	ctx.drawImage(player, 50, 150);
	ctx.drawImage(enemy, 600, 100);
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