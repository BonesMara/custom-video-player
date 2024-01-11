const videoPlayerContainer = document.querySelector(".player-container");
const videoPlayerOverlay = document.querySelector(".player-overlay");
const videoPlayerControls = document.querySelector(".player-button-layout");
const videoTitle = document.querySelector(".player-video-title");
let video = document.querySelector(".player-main");
const playBtn = document.querySelector(".playBtn");
const pauseBtn = document.querySelector(".pauseBtn");
const muteBtn = document.querySelector(".muteBtn");
const soundBtn = document.querySelector(".soundBtn");
const fullscreenBtn = document.querySelector(".fullscreenBtn");
const fullscreenCloseBtn = document.querySelector(".fullscreenCloseBtn");
const playerVolumeSlider = document.querySelector(".player-volume-slider");
const playerTimeSlider = document.querySelector(".player-scrub-slider");
const videoQualityIndicator = document.querySelector(".video-hd");

var videoList = [
  {
    title: "Gospel",
    location: "video.mp4",
  },
  {
    title: "His Glorious Church of All Nations Service",
    location: "video1.mp4",
  },
  {
    title: "SCOAN Church Service",
    location: "video2.mp4",
  },
];

function togglePlayPause() {
  if (video.paused || video.ended) {
    video.play();
    playBtn.style.display = "none";
    pauseBtn.style.display = "inline";
  } else {
    video.pause();
    playBtn.style.display = "inline";
    pauseBtn.style.display = "none";
  }
}

function toggleVolume() {
  if (video.muted) {
    video.muted = false;
    soundBtn.style.display = "inline";
    muteBtn.style.display = "none";
  } else {
    video.muted = true;
    soundBtn.style.display = "none";
    muteBtn.style.display = "inline";
  }
}

function toggleFullscreen() {
  if (!document.fullscreenElement && !document.webkitFullscreenElement) {
    if (videoPlayerContainer.requestFullscreen) {
      videoPlayerContainer.requestFullscreen();
      fullscreenBtn.style.display = "none";
      fullscreenCloseBtn.style.display = "inline";
    } else if (videoPlayerContainer.webkitRequestFullscreen) {
      /* Safari */
      videoPlayerContainer.webkitRequestFullscreen();
      fullscreenBtn.style.display = "none";
      fullscreenCloseBtn.style.display = "inline";
    }
  } else {
    if (document.exitFullscreen) {
      document.exitFullscreen();
      fullscreenBtn.style.display = "inline";
      fullscreenCloseBtn.style.display = "none";
    } else if (document.webkitExitFullscreen) {
      /* Safari */
      document.webkitExitFullscreen();
      fullscreenBtn.style.display = "inline";
      fullscreenCloseBtn.style.display = "none";
    }
  }
}

function updateVolume() {
  video.volume = playerVolumeSlider.value;
}

var currentTimeLabel = document.getElementById("currentTime");
var durationLabel = document.getElementById("duration");

// Set initial time and duration labels
video.addEventListener("loadedmetadata", function () {
  durationLabel.textContent = formatTime(video.duration);
  playerTimeSlider.max = video.duration;
});

// Set initial time slider value
video.addEventListener("timeupdate", function () {
  playerTimeSlider.value = video.currentTime;
  currentTimeLabel.textContent = formatTime(video.currentTime);
});

// JavaScript function to update video time
function updateTime() {
  video.currentTime = playerTimeSlider.value;
}

function formatTime(time) {
  var hours = Math.floor(time / 3600);
  var minutes = Math.floor((time % 3600) / 60);
  var seconds = Math.floor(time % 60);

  var formattedTime =
    (hours > 0 ? hours + ":" : "") +
    (minutes < 10 ? "0" : "") +
    minutes +
    ":" +
    (seconds < 10 ? "0" : "") +
    seconds;

  return formattedTime;
}

// Show/hide custom controls when mouse over/out
videoPlayerContainer.addEventListener("mouseenter", showControls);
videoPlayerContainer.addEventListener("mouseleave", hideControls);

function showControls() {
  videoPlayerOverlay.style.opacity = 1;
  videoQualityIndicator.style.opacity = 1;
  videoPlayerOverlay.style.display = "block";
}

function hideControls() {
  videoPlayerOverlay.style.opacity = 0;
  videoQualityIndicator.style.opacity = 0.6;
  setTimeout(function () {
    videoPlayerOverlay.style.display = "none";
  }, 500);
}

function loadNextVideo() {
  let currentVideoIndex = localStorage.getItem("videoIndex");
  if (
    currentVideoIndex == undefined ||
    currentVideoIndex >= (videoList.length - 1)
  ) {
    currentVideoIndex = 0;
    loadingProcess(currentVideoIndex);
  } else {
    currentVideoIndex++;
    loadingProcess(currentVideoIndex);
  }
}

function loadPreviousVideo() {
  let currentVideoIndex = localStorage.getItem("videoIndex");
  if (currentVideoIndex == undefined || currentVideoIndex <= 0) {
    currentVideoIndex = videoList.length - 1;
    loadingProcess(currentVideoIndex);
  } else {
    currentVideoIndex--;
    loadingProcess(currentVideoIndex);
  }
}


function setQuality() {
  videoQualityIndicator.innerHTML = "";
  if (video.videoHeight < 720) {
    videoQualityIndicator.insertAdjacentHTML(
      "beforeend",
      '<span class="material-symbols-outlined">sd</span>'
    );
  } else if (video.videoHeight >= 720 && video.videoHeight < 1080) {
    videoQualityIndicator.insertAdjacentHTML(
      "beforeend",
      '<span class="material-symbols-outlined">hd</span>'
    );
  } else if (video.videoHeight == 1080) {
    videoQualityIndicator.insertAdjacentHTML(
      "beforeend",
      '<span class="material-symbols-outlined">full_hd</span>'
    );
  } else if (video.videoHeight > 1080 && video.videoHeight < 2160) {
    videoQualityIndicator.insertAdjacentHTML(
      "beforeend",
      '<span class="material-symbols-outlined">high_res</span>'
    );
  } else if (video.videoHeight == 2160) {
    videoQualityIndicator.insertAdjacentHTML(
      "beforeend",
      '<span class="material-symbols-outlined">4k</span>'
    );
  } else if (video.videoHeight > 2160 && video.videoHeight < 4320) {
    videoQualityIndicator.insertAdjacentHTML(
      "beforeend",
      '<span class="material-symbols-outlined">4k_plus</span>'
    );
  } else if (video.videoHeight == 4320) {
    videoQualityIndicator.insertAdjacentHTML(
      "beforeend",
      '<span class="material-symbols-outlined">8k</span>'
    );
  } else if (video.videoHeight > 4320) {
    videoQualityIndicator.insertAdjacentHTML(
      "beforeend",
      '<span class="material-symbols-outlined">8k_plus</span>'
    );
  }
}

function loadingProcess(currentVideoIndex) {
  video.src = videoList[currentVideoIndex].location;
  video.load();
  video.play();
  videoTitle.textContent = videoList[currentVideoIndex].title;
  localStorage.setItem("videoIndex",currentVideoIndex);
  setQuality();
}
