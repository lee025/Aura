import AudioFiles from "../../src/audio.json";
import { Howl, Howler } from "howler";
import SleepTimer from "./sleepTimer";

const audioElement = document.querySelector("#audio");
const sleepTimer = document.querySelector("#sleep-timer-cont");

// export default class AudioMaster extends SleepTimer {
export default class AudioMaster {
  constructor(audioElement) {
    // super(timer)
    // this.ctx = audioElement;
    // this.timer = timer
    this.timerStart = new SleepTimer().options;
    // this.setTimer();
    this.addAudioToPage();
    this.currentlyPlaying = [];
    this.playlist = [];
    this.end = "";
    // console.log("constructor-playing:", this.currentlyPlaying)
    // console.log("constructor-playlist:", this.playlist)
    // console.log(this.timer.sleepDropDown)
  }

  // setTimer(){
  //   console.log(this.timer)
  //   this.timer.options === this.end
  // }

  addAudioToPage() {
    // const timer = new SleepTimer();
    // debugger
    // console.log("addAudioToPage:", this.timer)
    const that = this;
    AudioFiles.forEach(sound => {
      // console.log(this.playlist)
      // console.log(sound)
      // debugger

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
        // console.log(this.timer)
        if (sound.playing() && this.timerStart.length > 0) {
          // debugger
          // console.log("audio is playing..." + playTime);
          loopButton.setAttribute("checked", true);
          sound.loop(true);
          playTime++;
          sleepTimer.textContent = getSeconds(this.timerStart[0] - playTime);

          if (this.timerStart[0] === playTime) {
            resetInterval.bind(that);
            // clearInterval(interval)
            sound.stop();
            this.currentlyPlaying.pop()
            this.timerStart.pop()
          }
        } else { resetInterval.bind(that) }
      }

      function isStopped() {
        if (!sound.playing()) {
          playTime = 0;
          // debugger
          loopButton.toggleAttribute("checked");
          resetInterval.bind(that);
        }
      }


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


      playButton.addEventListener("click", () => {
        this.currentlyPlaying.length === 0 ? this.currentlyPlaying.push(sound.play()) : null;
        if (!sound.playing()) { this.currentlyPlaying.pop() }
        // console.log("play:", this.currentlyPlaying)
        // console.log(Math.ceil(sound._duration))
      });

      pauseButton.addEventListener("click", () => {
        sound.pause(this.currentlyPlaying[0]);
        this.currentlyPlaying.pop();
        // console.log("pause:", this.currentlyPlaying)
      });

      stopButton.addEventListener("click", () => {
        sound.stop(this.currentlyPlaying[0]);
        this.currentlyPlaying.pop()
        // console.log("stop:", this.currentlyPlaying)
      })

      volumeUp.addEventListener("click", () => {
        const vol = sound.volume(this.currentlyPlaying[0]);
        console.log(sound.volume());

        sound.volume(vol + 0.1);
        if (vol >= 1) { vol = 1 };
      })

      volumeDown.addEventListener("click", () => {
        var vol = sound.volume(this.currentlyPlaying[0]);
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