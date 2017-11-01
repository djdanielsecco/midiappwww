
    'use strict';
var bb,
	divLog12 = document.getElementById('con14'),
		divLog13 = document.getElementById('con15');
		function myFunction(aas) {
		bb = aas;
    console.log('oooooooiiii'+ bb);
};


(function (window, document, undefined) {


  var notes, midi, currentInput, tarima, popo, zeca;

  function onMidiMessage(msg) {
    var action = isNoteOffMessage(msg) ? 'remove' : isNoteOnMessage(msg) ? 'add' : null,
        noteDiv;

    if (action && (noteDiv = getNoteDiv(msg))) {
      noteDiv.classList[action]('piano-key-pressed');
		
		console.log('oi   ' + msg.currentTarget.manufacturer);
    }
  }

  var MIDI_A0_NUM = 21;

  function getNoteDiv(msg) {
    var noteNum = getMessageNote(msg) - MIDI_A0_NUM;

    if (notes && 0 <= noteNum && noteNum < notes.length) {
      zeca = notes[noteNum];
		console.log(noteNum + '  a  ' + zeca.dataset.note);
		return notes[noteNum];
    }
  }

  var CMD_NOTE_ON = 9;
  var CMD_NOTE_OFF = 8;

  function isNoteOnMessage(msg) {
    return getMessageCommand(msg) == CMD_NOTE_ON;
	  console.log('oiee');
  }

  function isNoteOffMessage(msg) {
    var cmd = getMessageCommand(msg);
    return cmd == CMD_NOTE_OFF || cmd == CMD_NOTE_ON && getMessageVelocity(msg) == 0;
	  
	  console.log(cmd);
  }

  function getMessageCommand(msg) {
    return msg.data[0] >> 4;
  }
  function getMessageNote(msg) {
    return msg.data[1];
  }
  function getMessageVelocity(msg) {
    return msg.data[2];
  }

  function selectInput(input) {
    if (input != currentInput) {
      if (currentInput) {
        currentInput.removeEventListener('midimessage', onMidiMessage);
        currentInput.close();
      }

      input.addEventListener('midimessage', onMidiMessage);
      currentInput = input;
    }
  }

  function populateInputList() {
    var inputs = Array.from(midi.inputs.values());

    if (inputs.length > 1) {
      selectInput(inputs[2]);
    } else {
      // TODO: handle multiple MIDI inputs
    }
  }

  function onMIDIAccessSuccess(access) {
    midi = access;
    access.addEventListener('statechange', populateInputList, false);
    populateInputList();
	 var  inputs = midi.inputs;
		
		inputs.forEach(function (port) {
			console.log('in', port.name, port.id, port.state, port.connection);
		
		});
  }

  function onMIDIAccessFail() {
    console.error('Request for MIDI access was denied!');
  }

  if ('requestMIDIAccess' in window.navigator) {
    window.navigator.requestMIDIAccess({sysex: true}).then(onMIDIAccessSuccess, onMIDIAccessFail);
  } else {
    console.error('Your device doesn\' support WebMIDI or its polyfill');
  }
	document.addEventListener("click", function(){
	tarima = document.getElementsByClassName('piano-key');
		 popo = tarima[bb].dataset.note;
		divLog12.innerHTML = popo + '<br>' + divLog12.innerHTML;
	console.log(popo);
		
	},false);

  document.addEventListener('DOMContentLoaded', function () {
    notes = document.getElementsByClassName('piano-key');
  }, false);
})(window, window.document);






