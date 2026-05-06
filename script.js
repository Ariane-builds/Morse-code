function translation () {
    let play = document.getElementById("play");
    let morse = "";
const morseCode = {
  A: ".-",
  B: "-...",
  C: "-.-.",
  D: "-..",
  E: ".",
  F: "..-.",
  G: "--.",
  H: "....",
  I: "..",
  J: ".---",
  K: "-.-",
  L: ".-..",
  M: "--",
  N: "-.",
  O: "---",
  P: ".--.",
  Q: "--.-",
  R: ".-.",
  S: "...",
  T: "-",
  U: "..-",
  V: "...-",
  W: ".--",
  X: "-..-",
  Y: "-.--",
  Z: "--..",

  0: "-----",
  1: ".----",
  2: "..---",
  3: "...--",
  4: "....-",
  5: ".....",
  6: "-....",
  7: "--...",
  8: "---..",
  9: "----.",

  ".": ".-.-.-",
  ",": "--..--",
  "?": "..--..",
  "'": ".----.",
  "!": "-.-.--",
  "/": "-..-.",
  "(": "-.--.",
  ")": "-.--.-",
  "&": ".-...",
  ":": "---...",
  ";": "-.-.-.",
  "=": "-...-",
  "+": ".-.-.",
  "-": "-....-",
  "_": "..--.-",
  "\"": ".-..-.",
  "$": "...-..-",
  "@": ".--.-."
};  let alltext = "";
    const texted = document.getElementById("message");
    const message = texted.value;
    let result = "";
    const showthis = document.getElementById("output");
    for (let i = 0; i < message.length; i++) {
        console.log(message[i]);
    if ([".", "-","_", "/"].includes(message[0])){
        if (message[i] == "_") {
            morse+= "-"
        } else {
        morse+=message[i];
        }
    }
    
    else {
        alltext += message[i].toUpperCase();
    }
}


if (morse.length != 0) {
    play.style.display = "none";
    let list = morse.split(" ");
    console.log(morse)
    console.log(list)
    if (list.length == 0){
        let values = Object.values(morseCode);
        if(values.includes(morse)){
            let key = Object.keys(morseCode).find(k => morseCode[k] === morse);
            result+=key;
            console.log(key)
        } 
    } else{
        for (let i = 0; i < list.length; i++){
        let values = Object.values(morseCode);
        let keys = Object.keys(morseCode)
        if (keys.includes(list[i])){
            result = "Oops, Morse didn't get that far! Try again!";
        } else if(values.includes(list[i])){
            let key = Object.keys(morseCode).find(k => morseCode[k] === list[i]);
            result+=key;
            console.log(key)
            // temp="";
        } else if (list[i]=="/"){
            result += " ";
        }
    }
    }    
    
} else {
    play.style.display = "block";
    let keys = Object.keys(morseCode);
    let text = alltext.split("");
    for (let i = 0; i < text.length; i++){
        let key = Object.keys(morseCode).find(k => morseCode[k] === text[i]);
        if(key){
            result = "Oops, Morse didn't get that far! Try again!";
        } else if(keys.includes(text[i])){
        let value = morseCode[text[i]];
        result += value + " ";
        console.log(value);
        } else if (text[i] == " "){
        result+= "/ ";
    }
}
}
console.log(morse)
console.log(message)
console.log(result);
console.log(showthis);

showthis.style.display = "block";
showthis.textContent = result;

// if (text.length != 0) {

// }
}


function playMorse() {
    let output = document.getElementById("output").textContent;
    const audioCtx = new AudioContext();
    let time = audioCtx.currentTime;

    const dot = 0.1;
    const dash = dot * 3;
    const gap = dot;

    for (let symbol of output) {
        if (symbol === "." || symbol === "-") {
            const oscillator = audioCtx.createOscillator();
            const gain = audioCtx.createGain();

            oscillator.frequency.value = 600;
            oscillator.connect(gain);
            gain.connect(audioCtx.destination);

            oscillator.start(time);

            if (symbol === ".") {
                oscillator.stop(time + dot);
                time += dot;
            } else {
                oscillator.stop(time + dash);
                time += dash;
            }

            time += gap;
        } else if (symbol === " ") {
            time += dot * 3;
        }
    }
}
