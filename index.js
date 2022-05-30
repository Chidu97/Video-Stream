const videoElement = document.querySelector('#userVid');
const startBtn = document.querySelector('#start')
const stopBtn = document.querySelector('#stop')

const settings = {
    video: true,
    audio: false,
}

function stopStreamedVideo (videoElem) {
    const stream = videoElem.srcObject;
    const tracks = stream.getTracks();


    tracks.forEach(function(track) {
        track.stop()
    });

    videoElem.srcObject = null;
}

function startVideo() {
    navigator.mediaDevices.getUserMedia(settings)
    .then(mediaStreamObj => {
        if ('srcObject' in videoElement)
        videoElement.srcObject = mediaStreamObj 
        else
        videoElement.src = window.URL.createObjectURL(mediaStreamObj)
    
        videoElement.onloadmetadata = () => {
            videoElement.play()
        }
    })
}

startBtn.onclick = startVideo
stopBtn.onclick = () => stopStreamedVideo(videoElement)