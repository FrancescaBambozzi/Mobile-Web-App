const app = new Vue({
    el: "#app",
    data: {
        isLoadding: true,
        schedules: [],
        openSchedule: "",
        teams: [],
        openTeam: "",
        locations: [],
        events: [],
        openEvent: [],
        currentView: "teams",
        chat: "",
        arrayOfUsers: [],
        userName: "",
        posts: [],
    },
    created: function () {
        this.getData()
    },
    methods: {
        getData: function () {
            fetch("https://api.myjson.com/bins/b35ye", {
                    method: "GET",
                    headers: new Headers({
                        //"X-API-Key": ''
                    })
                })
                .then(function (response) {
                    return response.json();
                }).then(function (json) {
                    data = json;
                    isLoadding = false;
                    app.schedules = data.schedule;
                    app.teams = data.teams;
                    app.locations = data.locations;
                    app.events = data.events;
                    app.getUsersOnChat();
                    app.displayElements();
                    app.getPosts();

                }).catch(function (error) {
                    console.log(error)
                })
        },
        displayTeam: function (team) {
            if (this.openTeam != team)
                this.openTeam = team;
            else
                this.openTeam = "";
        },
        findTeamEvents: function (team) {
            let array = [...app.schedules[0]["calendar"], ...app.schedules[1]["calendar"]]
            let gamesOfTheTeam = [];
            for (var i = 0; i < array.length; i++) {

                var event = array[i];

                if (event["team"] == team) {
                    gamesOfTheTeam.push(event)
                }
            }
            this.openEvent = gamesOfTheTeam;
        },
        displayTeamInfo(team) {
            this.displayTeam(team);
            this.findTeamEvents(team);
        },
        displaySchedule(month) {
            if (this.openSchedule != month)
                this.openSchedule = month;
            else
                this.openSchedule = "";
        },
        setCurrentView(page) {
            this.currentView = page;
        },
        displayElements() {
            firebase.auth().onAuthStateChanged(function (user) {
                if (user) {
                    // User is signed in.
                    $(".advice").hide();
                    $("#posts").show();
                    $("#users_div").show();
                    $(".input-send-container").show();
                    app.getPosts();
                    //app.getUsersOnChat();

                } else {
                    $(".advice").show();
                    $("#posts").hide();
                    $("#users_div").hide();
                    $(".input-send-container").hide();
                    // User is NOT signed in.
                }
            })
        },
        login() {
            var provider = new firebase.auth.GoogleAuthProvider();

            firebase.auth().signInWithPopup(provider)
                .then(function () {
                    app.getPosts();
                })
                .catch(function () {
                    alert("Something went wrong");
                });
        },
        logout() {

            firebase.auth().signOut().then(function () {
                    console.log('Signed Out');
                },
                function (error) {
                    console.error('Sign Out Error', error);
                });
        },
        writeNewPost() {

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
        },
        getUsersOnChat() {

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
        },
        getPosts() {

            firebase.database().ref('myMatch').on('value', function (data) {

                app.posts = data.val();
                app.userName = firebase.auth().currentUser.displayName

                $(".box").animate({
                    scrollTop: $(".box").prop("scrollHeight")
                }, 500);

            });
        }
    }
})
