
async function getsongs() {
    let x = await fetch("http://127.0.0.1:5500/songs/")
    let response = await x.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    let songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split("/songs/")[1]);
            console.log(element.href.split("/songs/")[1]);
            
        }

    }
    return songs;

}

async function main() {
    let songs1 = await getsongs();
    
    let songUl = document.querySelector(".listcard").getElementsByTagName("ul")[0];
    for (let song of songs1) {
        
        songUl.innerHTML = songUl.innerHTML + `<li>
                            <img src="music.svg" alt="music">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Artist Name</div>
                            </div>
                            <div class="playnow">
                                Play now
                                <img src="play.svg" alt="play">
                            </div>
                        </li>`;
    }


    var audio = new Audio(songs[0]);
    /*audio.play(); */

    /* audio.addEventListener("loadeddata",() =>{
        let duration = audio
    }) */


}

main();   