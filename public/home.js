// This JS file will handle the frontend javascript on the home page
// for the remove button specifically, there will need to be an AJAX request to the backend, and upon
// successfully removing the item from the database, that entry needs to be removed from view
// edit and add buttons will redirect to the edit and add pages, but the pug layouts can make the buttons do that i think
// somehow, the AJAX request will have to send the task_id of the task being removed

// public/home.js

document.addEventListener('DOMContentLoaded', function() {
    const taskTable = document.getElementById('task-table');
    const taskList = document.getElementById('task-list');
    const addButton = document.getElementById('add-button');
    const logoutButton = document.getElementById("logout-button");
    const username = localStorage.getItem('username'); // Assume username stored during login

    if (!username) {
        alert('No user logged in.');
        window.location.href = '/'; // redirect to login
        return;
    }

    // Fetch and render tasks
    fetch(`/crud/entries?username=${encodeURIComponent(username)}`)
        .then(response => {
            console.log(response);
            return response.json();
        })
        .then(tasks => {
            console.log(tasks);

            // If tasks is empty, don't display the task list table or container
            if(tasks.length == 0) {
                taskList.style.display = "none";
            }

            tasks.forEach(task => {
                const taskElement = createTaskElement(task);
                taskTable.appendChild(taskElement);
            });
        })
        .catch(error => {
            console.error('Error fetching tasks:', error);
            alert('Failed to load tasks.');
        });

    // Add button
    addButton.addEventListener('click', function() {
        window.location.href = '/crud/add';
    });

    // Logout button
    logoutButton.addEventListener("click", function() {
        localStorage.removeItem("username");
        window.location.href = "/";
    })

    // Helper to create task DOM element
    function createTaskElement(task) {
        const container = document.createElement('tr');
        container.className = 'task';

        const dateOptions = {
            timeZone: "UTC",
            dateStyle: "medium"
        };
        
        // check if date is overdue
        const date = new Date(task.deadline);
        const overdue = (date < new Date()) && task.status != "Completed";

        const content = `
            <td>${task.title}</td>
            <td class="description">${task.description || 'N/A'}</td>
            <td class="priority">${task.priority || 'N/A'}</td>
            <td class=${overdue ? "red" : "deadline"}>${task.deadline ? new Intl.DateTimeFormat("en-US", dateOptions).format(date) : 'N/A'}</td>
            <td>${task.status || 'N/A'}</td>
            <td>
                <button class="edit-button">✎</button>
                <button class="remove-button">✖</button>
            </td>
        `;
        container.innerHTML = content;

        // Remove button
        container.querySelector('.remove-button').addEventListener('click', function() {
            if (confirm('Are you sure you want to delete this task?')) {
                fetch(`/crud/removeItem?task_id=${encodeURIComponent(task.task_id)}`)
                    .then(response => {
                        if (response.ok) {
                            container.remove(); // remove from page
                        } else {
                            alert('Failed to remove task.');
                        }
                    })
                    .catch(error => {
                        console.error('Error removing task:', error);
                        alert('Failed to remove task.');
                    });
            }
        });

        // Edit button
        container.querySelector('.edit-button').addEventListener('click', async function() {
            // Option 1: Save task to localStorage, then load in edit.pug
            // localStorage.setItem('taskToEdit', JSON.stringify(task));
            window.location.href = "/crud/edit?" + new URLSearchParams(task);
        });

        return container;
    }
});
