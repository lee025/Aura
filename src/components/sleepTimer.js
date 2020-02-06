import AudioMaster from "./audioMaster";

const sleepTimer = document.querySelector("#sleep-timer-cont");
const sleepTimerButton = document.getElementsByClassName("fa-clock");
const sleepTimerOptions = document.getElementsByClassName("option");

export default class SleepTimer {
  constructor() {
    // this.ctx = sleepTimerButton;
    this.sleepDropDown();
    this.options = [];
    // console.log("SleepTimer Constructor:", this.options)
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

      option.addEventListener("click", () => {
        // debugger
        let int = parseInt(option.textContent.split(" ")[0]);
        let text = option.textContent.split(" ")[1];

        if (text === "sec") { start = int }
        else if (text === "min") { start = Math.floor(int * 60) }
        else if (text === "hour") { start = int * 3600 }
        else (int = 0)

        let promise = new Promise((resolve, reject) => {
          if (this.options.length !== 0) { resolve(this.options.pop()) }
        })
        promise
          .then(this.options.push(start))
          .catch(err => console.log(err))

        // console.log("sleepDropDown:", this.options)

        document.getElementById("sleep-dd").classList.toggle("show");

      })
    }
  }
}