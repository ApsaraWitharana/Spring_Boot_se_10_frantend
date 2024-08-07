
////////set the button action to and backend connect to frontend set ajax
$('#savepost').click( function (){
    //catch the input fealde  values
   let  postId = $('#post-id').val(); // get value
    let  postTitle = $('#post-title').val(); // get value
    let  postCategory = $('#post-category').val(); // get value
    let  text= $('#text').val(); // get value
    console.log(postId,postTitle,postCategory,text);

    $.ajax({
        url: "http://localhost:8080/blog/savepost",
        method:"POST",
        contentType:"application/json",
        "data":JSON.stringify({
            "id":postId,
            "title":postTitle,
            "category":postCategory,
            "content":text
        }),
        success:function (result){
            console.log(result)
            alert("done")
            ready();
        },
        error:function (error){
            console.log(error)
            alert("try again")
        }
    })

})

$('#deletepost').click( function (){
    let  postId = $('#post-id').val(); // get value
    $.ajax({
        url: "http://localhost:8080/blog/deletepost/"+postId, // Include postId in the URL
        method: "DELETE",
        // contentType: "application/json",
        // dataType: "json", // Expect JSON response
        success: function (result) {
            console.log(result);
            alert("delete successful");
        },
        error: function (error) {
            console.log(error);
            alert("delete failed, please try again");
        }
    });
});

// $('#getpost').click(function (){
//     let  postId = $('#post-id').val(); // get value
//     $.ajax({
//          url: "http://localhost:8080/blog/getpost/" + postId, // Include postId in the URL
//         method: "GET",
//         success: function (result) {
//             console.log(result);
//             alert("get successful");
//         },
//         error: function (error) {
//             console.log(error);
//             alert("get failed, please try again");
//         }
//     });

//})
$(document).ready(function() {
    $('#getpost').click(function (){
        // let  postId = $('#post-id').val(); // get value
        $.ajax({
            "url": "http://localhost:8080/blog/getAll?id", // Adjust URL as needed
            method: "GET",
            success: function (result) {
                console.log(result);
                $('#posts-table').empty(); // Clear the table
                result.forEach(post => {
                    $('#posts-table').append(`
                                <tr>
                                    <td>${post.id}</td>
                                    <td>${post.title}</td>
                                    <td>${post.category}</td>
                                    <td>${post.content}</td>
                                </tr>
                            `);
                });
                alert("Get all posts successful");
            },
            error: function (error) {
                console.log(error);
                alert("Get all posts failed, please try again");
            }
        });
    });
});
$('#updatepost').click(function () {
    // Catch the input field values
    let postId = $('#post-id').val(); // Get value
    let postTitle = $('#post-title').val(); // Get value
    let postCategory = $('#post-category').val(); // Get value
    let text = $('#text').val(); // Get value
    console.log(postId, postTitle, postCategory, text);

    $.ajax({
        url: "http://localhost:8080/blog/updatepost ",
        method: "PUT",
        contentType: "application/json",
        dataType: "json", // Expect JSON response
        data: JSON.stringify({
            "id":postId,
            "title":postTitle,
            "category":postCategory,
            "content":text
        }),
        success: function (result) {
            console.log(result);
            alert("Update successful");
        },
        error: function (error) {
            console.log(error);
            alert("Update failed, please try again");
        }
    });
});


/*////////////////set js to update table clams data and update and delete data///////////////*/


    // Function to populate the form with data from the selected row
    function updateRow(button) {
    var row = button.closest('tr');
    selectRow(row);
}

    function selectRow(row) {
    var id = row.dataset.id;
    var title = row.children[1].textContent;
    var category = row.children[2].textContent;
    var text = row.children[3].textContent;

    document.getElementById('post-id').value = id;
    document.getElementById('post-title').value = title;
    document.getElementById('post-category').value = category;
    document.getElementById('text').value = text;

    // Optionally, you can also enable the ID field if needed
    document.getElementById('post-id').disabled = false;

    // Highlight the selected row
    var rows = document.querySelectorAll('#posts-table tr');
    rows.forEach(r => r.classList.remove('selected'));
    row.classList.add('selected');
}

    // Function to delete the selected row
    function deleteRow(button) {
    var row = button.closest('tr');
    if (confirm("Are you sure you want to delete this post?")) {
    row.remove();
}
}

    // Function to save or update the form data
    document.getElementById('savepost').addEventListener('click', function() {
    var id = document.getElementById('post-id').value;
    var title = document.getElementById('post-title').value;
    var category = document.getElementById('post-category').value;
    var text = document.getElementById('text').value;

    if (id) {
    // Update existing post
    var row = document.querySelector(tr[id='${id}']);
    if (row) {
    row.children[1].textContent = title;
    row.children[2].textContent = category;
    row.children[3].textContent = text;
}
} else {
    // Add new post
    var tableBody = document.getElementById('posts-table');
    var newRow = tableBody.insertRow();
    var newId = Date.now(); // Generate a new unique ID
    newRow.dataset.id = newId;
    newRow.innerHTML = `
                <td>${newId}</td>
                <td>${title}</td>
                <td>${category}</td>
                <td>${text}</td>
                <td>
                    <button class="btn btn-icon" title="Update" onclick="updateRow(this)">
                        <i class="fas fa-edit text-warning"></i>
                    </button>
                    <button class="btn btn-icon" title="Delete" onclick="deleteRow(this)">
                        <i class="fas fa-trash-alt text-danger"></i>
                    </button>
                </td>
            `;
}

    // Clear form fields
    document.getElementById('post-form').reset();
    document.getElementById('post-id').disabled = false;
});

    // Function to update selected row
    document.getElementById('updatepost').addEventListener('click', function() {
    var id = document.getElementById('post-id').value;
    var title = document.getElementById('post-title').value;
    var category = document.getElementById('post-category').value;
    var text = document.getElementById('text').value;

    if (id) {
    // Update existing post
    var row = document.querySelector(tr[id='${id}']);
    if (row) {
    row.children[1].textContent = title;
    row.children[2].textContent = category;
    row.children[3].textContent = text;
    // Clear the selection
    document.querySelectorAll('#posts-table tr').forEach(r => r.classList.remove('selected'));
    document.getElementById('post-form').reset();
    document.getElementById('post-id').disabled = false;
}
} else {
    alert('Please enter a Post ID.');
}
});

    // Function to delete selected row
    document.getElementById('deletepost').addEventListener('click', function() {
    var id = document.getElementById('post-id').value;

    if (id) {
    var row = document.querySelector(tr[id='${id}']);
    if (row) {
    if (confirm("Are you sure you want to delete this post?")) {
    row.remove();
    document.getElementById('post-form').reset();
    document.getElementById('post-id').disabled = false;
}
} else {
    alert('Post ID not found.');
}
} else {
    alert('Please enter a Post ID.');
}
});

    // Function to handle row click
    document.querySelectorAll('#posts-table').forEach(tbody => {
    tbody.addEventListener('click', function(e) {
        var row = e.target.closest('tr');
        if (row) {
            selectRow(row);
        }
    });
});
