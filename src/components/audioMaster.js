import AudioFiles from "../../src/audio.json";
import { Howl } from "howler";
import SleepTimer from "./sleepTimer";

const audioElement = document.querySelector("#audio");
const sleepTimer = document.querySelector("#sleep-timer-cont");

export default class AudioMaster {
  constructor(audioElement) {
    this.timerStart = new SleepTimer().options;
    this.addAudioToPage();
    this.currentlyPlaying = [];
    this.playlist = [];
  }

  addAudioToPage() {
    const that = this;
    AudioFiles.forEach((sound, idx) => {
      const audioDiv = document.createElement("div");
      audioDiv.className = "audio-file";
      audioDiv.setAttribute("id", sound.title);

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
      stopButton.className = `${idx}`
      stopButton.classList.add("stop-button");

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

      function getSeconds(s) {
        let sec = s % 60
        let min = Math.floor(s / 60);
        let hr = Math.floor((min / 60));

        return hr + ":" + min + ":" + sec;
      };

      function resetInterval(){
        playTime = 0
        this.timerStart.pop();
        clearInterval(interval);
      }
      
      let interval = setInterval(isPlaying.bind(that), 1000)

      function isPlaying() {
        if(!this.timerStart.length){this.timerStart.push(0)}
        // console.log(this.currentlyPlaying)
        if (sound.playing() && this.timerStart[0] !== 0) {
          // debugger
          // console.log("audio is playing..." + playTime);
          sound.loop(true);
          // loopButton.setAttribute("checked", true);
          loopButton.checked = 1
          playTime++;
          sleepTimer.textContent = getSeconds(this.timerStart[0] - playTime);


          if (this.timerStart[0] <= playTime ) {
            // console.log("I GOT HIT!")
            sound.stop();
            this.currentlyPlaying.pop()
            resetInterval.bind(that);
            sleepTimer.textContent = ""; // prevent from going neg
            this.timerStart[0] = 0; // reset timer for play
          }
        } else { resetInterval.bind(that) }
      }

      function isStopped() {
        if (!sound.playing()) {
          playTime = 0;
          // loopButton.setAttribute("checked", false);
          // loopButton.toggleAttribute("checked");
          loopButton.checked = 0;
          resetInterval.bind(that);
        }
      }
      
      const soundTitles = [];
      soundTitles.push(sound.title);

      sound = new Howl({
        src: [`./dist/audio/${sound.src}`],
        // autoplay: false
        // rate: 0.5,
        volume: 0.3,
        loop: false,
        onplay: isPlaying.bind(that),
        onstop: isStopped,
        onend: isStopped
        // onend: function() {
        //   console.log("Sound finished playing!")
        // }

      });

      let soundId = "";
      
      playButton.addEventListener("click", () => {
        // soundId = sound.play()
        // console.log("soundId:", soundId)
        this.currentlyPlaying.length === 0 ? this.currentlyPlaying.push(sound.play()) : null;

        // if (!sound.playing()) { this.currentlyPlaying.pop() }

        // console.log("play:", this.currentlyPlaying)
        // console.log("title:", soundTitles)
        // console.log(Math.ceil(sound._duration))

        // const playingTitle = document.createElement("div");
        // playingTitle.className = "playing-title";
        // playingTitle.textContent = "Currently playing:" + soundTitles[0];
        // document.getElementById("title").appendChild(playingTitle);
        // document.getElementById("title").className = "hidden"
        // document.getElementById("title").classList.toggle("hidden")
        
      });

      pauseButton.addEventListener("click", () => {
        sound.pause(this.currentlyPlaying[0]);
        this.currentlyPlaying.pop();
        // soundTitles.pop();
        // console.log("pause:", this.currentlyPlaying)
      });

      stopButton.addEventListener("click", (e) => {
        // console.log("Stop-idx:", e.target.classList[0])
        sound.stop(this.currentlyPlaying[0]);
        this.currentlyPlaying.pop();
        // soundTitles.pop();
        // console.log(soundTitles)
        // document.getElementById("title").classList.toggle("hidden")


        // loopButton.setAttribute("checked", false);
        loopButton.checked = 0

        // console.log("stop:", this.currentlyPlaying)
      })

      const volumeControl = document.getElementById("vol-control")
      volumeControl.value = sound.volume();
      
      function setVolume(){
        let control = volumeControl.value;
        let vol = sound.volume();
        // console.log("control:", control);
        // console.log("vol:", vol);
        if (control !== vol) { vol = sound.volume(vol + (control - vol)) }
      }

      // volumeControl.addEventListener("change", setVolume);
      // volumeControl.addEventListener("input", setVolume);
      volumeControl.addEventListener("mouseup", setVolume);
      volumeControl.addEventListener("click", setVolume);

      // console.log("volumeControl:", volumeControl.value)
      // console.log("sound:", sound.volume())

      loopButton.addEventListener("change", e => {
        const loop = sound.loop();
        if (e.target.checked) {
          sound.loop(true);
        } else {
          sound.loop(false);
        }
      });

      audioElement.appendChild(audioDiv);
    })
  }
}