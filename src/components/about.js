const aboutButton = document.getElementsByClassName("fa-comment-dots");
const aboutOptions = document.getElementsByClassName("about-opt");

export default class About {
  constructor(){
    this.aboutDropDown();
  }


  aboutDropDown(){
    aboutButton[0].addEventListener("click", () => {
      document.getElementById("about-dd").classList.toggle("show");
    })

    for (let i = 0; i < aboutOptions.length; i++) {
      let option = aboutOptions.item(i);
      let about = document.getElementById("about");
      let description = document.getElementById("description");
      let close = document.getElementsByClassName("closeBtn");

      option.addEventListener("click", () => {
        let text = option.textContent;

        if (text === "About"){
          about.style.display = "block";
          close[0].addEventListener("click", () => {
            about.style.display = "none";
          })
          window.addEventListener("click", (e) => {
            if (e.target === about) { about.style.display = "none" }
          })
        } else if (text === "Description"){
          description.style.display = "block";
          close[0].addEventListener("click", () => { 
            description.style.display = "none";
          })
          window.addEventListener("click", (e) => {
            if (e.target === description) { description.style.display = "none" }
          })
        } else {

        }

        document.getElementById("about-dd").classList.toggle("show");
      })
    }
  }
}