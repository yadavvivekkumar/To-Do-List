const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const totalTasks = document.getElementById("totalTasks");
const completedTasks = document.getElementById("completedTasks");
const emptyMessage = document.getElementById("emptyMessage");

// Track tasks
let tasks = [];

// Function to update task counts
function updateStats() {
    totalTasks.textContent = tasks.length;
    completedTasks.textContent = tasks.filter(task => task.completed).length;

    emptyMessage.style.display = tasks.length === 0 ? "block" : "none";
}

// Function to create task element
function createTaskElement(task) {
    const li = document.createElement("li");
    li.className = "task-item" + (task.completed ? " completed" : "");
    li.dataset.id = task.id;

    li.innerHTML = `
        <span class="task-text">${task.text}</span>
        <div class="task-buttons">
            <button class="complete-btn">${task.completed ? "Undo" : "✔"}</button>
            <button class="delete-btn">✖</button>
        </div>
    `;

    // Complete button
    li.querySelector(".complete-btn").addEventListener("click", () => {
        task.completed = !task.completed;
        renderTasks();
    });

    // Delete button
    li.querySelector(".delete-btn").addEventListener("click", () => {
        tasks = tasks.filter(t => t.id !== task.id);
        renderTasks();
    });

    return li;
}

// Render tasks
function renderTasks() {
    taskList.innerHTML = "";
    tasks.forEach(task => {
        taskList.appendChild(createTaskElement(task));
    });
    updateStats();
}

// Add task
addBtn.addEventListener("click", () => {
    const text = taskInput.value.trim();
    if (!text) return;

    const newTask = {
        id: Date.now(),
        text,
        completed: false
    };
    tasks.push(newTask);
    taskInput.value = "";
    renderTasks();
});

// Add task on Enter key
taskInput.addEventListener("keyup", (e) => {
    if (e.key === "Enter") {
        addBtn.click();
    }
});

// Initial render
updateStats();
