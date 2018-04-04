var turn = "o";
const PLAYER_T ="o";
const CPU_T = "x";
var grid = [
	["","",""],
	["","",""],
	["","",""],
	];

function maxby(col,key){
  return col.reduce((a,b)=> a[key] >= b[key] ? a:b,{})
}

function minby(col,key){
  return col.reduce((a,b)=> a[key] <= b[key] ? a:b,{})
}



function createT(){
  var tb = $("#tb");
  for(i=0;i<3;i++){
    var $row = $("<tr>");
    tb.append($row);
    for (k=0;k<3;k++){
      var $col = $("<td>");
      $row.append($col);
      $col.attr("data-col",k);
      $col.attr("data-row",i);
    }
  }
}


window.onload = function(){createT(); };


function moveAI(){
	
	if ($("td").not(".o,.x").length>=8){var move = firstMove()
	}else { var move = minMax($("table"),0,CPU_T);}
	$("td[data-col='"+ move.col +"'][data-row='"+ move.row +"']").addClass("x");
	if (checkWinner($("table"))){alert(checkWinner($("table")))}
	toggleTurn();
	}
	
function toggleTurn(){turn == "x" ? turn = "o":turn="x"}
function firstMove(){
	var middle = $("td[data-col='1'][data-row='1']");
	
	if (middle.attr("class")==undefined){return {col:1,row:1}}
	var move = $("td").not(".o,.x,[data-col='1'],[data-row='1']");
	var r = Math.floor(Math.random()*move.length);
	console.log(move);
	console.log(r)
	var z = {col : move[r].getAttribute("data-col"),
			 row : move[r].getAttribute("data-row")};
	console.log(z);
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




$("table").on("click","td",function(){
	
	var that = this;

    if ($(this).not(".x,.o").length!=0){
      if (turn==="o"){
        $(this).addClass("o");
      
    } else {
        $(this).addClass("x"); 
    }
	
	
	
	
	
	var winner = checkWinner($("table"))
    if (winner){
		alert(winner)
		} else if (winner == null){alert("tie !")};
	toggleTurn();
	if (turn === CPU_T){moveAI()};
	
	//console.log(test);
	
  }
})


function checkWinner($grid) {
	
	var grid = [];
	/*$grid.find("tr").each(function(index,val){
		grid.push(Array.from(val.children).map(x=>x.className))
	})*/
	
	
	
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
 