const initialData = {
    columns: [
        {
            id: 'todo',
            title: 'To Do',
            tasks: [
                {id: 'task1', title: 'Дочитати книжку', description: 'Дочитати "Портрет Доріана Ґрея"'},
                {id: 'task2', title: 'Послухати новинки п\'ятниці', description: 'Туц-туц-туц-туц'}
            ]
        },
        {
            id: 'in-progress',
            title: 'In Progress',
            tasks: [
                {id: 'task3', title: 'Здати 8 лабораторну з JS', description: 'Успіхів!'}
            ]
        },
        {
            id: 'done',
            title: 'Done',
            tasks: [
                {id: 'task4', title: 'Прийти на пару', description: '*не обов\'язково*'}
            ]
        }
    ]
};


const kanbanBoard = document.getElementById('kanbanBoard');


let draggedTask = null;
let draggedColumn = null;
let placeholder = null;
let currentDragColumn = null;


function initKanbanBoard(data) {
    kanbanBoard.innerHTML = '';

    data.columns.forEach(column => {
        const columnElement = document.createElement('div');
        columnElement.className = 'column';
        columnElement.dataset.columnId = column.id;

        columnElement.innerHTML = `
                    <div class="column-header">
                        <span>${column.title}</span>
                        <button class="add-task" data-column-id="${column.id}">+</button>
                    </div>
                    <div class="tasks" data-column-id="${column.id}">
                        ${column.tasks.map(task => createTaskHtml(task)).join('')}
                    </div>
                    <div class="task-form" data-column-id="${column.id}">
                        <input type="text" class="task-title-input" placeholder="Назва завдання">
                        <textarea class="task-description-input" placeholder="Опис завдання"></textarea>
                        <div class="form-buttons">
                            <button class="add-btn" data-column-id="${column.id}">Додати</button>
                            <button class="cancel-btn" data-column-id="${column.id}">Скасувати</button>
                        </div>
                    </div>
                `;

        kanbanBoard.appendChild(columnElement);


        column.tasks.forEach(task => {
            const taskElement = columnElement.querySelector(`.task[data-task-id="${task.id}"]`);
            setupTaskDragEvents(taskElement);
        });
    });


    setupColumnDropEvents();


    setupAddTaskButtons();
}


function createTaskHtml(task) {
    return `
                <div class="task" draggable="true" data-task-id="${task.id}">
                    <div class="task-title">${task.title}</div>
                    <div class="task-description">${task.description}</div>
                </div>
            `;
}


function setupTaskDragEvents(taskElement) {
    taskElement.addEventListener('dragstart', (e) => {
        draggedTask = taskElement;
        taskElement.classList.add('dragging');
        e.dataTransfer.setData('text/plain', taskElement.dataset.taskId);
        e.dataTransfer.effectAllowed = 'move';


        placeholder = document.createElement('div');
        placeholder.className = 'task-placeholder';
        taskElement.parentNode.insertBefore(placeholder, taskElement.nextSibling);


        currentDragColumn = taskElement.closest('.column');
        currentDragColumn.classList.add('highlight');
    });

    taskElement.addEventListener('dragend', () => {
        taskElement.classList.remove('dragging');
        document.querySelectorAll('.column').forEach(col => col.classList.remove('highlight'));


        if (placeholder && placeholder.parentNode) {
            placeholder.parentNode.removeChild(placeholder);
        }
        placeholder = null;
        currentDragColumn = null;
    });
}


function setupColumnDropEvents() {
    document.querySelectorAll('.column').forEach(column => {
        const tasksContainer = column.querySelector('.tasks');

        column.addEventListener('dragover', (e) => {
            e.preventDefault();
            e.dataTransfer.dropEffect = 'move';
            column.classList.add('highlight');

            if (!draggedTask) return;


            const afterElement = getDragAfterElement(tasksContainer, e.clientY);


            if (placeholder && placeholder.parentNode === tasksContainer) {
                tasksContainer.removeChild(placeholder);
            }


            if (afterElement) {
                tasksContainer.insertBefore(placeholder, afterElement);
            } else {
                tasksContainer.appendChild(placeholder);
            }
        });

        column.addEventListener('dragleave', () => {
            column.classList.remove('highlight');


            if (placeholder && placeholder.parentNode === tasksContainer) {
                tasksContainer.removeChild(placeholder);
            }
        });

        column.addEventListener('drop', (e) => {
            e.preventDefault();
            column.classList.remove('highlight');

            if (draggedTask) {
                const tasksContainer = column.querySelector('.tasks');
                const taskId = draggedTask.dataset.taskId;


                const afterElement = getDragAfterElement(tasksContainer, e.clientY);

                if (afterElement) {
                    tasksContainer.insertBefore(draggedTask, afterElement);
                } else {
                    tasksContainer.appendChild(draggedTask);
                }


                if (placeholder && placeholder.parentNode === tasksContainer) {
                    tasksContainer.removeChild(placeholder);
                }


                updateTaskColumn(taskId, column.dataset.columnId);
            }
        });
    });
}


function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.task:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;

        if (offset < 0 && offset > closest.offset) {
            return {offset: offset, element: child};
        } else {
            return closest;
        }
    }, {offset: Number.NEGATIVE_INFINITY}).element;
}


function setupAddTaskButtons() {
    document.querySelectorAll('.add-task').forEach(button => {
        button.addEventListener('click', (e) => {
            const columnId = e.target.dataset.columnId;
            const column = document.querySelector(`.column[data-column-id="${columnId}"]`);
            const form = column.querySelector('.task-form');


            form.querySelector('.task-title-input').value = '';
            form.querySelector('.task-description-input').value = '';


            form.style.display = 'block';
        });
    });

    document.querySelectorAll('.cancel-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const columnId = e.target.dataset.columnId;
            const form = document.querySelector(`.task-form[data-column-id="${columnId}"]`);
            form.style.display = 'none';
        });
    });

    document.querySelectorAll('.add-btn').forEach(button => {
        button.addEventListener('click', (e) => {
            const columnId = e.target.dataset.columnId;
            const column = document.querySelector(`.column[data-column-id="${columnId}"]`);
            const form = column.querySelector('.task-form');

            const titleInput = form.querySelector('.task-title-input');
            const descriptionInput = form.querySelector('.task-description-input');

            if (titleInput.value.trim() === '') {
                alert('Будь ласка, введіть назву завдання');
                return;
            }


            const newTask = {
                id: 'task' + Date.now(),
                title: titleInput.value.trim(),
                description: descriptionInput.value.trim()
            };


            const tasksContainer = column.querySelector('.tasks');
            const taskElement = document.createElement('div');
            taskElement.className = 'task';
            taskElement.draggable = true;
            taskElement.dataset.taskId = newTask.id;
            taskElement.innerHTML = `
                        <div class="task-title">${newTask.title}</div>
                        <div class="task-description">${newTask.description}</div>
                    `;

            tasksContainer.appendChild(taskElement);
            setupTaskDragEvents(taskElement);


            addTaskToColumn(columnId, newTask);


            form.style.display = 'none';
            titleInput.value = '';
            descriptionInput.value = '';
        });
    });
}


function updateTaskColumn(taskId, newColumnId) {

    console.log(`Завдання ${taskId} переміщено до колонки ${newColumnId}`);
}


function addTaskToColumn(columnId, task) {

    console.log(`Додано нове завдання до колонки ${columnId}:`, task);
}


initKanbanBoard(initialData);