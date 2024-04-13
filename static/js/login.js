if (localStorage.getItem('targetedLanguage') != 'en') {

  let originalEnglishText = [];
  let translatedText = [];

  // Function to collect text from elements with data-translate attribute during initial page load
  function collectInitialText() {
      originalEnglishText = [];
      document.querySelectorAll('[data-translate]').forEach(element => {
          originalEnglishText.push(element.textContent);
      });
  }
  collectInitialText();
  
  function translateAllElements() {
    const selectedLanguage = localStorage.getItem('targetedLanguage');
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
  translateAllElements();
}
document.getElementById("login-button").addEventListener("click", (e) => {
    const username = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    fetch("/login-data", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        username,
        password,
      }),
    }).then((response) => {
        if (response.status === 200) {
          window.location.href = "/dashboard";
        } else {
          alert("Invalid Credentials");
        }
      }
    )
        .catch((error) => {
        console.error("Error:", error);
      });
});

var popupLink = document.getElementById("popup-link");
var popupWindow = document.getElementById("popup-window");
var closeButton = document.getElementById("close-button");
popupLink.addEventListener("click", function(event) {
  event.preventDefault();
  popupWindow.style.display = "block";
});
closeButton.addEventListener("click", function() {
  popupWindow.style.display = "none";
});