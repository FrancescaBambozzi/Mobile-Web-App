document.getElementById("login").addEventListener("click", login);
document.getElementById("create-post").addEventListener("click", writeNewPost);

//var audio = new Audio('stop1.mp3');
$(".advice").hide();
$("#posts").hide();

getPosts();
getUserLoggedIn();
getUsersOnChat();

firebase.auth().onAuthStateChanged(function (user) {
    if (user) {
        // User is signed in.
        $(".advice").hide();
        $("#posts").show();
        $("#users_div").show();
        getUserLoggedIn();

    } else {
        $(".advice").show();
        $("#posts").hide();
        $("#users_div").hide();
        // No user is signed in.
    }
});

function login() {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth().signInWithPopup(provider)
        .then(function () {
            getPosts();
        })
        .catch(function () {
            alert("Something went wrong");
        });
}


function writeNewPost() {

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

    // audio.play();

    return firebase.database().ref().child('myMatch').update(updates);
}


function getPosts() {

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
            <p>${posts[key].body}</p>
          </div>
        `;
            } else {
                template += `
          <div class="notification is-primary">
            <p class="name">${posts[key].name}:</p>
            <p>${posts[key].body}</p>
          </div>
        `;
            }
        }

        logs.innerHTML = template;

        $(".box").animate({
            scrollTop: $(".box").prop("scrollHeight")
        }, 500);
    });
}

function getUserLoggedIn() {

    var user = firebase.auth().currentUser;
    var name, email, photoUrl;

    if (user != null) {
        name = user.displayName;
        email = user.email;
        photoUrl = user.photoURL;
    }

}

function getUsersOnChat() {

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

}
