function play(sound) {
    sound.pause();
    sound.currentTime = 0;
    sound.play();
}