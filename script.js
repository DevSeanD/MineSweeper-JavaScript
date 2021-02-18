/*
Sean Dever
MineSweeper
2/12/2021

Resources:
  Dr.Zhangs - MineSweeper Starter Code: https://repl.it/@DevSeanD/ms1-bfts#script.js

  MDN Web Docs - 
    Array.prototype.shift(): https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/shift

*/

// Creating constant values that will be used by each cell of the game board
const NOTVISITED = 0; // Has not been in the queue yet
const INQUEUE = 1; // Currently in Queue
const VISITED = 2; // Was in the Queue
const BOMB = 9; // Value for the bomb

// Emojis
const QEMOJI = "&#10067";
const XEMOJI = '&#x2716';
const SMILEEMOJI = '&#127773';
const BOMBEMOJI = '&#128163';

class dataCell{
  constructor(row, col, flag, data){ // Flag - Visited | Data - Value
    this.row = row;
    this.col = col;
    this.flag = flag;
    this.data = data;
    this.visitedStatus = NOTVISITED;
  }
}

function initGameBoard(numRow,numCol){
  for(var row = 0; row < numRow; row++){
    gameBoard[row] = [];
    for(var col = 0; col < numCol; col++){
      gameBoard[row][col] = new dataCell(row,col,NOTVISITED,0); // Init state of cell | 0 - Not Visited | 0 - not Bomb
    }
  }
}

function createTable(table){
  var tableArray = [];

  for(row=0; row < 9; row++){
    var tableRow = document.createElement('tr');
    
    for(col = 0; col < 9 ; col++){
      var tableData = document.createElement('td');
      var tableCell = document.createTextNode(gameBoard[row][col].data);

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
  console.log("Before");
  console.log(gameBoard[rIndex][cIndex]);
  //gameBoard[rIndex][cIndex].flag = VISITED; //flags this datacell as visted
  console.log("After");
  console.log(gameBoard[rIndex][cIndex]);
  determineClick();
}

// My implementation of MineSweeper will use a BFTS algorithm to flood fill the board.
class Queue{

  constructor(){
    this.gameQueue = []; // An array will be used to represent the queue.
  }

  clear(){
    this.gameQueue = [];
  }

  enqueue(element){ // Add item to queue using push_back(element)
    this.gameQueue.push(element);
  }

  dequeue(){ // Remove first element from the queue using shift()
  // If the queue is empty then indicate Underflow
  // else remove the first element from the queue
    if(this.isEmpty()){
      return "Underflow Occured in the Game Board Queue";
    }
    return this.gameQueue.shift();
  }

  frontElement(){ // Returns the front element in the queue
  // If the queue is empty indicate that it is empty
  // else return the first element in the queue
    if(this.isEmpty()){
      return "The Game Board Queue is empty";
    }
    return this.gameQueue[0];
  }

  isEmpty(){
    return this.gameQueue.length == 0; // the length function will return 0 if there are no element in gameQueue
  }

  returnQueue(){
    var elements = "";
    for(var i = 0; i < this.gameQueue.length; i++){
      elements += this.gameQueue[i] + " ";
    }
    return elements;
  }
}

function queueTest()
{
  var testQueue = new Queue();

  console.log(testQueue.dequeue()); // should return Underflow indicator
  console.log(testQueue.isEmpty()); // should return true

  for(var k = 0; k < 9; k++){ // add 9 elements to queue
    testQueue.enqueue(k);
  }

  while(!testQueue.isEmpty()) // While the queue is not empty
  {
    elm = testQueue.dequeue();
    console.log(elm);
  }
}
// queueTest(); // This function call returns expected valuesn

 function isOnBoard(row,col){
   if(row >= 0 && row < numOfRow && col >= 0 && col < numOfCol){
     return true;
   }
   return false;
 }

gridOffSets = [[-1,0], [-1,1], [0,1], [1,1],[1,0],[1,-1],[0,-1],[-1,-1]]; // first col for row offset

function updateOffSets(){ // Update the value of cells that are neighboring a bomb
  for(var row = 0; row < numOfRow; row++){
    for(var col = 0; col < numOfCol; col++){
      if(gameBoard[row][col].data == BOMB){
        for(var ni = 0; ni < 8; ni++){ // ni - neighbor index. There are 8 neighbors to each not border cell.
          nr = row + gridOffSets[ni][0];
          nc = col + gridOffSets[ni][1];

          if(isOnBoard(nr,nc) && (gameBoard[nr][nc].data != BOMB)){
            gameBoard[nr][nc].data++;

            //console.log("Updated value");
          }
        }
      }
    }
  }
}

function createGameBoard(numOfRow, numOfCol, percentage){
  for(var row = 0; row < numOfRow; row++){
    gameBoard[row] = [];
    for(var col = 0; col < numOfCol; col++){
      percent = Math.random();

      if(percent <= percentage){
        data = BOMB;
        numOfRow++;
      }
      else{
        data = 0;
      }
      gameBoard[row][col] = new dataCell(row,col,1,data);  
    } 
  }
}

function determineClick(){
  if(gameBoard[rIndex][cIndex].data == BOMB){
    showCell(rIndex,cIndex);
    alert("Game Over, You have clicked a bomb");
    return;
  }
  if(gameBoard[rIndex][cIndex].data != 0){
    showCell(rIndex,cIndex);
    return;
  }
  else{
    floodFill(rIndex,cIndex);
  }
}

function floodFill(ri,ci) // ri - row index | ci - column index
{
  gameBoard[ri][ci].visitedStatus = INQUEUE;

  ffqueue.enqueue(gameBoard[ri][ci]);
  while(!ffqueue.isEmpty()) // while the queue is not empty
  {
    current = ffqueue.dequeue();
    current.visitedStatus = VISITED;
  
    showCell(current.row,current.col);

    if(current.data == 0){
      for(var ni = 0; ni < 8; ni++){
        nr = current.row + gridOffSets[ni][0];
        nc = current.col + gridOffSets[ni][1];
        
        if(isOnBoard(nr,nc) && gameBoard[nr][nc].visitedStatus == NOTVISITED && gameBoard[nr][nc].data != BOMB){
          ffqueue.enqueue(gameBoard[nr][nc]);
          gameBoard[nr][nc].visitedStatus == INQUEUE;
        }
      }
    }
  }
}

function showCell(ri,ci)
{
  if(gameBoard[ri][ci].data == 0){
    table.rows[ri].cells[ci].innerHTML = SMILEEMOJI;
  }
  if(gameBoard[ri][ci].data == BOMB){
    table.rows[ri].cells[ci].innerHTML = BOMBEMOJI;
  }
  if(gameBoard[ri][ci].data != BOMB && gameBoard[ri][ci].data > 0){
   table.rows[ri].cells[ci].innerHTML = gameBoard[ri][ci].data;  
  }
}

//Entry point
var ffqueue = new Queue();
var numOfRow = 9;
var numOfCol = 9;
var numOfBombs;
var numOfCells = numOfRow * numOfCol;

var gameBoard = [];// Init gameBoard
initGameBoard(9,9);

table = document.createElement('table'); // Create table element
table.setAttribute("id", "gameBoard");

createTable(table);

document.body.appendChild(table); // Append table element to body


createGameBoard(9,9,.09);
updateOffSets();
