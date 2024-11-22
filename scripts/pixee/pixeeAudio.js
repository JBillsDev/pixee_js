// Class providing sfx.
class PixeeAudio {
    constructor() {
        this.currentMusicTrack = null;
        this.soundMap = {}

        this.musicExtension = '.ogg';
        this.sfxExtension = '.wav';
    }

    /**
     * @desc Frees a loaded sound resource from memory, and removes the map listing.
     * @param name Name ID of the sound file to remove.
     * @returns void
     */
    freeSound(name) {
        if (name in this.soundMap) {
            this.soundMap[name].src = "";
            this.soundMap[name].removeAttribute("src");
            delete this.soundMap[name];
        }
    }

    /**
     * @desc Load music file into memory, with optional looping of track.
     * @param name Name of the music file.
     * @param path Path to the music file.
     * @param looping Whether or not the track should repeat when finished.
     * @returns void
     */
    loadMusicFile(name, path, looping = false) {
        const filePath = path + name + this.musicExtension;
        this.currentMusicTrack = new Audio(filePath);

        if (looping) {
            this.currentMusicTrack.loop = true;
        }
    }

    /**
     * @desc Loads a sound file into memory.
     * @param name The name of the file, which serves as its identifier.
     * @param path The relative path to the sound file.
     * @returns void
     */
    loadSoundFile(name, path) {
        const filePath = path + name + this.sfxExtension;
        this.soundMap[name] = new Audio(filePath);
    }

    /**
     * @desc Pause the current music track.
     * @returns void
     */
    pauseMusic() {
        this.currentMusicTrack.pause();
    }

    /**
     * @desc Play the current music track.
     * @returns void
     */
    playMusic() {
        this.currentMusicTrack.play();
    }

    /**
     * @desc Plays a loaded sound file, if it is found.
     * @param name The name (string ID) of the sound to be played.
     * @returns void
     */
    playSound(name) {
        if (name in this.soundMap) {
            this.soundMap[name].play();
        }
    }

    /**
     * @desc Stop the currently playing music track and reset it back to the beginning.
     * @returns void
     */
    stopMusic() {
        this.currentMusicTrack.stop();
        this.currentMusicTrack.currentTime = 0;
    }

    /**
     * @desc Toggle the music between play and paused states.
     * @returns void
     */
    toggleMusic() {
        if (this.currentMusicTrack.paused) {
            this.currentMusicTrack.play();
        } else {
            this.currentMusicTrack.pause();
        }
    }
}

export default PixeeAudio;