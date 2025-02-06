
const taskInput = document.getElementById("taskInput");
const tasklist = document.getElementById("task-list");
let editingTask = null; // Stores the task being edited

function addTask() {
    if (taskInput.value === "") {
        alert("No input");
    } else {
        if (editingTask) {
            // If editingTask exists, update its text instead of creating a new task
            editingTask.querySelector(".task-text").innerText = taskInput.value;
            editingTask = null; // Reset editing state
            taskInput.value = ""; // Clear input
            return;
        }

        const newli = document.createElement("li");

        const taskDetails = document.createElement("div");
        taskDetails.classList.add("task-details");
        taskDetails.innerHTML = `
            <input type="checkbox" id="checked">
            <span class="task-text">${taskInput.value}</span>
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
        });

        // Add event listener for edit button
        icons.querySelector(".edit-btn").addEventListener("click", function () {
            editTask(newli, taskDetails);
        });

        taskDetails.querySelector("#checked").addEventListener("click",function (){
            const taskText = taskDetails.querySelector(".task-text");
            taskText.classList.toggle("done");
            // newli.classList.toggle("done");
            counter();
        });

        // Calling the counter function
        counter();

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