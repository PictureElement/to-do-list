var data;

// Construct an empty JS object if the localStorage object is empty.
// getItem() returns null if the localStorage object is empty.
if (localStorage.getItem("listData") === null) {
    data = {
        "pending": [],
        "complete": []
    };
}
else {
    // Construct the JS object described by the string
    data = JSON.parse(localStorage.getItem("listData"));

    for (var i = 0; i < data.pending.length; i++) {
        var task = data.pending[i];
        // flag = 0: no need to update local storage and add to 'data'
        addItemPending(task, 0);
    }

    for (var j = 0; j < data.complete.length; j++) {
        var task = data.complete[j];
        // flag = 0: no need to update local storage and add to 'data'
        addItemComplete(task, 0)
    }
}

//------------------------------------------------------------------------------

// The following event listeners:
//     1. listen to the specified element
//     2. listen for a 'click' event
//     3. perform a series of actions when the specified element is clicked

//------------------------------------------------------------------------------

// Select the text field
var textField = $('#item-1');
// Select the date field
var dateField = $('#item-2');
// Select the time field
var timeField = $('#item-3');
// Select the add button
var addButton = $('#item-4');

// Add task
// A direct-bound event is used
addButton.on('click', function() {
    
    var text = textField.val();
    var date = dateField.val(); // 2017-11-28 (yyyy-mm-dd)
    var time = timeField.val(); // 13:24 (24h format)
    
    // task object
    var task = {"text":text, "date":date, "time":time, "htmlContent":""};
    
    // If text field is not empty, add user input to data.pending and to the DOM
    if (text) {
        // flag = 1: need to update local storage and add to 'data'
        addItemPending(task, 1);
    }
    else {
        alert("Please enter task");
    }
})

//------------------------------------------------------------------------------

// Remove & Complete functionalities of the 'pending' list
$('#pending').on('click', function(e) {
    
    var target = $(e.target);
    var listItem, button, htmlContent, task, indexOfTask;

    // Remove functionality: a delegated event is used since activities are 
    // created afterwards.
    // If a .btn-delete element or .fa-trash-o element is clicked
    if (target.is('.btn-delete') || target.is('.fa-trash-o')) {
        // Select list item
        listItem = target.parents('li');
        // Wrap list item in a dummy div tag in order to get the HTML contents
        listItem.wrap("<div id='wrapper'></div>");
        // Get the html contents of the list item
        htmlContent = $("#wrapper").html();
        // Remove the dummy div
        listItem.unwrap();
        // Remove list item from the DOM
        listItem.remove();
        // Remove task from data.pending
        indexOfTask = data.pending.findIndex(i => i.htmlContent === htmlContent);
        data.pending.splice(indexOfTask, 1);
        // Update local storage
        localStorageUpdate();
    }

    // Complete functionality: a delegated event is used since activities are 
    // created afterwards.
    // If a .btn-complete element or .fa-check element is clicked
    if (target.is('.btn-complete') || target.is('.fa-check')) {
        // If the target is the button
        if (target.is('.btn-complete')) {
            button = target;
        }
        // If the target is the font icon
        else {
            button = target.parent();
        }
        // Select list item
        listItem = target.parents('li');
        // Wrap list item in a dummy div tag in order to get the HTML contents
        listItem.wrap("<div id='wrapper'></div>");
        // Get the html contents of the list item
        htmlContent = $("#wrapper").html();
        // Remove the dummy div
        listItem.unwrap();
        // Remove list item from the DOM
        listItem.remove();
        // Remove task from data.pending
        indexOfTask = data.pending.findIndex(i => i.htmlContent === htmlContent);
        task = data.pending[indexOfTask];
        data.pending.splice(indexOfTask, 1);
        // Add task to the data.complete and to the DOM
        // flag = 1: need to update local storage and add to 'data'
        addItemComplete(task, 1);
    }
})

//------------------------------------------------------------------------------

// Remove functionality of the 'complete' list
$('#complete').on('click', function(e) {
    
    var target = $(e.target);
    var listItem, htmlContent, indexOfTask;
    
    // Remove functionality: a delegated event is used since activities are 
    // created afterwards.
    // If a .btn-delete element or .fa-trash-o element is clicked
    if (target.is('.btn-delete') || target.is('.fa-trash-o')) {
        // Select list item
        listItem = target.parents('li');
        // Wrap list item in a dummy div tag in order to get the HTML contents
        listItem.wrap("<div id='wrapper'></div>");
        // Get the html contents of the list item
        htmlContent = $("#wrapper").html();
        // Remove item from the DOM
        listItem.remove();
        // Remove item from data.complete
        indexOfTask = data.complete.findIndex(i => i.htmlContent === htmlContent);
        data.complete.splice(indexOfTask, 1);
        // Update local storage
        localStorageUpdate();
    }
})

//------------------------------------------------------------------------------

// The localStorage object stores the data with no expiration date. The data 
// will not be deleted when the browser is closed. 

// Store:
// localStorage.setItem("key", "value");

// Retrieve:
// localStorage.getItem("key");

// Remove:
// localStorage.removeItem("key");

function localStorageUpdate() {
    // The localStorage object can only store text. Thus, we need to convert the 
    // 'data' object into text.
    localStorage.setItem("listData", JSON.stringify(data));
    //console.log("local storage updated");
}

//------------------------------------------------------------------------------

// Add pending task
function addItemPending(task, flag) {
    
    var pendingTask = '<li class="list-group-item list-group-item-danger list-group-item-action d-flex justify-content-between align-items-center rounded"><div><p class="text-truncate">%data1%</p><p class="secondary-text">%data2%, %data3%</p></div><div class="btn-group" role="group" aria-label="functions"><button type="button" class="btn-delete btn btn-danger"><i class="fa fa-2x fa-trash-o" aria-hidden="true"></i></button><button type="button" class="btn-complete btn btn-info"><i class="fa fa-2x fa-check" aria-hidden="true"></i></button></div></li>';
    
    var htmlContent = pendingTask.replace("%data1%", task.text);
    htmlContent = htmlContent.replace("%data2%", task.date);
    htmlContent = htmlContent.replace("%data3%", task.time);

    // Set the object's 'htmlContent' property
    task.htmlContent = htmlContent;

    // Add task to the DOM
    $("#pending").prepend(htmlContent);

    // flag = 1: need to update local storage and add to 'data'
    if (flag === 1) {
        // Add task to data.pending
        data.pending.push(task);
        // Update local storage
        localStorageUpdate();
    }
}

//------------------------------------------------------------------------------

// Add complete item
function addItemComplete(task, flag) {

    var completeTask = '<li class="list-group-item list-group-item-success list-group-item-action d-flex justify-content-between align-items-center rounded"><div><p class="text-truncate">%data1%</p><p class="secondary-text">%data2%, %data3%</p></div><div class="btn-group" role="group" aria-label="functions"><button type="button" class="btn-delete btn btn-danger"><i class="fa fa-2x fa-trash-o" aria-hidden="true"></i></button></div></li>';
    
    var htmlContent = completeTask.replace("%data1%", task.text);
    htmlContent = htmlContent.replace("%data2%", task.date);
    htmlContent = htmlContent.replace("%data3%", task.time);

    // Set the object's 'htmlContent' property
    task.htmlContent = htmlContent;

    // Add task to the DOM
    $("#complete").prepend(htmlContent);

    // flag = 1: need to update local storage and add to 'data'
    if (flag === 1) {
        // Add task to data.complete
        data.complete.push(task);
        // Update local storage
        localStorageUpdate();
    }
}