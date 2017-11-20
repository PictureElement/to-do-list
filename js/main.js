// The event listener:
//     1. listens to the <button> element
//     2. listens for a 'click' event
//     3. performs the following actions when the button is clicked:

//------------------------------------------------------------------------------

// Select the add button
var addButton = $('#btn-add');

// Add activity - a direct-bound event is used
addButton.on('click', function() {
    var text = $('#item').val();
    // If value is not empty, add to the pending list
    if (text) {
        addItemPending(text);
    }
})

//------------------------------------------------------------------------------

// Delete activity - a delegated event is used since activities are created 
// afterwards
$('#pending').on('click', function(e) {
    console.log('event');
    var target = $(e.target);
    console.log(target);
    // If a .btn-delete element or .fa-trash-o element is clicked
    if (target.is('.btn-delete .fa-trash-o')) {
        target.parents('li').remove();
    }
})

//------------------------------------------------------------------------------

// Complete activity:
$('#pending').on('click', function(e) {
    var target = $(e.target);
    var activity, button;
    // If a .btn-complete element or .fa-check element is clicked
    if (target.is('.btn-complete .fa-check')) {
        // if the target is the button
        if (target.is('.btn-complete')) {
            // hide 'check' button
            target.css("display", "none");
        }
        // if the target is the font icon
        else {
            // hide 'check' button
            target.parent().css("display", "none");
        }
        // Select list item
        activity = target.parents('li');
        // Select html content 
        var htmlContents = activity.html();
        // Remove list item from 'pending' list
        activity.remove();
        htmlContents = '<li class="list-group-item list-group-item-success list-group-item-action d-flex justify-content-between align-items-center rounded">' + htmlContents + '</li>';
        // Copy html content to 'complete' list
        $("#complete").prepend(htmlContents);
    }
})

//------------------------------------------------------------------------------

///Add item to the 'pending' list
function addItemPending(text) {
    var pendingItem = '<li class="list-group-item list-group-item-warning list-group-item-action d-flex justify-content-between align-items-center rounded"> <p class="text-truncate">%data%</p><div class="btn-group" role="group" aria-label="functions"> <button type="button" class="btn-delete btn btn-danger" data-toggle="tooltip" data-placement="auto" title="Delete activity"><i class="fa fa-2x fa-trash-o" aria-hidden="true"></i></button> <button type="button" class="btn-complete btn btn-info"><i class="fa fa-2x fa-check" aria-hidden="true"></i></button> </div></li>';
    content = pendingItem.replace("%data%", text);
    /* Latest activity first in the list */
    $("#pending").prepend(content);
}

///Add item to the 'complete' list
function addItemComplete(activity) {
    $("#complete").prepend(activity);
}