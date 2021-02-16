class dataCell{
  constructor(flag,data){ // Flag - Visited | Data - Value
    this.flag = flag;
    this.data = data;
  }
}

const QEMOJI = '&#x2753';
const XEMOJI = "&#x2716";
var gameBoard = [];// Init gameBoard

initGameBoard(9,9);

function initGameBoard(numRow,numCol){
  for(var row = 0; row < numRow; row++){
    gameBoard[row] = [];
    for(var col = 0; col < numCol; col++){
      gameBoard[row][col] = new dataCell(0,'?'); // Init state of cell | 0 - Not Visited | 0 - not Bomb
    }
  }
}

function createTable(table){

  var tableArray = [];

  for(row=0; row<9; row++){

    var tableRow = document.createElement('tr');

    for(col = 0; col < 9 ; col++){

      var tableData = document.createElement('td');
      var tableCell = document.createTextNode(gameBoard[row][col].data)
      tableData.appendChild(tableCell);
      tableRow.appendChild(tableData);
      tableData.onclick = function(){clickedTableData(this);};
    }
    table.appendChild(tableRow); 
  }
}

function clickedTableData(dataCell){
  rIndex = dataCell.parentElement.rowIndex;
  cIndex = dataCell.cellIndex;
  console.log("Row : "+rIndex+" , Cell : "+cIndex);
}

var numRow = 9;
var numCol = 9;

table = document.createElement('table'); // Create table element

table.setAttribute("onmousedown", "clickedTableData"); // So able elements are clickable

createTable(table);

document.body.appendChild(table); // Append table element to body
