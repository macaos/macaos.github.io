var ZZAudioElement;
var audioLoadedDataForType = '';// :'forPlay'|'forJustChange'// 사운드를 로드한 이유
var audioLoadedDataLoading = false;// 사운드를 로딩 중 인가?
var intervalObj = null;
var currentPlayInfo = {
    src: null,
    st: null,
    et: null,
    callback: null,
    repeat: 1,
    interval: 0,
    speed: 1,
}
var zzutils = {
    strEnd20: (str) => {
        return str.substr(str.length - 20, str.length);
    }
}

class ZZAudio {
    constructor() {
        // log=v1
        ZZAudioElement = document.createElement("audio");
        document.body.appendChild(ZZAudioElement);

        this.addEvent();
    }

    addEvent() {
        ZZAudioElement.addEventListener("loadeddata", () => {
            audioLoadedDataLoading = false;
            if (audioLoadedDataForType === 'forPlay') {
                this._play();
            }

        }, false);
    }
    setVolume(inVol) {
        ZZAudioElement.volume = inVol;
    }
    changeAudio(src, forType) {
        audioLoadedDataLoading = true;
        audioLoadedDataForType = forType;
        ZZAudioElement.setAttribute("src", src);
    }
    presetSrc(src) {
        alert('a')
        this.changeAudio(src, 'forJustChange');
    }
    playEffect(inID) {
        const el = document.getElementById(inID);
        el.currentTime = 0;
        el.play();
    }
    play(inInfo) {
        console.log('playparam2', inInfo)
        currentPlayInfo.src = (inInfo.src) ? inInfo.src : null;
        currentPlayInfo.st = (inInfo.st) ? inInfo.st : null;
        currentPlayInfo.et = (inInfo.et) ? inInfo.et : null;
        currentPlayInfo.callback = (inInfo.callback) ? inInfo.callback : null;
        currentPlayInfo.repeat = (inInfo.repeat) ? inInfo.repeat : 1;
        currentPlayInfo.interval = (inInfo.interval) ? inInfo.interval : 0;
        currentPlayInfo.speed = (inInfo.speed) ? inInfo.speed : 1;
        // 새로운 URL인 경우
        if (zzutils.strEnd20(currentPlayInfo.src) !== zzutils.strEnd20(ZZAudioElement.currentSrc)) {
            // console.log('new url',this.utils.strEnd20(currentPlayInfo.src), this.utils.strEnd20(audioElement.currentSrc))
            // ZZAudioElement.setAttribute("src",currentPlayInfo.src);
            this.changeAudio(currentPlayInfo.src, 'forPlay');
            return;
        }
        // if(!isAudioInit){
        //     return;
        // }

        this._play();
    }
    _play() {
        if (audioLoadedDataLoading) {
            console.log('loading sound...')
            return;
        }
        if (currentPlayInfo.st) {
            ZZAudioElement.currentTime = currentPlayInfo.st / 1000;
        }
        ZZAudioElement.playbackRate = currentPlayInfo.speed;
        this.startTick();
        ZZAudioElement.play();
    }
    pause() {
        this.endTick();
        ZZAudioElement.pause();


    }
    _pause() {
        if (currentPlayInfo.callback) currentPlayInfo.callback();
    }
    startTick() {
        this.endTick();
        intervalObj = setInterval(() => {
            // console.log(ZZAudioElement.currentTime*1000, currentPlayInfo);
            if (currentPlayInfo && currentPlayInfo.et &&
                ZZAudioElement.currentTime * 1000 > currentPlayInfo.et) {
                this.pause();
                this._pause();
            }
        }, 100);
    }
    endTick() {
        if (intervalObj) clearInterval(intervalObj);
    }

}

window.addEventListener('DOMContentLoaded', (event) => {
    window.zzaudio = new ZZAudio();
});