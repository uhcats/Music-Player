let audio = new Audio('/mp3/music1.mp3');

const text = document.getElementById('text');
const liText = [...document.querySelectorAll('.li-text')];
const btns = [...document.querySelectorAll('.choose')];
const img = document.querySelector('img');



let tabText =  [];
let tabMusic = [];
let tabImg = [];

let chooseTrack =  false;


function playStop() {

  const play = document.getElementById('play');
  const stop = document.getElementById('stop');

  play.addEventListener('click', () => {
    audio.play();
    play.style.display = "none"
    stop.style.display = "block"
  })
  stop.addEventListener('click', () => {
    audio.pause();
    stop.style.display = "none"
    play.style.display = "block"
  })
};

function showInforamtion(data) {
  
  liText.forEach((li,index) => {
    li.textContent = tabText[index];
  });

 btns.forEach((btn,index) => {
  btn.setAttribute('id', index);
  btn.addEventListener('click', (e) => {

    audio.pause();
    let myChoose = data[e.target.id];
    text.textContent = myChoose[0];
    img.src = myChoose[1];
    audio = new Audio(myChoose[2]);
    console.log(myChoose);

  })
 });

 
}



function showText(){
  fetch('music.json')
  .then(res => res.json())
  .then(data => data.musicList.map(music => {
    tabText.push(music.text);
    tabImg.push(music.img);
    tabMusic.push(music.music)    
    return [music.text, music.img, music.music]
  }))
  
  .then(data => showInforamtion(data))
}





showText();
// showPicture();
playStop();


  

