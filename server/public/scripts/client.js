$(document).ready(handleReady);

function handleReady(){
    console.log('jQuery ready to go!')
    refreshTasks();
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