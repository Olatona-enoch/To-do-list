
const taskInput = document.getElementById("taskInput");
const tasklist = document.getElementById("task-list");
let editingTask = null; // Stores the task being edited

// to load tasks as the page loads
document.addEventListener("DOMContentLoaded", loadTasks);

// A function to save the tasks
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#task-list li").forEach(task => {
        tasks.push({
            text: task.querySelector(".task-text").innerText,
            done: task.querySelector("#checked").checked
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// to load the tasks from the local storage
function loadTasks() {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    storedTasks.forEach(task => addTask(task.text, task.done, false));
    counter(); 
}

function addTask(text = taskInput.value, completed = false, save = true) {
    if (text === "") {
        alert("No input");
        // return;
    } else {
        if (editingTask) {
            // If editingTask exists, update its text instead of creating a new task
            editingTask.querySelector(".task-text").innerText = taskInput.value;
            editingTask = null; // Reset editing state
            taskInput.value = ""; // Clear input
            saveTasks();
            return;
        }

        const newli = document.createElement("li");

        const taskDetails = document.createElement("div");
        taskDetails.classList.add("task-details");
        taskDetails.innerHTML = `
            <input type="checkbox" id="checked">
            <span class="task-text">${text}</span>
        `;

        const icons = document.createElement("div");
        icons.classList.add("icons");
        icons.innerHTML = `
            <i class="fa-solid fa-pen-to-square edit-btn"></i>
            <i class="fa-solid fa-trash-can del-btn"></i>
        `;

        newli.appendChild(taskDetails);
        newli.appendChild(icons);
        tasklist.appendChild(newli);

        // Add event listener for delete button
        icons.querySelector(".del-btn").addEventListener("click", function () {
            newli.remove();
            console.log("Task deleted");
            counter();
            saveTasks();
        });

        // Add event listener for edit button
        icons.querySelector(".edit-btn").addEventListener("click", function () {
            editTask(newli, taskDetails);
        });

        taskDetails.querySelector("#checked").addEventListener("click",function (){
            const taskText = taskDetails.querySelector(".task-text");
            taskText.classList.toggle("done",this.checked);
            counter();
            saveTasks();
        });

        const checkbox = taskDetails.querySelector("#checked");
        if (completed) {
            checkbox.checked = true;
            newli.querySelector(".task-text").classList.add("done");
        }

        // Calling the counter function
        counter();
       if (save) {
         saveTasks();
       }

        // Clear input field
        taskInput.value = "";
    }
}

// Function to edit a task
function editTask(taskElement, taskDetails) {
    const taskText = taskDetails.querySelector(".task-text").innerText;
    taskInput.value = taskText; // Put task text into input box
    editingTask = taskElement; // Store reference to the task being edited
    console.log("Editing task:", taskText);
}

function counter(){
    const fraction = document.getElementById("fraction");
    const denominator = tasklist.getElementsByTagName("li").length;
    const numerator = tasklist.getElementsByClassName("done").length;
    const compliment = document.getElementById("compliment");
    console.log(tasklist.getElementsByTagName("li").length);
    console.log(tasklist.getElementsByClassName("done").length);
    fraction.innerHTML = `${numerator}/${denominator}`;
    

    const progress = document.getElementById("progress")
    const widthValue = (numerator / denominator) * 100;
    console.log(widthValue)
    progress.style.width = `${widthValue}%`;

    // Compliments as user does their task
    if(widthValue == 100){
        compliment.innerHTML = "Congratulations";
    } else if (widthValue >= 80) {
        compliment.innerHTML = "Just a few more steps";
    } else if (widthValue >= 70) {
        compliment.innerHTML = "You are almost there";
    } else if (widthValue >= 60) {
        compliment.innerHTML = "You are doing great";
    } else if (widthValue >= 50) {
        compliment.innerHTML = "You are Halfway through";
    } else if (widthValue >= 40) {
        compliment.innerHTML = "Keep up the good work";
    } else if (widthValue >= 30) {
        compliment.innerHTML = "Run it Up";
    } else if (widthValue >= 10) {
        compliment.innerHTML = "Off to a great start";
    } else if (widthValue < 10) {
        compliment.innerHTML = "Alright start";
    }
}

function inputTask() {
    console.log("Button Pressed");
    addTask();
}





//         icons.querySelector("#editbtn").addEventListener("click", function edit() {
//             const text = newli.querySelector("span");
//             const newItem = taskInput.value;//prompt("enter text", text.innerText);
            
//             if(text !== null && text != ""){
//                 text.innerText= newItem;
//                 console.log("edit done")
//             }else{
//                 console.log("enter a digit")
//             }
//             // console.log("Task edited");
//         });
//         taskDetails.querySelector("#checked").addEventListener("click",function (){
//         const text = newli.querySelector("span");
//         text.classList.toggle("done");
//         });
//         numbers();

//         // Clear input field
//         taskInput.value = "";
//     }
// }