


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

let temp1 = true;

let timer = 0;



function changeOn(){
  play.style.display = "none";
  stop.style.display = "block";
}
function changeOff(){
  play.style.display = "block";
  stop.style.display = "none";
}
function ShowBarStatus(){
 
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
}
function TurnTrackInformation(data) {
  let myChoose = data[Number(temp)];
  text.textContent = myChoose[0];
  img.src = myChoose[1];
  audio = new Audio(myChoose[2]);
  audio.pause();
  changeOff();
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
      console.log('teraz');

      changeOff();

      
      return;
    }
    
  })

  turnTrackBack.addEventListener('click', () => {
    audio.pause();
    if(temp <= 0){
      changeOff();
    }
    else {
      temp--;
      TurnTrackInformation(data);     
    }
  }) 
}
function playStop() {
  
  
  play.addEventListener('click', () => {
    let time = Number(audio.duration.toFixed(0));
    if(time){
      console.log('texa');
      bar.max = time;
    }
    
    if(!chooseTrack){
      alert('You have to choose music');
      return;
    } 
    
   
    audio.play();
    
    
   
    let timerBar = setInterval(() => {
      if(stop.style.display === "none")
        clearInterval(timerBar)
      if(stop.style.display === "block"){
        if(timer !== time)
          bar.value = timer++;
         else {
          bar.value = 0;
          changeOff();
        }
      }
    },1000);
    changeOn();
  })
  stop.addEventListener('click', () => {
    audio.pause();
    
   changeOff();
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
    bar.value = 0;
    timer = 0;
    audio.pause();
    let myChoose = data[e.target.id];
    changeOff();


    

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

function run(){
  ShowBarStatus();
  playStop();
  showText();
}

run();


function generate(){
  const inputLogin = document.getElementById('login');
  const inputPass =  document.getElementById('password');
const form = document.querySelector('form');


form.addEventListener('submit',(e)=>{
  e.preventDefault();
   
  const login = inputLogin.value;
  const pass = inputPass.value;

  fetch('/', {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      login,
      pass,
    })
  })

});
}

generate();