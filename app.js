let audio = new Audio('');

const text = document.getElementById('text');
const liText = [...document.querySelectorAll('.li-text')];
const btns = [...document.querySelectorAll('.choose')];
const img = document.querySelector('img');
const play = document.getElementById('play');
const stop = document.getElementById('stop');

const bar = document.getElementById('bar');

const turnTrackBack = document.querySelector('#turnTrackBack');
const turnTrackTop = document.querySelector('#turnTrackTop');

let temp = -1;
let tabText =  [];
let tabMusic = [];
let tabImg = [];

let chooseTrack =  false;

let timer = 0;


bar.addEventListener('click', function (e) {

  if(!chooseTrack){
    alert('You have to choose music');
    return;
  }
  

  let x = e.pageX - this.offsetLeft,
      clickedValue = (x * this.max / this.offsetWidth).toFixed(0);

      bar.value = clickedValue;
      timer = clickedValue;
      audio.currentTime = clickedValue;
      
      
      
 
});



function TurnTrackInformation(data) {
  let myChoose = data[Number(temp)];
  text.textContent = myChoose[0];
  img.src = myChoose[1];
  audio = new Audio(myChoose[2]);
  audio.pause();
  stop.style.display = 'none';
  play.style.display = 'block'
  bar.value = 0;
  timer = 0;
  chooseTrack = true;
}


function TurnTrack(data) {
 
  turnTrackTop.addEventListener('click', () => {
    audio.pause();
    ++temp;
    if(temp !== data.length)
      TurnTrackInformation(data);
    else if(temp === data.length){
      temp = data.length - 1;  
      return;
    }
    
  })

  turnTrackBack.addEventListener('click', () => {
    audio.pause();
    if(temp <= 0) return;
    else {
      temp--;
      TurnTrackInformation(data);     
    }
  }) 
}


function playStop() {
 


  play.addEventListener('click', () => {
    

    if(!chooseTrack){
      alert('You have to choose music');
      return;
    }
    
    audio.play();

    let time = Number(audio.duration.toFixed(0));
    bar.max = time;


    let timerBar = setInterval(() => {
      if(stop.style.display === "none")
        clearInterval(timerBar)
      if(stop.style.display === "block"){
        if(timer !== time)
          bar.value = timer++;
         else {
          bar.value = 0;
          play.style.display = "block";
          stop.style.display = "none";
        }
      }
    },1000);
   
   
  
    
    
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
    chooseTrack = true;
    temp = e.target.id;
    stop.style.display = 'none';
    play.style.display = 'block';
    bar.value = 0;
    timer = 0;
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

playStop();

showText();

