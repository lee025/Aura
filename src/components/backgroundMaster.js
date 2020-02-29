const backgroundButton = document.getElementsByClassName("fa-images");
const backgroundOptions = document.getElementsByClassName("background-opt");
const backgroundDD = document.getElementById("background-dd");
const aboutDD = document.getElementById("about-dd");
const sleepDD = document.getElementById("sleep-dd");

export default class BackgroundMaster {
  constructor(backgroundButton) {
    this.backgroundDropDown();

  }

  backgroundDropDown() {
    backgroundButton[0].addEventListener("click", (e) => {
      if (aboutDD.classList.contains("show")){aboutDD.classList.toggle("show")}
      if(sleepDD.classList.contains("show")){sleepDD.classList.toggle("show")}

      backgroundDD.classList.toggle("show")
      e.stopPropagation();
    })

    for (let i = 0; i < backgroundOptions.length; i++) {
      let option = backgroundOptions.item(i);

      option.addEventListener("click", () => {
        let body = document.querySelector("body");
        let text = option.textContent;

        if (text === "Dark Mode") {
          body.className = ""
          body.classList.add("dark")
        } else if (text === "Light Mode") {
          body.className = ""
          body.classList.add("white")
        } else if (text === "Black Screen") {
          body.className = ""
          body.classList.add("black")
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

        document.getElementById("background-dd").classList.toggle("show")
      })
    }
  }

}