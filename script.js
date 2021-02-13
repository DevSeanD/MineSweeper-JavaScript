function createTable(table){
  for(row=0;row<10;row++){
    var tableRow = document.createElement('tr');
    for(col=0;col<10;col++){
      var tableData = document.createElement('td');
      var data = document.createTextNode("X");
      tableData.appendChild(data);      tableRow.appendChild(tableData);
      tableData.onclick = function(){clickedTableData(this);};
    }
    table.appendChild(tableRow); 
  }
}
function clickedTableData(){
  console.log("It works");
}

table = document.createElement('table'); // Create table element
table.setAttribute("onmousedown", "clickedTableData"); // So able elements are clickable
createTable(table);
document.body.appendChild(table); // Append table element to body
