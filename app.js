// Item class: Represents a item
class Itm { 
    constructor(link, nom, stock){
        this.link= link;
        this.nom= nom; 
        this.stock= stock; 
    }
}
// UI Class: faire les function
class UI { 
    static displayItms() {
        const itms= Store.getItms();
    
        itms.forEach((itm) => UI.addItmToList(itm));
    }
    static addItmToList(itm) {
        const list= document.querySelector('#itm-list');

        const row = document.createElement('tr');

        row.innerHTML = `
            <td>${itm.link}</td>
            <td>${itm.nom}</td>
            <td>${itm.stock}</td>
            <td><button class="btn btn-secondary"><img src="add_box-24px.svg" width="100" onclick="incrementStock(this)"></button></td>
            <td><button class="btn btn-secondary"><img src="indeterminate_check_box-24px.svg" width="100"  onClick="decrementStock(this)"></button></td>
            <td><a href='#'class="btn btn-danger" id="btn-danger">x</a></td>
        `;

        list.appendChild(row);
    }
    static deleteItm(el) {
        if(el.classList.contains('btn-danger')){
            el.parentElement.parentElement.remove()
            UI.showAlert('Item supprimé!', 'danger');
        }
    }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-dismissible alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('.container');
        const form = document.querySelector('#itm-form');
        container.insertBefore(div, form); 
        
    
        // Vanish in 3 seconds
        setTimeout(() => document.querySelector('.alert').remove(), 2000);
      }

    static clearInputs() {
        document.querySelector('#link').value=''; 
        document.querySelector('#nom').value=''; 
        document.querySelector('#stock').value=''; 
    }
}
// Store Class: local storage

class Store {
    static getItms(){
        let itms;
        if(localStorage.getItem('itms')=== null){
            itms =[]; 
        } else {
            itms= JSON.parse(localStorage.getItem('itms'));
        }
        return itms;
    }

    static addItm(itm){
        const itms = Store.getItms();
        itms.push(itm);

        localStorage.setItem('itms', JSON.stringify(itms));
    }

    static removeItm(stock) {
        const itms= Store.getItms(); 
        
        itms.forEach((itm, index) => {
            if(itm.stock === stock) {
                itms.splice(index, 1);
            }
        });

        localStorage.setItem('itms', JSON.stringify(itms));
    }
}

//Event: pour display les items

document.addEventListener('DOMContentLoaded', UI.displayItms);

//Event: pour add an item 
document.querySelector('#itm-form').addEventListener('submit', (e) =>{

    e.preventDefault();

    // get element itm
    const link= document.querySelector('#link').value;
    const nom= document.querySelector('#nom').value;
    const stock= document.querySelector('#stock').value;

    //Validation
    if(link === '' || nom ==='' || stock ==='') {
        UI.showAlert('Remplir toutes les cases!', 'warning');
    } else {

    // Creat Itm object
    const itm = new Itm(link, nom, stock);

    //add item to store
    Store.addItm(itm); 

    // add to UI 
    UI.addItmToList(itm); 
    UI.showAlert('Item ajouté!', 'success')

    // clear input 
    UI.clearInputs(); 
    }
} )

//Event: pour remove a book DELETE BUTTON
document.querySelector('#itm-list').addEventListener('click', (e) =>{
    UI.deleteItm(e.target);
    Store.removeItm(e.target.parentElement.previousElementSibling.previousElementSibling.previousElementSibling.textContent); 
})

const TABLE_ROW_NODE_NAME = 'TR' 

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