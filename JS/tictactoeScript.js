var turn = "o";


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



$("table").on("click","td",function(){
	var that = this;
	
  if ($(this).not(".x,.o").length!=0){
    if (turn==="o"){
      $(this).addClass("o");
      
    } else {
      $(this).addClass("x");
      
    }
	function checkWinner(){
	  	
		
	  var col = $(that).attr("data-col");
	  var row = $(that).attr("data-row");
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
		console.log(i,k)
		return (i==3||k==3);
	  }
	  if($("td[data-col='"+col+"']."+turn).length>=3||diagonals()){alert( turn + " won !" ); return}
	  if($("td[data-row='"+row+"']."+turn).length>=3){alert(turn + " won !")}
	  
  }
	checkWinner();
	turn == "x" ? turn = "o":turn="x";
  }
})
