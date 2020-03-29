$(document).ready(handleReady);

//function to fun when the page loads
function handleReady() {
    console.log('jQuery ready to go!')
    refreshTasks();
    addClickHandler();
}//end handleReady

//function to add click handlers
function addClickHandler() {
    $('#submitTask').on('click', submitTask);
    $('#taskList').on('click', '.taskDelete', deleteTask);
    $('#taskList').on('click', '.taskComplete', 'ul li', completeTask);
}//end addClickHandler

//function to get info from database
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
}//end refreshTasks

//function to render on to the DOM
function renderTasks(tasks) {
    console.log('In renderTasks', tasks);
    $('#taskList').empty();
    for (let item of tasks) {
        console.log('item', item.task);
        if (item.status === "Completed") {
            $('#taskList').append(`
        <tr>
        <td class="finished" width="250">${item.task}</td>
        <td><button class="taskDelete" data-id="${item.id}">Delete</button></td>
        </tr>`)
        } else {
            $('#taskList').append(`
        <tr>
        <td width="250">${item.task}</td>
        <td><button class="taskDelete" data-id="${item.id}">Delete</button><button class="taskComplete" data-id="${item.id}">Complete</button></td>
        </tr>`)

        }

    }

}//end renderTasks

//function to post to the server/database
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
}//end submitTask

//function to delete tast from the server/database
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
}//end deleteTask

//functon to update the server/database
function completeTask() {
    console.log("In completeTask");
    console.log('task id: ', $(this).data().id);
    const taskId = $(this).data().id;
    $.ajax({
        type: 'PUT',
        url: '/tasks/' + taskId
    }).then(function (response) {
        console.log('Response from server.', response);
        refreshTasks();
    }).catch(function (error) {
        console.log('Error in POST', error)
        alert('Unable to update task at this time. Please try again later.');
    });

}//end completeTask


