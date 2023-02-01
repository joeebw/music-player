const image = document.querySelector('img');
const title = document.querySelector('#title');
const artist = document.querySelector('#title');
const music = document.querySelector('audio');
const progressContainer = document.querySelector('#progress-container');
const progress = document.querySelector('#progress');
const currentTimeEl = document.querySelector('#current-time');
const durationEl = document.querySelector('#duration');
const prevBtn = document.querySelector('#prev');
const nextBtn = document.querySelector('#next');
const playBtn = document.querySelector('#play');

// Music
const songs = [
    {
        name: 'jacinto-1',
        displayname: 'Electric Chill Machine',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-2',
        displayname: 'Seven Nation Army (Remix)',
        artist: 'Jacinto Design'
    },
    {
        name: 'jacinto-3',
        displayname: 'Bububoob',
        artist: 'Jacinto Design'
    },
    {
        name: 'metric-1',
        displayname: 'Name of the silence',
        artist: 'Metric'
    }
]

// check if playing
let isPlaying = false;

// play
const playSong = () => {
    isPlaying = true;
    playBtn.classList.replace('fa-play', 'fa-pause');
    playBtn.setAttribute('title', 'Pause')
    music.play();
}

// pause
const pauseSong = () => {
    isPlaying = false;
    playBtn.classList.replace('fa-pause', 'fa-play');
    music.pause();
}

playBtn.addEventListener('click', () => isPlaying ? pauseSong() : playSong());

// update DOM
const loadSong = (song) => {
    const {displayname, artist, name} = song;
    
    title.textContent = displayname;
    artist.textContent = artist;
    music.src = `music/${name}.mp3`;
    image.src = `img/${name}.jpg`;
}

// Current song
let songIndex = 0;

// next and prev song
const nextSong = () => {
    songIndex < songs.length-1 ? songIndex++ :  songIndex = 0;
    loadSong(songs[songIndex]);
    playSong();
}

const prevSong = () => {
    songIndex > 0 ? songIndex-- :  songIndex = songs.length-1;
    loadSong(songs[songIndex]);
    playSong();
}

// on load - select first song
loadSong(songs[songIndex]);

// update progress bar and time
const updateProgressBar = (e) => {
    if(isPlaying){
        const {duration, currentTime} = e.srcElement;
        // Update progress bar width
        const progressPercent = currentTime * (100/duration);
        progress.style.width = `${progressPercent}%`;
        // calculate display for duration
        const durationMinutes = Math.floor(duration/60);
        let durationSeconds = Math.floor(duration % 60);
        if(durationSeconds < 10){
            durationSeconds = `0${durationSeconds}`;
        }
        // Delay for avoid NaN when it set the duration
        if(durationSeconds){
            durationEl.textContent = `${durationMinutes}:${durationSeconds}`;
        }
        // calculate display for current
        const currentMinutes = Math.floor(currentTime/60);
        let currentSeconds = Math.floor(currentTime % 60);
        if(currentSeconds < 10){
            currentSeconds = `0${currentSeconds}`;
        }
        currentTimeEl.textContent =  `${currentMinutes}:${currentSeconds}`;
    }
}

// set progress bar 
function setProgressBar(e){
    const width = this.clientWidth;
    const clickX = e.offsetX;
    const {duration} = music;
    const newCurrenTime = (clickX/width)* duration;
    music.currentTime = newCurrenTime;
}

//  Event listeners
prevBtn.addEventListener('click', prevSong);
nextBtn.addEventListener('click', nextSong);
music.addEventListener('ended', nextSong);
music.addEventListener('timeupdate', updateProgressBar);
progressContainer.addEventListener('click', setProgressBar);