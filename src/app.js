import AudioMaster from "./components/audioMaster";
import BackgroundMaster from "./components/backgroundMaster";
// import SleepTimer from "./components/sleepTimer";

const audioElement = document.querySelector("#audio");
new AudioMaster(audioElement);

const backgroundButton = document.getElementsByClassName("fa-images");
new BackgroundMaster(backgroundButton);

// const sleepTimerButton = document.getElementsByClassName("fa-clock");
// new SleepTimer(sleepTimerButton);

