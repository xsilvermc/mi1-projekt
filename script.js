class Character{
	constructor(name, hp){
		this.name = name;
		this.hp = hp;
		this.recharge = false;
	}
}

var jotaro = new Character("Jotaro", 100);

var dio = new Character("Dio", 100);

var currentEnemy = dio;

var actionName;

window.onload = function() {
	drawBattle(1);
};

function punch(attacker, target){
	actionName = "punch";
	var dmg = 8;
	if((Math.floor((Math.random() * 100) + 1)) > 10){
		switch (target){
		case jotaro:
			jotaro.hp -= dmg;
			break;
		
		case dio:
			dio.hp -= dmg;
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
		case jotaro:
			jotaro.hp -= dmg;
			break;
		
		case dio:
			dio.hp -= dmg;
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
				case jotaro:
					jotaro.hp -= dmg;
					break;
			
				case dio:
					dio.hp -= dmg;
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
	user.recharge = true;
}

function newHP(target){
	switch (target){
		case jotaro:
			if(jotaro.hp <= 0){
				alert("Your HP reached 0, you lose");
				jotaro.hp = 0;
			}
			document.getElementById('jojoHP').innerHTML = jotaro.hp;
			break;
		
		case dio:
			if(dio.hp <= 0){
				alert("Your enemy's HP reached 0, you win");
				dio.hp = 0;
			}
			document.getElementById('dioHP').innerHTML = dio.hp;
			break;
	}
}

function turn(playerAction){
	if(!jotaro.recharge){
		switch (playerAction){
			case punch:
				punch(jotaro, currentEnemy);
				break;
			case throwObject:
				throwObject(jotaro, currentEnemy);
				break;
			case punchBarrage:
				punchBarrage(jotaro, currentEnemy);
				break;
		}
	}else{
		document.getElementById('line1').innerHTML = "Jotaro is tired and needs to recharge!";
		jotaro.recharge = false;
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
					punch(currentEnemy, jotaro);
					break;
				case 2:
					throwObject(currentEnemy, jotaro);
					break;
				case 3:
					punchBarrage(currentEnemy, jotaro);
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
		document.getElementById('line1').innerHTML = 'What will Jotaro do?';
	}, 4000);
}

function newTurn(){
	document.getElementById('line1').innerHTML = 'What will Jotaro do?';
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
	var jojo = document.getElementById("jojo");
	var egypt = document.getElementById("egypt");
	var dio = document.getElementById("dio");
	ctx.drawImage(egypt, 0, 0);
	ctx.drawImage(jojo, 50, 100);
	ctx.drawImage(dio, 600, 100);
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

var buttonColor = ['#69ffff','#ff69ff','#ffff69'];
var buttonBorderColor = ['#21aaaa','#aa21aa','#aaaa21'];

/*
function toHex(decimal){
	var first = Math.floor(decimal/16);
	var second = decimal - (first*16);
	console.log(encodeHex(first));
	console.log(encodeHex(second));
}

function encodeHex(decimalDigit){
	var hexCode = ['0','1','2','3','4','5','6','7','8','9','a','b','c','d','e','f'];
	var returning = hexCode[decimalDigit];
	return returning;
}
*/