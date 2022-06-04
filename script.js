const firebaseConfig = {
    apiKey: "AIzaSyAUgHH5iUByUTA2Nog9978zpSYnHX0V2Rk",
    authDomain: "todo-firebase-25214.firebaseapp.com",
    projectId: "todo-firebase-25214",
    storageBucket: "todo-firebase-25214.appspot.com",
    messagingSenderId: "607009340822",
    appId: "1:607009340822:web:30c9ce7357d6c99f8671b7"
  };


  var app = firebase.initializeApp(firebaseConfig);






firebase.database().ref("todo-list").child("tasks").on('child_added', function(information){        //Getting values from firebase to Todo-App-list
    
    console.log(information.val());             //t0 check your element(key, value)




var todo_item = document.getElementById('item');


var table = document.getElementById('table');           //li



var txtTd = document.createElement('td');
var editBtnTd = document.createElement('td');
var delBtnTd = document.createElement('td');

var editBtn = document.createElement("button");
var delBtn = document.createElement("button");



var taskText = document.createTextNode(information.val().value);    //gets the values (task list) from database(param>element>get_value(not key) )
txtTd.appendChild(taskText);

var editBtnTxt = document.createTextNode("Edit");
var delBtnTxt = document.createTextNode("Delete");

editBtn.appendChild(editBtnTxt);
delBtn.appendChild(delBtnTxt);
editBtn.setAttribute('class',"editBtn");
delBtn.setAttribute('class',"delBtn");

editBtn.setAttribute('onclick',"editItem(this)");
delBtn.setAttribute('onclick',"delItem(this)");

delBtn.setAttribute('id', information.val().key)        //creating id on DELETE btn to get element key(only)
editBtn.setAttribute('id', information.val().key)       //creating id on EDIT btn to get element key(only)

editBtnTd.appendChild(editBtn);
delBtnTd.appendChild(delBtn);

txtTd.setAttribute('class',"firstTd");
editBtnTd.setAttribute('class',"secondTd");
delBtnTd.setAttribute('class',"thirdTd");

var tr = document.createElement("tr");
tr.appendChild(txtTd);
tr.appendChild(editBtnTd);
tr.appendChild(delBtnTd);


table.appendChild(tr);
// }

});





function addItem(){
    var todo_item = document.getElementById('item');
    // console.log(todo_item.value)

    var key = firebase.database().ref("todo-list").child("tasks").push().key;
    // console.log(key);

    var Todo = {        //creating Key
        key: key,
        value: todo_item.value
    }

    // console.log(Todo);

    var database = firebase.database().ref("todo-list").child("tasks");  //assigning a variable
    // console.log(database)

    database.child(key).set(Todo);       //setting object values=>getting values
    // console.log(database.child(key).set(Todo))






//     if(!todo_item.value.trim()){
// alert("Enter your task")
//     }
//     else{

// var table = document.getElementById('table');           //li


//         // Creating Elements
// var txtTd = document.createElement('td');
// var editBtnTd = document.createElement('td');
// var delBtnTd = document.createElement('td');

// var editBtn = document.createElement("button");
// var delBtn = document.createElement("button");



// var taskText = document.createTextNode(todo_item.value);     // //gets the value, given in input(todo_item text box)
// txtTd.appendChild(taskText);

// var editBtnTxt = document.createTextNode("Edit");
// var delBtnTxt = document.createTextNode("Delete");

// editBtn.appendChild(editBtnTxt);
// delBtn.appendChild(delBtnTxt);
// editBtn.setAttribute('class',"editBtn");
// delBtn.setAttribute('class',"delBtn");

// editBtn.setAttribute('onclick',"editItem(this)");
// delBtn.setAttribute('onclick',"delItem(this)");


// editBtnTd.appendChild(editBtn);
// delBtnTd.appendChild(delBtn);

// txtTd.setAttribute('class',"firstTd");
// editBtnTd.setAttribute('class',"secondTd");
// delBtnTd.setAttribute('class',"thirdTd");

// var tr = document.createElement("tr");
// tr.appendChild(txtTd);
// tr.appendChild(editBtnTd);
// tr.appendChild(delBtnTd);


// table.appendChild(tr);

todo_item.value = ""
}
// }



function editItem(e){
console.log(e);

var  todo_item  = e.parentNode.previousSibling.innerText;
var upd_todo_item = prompt('Enter new Task',todo_item)
if(!upd_todo_item.trim()){
    alert("Empty Input, Changes not saved")
}
else{
    var editTodo = {
        key: e.id,              //this(element)>get id/key
        value: upd_todo_item    //get value from prompt(upd_todo_item)
    }
    // console.log(e.id)
    firebase.database().ref("todo-list/tasks").child(e.id).set(editTodo)        //get from object and set values
    e.parentNode.previousSibling.innerText = upd_todo_item   //to update in DOM (UI)
}


}

function delItem(e){
    // console.log(e.id) checking id ,on hitting delete btn
    firebase.database().ref("todo-list/tasks").child(e.id).remove();
    e.parentNode.parentNode.remove();
}

function deleteAll(){
    var table = document.getElementById('table');
    table.innerHTML = ""
}