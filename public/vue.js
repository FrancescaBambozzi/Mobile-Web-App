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
                
                }).catch(function (error) {
                    console.log(error)
                })
        },
        displaySchedule(month) {
            if (this.openSchedule != month)
                this.openSchedule = month;
            else
                this.openSchedule = "";
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
        setCurrentView(page) {
            console.log(page)
            this.currentView = page;
        }
    }
})
