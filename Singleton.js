class BackgoundAudio {
  constructor() {
    this.status = "off";
  }

  onPlay() {
    this.status = "on";
  }

  onPause() {
    this.status = "off";
  }

  static getInstance() {
    if (!BackgoundAudio.instance) {
      BackgoundAudio.instance = new BackgoundAudio();
    }
    return BackgoundAudio.instance;
  }
}

const ba1 = BackgoundAudio.getInstance();
const ba2 = BackgoundAudio.getInstance();

ba1.onPlay();
console.log(ba1 === ba2, ba1, ba2, "ba1");

ba2.onPause();

console.log(ba1 === ba2, ba1, ba2, "ba2");
