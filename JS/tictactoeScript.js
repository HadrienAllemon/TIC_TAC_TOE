$(document).ready(function(){

var turn = "o";
var PLAYER_T =undefined;
var CPU_T = undefined;
var grid = [
	["","",""],
	["","",""],
	["","",""],
	];
var winner = false;
// maxBy and minBy
function maxby(col,key){
  return col.reduce((a,b)=> a[key] >= b[key] ? a:b,{})
}

function minby(col,key){
  return col.reduce((a,b)=> a[key] <= b[key] ? a:b,{})
}
// Probability

function prob(n){
	return (!!n && Math.random()>n)
}

Math.choose = function(n){
	var l = arguments.length;
	return Array.from(arguments)[Math.floor(l*Math.random())]
}


// create Table func
function createT(){
  var tb = $("#tb");
  for(i=0;i<3;i++){
    var $row = $("<tr>");
    tb.append($row);
    for (k=0;k<3;k++){
      var $col = $("<td>");
	  var $canvas = $("<canvas>")
      $row.append($col);
	  $col.append($canvas);
      $col.attr("data-col",k);
      $col.attr("data-row",i);
    }
  }
}





function moveAI(){
	
	if ($("td").not(".o,.x").length>=8){var move = firstMove()
		} else { var move = minMax($("table"),0,CPU_T);}
	$("td[data-col='"+ move.col +"'][data-row='"+ move.row +"']").addClass(CPU_T);
	newChar(move.col,move.row);
	winner = checkWinner($("table"))
	if (winner){$(".winBox").css("display","inline");$("span").html(winner.toUpperCase());$("span").css("color",winner==="o"?"green":"red")
		} else if (winner == null){$("winBox").css("display","inline");$(".winBox > p").html("Null !!")};
	toggleTurn();
	}
	
function toggleTurn(){turn == "x" ? turn = "o":turn="x"}
function firstMove(){
	var middle = $("td[data-col='1'][data-row='1']");
	
	if (middle.attr("class")==undefined){return {col:1,row:1}}
	var move = $("td").not(".o,.x,[data-col='1'],[data-row='1']");
	var r = Math.floor(Math.random()*move.length);
	var z = {col : move[r].getAttribute("data-col"),
			 row : move[r].getAttribute("data-row")};
	return z
}
function minMax($newGrid,depth,player){
	
	const gameState = checkWinner($newGrid);

	
	if (gameState == false){
		var values = [];
	    var grid = $newGrid.find("td");
		for(let i=0;i<9;i++){
			
			if (grid[i].className!==""){continue}
			var gr = $newGrid.clone();
			$(gr).find("td")[i].classList.add(player);
			value = minMax(gr,depth +1,(player==PLAYER_T)?CPU_T:PLAYER_T);
		
			values.push({	
				cost : value,
				cell :{
				  col : $(gr).find("td")[i].getAttribute("data-col"),
				  row : $(gr).find("td")[i].getAttribute("data-row")
				}
				});
		};
		
		
		if (player==CPU_T){
			var max = maxby(values,"cost");
			if (depth === 0){
				return max.cell;
			} else {
				return max.cost;
			}
		} else {
			var min = minby(values,"cost");
			if (depth === 0){
			  return min.cell;
			} else {
			  return min.cost;
			}
		}
	}
	if (gameState === null){
		return 0;
	}
	if (gameState == PLAYER_T){
		return (depth - 10);
	}
	if (gameState == CPU_T){
		return (10 - depth);
	}
	
}




function checkWinner($grid) {
	
	var grid = [];
	
	
	$grid.find("tr").each(function(index,val){
		grid.push($(val).children().toArray().map(x=>x.className));
	});
	
    // ROW CHECK
    for(var i = 0; i < 3; i++) {
      if(grid[i][0] !== '' &&
        grid[i][0] === grid[i][1] &&
        grid[i][0] === grid[i][2]) {
          return grid[i][0];
        }
    }
    // COLUMN CHECK
    for(var j = 0; j < 3; j++) {
      if(grid[0][j] !== '' &&
        grid[0][j] === grid[1][j] &&
        grid[0][j] === grid[2][j]) {
          return grid[0][j];
        }
    }
    // 1st DIAGONAL CHECK
    if(grid[0][0] !== '' &&
      grid[0][0] === grid[1][1] &&
      grid[0][0] === grid[2][2]) {
        return grid[0][0];
    }
    // 2nd DIAGONAL CHECK
    if(grid[2][0] !== '' &&
      grid[2][0] === grid[1][1] &&
      grid[2][0] === grid[0][2]) {
        return grid[2][0];
    }
    // EMPTY SPOT CHECK
    for(var i=0; i<3; i++) {
		
      for(var j=0; j<3; j++) {
		  
		  
        if(grid[i][j] === '') {
          return false;
        }
      }
    }
	
    // IF NOBODY WON
	
    return null;
  }
 
 
 //canvas stuff
	createT();

	function newChar(col,row){
		var $cell = $("td[data-col='"+ col +"'][data-row='"+ row +"'] > canvas");
		character[character.length]= new Char($cell.attr("width")/2,$cell.attr("height")/2,c[$cell.attr("c")],turn, new Image());
	}
	
	
	

	var canvas = document.querySelectorAll("#tb canvas");
	var bcanvas = document.querySelector(".main canvas");
	var backC = bcanvas.getContext("2d");
	
	bcanvas.height = window.innerHeight;
	bcanvas.width = window.innerWidth;
	backC.imageSmoothingEnabled = false;
	
	
	var incr = 30;
	var birdCount=[];
	var character = [];
	var c = [];
	
	var can = {
	}
	canvas.forEach(function(val,i){ 
		val.height = val.parentElement.offsetHeight;
		val.width = val.parentElement.offsetHeight;
		
		c[i] = val.getContext("2d") ; 
		$(val).attr("c",i) });
	var chara = [];
	

var xSprites = {
	idle : "img/crossCharanimIdle.png",
	pance0 : "img/crossCharanimPance0.png",
	pance1 : "img/crossCharanimPance1.png",
	celebrate : "img/crossCharanimCelebrate1.png"
}

var oSprites = {
	idle : "img/roundCharanimIdle.png",
	pance0 : "img/roundCharanimPance1.png",
	pance1 : "img/roundCharanimPance1.png",
	celebrate : "img/roundCharanimCelebrate.png"
}

spriteSelect = {
	o : oSprites,
	x : xSprites
	
}

$("td canvas").on("click",function(event){
	var that = this.parentElement;
	if (that.getAttribute("class")!=undefined||winner){return;}
	// draw the characters

	newChar($(this).parent().attr("data-col"),$(this).parent().attr("data-row"));
	
	
	// fill the grid
	

    if ($(that).not(".x,.o").length!=0){
      if (turn==="o"){
        $(that).addClass("o");
      
    } else {
        $(that).addClass("x"); 
    }
	
	
	//check for winner
	
	
	winner = checkWinner($("table"))
    if (winner){
		$(".winBox").css("display","inline");
		$("p > span").html(winner.toUpperCase);
		$("span").css("color",winner==="o"?"green":"red");
		} else if (winner == null){$(".winBox").css("display","inline");$(".winBox > p").html("Null !!")};
	toggleTurn();
	if (turn === CPU_T&&winner===false){moveAI()};
	
  }

})



function Char(x,y,c,t,sprites){
	
	this.step = 0;

	var tturn = turn
	this.t = t;
	this.sprites = sprites;
	sprites.src = spriteSelect[t].idle
	
	this.draw = function(){
		
		s = 2.5;
	    c.drawImage(sprites,64*Math.floor(this.step),0,64,64,x-32*s,y-32*s,64*s,64*s);
		
	}
	this.update = function(){
		
		this.step+=.15;
		
		if (this.step >= ((sprites.width)/64)){
			this.step = 0;
			if (!winner){
			let r = Object.values(spriteSelect[t])[prob(.33)?0:Math.floor(Math.random()*2)+1];
			
			sprites.src = r
			}
		}
	}
} 

function drawBird(){
	
		var r = prob(.5);
		
		birdCount.push( new Bird(r*(window.innerWidth),150+Math.random()*(window.innerHeight/2),r?Math.random()*-.5-.5:Math.random()*.5+.5,Math.random()-.5,backC)  );
	
}

var interbird = setInterval(drawBird,5000);

function Bird(x,y,dx,dy,con){
	this.x = x;
	this.y = y;
	var step  = 0;
	var sprites = new Image();
	sprites.src = "img/bird.png";
	this.sprite = sprites;
	this.draw = function(){
		
		con.drawImage(sprites,32*Math.floor(step),0,32,16,x-16*1.5,y-8*1.5,32*1.5,16*1.5);
	}
	this.update = function(){
		if ((x<-32||x>window.innerWidth)||(y>window.innerHeight||y<-32)){birdCount.splice(birdCount.indexOf(this),1); delete this}
		step=(step+.1)%7;
		x+=dx;
		y+=dy;
	}
}


var i = 0;
$( ".character > canvas" ).each(function( index,val ) {
	console.log($(val).parent().width(),$(val).parent().height());
	val.width = $(val).parent().width()/2;
	val.height = $(val).parent().height();
    var cont = val.getContext("2d");
    cont.imageSmoothingEnabled = false;
    c.push(cont);
    character[character.length]= new Char(val.width/2,val.height/2,cont,(index==0)?"x":"o", new Image());
	
	
	
});

$(".character > canvas").on("click",function(){
	var arr = $(".character > canvas").toArray();
	PLAYER_T = (arr.indexOf(this)===0)?"x":"o";
	CPU_T = PLAYER_T =="o"?"x":"o"; 
	$("table").css("display","table");
	$(".character").css("display","none");
	character = [];
	console.log(turn,CPU_T,PLAYER_T);
	canvas.forEach(function(val,i){
		val.height = val.parentElement.offsetHeight;
		val.width = val.parentElement.offsetHeight;
	});
	c.forEach( val => val.imageSmoothingEnabled = false);
	c.forEach( val => val.imageSmoothingEnabled = false);
	if (CPU_T===turn){moveAI()}
});
(function animate(){

	requestAnimationFrame(animate);
	c.forEach(val => val.clearRect(0,0,val.canvas.width,val.canvas.height));
	backC.clearRect(0,0,backC.canvas.width,backC.canvas.height)
	character.forEach(val => val.draw());
	character.forEach(val => val.update());
	birdCount.forEach(val => val.draw());
	birdCount.forEach(val => val.update());
	if (winner){
		character.forEach(function(x){ if (x.t == winner){with (x){step = 0;sprites.src=spriteSelect[t].celebrate}}});
		winner = -1;
	}
	
})()

$(".reset").on("click",function(){
	debugger;
	turn = "o";
    PLAYER_T =undefined; 
    CPU_T = undefined;
	winner = false;
	console.log("success")
	character=[];
	$(".winBox").css("display","none")
	$("table").css("display","none");
	$(".character").css("display","flex");
	$("td").each((index,val)=>{
		$(val).removeAttr("class")
	})
	$(".character >canvas").each((index,val)=>{
		var cont = c[9+index]
		val.width = $(val).parent().width()/2;
	    val.height = $(val).parent().height();
		cont.imageSmoothingEnabled = false;
		character[character.length]= new Char(val.width/2,val.height/2,cont,(index==0)?"x":"o", new Image());
	})
	
})

})



