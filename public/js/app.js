$(document).ready(function() {

    const todoStatuses = {
        'todo': 'To Do',
        'progress': 'In Progress',
        'completed': 'Completed'
    };
    

    $('#btnNewTask').click(function() {
        const title = $('#title').val();
        const dueDate = $('#date').val();
        const status = $('#status').val();
        if (title !== '' && dueDate !== '' && status !== '') {
            const newTask = {
                'title': title,
                'dueDate': dueDate,
                status
            };
            // Call api to store new task
            $.ajax({
                url: 'http://localhost:3333/api/todos',
                type: 'POST',
                data: JSON.stringify(newTask),
                contentType: 'application/json',
                success: function(result) {
                    loadToDoDataToTable();
                    $('#modalNewTask').modal('hide');
                }
            });
            // after call api success, add new task to table
        } else {
            alert('All fields are required!');
        }
    });

    $('#tableToDo').on('click', '.btn-task-delete', function() {
        const deleteButton = $(this);
        const taskId = deleteButton.data('id');
        if (confirm('Are you sure?')) {
            $.ajax({
                url: `http://localhost:3333/api/todos/${taskId}`,
                type: 'DELETE',
                success: function(result) {
                    loadToDoDataToTable();
                }
            });
        }
    });

    function generateTableRow(task) {
        let tableRow = `
            <tr>
                <td>${task.id}</td>
                <td>${task.title}</td>
                <td>${task.dueDate}</td>
                <td>${todoStatuses[task.status]}</td>
                <td>
                    <div class="btn-group" role="group">
                        <button type="button" class="btn btn-warning">Edit</button>
                        <button type="button" class="btn btn-danger btn-task-delete" data-id="${task.id}">Delete</button>
                    </div>
                </td>
            </tr>
        `;
        return tableRow;
    }

    function loadToDoDataToTable() {
        $.get('http://localhost:3333/api/todos', function(res) {
            const tableToDo = $('#tableToDo');
            tableToDo.children('tbody').html('');
            const todos = res.data;
            if (todos.length) {
                $.each(todos, function(index, task) {
                    tableToDo.children('tbody').append(generateTableRow(task));
                });
            }
        })
        .fail(function(err) {
            console.log('Something went wrong!', err);
        });
    }

    // Load all ToDo tasks
    loadToDoDataToTable();
});