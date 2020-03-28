$(document).ready(handleReady);

function handleReady(){
    console.log('jQuery ready to go!')
    refreshTasks();
    addClickHandler();
}

function addClickHandler(){
    $('#submitTask').on('click', submitTask);
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

function renderTasks(tasks){
    console.log('In renderLog'); 
    $('#taskList').empty();
    for (let item of tasks) {
        $('#taskList').append(`<li>${item.task}</li>`)
    }      
}

function submitTask(){
        console.log("In submitTask");
        let tasksToAdd = {
            task: $('#inputTask').val()
        }
        console.log(tasksToAdd);
    $.ajax({
        type: 'POST',
        url: '/tasks',
        data: tasksToAdd,
        }).then(function(response) {
          console.log('Response from server.', response);
          refreshTasks();
        }).catch(function(error) {
          console.log('Error in POST', error)
          alert('Unable to add task at this time. Please try again later.');
        });
        $('#inputTask').val('');
}