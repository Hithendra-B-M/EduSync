window.addEventListener('load', function () {
    // Display the logo at its normal size
    var logo = document.getElementById('load');
    logo.style.transform = 'scale(1)';
    document.getElementById('content').style.opacity = '0.3';
    
    // After a delay, slowly zoom in the logo
    setTimeout(function () {
      logo.style.transform = 'scale(1.5)';
    }, 1000); // Adjust the delay as needed
    // After the zoom-in transition is complete, hide loading logo and display content
    logo.addEventListener('transitionend', function () {
      document.getElementById('logo-container').style.opacity = '0';
      document.getElementById('content').style.opacity = '1';
    });
  });
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

// Update the time every second (1000 milliseconds)
setInterval(updateClock, 1000);
window.onbeforeunload = function () {
      window.scrollTo(0, 0);
}
let originalEnglishText = [];
let translatedText = [];

// Function to collect text from elements with data-translate attribute during initial page load
function collectInitialText() {
    originalEnglishText = [];
    document.querySelectorAll('[data-translate]').forEach(element => {
        originalEnglishText.push(element.textContent);
    });
}

// Function to translate all text elements
function translateAllElements() {
    const selectedLanguage = document.getElementById('language-select').value;
    if (selectedLanguage === 'en') {
      window.location.reload()
    }
    sessionStorage.setItem('targetedLanguage', selectedLanguage);
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

// Bind the onchange event to the language-select dropdown
document.getElementById('language-select').addEventListener('change', function () {
    translateAllElements();
});

// Initialize the originalEnglishText variable with the original text of elements with data-translate attribute during initial page load
document.addEventListener('DOMContentLoaded', function() {
    collectInitialText();
});
window.addEventListener("DOMContentLoaded",() => {
	const ctl = new CollapsibleTimeline("#timeline");
});

class CollapsibleTimeline {
	constructor(el) {
		this.el = document.querySelector(el);

		this.init();
	}
	init() {
		this.el?.addEventListener("click",this.itemAction.bind(this));
	}
	animateItemAction(button,ctrld,contentHeight,shouldCollapse) {
		const expandedClass = "timeline__item-body--expanded";
		const animOptions = {
			duration: 300,
			easing: "cubic-bezier(0.65,0,0.35,1)"
		};

		if (shouldCollapse) {
			button.ariaExpanded = "false";
			ctrld.ariaHidden = "true";
			ctrld.classList.remove(expandedClass);
			animOptions.duration *= 2;
			this.animation = ctrld.animate([
				{ height: `${contentHeight}px` },
				{ height: `${contentHeight}px` },
				{ height: "0px" }
			],animOptions);
		} else {
			button.ariaExpanded = "true";
			ctrld.ariaHidden = "false";
			ctrld.classList.add(expandedClass);
			this.animation = ctrld.animate([
				{ height: "0px" },
				{ height: `${contentHeight}px` }
			],animOptions);
		}
	}
	itemAction(e) {
		const { target } = e;
		const action = target?.getAttribute("data-action");
		const item = target?.getAttribute("data-item");

		if (action) {
			const targetExpanded = action === "expand" ? "false" : "true";
			const buttons = Array.from(this.el?.querySelectorAll(`[aria-expanded="${targetExpanded}"]`));
			const wasExpanded = action === "collapse";

			for (let button of buttons) {
				const buttonID = button.getAttribute("data-item");
				const ctrld = this.el?.querySelector(`#item${buttonID}-ctrld`);
				const contentHeight = ctrld.firstElementChild?.offsetHeight;

				this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
			}

		} else if (item) {
			const button = this.el?.querySelector(`[data-item="${item}"]`);
			const expanded = button?.getAttribute("aria-expanded");

			if (!expanded) return;

			const wasExpanded = expanded === "true";
			const ctrld = this.el?.querySelector(`#item${item}-ctrld`);
			const contentHeight = ctrld.firstElementChild?.offsetHeight;

			this.animateItemAction(button,ctrld,contentHeight,wasExpanded);
		}
	}
}