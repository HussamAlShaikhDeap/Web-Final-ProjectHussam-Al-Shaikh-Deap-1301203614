
'use strict'
let close1 = document.getElementById('model-close');
let close2 = document.getElementById('cancel');
let bb1 = document.getElementById('RegisterClient');
let save1 = document.getElementById('save');
let bclear=document.getElementById('clear')





const openModel = function () {
    document.getElementById('model').classList.add('active');
    const indexopen = document.getElementById('id').dataset.index1
    if (indexopen == 'new') {
        save1.innerHTML='حفظ'
    }
    else {
        save1.innerHTML='تعديل'
    }
}
const closeModel = function () {
    clearfields();
    document.getElementById('model').classList.remove('active');
}

const clearfields = function () {
    const fields = document.querySelectorAll('.model-field');
    for (let i = 0; i < fields.length;i++){
        fields[i].value = "";
    }
    document.getElementById('id').dataset.index1 = 'new';
}
const getlocalStorage = function () {
    return JSON.parse(localStorage.getItem('db_client')) ?? [];
}

const setLocalStorage = function (dbClient) {
    localStorage.setItem("db_client",JSON.stringify(dbClient));
}

const creatClient = function (client) {
    const dbClient = getlocalStorage();
    dbClient.push(client);
    setLocalStorage(dbClient);
}


const saveClient = function () {
    if (isValidFields()) {
        const client = {
            id: document.getElementById('id').value,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            mobile: document.getElementById('mobile').value,
            city: document.getElementById('city').value
        }
        const index = document.getElementById('id').dataset.index1
        if (index=='new') {
            creatClient(client)
            updateTable()
            closeModel()
        } else {
            updateClient(index,client)
            updateTable()
            closeModel()
        }
    }
}
const readClient = function () {
  return  getlocalStorage();
}
const updateTable = function () {
    const dbClient = readClient();
    console.log(dbClient)
    clearTable();
    if (dbClient) {
        dbClient.forEach(createRow);
    }
}




const createRow = function(clinet,index){
    const newrow = document.createElement('tr')
    newrow.innerHTML = `
    <td>${clinet.id}</td>
    <td>${clinet.name}</td>
    <td>${clinet.email}</td>
    <td>${clinet.mobile}</td>
    <td>${clinet.city}</td>
    <td>
    <button type="button"  class="button green"  id="edit-${index}">تعديل</button>
    <button type="button"  class="button red"  id="delete-${index}">حذف</button>
    </td>
    ` 
    document.querySelector('#tableClient>tbody').appendChild(newrow)
}

const clearTable=function(){
    const rows = document.querySelectorAll('#tableClient>tbody tr')
    rows.forEach(row=>row.parentNode.removeChild(row))
}



const isValidFields = function () {
    return document.getElementById('form').reportValidity();
}


const updateClient = function (index,client) {
    const dbClient = readClient();
    dbClient[index] = client;
    setLocalStorage(dbClient);
}
const fillFields = (client) => {
    document.getElementById('id').value=client.id
    document.getElementById('name').value=client.name
    document.getElementById('email').value=client.email
    document.getElementById('mobile').value = client.mobile
    document.getElementById('city').value = client.city
     document.getElementById('id').dataset.index1= client.index
}

const editClient = function (index) {
    const client = readClient()[index]
    client.index = index
    fillFields(client)
    openModel();
    
}



const editDelete = function (event) {
    if (event.target.type == 'button') {
        const [action, index] = event.target.id.split('-')
        if (action == 'edit') {
             editClient(index)
        }
          else {
        const client = readClient()[index]
        const response = confirm(`هل تريد حذف هذا الزبون ${client.name}`)
        if (response) {
        deleteClient(index)
            updateTable()
        }
           
    } 
    } 
}

const deleteClient=function(index) {
    const dbClient = readClient()
    dbClient.splice(index, 1)
    setLocalStorage(dbClient)
}
const clearLcalStorage=function(dbClient){
    localStorage.clear();
    updateTable();
}





bb1.onclick=openModel

close1.onclick = closeModel
close2.onclick = closeModel
save1.onclick = saveClient
bclear.onclick = clearfields
document.querySelector('#tableClient>tbody').addEventListener('click', editDelete)
document.getElementById('DeleteAllElement').addEventListener('click',clearLcalStorage)