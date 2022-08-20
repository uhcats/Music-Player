let audio = new Audio('/mp3/music1.mp3');

const text = document.getElementById('text');
const liText = [...document.querySelectorAll('.li-text')];
const btns = [...document.querySelectorAll('.choose')];
const img = document.querySelector('img');
const play = document.getElementById('play');
const stop = document.getElementById('stop');

const turnTrackBack = document.querySelector('#turnTrackBack');
const turnTrackTop = document.querySelector('#turnTrackTop');

let temp = -1;
let tabText =  [];
let tabMusic = [];
let tabImg = [];

let chooseTrack =  false;


function TurnTrackInformation(data) {
  let myChoose = data[Number(temp)];
  text.textContent = myChoose[0];
  img.src = myChoose[1];
  audio = new Audio(myChoose[2]);
  audio.pause();
}


function TurnTrack(data) {
  turnTrackTop.addEventListener('click', () => {
    
    ++temp;
    if(temp !== data.length){
      TurnTrackInformation(data);
    }else if(temp === data.length){
      temp = data.length - 1;
      console.log(temp);
      return;
    }

    
    
    
  })

  turnTrackBack.addEventListener('click', () => {
   
   
    
    if(temp <= 0) return;
    else {
      temp--;
      TurnTrackInformation(data);
      
     
    }
    

  })
  
}




function playStop() {
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
  TurnTrack(data);
  
  liText.forEach((li,index) => {
    li.textContent = tabText[index];
  });

 btns.forEach((btn,index) => {
  btn.setAttribute('id', index);
  btn.addEventListener('click', (e) => {
    temp = e.target.id;
    stop.style.display = 'none';
    play.style.display = 'block'
    audio.pause();
    let myChoose = data[e.target.id];


    

    text.textContent = myChoose[0];
    img.src = myChoose[1];
    audio = new Audio(myChoose[2]);
    

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

  

