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

class ZZAudio {
    constructor() {
        // log=v1
        ZZAudioElement = document.createElement("audio");
        document.body.appendChild(ZZAudioElement);

        this.addEvent();
    }

    addEvent() {
        ZZAudioElement.addEventListener("loadeddata", () => {
            this.audioLoadedDataLoading = false;
            if (this.audioLoadedDataForType === 'forPlay') {
                this._play();
            }

        }, false);
    }
    setVolume(inVol) {
        ZZAudioElement.volume = inVol;
    }
    changeAudio(src, forType) {
        this.audioLoadedDataLoading = true;
        this.audioLoadedDataForType = forType;
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
        this.currentPlayInfo.src = (inInfo.src) ? inInfo.src : null;
        this.currentPlayInfo.st = (inInfo.st) ? inInfo.st : null;
        this.currentPlayInfo.et = (inInfo.et) ? inInfo.et : null;
        this.currentPlayInfo.callback = (inInfo.callback) ? inInfo.callback : null;
        this.currentPlayInfo.repeat = (inInfo.repeat) ? inInfo.repeat : 1;
        this.currentPlayInfo.interval = (inInfo.interval) ? inInfo.interval : 0;
        this.currentPlayInfo.speed = (inInfo.speed) ? inInfo.speed : 1;
        // 새로운 URL인 경우
        if (this.utils.strEnd20(this.currentPlayInfo.src) !== this.utils.strEnd20(ZZAudioElement.currentSrc)) {
            // console.log('new url',this.utils.strEnd20(this.currentPlayInfo.src), this.utils.strEnd20(audioElement.currentSrc))
            // ZZAudioElement.setAttribute("src",this.currentPlayInfo.src);
            this.changeAudio(this.currentPlayInfo.src, 'forPlay');
            return;
        }
        // if(!isAudioInit){
        //     return;
        // }

        this._play();
    }
    _play() {
        if (this.audioLoadedDataLoading) {
            console.log('loading sound...')
            return;
        }
        if (this.currentPlayInfo.st) {
            ZZAudioElement.currentTime = this.currentPlayInfo.st / 1000;
        }
        ZZAudioElement.playbackRate = this.currentPlayInfo.speed;
        this.startTick();
        ZZAudioElement.play();
    }
    pause() {
        this.endTick();
        ZZAudioElement.pause();


    }
    _pause() {
        if (this.currentPlayInfo.callback) this.currentPlayInfo.callback();
    }
    startTick() {
        this.endTick();
        this.intervalObj = setInterval(() => {
            // console.log(ZZAudioElement.currentTime*1000, this.currentPlayInfo);
            if (this.currentPlayInfo && this.currentPlayInfo.et &&
                ZZAudioElement.currentTime * 1000 > this.currentPlayInfo.et) {
                this.pause();
                this._pause();
            }
        }, 100);
    }
    endTick() {
        if (this.intervalObj) clearInterval(this.intervalObj);
    }
    utils = {
        strEnd20: (str) => {
            return str.substr(str.length - 20, str.length);
        }
    }
}

window.addEventListener('DOMContentLoaded', (event) => {
    window.zzaudio = new ZZAudio();
});