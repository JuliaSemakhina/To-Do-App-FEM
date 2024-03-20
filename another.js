const inputBox = document.getElementById("input-box");
const listContainer = document.querySelector(".list-container");

inputBox.addEventListener('keypress', (e)=>{
    if (e.key === 'Enter') {
        if(inputBox.value === ""){
            alert("Write something!");
          } else {
           //Creating a list of actions
           let listItem = document.createElement("div");
           listItem.classList.add("list-item");
           let todoText = inputBox.value;
           listItem.innerHTML = `<div class="check-box">
           <img src="/images/icon-check.svg" class="toggled" alt="">
            </div>
            <p>${todoText}</p>
            <div class="close-btn">
                <img src="images/icon-cross.svg" alt="">
            </div>`;
            listItem.setAttribute("draggable","true");
            listItem.setAttribute("data-category","ongoing");
            listItem.classList.add("active");
           listContainer.appendChild(listItem);
          }
          inputBox.value = "";
      }
});

//Dragging
new Sortable(listContainer, {
    animation: 150,
    ghostClass: 'blue-background-class'
  });

  //Updating action in the list
  listContainer.addEventListener("click", function(e){
    if(e.target.classList.contains("check-box") && e.target.parentElement.classList.contains("active")){
      e.target.parentElement.classList.remove("active");  
      e.target.parentElement.classList.toggle("checked");
      e.target.parentElement.setAttribute("data-category","done");
    //   saveData();
    } 
    else if(e.target.parentElement.classList.contains("close-btn")){
        e.target.closest(".list-item").remove();
    }
    else if (e.target.classList.contains("check-box") && e.target.parentElement.classList.contains("checked")){
      e.target.parentElement.classList.remove("checked");
      e.target.parentElement.classList.toggle("active");
      e.target.parentElement.setAttribute("data-category","ongoing");
    //   saveData();
    }
  }, false);

    //     listContainer.querySelectorAll(".close-btn").forEach((close)=>{
    //     close.addEventListener("click", (e)=>{
    //    e.target.closest(".list-item").remove();
    // });
    // });