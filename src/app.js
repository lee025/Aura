import AudioMaster from "./components/audioMaster";
import BackgroundMaster from "./components/backgroundMaster";
import About from "./components/about";

const audioElement = document.querySelector("#audio");
new AudioMaster(audioElement);

const backgroundButton = document.getElementsByClassName("fa-images");
new BackgroundMaster(backgroundButton);

const aboutButton = document.getElementsByClassName("fa-comment-dots");
new About(aboutButton);



