// import "howler/dist/howler";
// import { Howl, Howler } from "howler";
const { Howl, Howler } = require("howler/dist/howler");
const AudioFiles = require("../src/audio.json");


const audioElement = document.querySelector("#audio");
const sleepTimer = document.querySelector("#sleep-timer-cont");
const sleepTimerButton = document.getElementsByClassName("fa-clock");
const sleepTimerOptions = document.getElementsByClassName("option");
const backgroundButton = document.getElementsByClassName("fa-images");
const backgroundOptions = document.getElementsByClassName("background-opt");
const bodyBackground = document.getElementById("body-background");


document.addEventListener("DOMContentLoaded", () => {
  addAudioToPage();
  sleepDropDown();
  backgroundDropDown();
})

// ---- Backgrounds ---- //
function backgroundDropDown() {
  backgroundButton[0].addEventListener("click", () => {
    document.getElementById("background-dd").classList.toggle("show");
  })
  
  for(let i = 0; i < backgroundOptions.length; i++){
    let option = backgroundOptions.item(i);
    
    option.addEventListener("click", () => {
      // console.log("clicked!")
      let body = document.querySelector("body");
      let text = option.textContent;
      console.log(text)
      

      if(text === "Black"){
        body.className = ""
        body.classList.add("black")
      } else if (text === "White"){
        body.className = ""
        body.classList.add("white")
      } else if (text === "Fireplace") {
        body.className = ""
        body.classList.add("fireplace")
      } else if (text === "Rain") {
        body.className = ""
        body.classList.add("rain")
      } else if (text === "Winter Street") {
        body.className = ""
        body.classList.add("winter-street")
      }
      
      // switch(text) {
      //   case "Black":
      //     body.className = ""
      //     body.classList.add("black");
      //     break;
      //   case "White":
      //     body.className = ""
      //     body.classList.add("white");
      //     break;
      // }
      document.getElementById("background-dd").classList.toggle("show")
    })
  }
}



// ---- Sleep Timer Dropdown ---- //
function sleepDropDown() {
  sleepTimerButton[0].addEventListener("click", () => {
    document.getElementById("sleep-dd").classList.toggle("show");
  })

  // console.log(sleepTimerOptions)
  for (let i = 0; i < sleepTimerOptions.length; i++){ 
    // console.log(sleepTimerOptions.item(i));
    
    let counter = 0;
    let start;

    let option = sleepTimerOptions.item(i);
    // console.log(option)
    // debugger

    option.addEventListener("click", () => {
      let int = parseInt(option.textContent.split(" ")[0]);
      let text = option.textContent.split(" ")[1];
      // console.log("option:", option, "int:", int, "text:", text)
      
      if(text === "sec") { start = int } 
      else if( text === "min"){ start = Math.floor(int * 60) } 
      else { start = int * 3600 }

      document.getElementById("sleep-dd").classList.toggle("show");
      console.log(start)

      function getSeconds(s) {
        let min = Math.floor(s / 60);
        let sec = s % 60

        return min + ":" + sec;
      };

      function timer() {
        counter++;
        sleepTimer.textContent = getSeconds( start - counter );
        if( counter === start){
          // do something
          clearInterval(interval);
        }
      };
      let interval = setInterval(timer, 1000)
    })
  }
}



// ---- Audio Files ---- //
function addAudioToPage() {
  // debugger
  // const sounds = JSON.parse(AudioFiles);
  AudioFiles.forEach(sound => {
    // console.log(sound)

    const audioDiv = document.createElement("div");
    audioDiv.className = "audio-file";
    const audioTitle = document.createElement("h2");
    audioTitle.textContent = sound.title;
    audioDiv.appendChild(audioTitle);
    
    // Audio Control Panel
    const audioControls = document.createElement("div");
    audioControls.className = "audio-controls";
    audioDiv.appendChild(audioControls);

    const playButton = document.createElement("button");
    playButton.textContent = "▶️";
    audioControls.appendChild(playButton);
    playButton.className = "play-button";

    const pauseButton = document.createElement("button");
    pauseButton.textContent = "II";
    audioControls.appendChild(pauseButton);
    pauseButton.className = "pause-button";

    const stopButton = document.createElement("button");
    stopButton.textContent = "◼︎";
    audioControls.appendChild(stopButton);
    stopButton.className = "stop-button";

    // Volume Controls
    const volumeUp = document.createElement("button");
    volumeUp.textContent = "+";
    audioControls.appendChild(volumeUp);
    volumeUp.className = "volume-up";

    const volumeDown = document.createElement("button");
    volumeDown.textContent = "−"; 
    audioControls.appendChild(volumeDown);
    volumeDown.className = "volume-down";

    // toggle loop button
    const loopDiv = document.createElement("div");
    loopDiv.className = "switch";
    audioDiv.appendChild(loopDiv);

    const loopButton = document.createElement("input");
    loopButton.setAttribute("id", "switch-" + sound.title);
    loopButton.setAttribute("type", "checkbox");
    loopButton.className = "switch-input";
    loopDiv.appendChild(loopButton);

    const loopLabel = document.createElement("label");
    loopLabel.setAttribute("for", "switch-" + sound.title);
    loopLabel.className = "switch-label";
    loopLabel.textContent = "Switch";
    loopDiv.appendChild(loopLabel);

    sound = new Howl({
      src: [`./dist/audio/${sound.src}`],
      volume: 0.3,
      // autoplay: false
      loop: false,
      // rate: 0.5,
      onend: function() {
        console.log("Sound finished playing!")
      }
    });

    playButton.addEventListener("click", () => {
      const id = sound.play();
      console.log("playButton id:", id);
      // console.log("onPlay:before",sound.playing())

      // if(sound.playing()){
      //   sound.pause();
      // } else {
      //   sound.play();
      // }
      sound.play();
      // console.log("onPlay:after",sound.playing())
    });

    pauseButton.addEventListener("click", () => {
      sound.pause();
    });

    stopButton.addEventListener("click", () => {
      sound.stop();
      console.log("onStop", sound.playing())
    })

    volumeUp.addEventListener("click", () => {
      const vol = sound.volume();
      // console.log(sound.volume());

      sound.volume(vol + 0.1);
      if(vol >= 1){ vol = 1 }; 
    })

    volumeDown.addEventListener("click", () => {
      var vol = sound.volume();
      // console.log(sound.volume());

      sound.volume(vol - 0.1);
      if(vol < 0){ vol = 0 }; 
    })

    loopButton.addEventListener("change", e => {
      // console.log("toggle-sound:", sound)
      const loop = sound.loop();
      // console.log("loop:", loop)
      if (e.target.checked) {
        sound.loop(true);
        // console.log("true:", !sound.loop());
      } else {
        sound.loop(false);
        // console.log("false:", sound.loop());
      }
    });



    audioElement.appendChild(audioDiv);
  })
}