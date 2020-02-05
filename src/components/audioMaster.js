import AudioFiles from "../../src/audio.json";
import { Howl, Howler } from "howler";

const audioElement = document.querySelector("#audio");
const sleepTimer = document.querySelector("#sleep-timer-cont");
const sleepTimerButton = document.getElementsByClassName("fa-clock");
const sleepTimerOptions = document.getElementsByClassName("option");


export default class AudioMaster {
  constructor(audioElement) {
    this.ctx = audioElement;
    this.addAudioToPage();
    this.sleepDropDown();
  }


  sleepDropDown() {
    sleepTimerButton[0].addEventListener("click", () => {
      document.getElementById("sleep-dd").classList.toggle("show");
    })

    // console.log(sleepTimerOptions)
    for (let i = 0; i < sleepTimerOptions.length; i++) {
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

        if (text === "sec") { start = int }
        else if (text === "min") { start = Math.floor(int * 60) }
        else { start = int * 3600 }

        document.getElementById("sleep-dd").classList.toggle("show");
        // console.log(start)

        function getSeconds(s) {
          let min = Math.floor(s / 60);
          let sec = s % 60

          return min + ":" + sec;
        };

        function timer() {
          counter++;
          sleepTimer.textContent = getSeconds(start - counter);
          if (counter === start) {
            // do something
            clearInterval(interval);
          }
        };
        let interval = setInterval(timer, 1000)
      })
    }
  }

  addAudioToPage() {
    // debugger
    // const sounds = JSON.parse(AudioFiles);
    let playlist = [];

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




      let playTime = 0;

      function isPlaying() {
        if (sound.playing()) {
          // console.log("audio is playing..." + playTime);
          // console.log(sound._duration) // returns total length of sound
          playTime++;
        }
      }
      setInterval(isPlaying, 1000)

      function isStopped() {
        if (!sound.playing()) {
          playTime = 0;
          playlist = [];
        }
      }


      sound = new Howl({
        src: [`./dist/audio/${sound.src}`],
        // autoplay: false
        // rate: 0.5,
        volume: 0.3,
        loop: false,
        onplay: isPlaying,
        onstop: isStopped,
        // onend: function() {
        //   console.log("Sound finished playing!")
        // }
      });

      playButton.addEventListener("click", () => {
        playlist.length === 0 ? playlist.push(sound.play()) : null;
        console.log(playlist)
        // console.log("onPlay:after",sound.playing())
      });

      pauseButton.addEventListener("click", () => {
        sound.pause(playlist[0]);
      });

      stopButton.addEventListener("click", () => {
        sound.stop(playlist[0]);
        console.log(playlist)
      })

      volumeUp.addEventListener("click", () => {
        const vol = sound.volume(playlist[0]);
        console.log(sound.volume());

        sound.volume(vol + 0.1);
        if (vol >= 1) { vol = 1 };
      })

      volumeDown.addEventListener("click", () => {
        var vol = sound.volume(playlist[0]);
        console.log(sound.volume());

        sound.volume(vol - 0.1);
        if (vol < 0) { vol = 0 };
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

}