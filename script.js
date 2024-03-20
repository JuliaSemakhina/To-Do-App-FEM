const inputBox = document.getElementById("input-box");
const listContainer = document.querySelector(".list-container");
const btnContainer = document.querySelector(".buttons-container");
const filterButtons = document.querySelectorAll(".filter-btn");
const deleteBtn = document.getElementById("delete");

let todoNumber = document.querySelector(".todo-number");

inputBox.addEventListener('keypress', (e)=>{
    if (e.key === 'Enter') {
        if(inputBox.value === ""){
            alert("Write something!");
          } else {
           //Creating a list of actions
           let listItem = document.createElement("li");
           listItem.innerHTML = inputBox.value;
           listItem.classList.add("list-item");
           listItem.classList.add("active");
           
            listItem.setAttribute("draggable","true");
            listItem.setAttribute("data-category","ongoing");
            listContainer.appendChild(listItem);

            let span = document.createElement("span");
            span.innerHTML = `<img src="images/icon-cross.svg">`;
           listItem.appendChild(span);
           updateNumber();
          }
          inputBox.value = "";
          saveData();
      }
});

//Dragging
new Sortable(listContainer, {
    animation: 150,
    ghostClass: 'blue-background-class'
  });

//Local Storage
function saveData(){
  localStorage.setItem("data", listContainer.innerHTML);
};

function showTask(){
  listContainer.innerHTML = localStorage.getItem("data");
};


//Updating action in the list
listContainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI" && e.target.classList.contains("active")){
      e.target.classList.toggle("checked");
      e.target.classList.remove("active");
      e.target.setAttribute("data-category","done");
    } else if (e.target.tagName === "IMG"){
    e.target.closest(".list-item").remove();
    } 
    else {
      e.target.classList.remove("checked");
      e.target.classList.toggle("active");
      e.target.setAttribute("data-category","ongoing");
    }
    updateNumber();
    saveData();
  }, false);


//Counting iincompleted tasks left
  function updateNumber(){
    let itemNumber = [...listContainer.children];
    let totalActive = 0;

    for (let i=0; i < itemNumber.length; i++){
       if(itemNumber[i].classList.contains("active"))
            totalActive++;
            
    }
    let item = totalActive > 1 ? " items" : " item";
    todoNumber.innerHTML = totalActive + item;
  };

//FILTERING ACTIVITIES

filterButtons.forEach((button) => {
    button.addEventListener("click", (e)=>{
      const filter = e.target.getAttribute("data-filter");
      if(!document.startViewTransition){
        updateActiveButton(e.target);
        filterTasks(filter);
      }
      document.startViewTransition(()=> {
        updateActiveButton(e.target);
        filterTasks(filter);
        });
    });
  });
  
//Updating class of the Filter Buttons
  function updateActiveButton(newButton){
    btnContainer.querySelector(".clicked").classList.remove("clicked");  
    newButton.classList.toggle("clicked");
  };

//Filetring by category
  function filterTasks(taskFilter){
    [...listContainer.children].forEach((task)=>{
      const taskStatus = task.getAttribute("data-category");
  
      if(taskFilter === "all" || taskFilter === taskStatus){
        task.removeAttribute("hidden");
      } else {
        task.setAttribute("hidden", true);
      }
    });
  };


//Deleting all the items in the list
deleteBtn.addEventListener("click", ()=>{
  let clearAll = listContainer.querySelectorAll("li");
  for (let i=0; i < clearAll.length; i++){
    clearAll[i].remove();
  }
  updateNumber();
  saveData();
});

//Dark Theme
document.querySelector('.theme').addEventListener('click', function() {
  this.classList.add('animate');
  
  setTimeout(() => {
      this.classList.toggle('active');
       document.documentElement.classList.toggle('dark');
 }, 150);
  
 setTimeout(() => this.classList.remove('animate'), 300);
});

showTask();