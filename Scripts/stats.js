
let selectedMode = "live_rapid";
let data;

function getData(link){
    return new Promise(function (resolve, reject) {
        const request = new XMLHttpRequest();
        request.open("GET", link);
        request.send();
        
        request.onload = () => {
        
            if(request.status == 200){
                let data =  JSON.parse(request.response);
                resolve(data);
            }else{
                console.log("error fetching data");
            }
        
        }
    });

    
}



async function main(){
    data = await getData("https://api.chess.com/pub/leaderboards");
    setList();
}

main();


async function setList(){
    let players = data[selectedMode];
    
    let list = document.getElementsByClassName("playerList")[0];
    list.innerHTML = "";

    for(let i = 0; i < players.length; i++){
        let playerItemRank = "<div class='playerItemRank'>" + "# " +players[i].rank +"</div>";
        let playerAvatar = "<div class='playerAvatar'>" + "<img src='" + players[i].avatar +"'height='100%'>" + "</div>";
        let playerTitle = "<div class='playerTitle'>" + players[i].title + "</div>";
        let userName = "<div class='userName'>" + players[i].username + "</div>";
        let ratingText = "<div class='Rating'> Rating: </div>";
        let rating = "<div class='userName' style='color: rgb(52, 52, 52); position: absolute;left: 80%; margin-top: 2vh;'>" + players[i].score + "</div>";

        let c = await getData(players[i].country);
        let country = "<div class='Country'>" + c.name + "</div>"

        if(players[i].title == undefined){
            playerTitle = "<div class='playerTitleBlank'>N</div>";        
        }

        let playerItem = "<div class='playerItem' id="+ players[i].url +">" + playerItemRank + playerAvatar + playerTitle + userName + ratingText + rating +country + "</div>" + "<hr class='lineSeparate'>";
        list.innerHTML += playerItem;

    }

    //finish loading
    let element = document.getElementsByClassName('LoadingScreen')[0];
    element.classList.toggle("fadeOut", true);

    console.log(document.getElementsByClassName('LoadingScreen')[0]);

    let allPlayers = document.getElementsByClassName("playerItem");
    for(let i = 0; i < allPlayers.length; i++){
        allPlayers[i].addEventListener("click", function(e){
            window.open(allPlayers[i].id)
        })
    }


}

function changeMode(text){
    let element = document.getElementsByClassName("selectedOption")[0];
    element.innerHTML = text + "<img src='Images/Icons/Dropdown.png' width='15px' style='padding-left: 5px'>";
    if(text == "Rapid"){selectedMode = "live_rapid";}
    else if(text == "Daily"){selectedMode = "daily";}
    else if(text == "Daily 960") {selectedMode = "daily960";}
    else if(text == "Blitz") {selectedMode = "live_blitz";}
    else if(text == "Bughouse") {selectedMode = "live_bughouse";}
    else if(text == "Bullet") {selectedMode = "live_bullet";}
    else if(text == "Crazyhouse") {selectedMode = "live_crazyhouse";}
    else if(text == "King of the Hill") {selectedMode = "live_kingofthehill";}
    else if(text == "3 Check") {selectedMode = "live_threecheck";}

    setList();
}