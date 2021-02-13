function createTable(table){
  for(row=0;row<10;row++){
    var tableRow = document.createElement('tr');
    for(col=0;col<10;col++){
      var tableData = document.createElement('td');
      var data = document.createTextNode("X");
      tableData.appendChild(data);
      // TODO add onlick feature to each tableData var
      tableRow.appendChild(tableData);
    }
    table.appendChild(tableRow);
  }
}
function clickedTableData(){
  
}

table = document.createElement('table'); // Create table element
createTable(table);
document.body.appendChild(table); // Append table element to body
