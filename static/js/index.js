localStorage.setItem('targetedLanguage', 'en');

window.addEventListener('load', function () {
  var logo = document.getElementById('load');
  logo.style.transform = 'scale(1)';
  document.getElementById('content').style.opacity = '0.3';
  

  setTimeout(function () {
    logo.style.transform = 'scale(1.5)';
  }, 1000);
  logo.addEventListener('transitionend', function () {
    document.getElementById('logo-container').style.opacity = '0';
    document.getElementById('content').style.opacity = '1';
  });
});


var faq = document.getElementsByClassName("faq-page");
var i;
for (i = 0; i < faq.length; i++) {
    faq[i].addEventListener("click", function () {
        this.classList.toggle("active");
        var body = this.nextElementSibling;
        if (body.style.display === "block") {
            body.style.display = "none";
        } else {
            body.style.display = "block";
        }
    });
}

let currentFontSize = 16;

function increaseFontSize() {
  currentFontSize += 2;
  applyFontSize();
}

function resetFontSize() {
  currentFontSize = 16;
  applyFontSize();
}

function decreaseFontSize() {
  currentFontSize -= 2;
  applyFontSize();
}

function applyFontSize() {
  document.body.style.fontSize = currentFontSize + "px";
}
var today = new Date();

var months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

document.getElementById("spanDate").innerHTML =
  months[today.getMonth()] +
  " " +
  today.getDate() +
  ", " +
  today.getFullYear();

function updateClock() {
  var today = new Date();

  var hours = today.getHours();
  var minutes = today.getMinutes();
  var seconds = today.getSeconds();

  // Add leading zero if the number is less than 10
  hours = hours < 10 ? "0" + hours : hours;
  minutes = minutes < 10 ? "0" + minutes : minutes;
  seconds = seconds < 10 ? "0" + seconds : seconds;

  var currentTime = hours + ":" + minutes + ":" + seconds;

  document.getElementById("spanTime").innerHTML = currentTime;
}
setInterval(updateClock, 1000);
window.onbeforeunload = function () {
      window.scrollTo(0, 0);
}


let originalEnglishText = [];
let translatedText = [];
function collectInitialText() {
    originalEnglishText = [];
    document.querySelectorAll('[data-translate]').forEach(element => {
        originalEnglishText.push(element.textContent);
    });
}
function translateAllElements() {
    const selectedLanguage = document.getElementById('language-select').value;
    localStorage.setItem('targetedLanguage', selectedLanguage);
    if (selectedLanguage == 'en') {
      window.location.reload()
    }
    fetch('/translate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            texts: originalEnglishText,
            target_lang: selectedLanguage,
        }),
    })
    .then(response => response.json())
    .then(data => {
        translatedText = data.translated_texts || [];
        document.querySelectorAll('[data-translate]').forEach((element, index) => {
            element.textContent = translatedText[index] || '';
        });

    })
    .catch(error => {
        console.error('Translation error:', error);
    });
}
document.getElementById('language-select').addEventListener('change', function () {
    translateAllElements();
});
document.addEventListener('DOMContentLoaded', function() {
    collectInitialText();
}); 

function toggleChatbox() {
    var chatbox = document.getElementById('chatbox');
    var chatboyIcon = document.getElementById('chat-button');
    chatbox.style.visibility = 'visible';
    chatboyIcon.style.display = 'none';
}
function unToggleChatbox() {
    var chatbox = document.getElementById('chatbox');
    var chatboyIcon = document.getElementById('chat-button');
    chatbox.style.visibility = 'hidden';
    chatboyIcon.style.display = 'block';
}
function sendMessage(event) {
    if(event.key == 'Enter'){
        var inputElement = document.querySelector('.chat-box-footer input');
            var message = inputElement.value.trim();
            if (message !== '') {
                var messageDiv = document.createElement('div');
                messageDiv.className = 'chat-box-body-send';
                messageDiv.innerHTML = '<p>' + message + '</p>';
                var chatBody = document.getElementById('chat-box-body');
                chatBody.appendChild(messageDiv);
                inputElement.value = '';
            }
        fetch('/ask', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                question: message,
            }),
        })
        .then(response => response.json())
        .then(data => {
            var messageDiv = document.createElement('div');
            messageDiv.className = 'chat-box-body-receive';
        
            // Regular expression to match lines starting with a number followed by a dot and space
            const regex = /\b\d+\.\s.*?(?=\n|$)/g;
        
            var paragraphs = data['answers'].split('\n\n');
            var pointsList = document.createElement('ul');
        
            paragraphs.forEach(paragraph => {
                // Check if the paragraph contains points (lines starting with a number and dot)
                if (paragraph.match(regex)) {
                    var points = paragraph.match(regex);
                    points.forEach(point => {
                        var li = document.createElement('li');
                        li.textContent = point.trim().replace(/^\d+\.\s/, ''); // Remove the number and dot
                        pointsList.appendChild(li);
                    });
                } else {
                    var p = document.createElement('p');
                    p.textContent = paragraph.trim();
                    messageDiv.appendChild(p);
                }
            });
        
            // Append the ordered list to the message div if points are found
            if (pointsList.childNodes.length > 0) {
                messageDiv.appendChild(pointsList);
            }
        
            var chatBody = document.getElementById('chat-box-body');
            chatBody.appendChild(messageDiv);
            inputElement.value = '';
        })
                     
    }
}