let tasks = []; // Array to store tasks
let filter = "all"; // Default filter to show all tasks

// Function to add a new task
function addTask() {
  const input = document.getElementById("new-task-input");
  const taskText = input.value.trim();
  if (taskText) {
    tasks.push({
      text: taskText,
      completed: false,
      date: new Date().toLocaleString(),
    });
    input.value = ""; // Clear input after adding
    renderTasks();
  } else {
    alert("Please enter a task.");
  }
}

// Function to mark a task as complete
function markComplete(index) {
  tasks[index].completed = true;
  tasks[index].date = new Date().toLocaleString(); // Update completion date
  renderTasks();
}

// Function to edit a task
function editTask(index) {
  const newTaskText = prompt("Edit task:", tasks[index].text);
  if (newTaskText !== null) {
    tasks[index].text = newTaskText.trim();
    renderTasks();
  }
}

// Function to delete a task
function deleteTask(index) {
  tasks.splice(index, 1);
  renderTasks();
}

// Filter functions to control which tasks to display
function showPendingTasks() {
  filter = "pending";
  renderTasks();
}

function showCompletedTasks() {
  filter = "completed";
  renderTasks();
}

function showAllTasks() {
  filter = "all";
  renderTasks();
}

// Function to render tasks based on the filter
function renderTasks() {
  const pendingTasksContainer = document.getElementById("pending-tasks");
  const completedTasksContainer = document.getElementById("completed-tasks");

  // Clear previous task lists
  pendingTasksContainer.innerHTML = "";
  completedTasksContainer.innerHTML = "";

  // Show or hide task lists based on the filter
  if (filter === "pending") {
    pendingTasksContainer.style.display = "block";
    completedTasksContainer.style.display = "none";
  } else if (filter === "completed") {
    pendingTasksContainer.style.display = "none";
    completedTasksContainer.style.display = "block";
  } else {
    pendingTasksContainer.style.display = "block";
    completedTasksContainer.style.display = "block";
  }

  // Populate tasks into respective containers
  tasks.forEach((task, index) => {
    const taskElement = document.createElement("li");
    taskElement.classList.add("task");
    if (task.completed) {
      taskElement.classList.add("complete");
    }

    taskElement.innerHTML = `
      <span>${task.text} <p><small>${task.date}</small></p></span>
      <div class="task-actions">
        <button class="edit" onclick="editTask(${index})">Edit</button>
        <button class="delete" onclick="deleteTask(${index})">Delete</button>
        ${
          !task.completed
            ? `<button class="complete" onclick="markComplete(${index})">Complete</button>`
            : ""
        }
      </div>
    `;

    if (task.completed) {
      if (filter === "completed" || filter === "all") {
        completedTasksContainer.appendChild(taskElement);
      }
    } else {
      if (filter === "pending" || filter === "all") {
        pendingTasksContainer.appendChild(taskElement);
      }
    }
  });
}

// Initialize rendering
document.addEventListener("DOMContentLoaded", renderTasks);
