let midiNotes = [];
let a = [];
let b;

let text1 = 'hello';

keyData1 = [];
keyData2 = [];
for (let i = 0; i < 72; i++) {
    a[i] = i;
}
//midi input stuff
if ('requestMIDIAccess' in navigator) {
    navigator.requestMIDIAccess().then(midiSuccess, midiFailure);
  }
  
  function midiSuccess (midi) {
    var inputs = midi.inputs.values();  // inputs is an Iterator
  
    for (var input = inputs.next(); input && !input.done; input = inputs.next()) {
        // each time there is a midi message call the onMIDIMessage function
        input.value.onmidimessage = onMIDIMessage;
    }
  }
  
  function midiFailure () {
    console.error('No access to your midi devices.')
  }
  
  function onMIDIMessage(message) {
   // message.preventDefault();
    if (message.data[0] == 248) return;  // clock signal, comment out if wanted
  
  //  console.log(message.data);
  
    var event = message.data[0];
   // console.log(message.data[2]);
    var note = message.data[1];
    var velocity = message.data[2];
  
    a[message.data[1]] = message.data[2];

 // If the note is 0 or 1, update the corresponding slider
 if (note >= 0 && note < numSliders) {
    // Update the slider value in the browser
    var slider = document.getElementById('slider' + (note + 1));
    if (slider) {
        slider.value = velocity;
        console.log(slider.value);
    }
    

    // Emit a sliderChange event to the server
    if (typeof socket !== 'undefined') {
        socket.emit('sliderChange', {
            name: 'slider' + (note + 1),
            value: velocity
        });
    }
}


    console.log(message.data[1])
    switch (event) {
      case 145:
        console.log('note on');
        midiNotes.push(note);
        break;
      case 129:
        console.log('note off')
        setTimeout(() => {
          midiNotes.shift();
        }, 800);
  
        console.log(midiNotes);
        break;
      default:
        break;
    }
  }