let input = document.querySelector('.create-input')
let submit = document.querySelector('.add-icon')
let taskDiv = document.querySelector('.my-todo')

// Execute a function when the user presses a key on the keyboard
input.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        event.preventDefault();
        document.querySelector(".add-icon").click();
    }
});

//empty array
let TaskArray = [];
if (localStorage.getItem("tasks")) {
    TaskArray = JSON.parse(localStorage.getItem("tasks"))
}

getdata();
if (TaskArray.length == 0) {
    let mytodo = document.querySelector(".my-todo")
    mytodo.innerHTML = `<h2>No todos to show ..</h2>`
} else {
    let count = document.querySelector(".todo-count")
    count.innerHTML = `You have <b>${TaskArray.length}</b> TODOS go on!`
}

//add task
submit.onclick = function() {
    if (input.value !== "") {
        addTaskToArray(input.value); //add task to array
        input.value = ""; //empty input value
    }
}

taskDiv.addEventListener("click", (e) => {
    if (e.target.classList.contains("del")) {
        e.target.parentElement.remove();
        deleteTaskwith(e.target.parentElement.getAttribute("taskID"));

    }


    if (e.target.classList.contains("todo-div")) {
        togglestatus(e.target.getAttribute("taskID"))
        e.target.classList.toggle("done");

    }
})



function addTaskToArray(taskText) {
    //task data
    const task = {
        id: Date.now(),
        title: taskText,
        completed: false
    };
    //push task
    TaskArray.push(task);
    addElements(TaskArray);
    // To local storage
    addtostorage(TaskArray)


}


function addElements(TaskArray) {
    taskDiv.innerHTML = "";
    TaskArray.forEach((task) => {
        let div = document.createElement("div")
        div.className = "todo-div"
        div.setAttribute("taskID", task.id)

        let delbtn = document.createElement("button")
        delbtn.className = "del"
        let icon = document.createElement("i")
        icon.className = "fa-solid fa-trash fa-xl "
        delbtn.appendChild(icon)
        div.appendChild(delbtn)
        if (task.completed) {
            div.className = "done"
        }

        let text = document.createElement("div")
        text.className = "todo-text"

        text.appendChild(document.createTextNode(task.title))
        div.appendChild(text)


        taskDiv.appendChild(div)
    })
}

function addtostorage(TaskArray) {
    window.localStorage.setItem("tasks", JSON.stringify(TaskArray))
    let count = document.querySelector(".todo-count")
    count.innerHTML = `You have <b>${TaskArray.length}</b> TODOS go on!`
}

function getdata() {
    let data = window.localStorage.getItem("tasks")
    if (data) {
        let tasks = JSON.parse(data)
        addElements(tasks);
    }
}

function deleteTaskwith(taskID) {
    TaskArray = TaskArray.filter((task) => task.id != taskID);
    addtostorage(TaskArray)
    let count = document.querySelector(".todo-count")
    count.innerHTML = `You have <b>${TaskArray.length}</b> TODOS go on!`
}

function togglestatus(taskID) {
    for (let i = 0; i < TaskArray.length; i++) {
        if (TaskArray[i].id == taskID) {
            TaskArray[i].completed == false ? (TaskArray[i].completed == true) : (TaskArray[i].completed == false)
        }

    }
    addtostorage(TaskArray)


}


const toggleSwitch = document.querySelector('.checkbox-custom input[type="checkbox"]');


function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
    }
}

toggleSwitch.addEventListener('change',
    switchTheme, false);


function switchTheme(e) {
    if (e.target.checked) {
        document.documentElement.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark'); //add this
    } else {
        document.documentElement.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light'); //add this
    }
}
const currentTheme = localStorage.getItem('theme') ? localStorage.getItem('theme') : null;

if (currentTheme) {
    document.documentElement.setAttribute('data-theme', currentTheme);

    if (currentTheme === 'light') {
        toggleSwitch.checked = true;
    }
}