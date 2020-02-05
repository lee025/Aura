const backgroundButton = document.getElementsByClassName("fa-images");
const backgroundOptions = document.getElementsByClassName("background-opt");
const bodyBackground = document.getElementById("body-background");

export default class BackgroundMaster {
  constructor(backgroundButton) {
    this.ctx = backgroundButton;
    this.backgroundDropDown();

  }

  backgroundDropDown() {
    backgroundButton[0].addEventListener("click", () => {
      document.getElementById("background-dd").classList.toggle("show");
    })

    for (let i = 0; i < backgroundOptions.length; i++) {
      let option = backgroundOptions.item(i);

      option.addEventListener("click", () => {
        // console.log("clicked!")
        let body = document.querySelector("body");
        let text = option.textContent;
        // console.log(text)

        if (text === "Black") {
          body.className = ""
          body.classList.add("black")
        } else if (text === "White") {
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

        document.getElementById("background-dd").classList.toggle("show")
      })
    }
  }
}