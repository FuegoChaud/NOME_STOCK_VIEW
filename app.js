var addItemButton = document.getElementById('button-ajout') ;
var NewLine= document.getElementById('Template'); 
var Table= document.getElementById('Table1')

addItemButton.addEventListener('click', () =>{
    var row = Table.insertRow(1)
    var cell1 = row.insertCell(0);
    var cell2 = row.insertCell(1);
    var cell3 = row.insertCell(2);
    var cell4 = row.insertCell(3);
    var cell5 = row.insertCell(4);
    cell1.innerHTML = document.getElementById("Image").value;
    cell2.innerHTML = document.getElementById("Description").value;
    cell3.innerHTML = document.getElementById("Stock").value;
    cell4.innerHTML = '<Button id=button-plus class="material-icons"> add_circle_outline </Button>';
    cell5.innerHTML = '<button id=button-moins class="material-icons"> remove_circle_outline</button>';
}); 

addButton= document.getElementb

addButton.addEventListener('click' () =>{

})

