let currsong = new Audio();

let songs;
let currfolder ;
let slider = document.querySelector(".song-progress");
let currentTimeElem = document.querySelector(".current-time");
let totalDurationElem = document.querySelector(".total-duration");



async function getsongs(folder) {
    currfolder = folder;
    let x = await fetch(`http://127.0.0.1:5500/${folder}/`)
    let response = await x.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    let as = div.getElementsByTagName("a");
    songs = [];
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if (element.href.endsWith(".mp3")) {
            songs.push(element.href.split(`/${folder}/`)[1]);
            
            
        }

    }
    

    
    
    let songUl = document.querySelector(".listcard").getElementsByTagName("ul")[0];
    songUl.innerHTML = "";
    for (let song of songs) {
        
        songUl.innerHTML = songUl.innerHTML + `<li>
                            <img src="img/music.svg" alt="music">
                            <div class="info">
                                <div>${song.replaceAll("%20"," ")}</div>
                                <div>Artist Name</div>
                            </div>
                            <div class="playnow">
                                Play now
                                <img src="img/play.svg" alt="play">
                            </div>
                        </li>`;
    }


   
   

    Array.from(document.querySelector(".listcard").getElementsByTagName("li")).forEach(e=> {
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML);
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim());
            
            
        })
        
    })


    return songs;

}

async function album() {
    let a = await fetch(`http://127.0.0.1:5500/songs/`)
    let response = await a.text();
    let div = document.createElement("div");
    div.innerHTML = response;
    console.log(div)
    
    let anchors = div.getElementsByClassName("icon");
    console.log(anchors)
    let cardCont = document.querySelector(".cardContainer");
    let array = Array.from(anchors);

    
    for (let index = 0; index < array.length; index++) {      const element = array[index];
        
        const e = array[index];
       
        if(e.href.includes("/songs")){
            console.log(e.href)
            let folder = e.href.split("/").slice(-1)[0];

            let b = await fetch(`http://127.0.0.1:5500/songs/${folder}/info.json`)
            let response = await b.json();

            cardCont.innerHTML = cardCont.innerHTML + ` <div data-folder="${folder}" class="card">
                        <div class="play">
                            <svg xmlns="http://www.w3.org/2000/svg" width="40" height="48" viewBox="0 0 48 48">
                                <!-- Circle with full color -->
                                <circle cx="24" cy="24" r="24" fill="#dab6fc" />
                                <!-- Smaller and Centered Triangle -->
                                <path d="M20 16v16a1 1 0 0 0 1.524 .852l12 -8a1 1 0 0 0 0 -1.704l-12 -8a1 1 0 0 0 -1.524 .852z" fill="black" />
                            </svg>
                              
                        </div>
                        <img src= "/songs/${folder}/cover.jpg" alt="cover photo of album">

                        <h2>${response.title}</h2>
                        <p>${response.desc}</p>
                    </div>`
        }
    } 

 
}


function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${minutes}:${secs < 10 ? "0" + secs : secs}`;
}


const playMusic = (track, pause = false) =>{
    currsong.src = `/${currfolder}/` + track;
    
    if(!pause){
        currsong.play();
    }
    
    currsong.play();

    play.src = "img/pause.svg";
    document.querySelector(".sname").innerHTML = decodeURI(track);
}

let sv = volumeslider.value; 

async function main() {
   
    await album();

    await getsongs("songs/ncs");
    playMusic(songs[0], true);


    play.addEventListener("click", ()=> {
       
        if (currsong.paused) {
            currsong.play();
            play.src = "img/pause.svg";
        }else{
            currsong.pause();
            play.src = "img/play.svg";

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


    document.querySelector(".hamburger").addEventListener("click", () =>{
        document.querySelector(".left").style.left = "0";
    })
    

    document.querySelector(".close").addEventListener("click", () =>{
        document.querySelector(".left").style.left = "-100%";
    })
    
    


    prev.addEventListener("click", () =>{
       

        let index = songs.indexOf(currsong.src.split("/").slice(-1)[0]);
        if((index-1) >= 0){
            playMusic(songs[index-1]);
        }
    })

    
    next.addEventListener("click", () =>{
       

        let index = songs.indexOf(currsong.src.split("/").slice(-1)[0]);
        if((index+1) < songs.length){
           
            playMusic(songs[index+1]);
           
            
        }


    })

    Array.from(document.getElementsByClassName("card")).forEach(e=>{
        e.addEventListener("click", async item=> {
            songs = await getsongs(`songs/${item.currentTarget.dataset.folder}`)
            playMusic(songs[0])
        })
    })

    

    vol.addEventListener("click", () =>{
        if(currsong.volume != 0){
            sv = volumeslider.value;
            currsong.volume = 0;
            volumeslider.value = 0;
            vol.src = "img/mute.svg"
        }else{
            volumeslider.value = sv;
            currsong.volume = volumeslider.value;
            vol.src = "img/vol.svg"
        }
    })

   





}

main();   





