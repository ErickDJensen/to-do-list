$(document).ready(handleReady);

function handleReady() {
    console.log('jQuery ready to go!')
    refreshTasks();
    addClickHandler();
}

function addClickHandler() {
    $('#submitTask').on('click', submitTask);
    $('#taskList').on('click', '.taskDelete', deleteTask);
    $('#taskList').on('click', '.taskComplete', completeTask);
}


function refreshTasks() {
    $.ajax({
        type: 'GET',
        url: '/tasks'
    }).then(function (response) {
        console.log('get tasks', response);
        renderTasks(response);
    }).catch(function (error) {
        console.log('Catch the error', error);
    })
}

function renderTasks(tasks) {
    console.log('In renderTasks', tasks);
    $('#taskList').empty();
    for (let item of tasks) {
        console.log('item', item.task);
    $('#taskList').append(`
    <tr>
        <td>${item.task}</td>
        <td><button class="taskComplete">Complete</button><button class="taskDelete" data-id="${item.id}">Delete</button></td>
    </tr>`)
}

}

function submitTask() {
    console.log("In submitTask");
    let task = $('#inputTask').val()
    let tasksToAdd = { task }
    console.log(tasksToAdd);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: tasksToAdd,
    }).then(function (response) {
        console.log('Response from server.', response);
        refreshTasks();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to add task at this time. Please try again later.');
    });
    $('#inputTask').val('');
}

function deleteTask() {
    console.log("In deleteTask");
    console.log('task id: ', $(this).data().id);
    const taskId = $(this).data().id;
    $.ajax({
        type: 'DELETE',
        url: '/tasks/' + taskId
    }).then(function (response) {
        console.log('Response from server.', response);
        refreshTasks();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to delete task at this time. Please try again later.');
    });
}

function completeTask() {
    console.log("In completeTask");

}


