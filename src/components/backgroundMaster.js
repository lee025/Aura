const backgroundButton = document.getElementsByClassName("fa-images");
const backgroundOptions = document.getElementsByClassName("background-opt");


export default class BackgroundMaster {
  constructor(backgroundButton) {
    // this.ctx = backgroundButton;
    this.backgroundDropDown();

  }

  backgroundDropDown() {
    backgroundButton[0].addEventListener("click", () => {
      document.getElementById("background-dd").classList.toggle("show");
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