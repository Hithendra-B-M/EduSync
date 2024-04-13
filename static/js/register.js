
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

document.getElementById('register-button').addEventListener('click', (e) => {
  e.preventDefault();
  const collegeName = document.getElementById('college-name').value;
  const instituteType = document.getElementById('institute-type').value;
  const state = document.getElementById('state').value;
  const email = document.getElementById('email').value;
  const contactNumber = document.getElementById('contact-number').value;
  const collegeAddress = document.getElementById('college-address').value;
  const postalCode = document.getElementById('postal-code').value;
  const password = '123456789';
  const checkbox = document.getElementById('check-box').checked;
  if (checkbox == false && (collegeName == '' || instituteType == '' || state == '' || email == '' || contactNumber == '' || collegeAddress == '' || postalCode == '' || password == '')){
    alert("Please agree to the Terms and Conditions");
    window.location.reload();
  }
  else{
    fetch('/register-data', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        collegeName,
        instituteType,
        state,
        email,
        contactNumber,
        collegeAddress,
        postalCode,
        password,
        checkbox,
      }),
    })
    .then(response => {
      if (response.status === 200) {
        alert("Registration Successful");
        window.location.href = "/";
      } else {
        alert("Invalid Credentials");
      }
    })
    .catch(error => {
      console.error('Error:', error);
    });
  }
});