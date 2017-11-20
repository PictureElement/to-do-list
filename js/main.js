// The event listener:
//     1. listens to the <button> element
//     2. listens for a 'click' event
//     3. performs the following actions when the button is clicked:
//         a. removes the <button> element from the DOM
//         b. inserts an <h3> element after #result
//         c. adds the 'yellow-bg' class to the <body>

// Select <button> element
var button = $('#add');
// Event listener
button.on('click', function() {
    var value = $('#item').val();
    // If value is not an empty string
    if (value) {
        console.log(value);
    }
})