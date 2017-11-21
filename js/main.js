var data = {
    pending: [],
    complete: []
};

// The event listeners:
//     1. listen to the specified element
//     2. listen for a 'click' event
//     3. perform a series of actions when the specified element is clicked

//------------------------------------------------------------------------------

// Select the add button
var addButton = $('#btn-add');

// Add activity
// A direct-bound event is used
addButton.on('click', function() {
    var text = $('#item').val();
    // If value is not empty, add it to the data.pending and to the DOM
    if (text) {
        addItemPending(text);
    }
})

//------------------------------------------------------------------------------

// Remove & Complete functionalities of the 'pending' list
$('#pending').on('click', function(e) {
    var target = $(e.target);
    var activity, button, text;

    // Remove functionality: a delegated event is used since activities are created 
    // afterwards.
    // If a .btn-delete element or .fa-trash-o element is clicked
    if (target.is('.btn-delete') || target.is('.fa-trash-o')) {
        // Select list item
        activity = target.parents('li');
        // Get the text contents of the list item (i.e. actual user input)
        text = activity.text();
        // Remove item from data.pending
        data.pending.splice(data.pending.indexOf(text), 1);
        // Update local storage
        localStorageUpdate();
        // Remove item from the DOM
        activity.remove();
    }

    // Complete functionality: a delegated event is used since activities are created 
    // afterwards.
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
        activity = target.parents('li');
        // Get the text contents of the list item (i.e. actual user input)
        text = activity.text();
        // Remove activity from the DOM
        activity.remove();
        // Remove item from data.pending
        data.pending.splice(data.pending.indexOf(text), 1);
        // Add item to the data.complete and to the DOM
        addItemComplete(text);
    }
})

//------------------------------------------------------------------------------

// Remove functionality of the 'complete' list
$('#complete').on('click', function(e) {
    var target = $(e.target);
    var activity, text;
    // Remove functionality: a delegated event is used since activities are 
    // created afterwards.
    // If a .btn-delete element or .fa-trash-o element is clicked
    if (target.is('.btn-delete') || target.is('.fa-trash-o')) {
        // Select list item
        activity = target.parents('li');
        // Get the text contents of the list item (i.e. actual user input)
        text = activity.text();
        // Remove item from data.complete
        data.complete.splice(data.complete.indexOf(text), 1);
        // Update local storage
        localStorageUpdate();
        // Remove item from the DOM
        activity.remove();
    }
})

//------------------------------------------------------------------------------

function localStorageUpdate() {
    console.log("local storage updated");
}

//------------------------------------------------------------------------------

// Add pending item
function addItemPending(text) {
    // Add item to data.pending
    data.pending.push(text);
    // Update local storage
    localStorageUpdate();
    var pendingItem = '<li class="list-group-item list-group-item-warning list-group-item-action d-flex justify-content-between align-items-center rounded"><p class="text-truncate">%data%</p><div class="btn-group" role="group" aria-label="functions"><button type="button" class="btn-delete btn btn-danger" data-toggle="tooltip" data-placement="auto" title="Delete activity"><i class="fa fa-2x fa-trash-o" aria-hidden="true"></i></button><button type="button" class="btn-complete btn btn-info"><i class="fa fa-2x fa-check" aria-hidden="true"></i></button></div></li>';
    content = pendingItem.replace("%data%", text);
    // Add activity to the DOM
    $("#pending").prepend(content);
}

//------------------------------------------------------------------------------

// Add complete item
function addItemComplete(text) {
    // Add item to data.complete
    data.complete.push(text);
    // Update local storage
    localStorageUpdate();
    var completeItem = '<li class="list-group-item list-group-item-success list-group-item-action d-flex justify-content-between align-items-center rounded"><p class="text-truncate">%data%</p><div class="btn-group" role="group" aria-label="functions"><button type="button" class="btn-delete btn btn-danger" data-toggle="tooltip" data-placement="auto" title="Delete activity"><i class="fa fa-2x fa-trash-o" aria-hidden="true"></i></button></div></li>';
    content = completeItem.replace("%data%", text);
    // Add activity to the DOM
    $("#complete").prepend(content);
}