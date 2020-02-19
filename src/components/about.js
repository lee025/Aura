const aboutButton = document.getElementsByClassName("fa-comment-dots");
const aboutOptions = document.getElementsByClassName("about-opt");
const aboutDD = document.getElementById("about-dd");
const backgroundDD = document.getElementById("background-dd");
const sleepDD = document.getElementById("sleep-dd");

export default class About {
  constructor(){
    this.aboutDropDown();
  }


  aboutDropDown(){
    aboutButton[0].addEventListener("click", (e) => {
      if (backgroundDD.classList.contains("show") || sleepDD.classList.contains("show")) {
        backgroundDD.classList.toggle("show");
        // sleepDD.classList.toggle("show");
      }
      aboutDD.classList.toggle("show")
      e.stopPropagation();
    })


    for (let i = 0; i < aboutOptions.length; i++) {
      let option = aboutOptions.item(i);
      let about = document.getElementById("about");
      let description = document.getElementById("description");
      let close1 = document.getElementsByClassName("1");
      let close2 = document.getElementsByClassName("2");

      option.addEventListener("click", (e) => {
        let text = option.textContent;

        if (text === "About"){
          about.style.display = "block";
          close1[0].addEventListener("click", () => {
            about.style.display = "none";
          })
          window.addEventListener("click", (e) => {
            if (e.target === about) { about.style.display = "none" }
          })
        } else if (text === "Description"){
          description.style.display = "block";
          close2[0].addEventListener("click", () => { 
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