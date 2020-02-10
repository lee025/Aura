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

      option.addEventListener("click", () => {
        let text = option.textContent;

        if (text === "About"){

        } else {
          document.getElementById("description").classList.toggle("hidden");
        }

        document.getElementById("about-dd").classList.toggle("show");
      })
    }
  }
}