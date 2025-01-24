function saveTask()
{
    console.log('saving task');
    //get values
    const title = $("#txtTitle").val();
    const description = $("#txtDescription").val();
    const color = $("#selColor").val();
    const date= $("#txtDate").val();
    const status = $("#txtStatus").val();
    const number = $("#numBudget").val();
    console.log(title,description,color,date,status,number);

    //build an object
    let taskToSave = new Task (title,description,color,date,status,number)
    console.log(taskToSave);
    //save to server

    $.ajax({
        type: "POST",
        url:  "http://fsdiapi.azurewebsites.net/api/tasks/",
        data: JSON.stringify(taskToSave),
        contentType: "application/json",
        success: function(response) {
        console.log(response);
        },
        error: function(error){
            console.log(error);
        }
    })

    //display the data received from server
    displayTask(taskToSave);
}
function loadTask(task){
    $.ajax({
        type: "GET",
        url: "http://fsdiapi.azurewebsites.net/api/tasks",
        success: function(response) {
            console.log(response);
            let data = JSON.parse(response);
            console.log(data);
            //console.log only those elements that were created by you or the server
            for (let i=0;i<data.length;i++)
            {
                let task =data[i];
                if(task.name=="vonda2025")
               {
                    displayTask(task);
                    console.log(task);
                }
            }

            function myFunction(error){
            console.log(error);
            // function body
        }
    }
});}

function displayTask(task)
 {      
    let syntax = `<div class='task'>
    <div class='info'>
        <h5>${task.title}</h5>
        <p>${task.description}</p>
    </div>
    <label class='status'>${task.status}</label>
    <div class='date-budget'>
    <label>${task.date}</label>
    <label>${task.budget}</label>
    </div>
    </div>
    `;
    $(".pending.tasks").append(syntax);
 }

 function testFunction()
 {
    $.ajax({
        type: "get",
        url:"http://fsdiapi.azurewebsites.net",
        success: function(response)
        {
            console.log(response);
        },
        error: function(error)
        {
            console.log(error);
        
        }
    });
 }

function init(){
    console.log('init');
    //load data
    loadTask(),
    // hook events
    $("#btnSave").click(saveTask);
}

window.onload = init;
//Variable Scope