var $messages = $('.messages-content'),
    d, h, m,
    i = 0;
var talking = true;

//all the messages being sent
var Fake = [
  'Hi there, I\'m Andrew and you?',
  'Nice to meet you',
  'How are you?',
  'Not too bad, thanks',
  'What do you do?',
  'That\'s awesome',
  'I think you\'re a nice person',
  'Why do you think that?',
  'Can you explain?',
  'Anyway I\'ve gotta go now',
  'It was a pleasure chat with you',
  'Time to get back to work, it was nice talking to you!',
  'I will always love you, bye!',
  ':)'
]

function Speech(say) {
  if ('speechSynthesis' in window && talking) {
    var utterance = new SpeechSynthesisUtterance(say);
    // utterance.voice = voices[10]; // Note: some voices don't support altering params
    // utterance.voiceURI = 'native';
    utterance.volume = .7; // 0 to 1
    utterance.rate = 0.7; // 0.1 to 10
    utterance.pitch = 1; //0 to 2
    utterance.lang = 'en-US';
    speechSynthesis.speak(utterance);
  }
}
//this is the btn used to turn audio on and off
  $(document).ready( function(){
    $(".speech").click(function () {
      Speech(Fake[i - 1]);
      console.log(Fake[i - 1]);
    }) 
  })

$(window).on("load", function() {
  $messages.mCustomScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 100);
});

//create time stamp
function setDate(){
  d = new Date()
  if (m != d.getMinutes()) {
    m = d.getMinutes();
    $('<div class="timestamp">' + d.getHours() + ':' + m + '</div>').appendTo($('.message:last'));
  }
}
//sets the fake messages in a position to be sent to container
function fakeMessage() {
  if ($('.message-input').val() != '') {
    return false;
  }
  $('<div class="message loading new"><figure class="avatar"><img src="img/weddin.jpg" /></figure><span></span></div>').appendTo($('.mCSB_container'));
  updateScrollbar();

  setTimeout(function() {
    $('.message.loading').remove();
    $('<div class="message new"><figure class="avatar"><img src="img/weddin.jpg" /></figure>' + Fake[i] + '</div>').appendTo($('.mCSB_container')).addClass('new');
    setDate();
    updateScrollbar();
    i++;
  }, 1000 + (Math.random() * 20) * 100);
}

//insert message to main container
function insertMessage() {
  msg = $('.message-input').val();
  if ($.trim(msg) == '') {
    return false;
  }
  $('<div class="message message-personal">' + msg + '</div>').appendTo($('.mCSB_container')).addClass('new');
  setDate();
  $('.message-input').val(null);
  updateScrollbar();
  setTimeout(function() {
    fakeMessage();
  }, 1000 + (Math.random() * 20) * 100);
}

//submit message option
$('.message-submit').click(function() {
  insertMessage();
});

//submit message through the "enter" or "13" key
$(window).on('keydown', function(e) {
  if (e.which == 13) {
    insertMessage();
    return false;
  }
})

//update scrollbar: updates text to show most recent
function updateScrollbar() {
  $messages.mCustomScrollbar("update").mCustomScrollbar('scrollTo', 'bottom', {
    scrollInertia: 10,
    timeout: 0
  });
}
