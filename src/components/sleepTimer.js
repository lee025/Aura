import AudioMaster from "./audioMaster";

const sleepTimer = document.querySelector("#sleep-timer-cont");
const sleepTimerButton = document.getElementsByClassName("fa-clock");
const sleepTimerOptions = document.getElementsByClassName("option");

// export default class SleepTimer extends AudioMaster {
export default class SleepTimer  {
  constructor(timer) {
    // this.ctx = sleepTimerButton;
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
        let interval = setInterval(timer, 1000)
        // console.log("option:", option, "int:", int, "text:", text)
    

          if (text === "sec") { start = int }
          else if (text === "min") { start = Math.floor(int * 60) }
          else if (text === "hour") { start = int * 3600 }
          else ( int = 0)


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
      })
    }
  }
}