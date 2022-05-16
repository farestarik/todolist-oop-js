// Settings Up Variables

let input = document.querySelector(".add-task input");
let add_task_btn = document.querySelector(".add-task .plus");

let tasks_container = document.querySelector(".tasks-content");
let no_tasks_message = document.querySelector(".no-tasks-message");

let tasks_count = document.querySelector(".tasks-count span");
let tasks_completed = document.querySelector(".tasks-completed span");


// On Load

window.onload = function(){
    // Focus On Input

    input.focus();

    // Set Count

    set_tasks_count();
    set_tasks_completed_count();
};


// Adding Tasks

add_task_btn.onclick = function(e){

    // If Input Empty

    if(input.value === ''){

        alert("Task Cannot Be Empty");
        console.log("No Value");

        input.focus();
    
    }else{
        
        // Remove No_Tasks_Msg

        no_tasks_message.remove();

        // Create Span Element

        let span = document.createElement("span");
        
        span.className = "task-box";

        // Create Delete Span

        let delete_btn = document.createElement('span');
        
        delete_btn.className = "delete";

        // Create Text Span

        let text = document.createTextNode(input.value);

        // Create Text Delete

        let delete_text = document.createTextNode("+");

        // Add Text To Span

        span.appendChild(text);

         // Add Text To Delete

         delete_btn.appendChild(delete_text);

         span.appendChild(delete_btn);

         // Add All To Container

         tasks_container.appendChild(span);

         // Update Tasks Counter

         set_tasks_count();

         // Empty Input

         input.value = "";
         input.focus();

    }

};

// Deleting Tasks

document.addEventListener("click", (e) => delete_task(e));


function delete_task(e){
    if(e.target.className == 'delete'){
        e.target.parentElement.remove(); 
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
