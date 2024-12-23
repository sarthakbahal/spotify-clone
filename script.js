let currsong = new Audio();
let slider = document.querySelector(".song-progress");
let currentTimeElem = document.querySelector(".current-time");
let totalDurationElem = document.querySelector(".total-duration");
console.log(currsong);
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
            
            
        }

    }
    return songs;

}

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}


const playMusic = (track, pause = false) =>{
    currsong.src = "/songs/" + track;
    
    if(!pause){
        currsong.play();
    }
    
    currsong.play();

    play.src = "pause.svg";
    document.querySelector(".sname").innerHTML = decodeURI(track);
}


async function main() {
    let songs1 = await getsongs();
    playMusic(songs1[0], true);
    
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


   
   

    Array.from(document.querySelector(".listcard").getElementsByTagName("li")).forEach(e=> {
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            
            
        })
        
    })

    play.addEventListener("click", ()=> {
       
        if (currsong.paused) {
            currsong.play();
            play.src = "pause.svg";
        }else{
            currsong.pause();
            play.src = "play.svg";

        }
    })

    volumeslider.addEventListener("input", () => {
        currsong.volume = volumeslider.value;
        
    });

    currsong.addEventListener("timeupdate", ()=>{
        let totalDuration = currsong.duration;
        slider.value = (currsong.currentTime / currsong.duration) * 100 || 0;
        currentTimeElem.textContent = formatTime(currsong.currentTime);
        
    });

    currsong.addEventListener('loadedmetadata', () => {
        totalDurationElem.textContent = formatTime(currsong.duration);
    });

    currsong.addEventListener('emptied', () => {
        currentTimeElem.textContent = "0:00";
        totalDurationElem.textContent = "0:00";
        slider.value = 0;
    });

    slider.addEventListener('input', ()=> {
        const seektime = (slider.value/100) * currsong.duration;
        currsong.currentTime = seektime;
    });

    
    
}

main();   





/* document.addEventListener("DOMContentLoaded", () => {
    const slider = document.querySelector(".song-progress");
    const currentTimeElem = document.querySelector(".current-time");
    const totalDurationElem = document.querySelector(".total-duration");

     // Total duration in seconds (4:30)

    // Format seconds into mm:ss
    function formatTime(seconds) {
        const minutes = Math.floor(seconds / 60);
        const secs = Math.floor(seconds % 60);
        return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
    }

    // Set total duration text
    totalDurationElem.textContent = formatTime(totalDuration);

    // Update current time and slider position
    slider.addEventListener("input", (e) => {
        const currentTime = (slider.value / 100) * totalDuration;
        currentTimeElem.textContent = formatTime(currentTime);
    });

    // Simulate song progress
    setInterval(() => {
        if (slider.value < 100) {
            slider.value = parseFloat(slider.value) + 1;
            const currentTime = (slider.value / 100) * totalDuration;
            currentTimeElem.textContent = formatTime(currentTime);
        }
    }, (totalDuration * 10)); // Adjust speed for demo purposes
}); */