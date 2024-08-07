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
