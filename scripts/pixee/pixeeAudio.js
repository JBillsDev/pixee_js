// Class providing sfx.
class PixeeAudio {
    constructor() {
        this.soundMap = {}

        this.sfxExtension = '.wav';
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
     * @desc Plays a loaded sound file, if it is found.
     * @param name The name (string ID) of the sound to be played.
     * @returns void
     */
    playSound(name) {
        if (name in this.soundMap) {
            this.soundMap[name].play();
        }
    }
}

export default PixeeAudio;