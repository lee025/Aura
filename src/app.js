import AudioMaster from "./components/audioMaster";
import BackgroundMaster from "./components/backgroundMaster";

const audioElement = document.querySelector("#audio");
new AudioMaster(audioElement);

const backgroundButton = document.getElementsByClassName("fa-images");
new BackgroundMaster(backgroundButton);