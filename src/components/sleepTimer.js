const sleepTimer = document.querySelector("#sleep-timer-cont");
const sleepTimerButton = document.getElementsByClassName("fa-clock");
const sleepTimerOptions = document.getElementsByClassName("option");
const sleepDD = document.getElementById("sleep-dd");
const backgroundDD = document.getElementById("background-dd");
const aboutDD = document.getElementById("about-dd");

export default class SleepTimer {
  constructor() {
    this.sleepDropDown();
    this.options = [];
    // console.log("SleepTimer Constructor:", this.options)
  }

  sleepDropDown() {
    sleepTimerButton[0].addEventListener("click", (e) => {
      if(backgroundDD.classList.contains("show")) {
        backgroundDD.classList.toggle("show");
      }
      if(aboutDD.classList.contains("show")) {aboutDD.classList.toggle("show")}

      sleepDD.classList.toggle("show");
      e.stopPropagation();
    })

    for (let i = 0; i < sleepTimerOptions.length; i++) {
      // console.log(sleepTimerOptions.item(i));

      let counter = 0;
      let start;

      let option = sleepTimerOptions.item(i);
      // console.log(option)

      option.addEventListener("click", () => {
        let int = parseInt(option.textContent.split(" ")[0]);
        let text = option.textContent.split(" ")[1];
        // let interval = setInterval(timer, 1000)

        if (text === "sec") { start = int }
        else if (text === "min") { start = Math.floor(int * 60) }
        else if (text === "hour") { start = int * 3600 }
        else (start = 0)

        let promise = new Promise((resolve, reject) => {
          if (this.options.length !== 0) { resolve(this.options.pop()) }
        })
        promise
          .then(this.options.push(start))
          .catch(err => console.log(err))

        // console.log("sleepDropDown:", this.options)
        sleepTimer.textContent = getSeconds(start);
        document.getElementById("sleep-dd").classList.toggle("show");
        // console.log(start)

        function getSeconds(s) {
          let sec = s % 60
          let min = s < 3600 ? Math.floor(s / 60) : (Math.floor(s / 60)) / int;
          let hr = s > 3600 ? Math.floor(s / 60 / 60) : 0;

          return hr + ":" + min + ":" + sec;
        };

      })
    }
  }
}