function createTable(table){
  for(row=0;row<10;row++){
    var tableRow = document.createElement('tr');
    for(col=0;col<10;col++){
      var tableData = document.createElement('td');
      tableData.innerHTML = XEMOJI;      
      tableRow.appendChild(tableData);
      tableData.onclick = function(){clickedTableData(this);};
    }
    table.appendChild(tableRow); 
  }
}
function clickedTableData(){
  console.log("It works");
}

const XEMOJI = "&#x2716"
table = document.createElement('table'); // Create table element
table.setAttribute("onmousedown", "clickedTableData"); // So able elements are clickable
createTable(table);
document.body.appendChild(table); // Append table element to body
