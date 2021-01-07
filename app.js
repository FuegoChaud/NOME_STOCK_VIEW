var addItemButton = document.getElementById('button-ajout') ;
var NewLine= document.getElementById('Template'); 
var Table= document.getElementById('Table1')

const TABLE_ROW_NODE_NAME = 'TR' 

// Ajout d'un item
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
    cell4.innerHTML ='<button id="button-plus"><img src="add_box-24px.svg" width="70" onclick="incrementStock(this)"</button>';
    cell5.innerHTML ='<button id="button-moins"><img src="indeterminate_check_box-24px.svg" width="70"  onClick="decrementStock(this)"> </button>'

//Reset les inputs
    document.getElementById("Image").value=''; 
    document.getElementById("Description").value='';
    document.getElementById("Stock").value='';

}); 

// +1 et -1 
function incrementStock(el) {
    let parentTableRow = getParentTableRowRecursive(el)

    if (parentTableRow) {
        const stockCell = parentTableRow.cells[2]

        if (stockCell) {
            stockCell.innerHTML = stockCell.innerHTML ? parseInt(stockCell.innerHTML) + 1 : 1
        }
    }
}

function decrementStock(el) {
    let parentTableRow = getParentTableRowRecursive(el)

    if (parentTableRow) {
        const stockCell = parentTableRow.cells[2]

        if (stockCell) {
            stockCell.innerHTML = stockCell.innerHTML ? parseInt(stockCell.innerHTML) - 1 : 1
        }
    }
}

function getParentTableRowRecursive(el) { 
    if (!el || !el.parentNode) {
        return undefined
    } else if (el.parentNode) {
        if (el.parentNode.nodeName === TABLE_ROW_NODE_NAME) {
                return el.parentNode
        }

        return getParentTableRowRecursive(el.parentNode)
    }

    return undefined
}  

// // Storage des items 
class item{
    constructor(link,name,stock) {
        this.link=link;
        this.name= name; 
        this.stock= stock; 
    }
}

class Store {
    static getBooks() {
      let books;
      if(localStorage.getItem('books') === null) {
        books = [];
      } else {
        books = JSON.parse(localStorage.getItem('books'));
      }
  
      return books;
    }
  
    static addBook(book) {
      const books = Store.getBooks();
      books.push(book);
      localStorage.setItem('books', JSON.stringify(books));
    }
  
    static removeBook(isbn) {
      const books = Store.getBooks();
  
      books.forEach((book, index) => {
        if(book.isbn === isbn) {
          books.splice(index, 1);
        }
      });
  
      localStorage.setItem('books', JSON.stringify(books));
    }
  }
  

// Connexion server
// const http = require('http')
// const fs= require('fs')
// const port= 3000

// const server = http.createServer(function(res,res){
//     res.writeHead(200, {'Content-Type': 'Texte/html'})
//     fs.readFile('index.html', function (error, data){
//         if (error){
//             res.writeHead(404)
//             res.write('Error: File not found, Poulet')
//         } else {
//             res.write(data)
//         }
//         res.end()
//     })
// })

// server.listen(port, function(error){
//     if (error) {
//         console.log('Something went wrong!', error)
//     } else { 
//         console.log('Server is listening on port'+ port)
//     }
// })