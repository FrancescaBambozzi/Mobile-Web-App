//document.getElementById("login").addEventListener("click", login);
//document.getElementById("logout").addEventListener("click", logout);
//document.getElementById("create-post").addEventListener("click", writeNewPost);

//getPosts(); 
//displayElements();

/*function displayElements() {
    firebase.auth().onAuthStateChanged(function (user) {
        if (user) {
            // User is signed in.
            $(".advice").hide();
            $("#posts").show();
            $("#users_div").show();
            $(".input-send-container").show();
            getPosts();
            // getUsersOnChat();

        } else {
            $(".advice").show();
            $("#posts").hide();
            $("#users_div").hide();
            $(".input-send-container").hide();
            // User is NOT signed in.
        }
    })
}*/

/*function login() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function () {
            getPosts();
        })
        .catch(function () {
            alert("Something went wrong");
        });
}*/

/*function logout() {

    firebase.auth().signOut().then(function () {
            console.log('Signed Out');
        },
        function (error) {
            console.error('Sign Out Error', error);
        });
}*/

/*function writeNewPost() {

    if (!$("#textInput").val()) {
        return
    }

    var text = document.getElementById("textInput").value;
    var userName = firebase.auth().currentUser.displayName;
    var photo = firebase.auth().currentUser.photoURL;

    // A post entry.
    var postData = {
        name: userName,
        body: text,
        photo: photo
    };

    // Get a key for a new Post.
    var newPostKey = firebase.database().ref().child('myMatch').push().key;

    var updates = {};
    updates[newPostKey] = postData;

    $("#textInput").val("");

    return firebase.database().ref().child('myMatch').update(updates);
}
*/

/*function getPosts() {

    firebase.database().ref('myMatch').on('value', function (data) {

        var logs = document.getElementById("posts");
        logs.innerHTML = "";

        var posts = data.val();
        var template = "";

        for (var key in posts) {

            if (posts[key].name == firebase.auth().currentUser.displayName) {
                template += `
          <div class="notification is-info">
            <p class="name">${posts[key].name}:</p>
            <p class="post-text">${posts[key].body}</p>
          </div>
        `;
            } else {
                template += `
          <div class="notification is-primary">
            <p class="name">${posts[key].name}:</p>
            <p class="post-text">${posts[key].body}</p>
          </div>
        `;
            }
        }

        logs.innerHTML = template;

        $(".box").animate({
            scrollTop: $(".box").prop("scrollHeight")
        }, 500);
    });
}*/

/*function getUsersOnChat() {
    
    var usersDiv = document.getElementById("users_div");
    usersDiv.innerHTML = "";

    firebase.database().ref('myMatch').on('value', function (data) {
        
    let chat = data.val()
    let arrayOfUsers = [];

    for (post in chat) {
        let el = chat[post];
        if (el.photo && !arrayOfUsers.includes(el.photo))
            arrayOfUsers.push(el.photo)
    }
    app.arrayOfUsers = arrayOfUsers;
 })
} */

