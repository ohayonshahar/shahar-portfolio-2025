// global variabeles
let jsonitems={items:[]}
// wellcome mesage 
document.getElementById('welname').innerHTML='Wellcome Dear '+(document.cookie.split(';')[0].split("=")[1]);

// uploading the saved list 
fetch('http://localhost:8080/log')
.then(function(response) {return response.json()})
.then(function(data) {
  let itemsArr=JSON.parse(data); 
  fillList(itemsArr.items);})

  // handle drag & drop
let draggedElement;
let listitems=document.querySelectorAll('#itembox');
listitems.forEach((item) => {
item.addEventListener('dragstart', handleDragStart);
item.addEventListener('dragover', handleDragOver);
item.addEventListener('dragenter', handleDragEnter);
item.addEventListener('dragleave', handleDragLeave);
item.addEventListener('dragend', handleDragEnd);
item.addEventListener('drop', handleDrop);
}); // end of forEach
function handleDragStart(e) {
    e.currentTarget.style.opacity = '0.4'; 
    draggedElement = e.currentTarget;
    draggedElement.style.cursor='grab';
    e.dataTransfer.effectAllowed = 'move'; 
    e.dataTransfer.setData('text/html', e.currentTarget.innerHTML); }

function handleDrop(e) {
    e.stopPropagation();
    if (draggedElement !== e.currentTarget) {
        draggedElement.innerHTML = e.currentTarget.innerHTML;
        e.currentTarget.innerHTML = e.dataTransfer.getData('text/html');
    }
    return false;}

function handleDragEnd(e) {
    e.currentTarget.style.opacity = '1';
    listitems.forEach(function (item) {
        item.classList.remove('over');});
    let itemArrnew=getItemsList();
    fillList(itemArrnew)
    jsonitems.items=itemArrnew;
    fetch('http://localhost:8080/todolist', {
          method: 'post', headers: {'Accept': 'application/json','Content-Type': 'application/json',},
          body: JSON.stringify(jsonitems)})
          .then(response => {response.json()})
          .catch(error => {error= document.getElementById('error').innerHTML='Error updating the items';})}

function handleDragOver(e) {
    e.preventDefault();
    return false;}

function handleDragEnter(e) {e.currentTarget.classList.add('over');}
function handleDragLeave(e) {e.currentTarget.classList.remove('over');} 
// end of drag and drop 

// press ADD button 
document.getElementById('add').addEventListener('click',()=>{
    let newitem=document.getElementById('itemtext').value; // the item in input text
    document.getElementById('itemtext').value="";// hide the text that had written in the text box
    let itemsArr=getItemsList();
    itemsArr.push(newitem);// add the new item to the list
    fillList(itemsArr);// show the new list 
    jsonitems.items=itemsArr;
    fetch('http://localhost:8080/todolist', {
      method: 'post', headers: {'Accept': 'application/json','Content-Type': 'application/json',},
      body: JSON.stringify(jsonitems)})
    .then(response => response.json())
    .catch(error => {
      error= document.getElementById('error').innerHTML='Error adding the item';})
  }) 


// press Delete button 
document.getElementById('delete').addEventListener('click',()=>{
  let itemsArr=getItemsList();
  itemsArr.shift(); // delete top item
  jsonitems.items=itemsArr;
  fetch('http://localhost:8080/todolist', {
      method: 'post', headers: {'Accept': 'application/json','Content-Type': 'application/json',},
      body: JSON.stringify(jsonitems)})
    .then(response => {response.json()})
    .catch(error => {
      error= document.getElementById('error').innerHTML='Error deleting the item';})
      document.getElementById('sortableList').innerHTML=" ";
    fillList(itemsArr);
})

// press logOut button 
document.getElementById('logout').addEventListener('click',()=>{
  fetch('http://localhost:8080/logout')
    .catch(error => {
      error= document.getElementById('error').innerHTML='Error logging out !!!! ';})
})

function getItemsList()
{
  let itemsArr=[];
  let itemListText=document.getElementById("sortableList").children;// the children of the ul list
  for (let i=0;i<itemListText.length;i++)
  {itemsArr.push(itemListText[i].innerText);}// add children content to the list
  return itemsArr;
}

function fillList(itemsArr){
  document.getElementById("sortableList").innerHTML="";
  let newLi;// new list 
      itemsArr.forEach((item)=>{ // for each item in the item array
      newLi=document.createElement("li");// create a new <il> tag
      newLi.innerText=item;// set the innet text of the <li> tag
      newLi.draggable='true';
      newLi.id="itembox";
      document.getElementById("sortableList").appendChild(newLi);}// add child to the ul list
  )}
