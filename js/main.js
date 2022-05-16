// Settings Up Variables

let input = document.querySelector(".add-task input");
let add_task_btn = document.querySelector(".add-task .plus");

let tasks_container = document.querySelector(".tasks-content");
let no_tasks_message = document.querySelector(".no-tasks-message");

let tasks_count = document.querySelector(".tasks-count span");
let tasks_completed = document.querySelector(".tasks-completed span");



// Tasks Class

class Task{

    constructor(id,content = ''){
        if(content === ''){
            return;
        }

        this.content = content;
        this.id = id;
    }

}


// Storage Class

class Store{

    static all(){
        let tasks;

        if(localStorage.getItem("tasks") === null){
            tasks = [];
        }else{
            tasks = JSON.parse(localStorage.getItem("tasks"));
        }

        return tasks;
    }

    static store(task){

        let tasks = Store.all();

        tasks.push(task);

        localStorage.setItem('tasks', JSON.stringify(tasks));
    }

    static exists(added_task){
        const tasks = Store.all();
        let found = false;
        tasks.every((task,index) => {
            if(task.content == added_task.content){
                found = true;
                return false;
            }
            return true;
        });

        return found;
    }

    static remove(task_id){
        const tasks = Store.all();
    
        tasks.forEach((task,index) => {
            if(task.id == task_id){
                tasks.splice(index, 1);
            }
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    }

}


// UI Class

class UI{

    static showTasks(){
        const tasks = Store.all();

        tasks.forEach(task => UI.addTasksToContainer(task));
    }

    static addTasksToContainer(task){

      
         // Create Span Element

         let span = document.createElement("span");
        
         span.className = "task-box";
 
         // Create Delete Span
 
         let delete_btn = document.createElement('span');
         
         delete_btn.className = "delete";
         delete_btn.setAttribute("data-id", task.id);
 
         // Create Text Span
 
         let text = document.createTextNode(task.content);
 
         // Create Text Delete
 
         let delete_text = document.createTextNode("+");
 
         // Add Text To Span
 
         span.appendChild(text);
 
          // Add Text To Delete
 
          delete_btn.appendChild(delete_text);
 
          span.appendChild(delete_btn);
 
          // Add All To Container
 
          tasks_container.appendChild(span);

          // Remove no_tasks_message

          if(no_tasks_message){
              no_tasks_message.remove();
          }

    }

}

// On Load

window.onload = function(){

    // Diplay Tasks

    UI.showTasks();

    // Focus On Input

    input.focus();

    // Set Count

    set_tasks_count();
    set_tasks_completed_count();
};


// Adding Tasks

add_task_btn.onclick = function(e){
    validate();
};

// Enter Key

input.onkeyup = function(e){
    if (e.key === 'Enter' || e.keyCode === 13) {
        validate();   
    }
}


// Deleting Tasks

document.addEventListener("click", (e) => delete_task(e));


function delete_task(e){
    if(e.target.className == 'delete'){
        e.target.parentElement.remove(); 
        Store.remove(e.target.getAttribute('data-id'));
        set_tasks_count();
        
        if(tasks_container.childElementCount == 0){
            show_no_tasks_msg();
        }
    }

    if(e.target.classList.contains('task-box')){
        e.target.classList.toggle("completed"); 
        set_tasks_completed_count();
    }
}

function show_no_tasks_msg(){
    let span = document.createElement("span");
    let span_text = document.createTextNode("No Tasks Available!");
    span.appendChild(span_text);
    span.className = "no-tasks-message";
    tasks_container.appendChild(span);
}

function set_tasks_count(){
    let tasks_container_except_msg = document.querySelectorAll(".tasks-content .task-box");
    tasks_count.textContent = tasks_container_except_msg.length;
}

function set_tasks_completed_count(){
    let tasks_container_except_msg = document.querySelectorAll(".tasks-content .task-box.completed");
    tasks_completed.textContent = tasks_container_except_msg.length;
}

function validate(){
      // If Input Empty

      if(input.value === ''){

        alert("Task Cannot Be Empty");
        console.log("No Value");

        input.focus();
    
    }else{
    

        // Remove No_Tasks_Msg

        no_tasks_message.remove();

        // Init Task
        const tasks = Store.all();
        const id = tasks.length + 1;
        const task = new Task(id, input.value); 

        if(!Store.exists(task)){ 
            UI.addTasksToContainer(task);
            Store.store(task);
        }else{
            alert("Task Already Exist!");
        }




         // Update Tasks Counter

         set_tasks_count();

         // Empty Input

         input.value = "";
         input.focus();

    }
}