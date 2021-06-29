const synth = window.speechSynthesis;
console.log(synth);

const textForm = document.querySelector("form");
const textInput = document.querySelector("#text-input");
const voiceSelect = document.querySelector("#voice-select");
const rate = document.querySelector("#rate");
const rateValue = document.querySelector("#range-value");
const pitch = document.querySelector("#pitch");
const pitchValue = document.querySelector("#pitch-value");

let voices =[];
const getVoices = ()=>{
    voices =  synth.getVoices()
    voices.forEach(voice => {
        const option =  document.createElement("option")
        option.textContent = voice.name + '(' + voice.lang + ')';
        option.setAttribute('data-lang' ,voice.lang)
        option.setAttribute('data-name' ,voice.name)
        voiceSelect.appendChild(option)
    })
    
}
// if(synth.onvoiceschanged!==undefined)
// {
//     synth.onvoiceschanged =getVoices;
// }
getVoices();
const speak = ()=>{
    if(synth.speaking)
    {
        console.error("Already Speaking");
        return;
    }
    if(textInput.value !== '')
    {
        const speakText = new SpeechSynthesisUtterance(textInput.value);

        speakText.onend = e =>{
            console.log("Done Speaking...");
        } 

        speakText.onerror = e =>{
            console.log ('Error' +e);
        }

        const selectedVoice = voiceSelect.selectedOptions[0].getAttribute("data-name");
        console.log(selectedVoice);
        voices.forEach(voice =>{
            if(voice.name === selectedVoice)
            {
            speakText.voice = voice;
            console.log(voice);
            speakText.lang = voice.lang;
            }
        })
        speakText.volume = 1;
        speakText.rate = rate.value ;
        speakText.pitch = pitch.value;
        console.log(speakText);
        synth.speak(speakText);
    }
}


textForm.addEventListener("submit", e =>{
    e.preventDefault();
    speak();
    textInput.blur();
})

rate.addEventListener("change" , e=> rateValue.textContent = rate.value);

pitch.addEventListener("change" , e=> pitchValue.textContent = pitch.value);
//voiceSelect.addEventListener("change" ,speak);
