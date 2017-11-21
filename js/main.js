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
    // If value is not empty, add it to the local object and to the pending list
    if (text) {
        data.pending.push(text);
        addItemPending(text);
    }
})

//------------------------------------------------------------------------------

// Delete & Complete activities from the 'pending' list
$('#pending').on('click', function(e) {
    var target = $(e.target);
    var activity, button;

    // Delete activity: a delegated event is used since activities are created 
    // afterwards.
    // If a .btn-delete element or .fa-trash-o element is clicked
    if (target.is('.btn-delete') || target.is('.fa-trash-o')) {
        console.log("1");
        target.parents('li').remove();
    }

    // Complete activity: a delegated event is used since activities are created 
    // afterwards.
    // If a .btn-complete element or .fa-check element is clicked
    if (target.is('.btn-complete') || target.is('.fa-check')) {
        // If the target is the button
        if (target.is('.btn-complete')) {
            console.log("2");
            button = target;
            // Hide 'check' button
            button.css("display", "none");
            // Add rounded corners to 'delete' button
            button.siblings().addClass("rounded");
        }
        // If the target is the font icon
        else {
            console.log("3");
            button = target.parent();
            // Hide 'check' button
            button.css("display", "none");
            // Add rounded corners to 'delete' button
            button.siblings().addClass("rounded");
        }
        // Select list item
        activity = target.parents('li');
        console.log(activity);
        // Wrap the list item in a dummy div container in order to get the HTML 
        // content
        var htmlContents = activity.wrap('<div class="dummy"></div>').parent().html();
        // Change the contextual bg color of the list item
        htmlContents = htmlContents.replace("list-group-item-warning", "list-group-item-success");
        // Remove the dummy div container
        activity.unwrap();
        // Remove list item from the 'pending' list
        activity.remove();
        // Copy html content to 'complete' list
        $("#complete").prepend(htmlContents);
    }
})

//------------------------------------------------------------------------------

// Delete activities from the 'complete' list
$('#complete').on('click', function(e) {
    var target = $(e.target);

    // Delete activity: a delegated event is used since activities are created 
    // afterwards.
    // If a .btn-delete element or .fa-trash-o element is clicked
    if (target.is('.btn-delete') || target.is('.fa-trash-o')) {
        console.log("1");
        target.parents('li').remove();
    }
})

//------------------------------------------------------------------------------

// Add item to the 'pending' list
function addItemPending(text) {
    var pendingItem = '<li class="list-group-item list-group-item-warning list-group-item-action d-flex justify-content-between align-items-center rounded"> <p class="text-truncate">%data%</p><div class="btn-group" role="group" aria-label="functions"> <button type="button" class="btn-delete btn btn-danger" data-toggle="tooltip" data-placement="auto" title="Delete activity"><i class="fa fa-2x fa-trash-o" aria-hidden="true"></i></button> <button type="button" class="btn-complete btn btn-info"><i class="fa fa-2x fa-check" aria-hidden="true"></i></button> </div></li>';
    content = pendingItem.replace("%data%", text);
    // Latest activity should be on top
    $("#pending").prepend(content);
}