var turn = "o";
const PLAYER_T ="o";
const CPU_T = "x";
var grid = [
	["","",""],
	["","",""],
	["","",""],
	];



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


window.onload = createT;

function moveAI(){
	var move = $("td").not(".o,.x")[0];
	move.classList.add("x");
	if (checkWinner(move)){alert(checkWinner(move))}
	toggleTurn();
	;
	}
	
function toggleTurn(){turn == "x" ? turn = "o":turn="x"}
	
function checkWinner(cell){
	var col = $(cell).attr("data-col");
	var row = $(cell).attr("data-row");
	console.log(col);
	function diagonals(){
		var i = 0;
		var k = 0;
		var ccol = col;
		var crow = row;
		var bl = $("td[data-col='0'][data-row='2']");
		var br = $("td[data-col='2'][data-row='2']");
		while (bl.attr("class") == turn&&i<3){
			i++
			bl = $("td[data-col='"+(i)+"'][data-row='"+(2-i)+"']");
		}
		
		while (br.attr("class") == turn&&k<3){
			k++	
			br = $("td[data-col='"+(2-k)+"'][data-row='"+(2-k)+"']");
		}
		//console.log(i,k)
		return (i==3||k==3);
    }
  
  if($("td[data-col='"+col+"']."+turn).length>=3||diagonals()){return turn}
  if($("td[data-row='"+row+"']."+turn).length>=3){return turn}
  return grid.reduce((a,b)=>a.concat(b),[]).includes("")?false:null;
	  
}



$("table").on("click","td",function(){
	var that = this;

    if ($(this).not(".x,.o").length!=0){
      if (turn==="o"){
        $(this).addClass("o");
      
    } else {
        $(this).addClass("x"); 
    }
	console.log(checkWinner(this));
    if (checkWinner(this)){alert(checkWinner(this))};
	toggleTurn();
	grid = [];
	$("tr").each(function(index,val){grid.push($(val).children().toArray().map(x=> x.className))} );
	if (turn === CPU_T){moveAI()};
	
  }
})
