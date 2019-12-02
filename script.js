class Character{
	constructor(name, standName, hp, statusEffect, speed){
		this.name = name;
		this.standName = standName;
		this.hp = hp;
		this.statusEffect = statusEffect;
		this.speed = speed;
		this.standGauge = 0;
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

var jotaro = new Character("Jotaro", "Star Platinum", 100, "none", 5);

var dio = new Character("DIO", "The World", 100, "none", 4);

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
	/*
		if(target.hp <= 0 && target.name = "Jotaro"){
			alert("Your HP reached 0, you lose");
		}else if(target.hp <= 0){
			alert("Your enemy's HP reached 0, you win");
		}
	*/
}
function rectangle(){
	var c = document.getElementById("mainCanvas");
	var ctx = c.getContext("2d");
	ctx.fillStyle = "#FF0000";
	ctx.fillRect(10, 10, 150, 75);
}