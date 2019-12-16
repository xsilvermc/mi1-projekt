class Character{
	constructor(name, standName, standAbility, hp, statusEffect, speed){
		this.name = name;
		this.standName = standName;
		this.hp = hp;
		this.statusEffect = statusEffect;
		this.speed = speed;
		this.standGauge = 0;
		this.standAbility = standAbility;
	}
}

function punch(attacker, target){
	if((Math.floor((Math.random() * 100) + 1)) > 10){
		switch (target){
		case jotaro:
			jotaro.hp -= 15;
			break;
		
		case dio:
			dio.hp -= 15;
			break;
		}
		newHP(target);
	}else{
		alert(attacker.name + "'s attack missed!");
	}
}
	
function throwObject(attacker, target){
	if((Math.floor((Math.random() * 100) + 1)) > 5){
		switch (target){
		case jotaro:
			jotaro.hp -= 10;
			break;
		
		case dio:
			dio.hp -= 10;
			break;
		}
		newHP(target);
	}else{
		alert("The thrown object missed!");
	}
}

function punchBarrage(user, target){
	for(var i = 0; i < 5; i++){
		if((Math.floor((Math.random() * 100) + 1)) > (0 + i*8)){
			switch (target){
				case jotaro:
					jotaro.hp -= 8;
					break;
			
				case dio:
					dio.hp -= 8;
					break;
			}
			newHP(target);
		}else{
			alert(user.name + "'s attack missed!");
		}
	}
}

var jotaro = new Character("Jotaro", "Star Platinum", "Time Stop", 100, "none", 5);

var dio = new Character("DIO", "The World", "Time Stop", 100, "none", 4);

function newHP(target){
	switch (target){
		case jotaro:
			document.getElementById('jotaroHP').innerHTML = jotaro.hp;
			if(jotaro.hp <= 0){
				alert("Your HP reached 0, you lose");
			}
			break;
		
		case dio:
			document.getElementById('dioHP').innerHTML = dio.hp;
			if(dio.hp <= 0){
				alert("Your enemy's HP reached 0, you win");
			}
			break;
	}
}

//note: vertical has to be 75% of horizontal

function drawBattle(battleNo){
	var c = document.getElementById("mainCanvas");
	var ctx = c.getContext("2d");
	var jojo = document.getElementById("jojo");
	var egypt = document.getElementById("egypt");
	var dio = document.getElementById("dio");
	ctx.drawImage(egypt, 0, 0);
	ctx.drawImage(jojo, 50, 100);
	ctx.drawImage(dio, 600, 100);
	document.getElementById('line1').innerHTML = 'BATTLE HAS BEGUN';
	document.getElementById('line2').innerHTML = "JoJo's HP: "+jotaro.hp+"/100     JoJo's ability: "+jotaro.standAbility;
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