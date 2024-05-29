// само аудио
let audio = document.querySelector('audio');

// плеер (его обертка)
let musicPlayer = document.querySelector('.player');

// Название песни и исполнитель
let songName = document.querySelector('.song_name');
let artist = document.querySelector('.artist');

// Логотип песни или альбома
let songLogo = document.querySelector('.album_logo > img');

// Прогресс бар
let progressBarWrap = document.querySelector('.progress-bar_wrap');
let progressBar = document.querySelector('.progress-bar');
let currentTimeBlock = document.querySelector('.current_time');
let durationBlock = document.querySelector('.duration_time');

// Кнопки воспроизвести/пауза, предыдущая песни и следующая
let play = document.querySelector('.play_audio');
let prevSong = document.querySelector('.prev_audio');
let nextSong = document.querySelector('.next_audio');

// счетчик
let counter = 0;

// Информация о треках
let songs = [
    {
        'artist' : 'Linkin Park',
        'track name' : 'Faint',
        'track logo' : 'img/albums logo/Meteora.jpg',
        'src' : 'audio/Linkin Park - Faint.mp3',
    },
    {
        'artist' : 'Linkin Park',
        'track name' : 'Somewhere I Belong',
        'track logo' : 'img/albums logo/Meteora.jpg',
        'src' : 'audio/Linkin Park - Somewhere I Belong.mp3'
    },
    {
        'artist' : 'Bring Me the Horizon',
        'track name' : 'Kingslayer',
        'track logo' : 'img/albums logo/Kingslayer.jpg',
        'src' : 'audio/Bring Me The Horizon feat. BABYMETAL - Kingslayer.mp3',
    },
    {
        'artist' : 'MiyaGi & Andy Panda',
        'track name' : 'Патрон',
        'track logo' : 'img/albums logo/Патрон.jpg',
        'src' : 'audio/Miyagi & Andy Panda - Патрон.mp3',
    },
    {
        'artist' : 'MiyaGi & Andy Panda',
        'track name' : 'Буревестник',
        'track logo' : 'img/albums logo/Буревестник.jpg',
        'src' : 'audio/MiyaGi & Andy Panda - Буревестник.mp3',
    },
];

// Инициализирвоание начальной песни при запуске документа
function loadSong(index) {
    audio.src = songs[index].src;
    artist.textContent = songs[index].artist;
    songName.textContent = songs[index]['track name'];
    songLogo.src = songs[index]['track logo'];
}
// Сразу вызов функии, для того чтобы назначить начальный трек
loadSong(counter);


// Play function
function playSong() {
    musicPlayer.classList.add('play');
    songLogo.classList.add('rotate_img');
    play.querySelector('img').classList.add('pause_img');
    play.querySelector('img').src = "img/navigation buttons/pause.svg";

    audio.play();
}

// Pause function
function pauseSong() {
    musicPlayer.classList.remove('play');
    songLogo.classList.remove('rotate_img');
    play.querySelector('img').classList.remove('pause_img');
    play.querySelector('img').src = "img/navigation buttons/play.svg";

    audio.pause();
}

// Buttons click animation
function btnAnimation(button) {
    button.classList.remove('btn_audio');
    void button.offsetWidth;
    button.classList.add('btn_audio');
}

// Кнопка play/pause
play.addEventListener('click', (e) => {
    btnAnimation(play);

    let itsPlaying = musicPlayer.classList.contains('play');
    if (itsPlaying) { // если на плеере нет класса play, кнопка пауза
        pauseSong();
    } else {          // иначе кнопка с play
        playSong();
    }
});

// Next song
function nextTrack(e) {
    btnAnimation(nextSong);

    counter += 1;
    if (counter > songs.length - 1) counter = 0;

    loadSong(counter);
    playSong();
}

nextSong.addEventListener('click', nextTrack);

// Prev song
prevSong.addEventListener('click', (e) => {
    btnAnimation(prevSong);

    counter -= 1;
    if (counter < 0) counter = songs.length - 1;

    loadSong(counter);
    playSong();
});


// Перемотка песни
function songRewind(e) {
    let progressWrapWidth = this.clientWidth;
    let clickX = e.offsetX;
    let durationTime = audio.duration;

    audio.currentTime = (clickX / progressWrapWidth) * durationTime;


    console.log('Общая длина', progressWrapWidth);
    console.log('Коориданата по Х', clickX);
    console.log(durationTime);
}

progressBarWrap.addEventListener('click', songRewind);


// Отрисовка времени (текущее время песни или вся продолжительность) в соответсвующий блок
function drawMinAndSec(time, container) {
    let min = Math.floor(time / 60);
    let sec = Math.floor(time % 60);
  
    if (min < 10) {
      min = `0${min}`;
    }
  
    if (sec < 10) {
      sec = `0${sec}`;
    }
  
    container.textContent = `${min}:${sec}`;
}


// Прогресс бар и текущее время песни
function updProgressAndCurrentTime (e) {
    // текущее время песни и общее время (в секундах)
    let currentTime = e.srcElement.currentTime;
    let durationTime = e.srcElement.duration;

    drawMinAndSec(currentTime, currentTimeBlock);

    // заполнение прогресс бара
    let progressLength = (currentTime / durationTime) * 100;
    progressBar.style.width = `${progressLength}%`;
}

audio.addEventListener('timeupdate', updProgressAndCurrentTime);


// Длительность песни
audio.addEventListener('loadeddata', (e) => {
    let durationTime = e.srcElement.duration;
    
    drawMinAndSec(durationTime, durationBlock);
})

// Autoplay (след песня по завершении текущей)
audio.addEventListener('ended', nextTrack);










