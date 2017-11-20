// The event listener:
//     1. listens to the <button> element
//     2. listens for a 'click' event
//     3. performs the following actions when the button is clicked:

var pendingItem = '<li class="list-group-item list-group-item-warning list-group-item-action d-flex justify-content-between align-items-center rounded"> <p class="text-truncate">%data%</p><div class="btn-group" role="group" aria-label="functions"> <button type="button" class="btn btn-danger" data-toggle="tooltip" data-placement="auto" title="Delete activity"><i class="fa fa-2x fa-trash-o" aria-hidden="true"></i></button> <button type="button" class="btn btn-info"><i class="fa fa-2x fa-check" aria-hidden="true"></i></button> </div></li>';
var completedItem = 0;

// Select the main button for adding a new activity 
var button = $('#add');

// Event listener
button.on('click', function() {
    var text = $('#item').val();
    // If value is not empty, add to the pending list
    if (text) {
        addItemPending(text);
    }
})

/* Add item to the pending list */
function addItemPending(text) {
    content = pendingItem.replace("%data%", text);
    /* Latest activity first in the list */ 
    $("#pending").prepend(content);
}