const musicContainer = document.getElementById("music-container");
const playBtn = document.getElementById("play");
const prevBtn = document.getElementById("prev");
const nextBtn = document.getElementById("next");
const audio = document.getElementById("audio");
const progress = document.getElementById("progress");
const progressContainer = document.getElementById("progress-container");


const title = document.getElementById("title");
const cover = document.getElementById("cover");

// Song Titles

const songs = ["Soleil Soleil", "Classical", "Relaxing"];

//KeepTrack of Song

let songIndex = 0;
//Initially load song details into DOM
loadSong(songs[songIndex]);

//Update Song Details
function loadSong(song){
    title.innerText = song;
    audio.src = `./music/soleil.mp3`;
    cover.src = `./images/soleil.jpg`;

}

// Play Song 
function playSong() {
    musicContainer.classList.add("play");
    playBtn.querySelector("i.fa").classList.remove("fa-play");
    playBtn.querySelector("i.fa").classList.add("fa-pause");
    audio.play();
    }

 //Pause Song

 function pauseSong(){
        musicContainer.classList.remove("play");
        playBtn.querySelector("i.fa").classList.add("fa-play");
        playBtn.querySelector("i.fa").classList.remove("fa-pause");
        audio.pause();
 }

 //Previous Song

 function prevSong(){
    songIndex--;
    if(songIndex < 0){
        songIndex = songs.length -1 ;

    }
    loadSong(songs[songIndex]);
    playSong();
 }

 //Next Song
 function nextSong(){
    songIndex++;
    if(songIndex > songs.length -1 ){
        songIndex = 0;
    }
    loadSong(songs[songIndex]);
    playSong();
 }
 //Update Progress Bar

 function updateProgress(e){
    const { duration, currentTime } = e.srcElement;
    const progressPerCent = (currentTime / duration ) * 100;
    progress.style.width = `${progressPerCent}%`;
 }

 //Set Progress
    function setProgress(e) {
        const width = this.clientWidth;
        const clickX = e.offsetX;
        const duration = audio.duration;
        audio.currentTime = (clickX / width) * duration;
    }
    //Event Listeners 

playBtn.addEventListener("click", () => {
    const isPlaying = musicContainer.classList.contains("play");
        if (isPlaying){
            pauseSong();
        } else {
            playSong();
        }
});


//Change Song
prevBtn.addEventListener("click", prevSong);
nextBtn.addEventListener("click", nextSong);
//Time/Song Update
audio.addEventListener("timeupdate",updateProgress);

//Click On Progress Bar
progressContainer.addEventListener("click", setProgress);
//Song End
audio.addEventListener("ended", nextSong);