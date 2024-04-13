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

const allSideMenu = document.querySelectorAll("#sidebar .side-menu.top li a");

allSideMenu.forEach((item) => {
  const li = item.parentElement;

  item.addEventListener("click", function () {
    allSideMenu.forEach((i) => {
      i.parentElement.classList.remove("active");
    });
    li.classList.add("active");
  });
});

// TOGGLE SIDEBAR
const menuBar = document.querySelector("#content nav .bx.bx-menu");
const sidebar = document.getElementById("sidebar");

menuBar.addEventListener("click", function () {
  sidebar.classList.toggle("hide");
});

const searchButton = document.querySelector(
  "#content nav form .form-input button"
);
const searchButtonIcon = document.querySelector(
  "#content nav form .form-input button .bx"
);
const searchForm = document.querySelector("#content nav form");

searchButton.addEventListener("click", function (e) {
  if (window.innerWidth < 576) {
    e.preventDefault();
    searchForm.classList.toggle("show");
    if (searchForm.classList.contains("show")) {
      searchButtonIcon.classList.replace("bx-search", "bx-x");
    } else {
      searchButtonIcon.classList.replace("bx-x", "bx-search");
    }
  }
});

if (window.innerWidth < 768) {
  sidebar.classList.add("hide");
} else if (window.innerWidth > 576) {
  searchButtonIcon.classList.replace("bx-x", "bx-search");
  searchForm.classList.remove("show");
}

window.addEventListener("resize", function () {
  if (this.innerWidth > 576) {
    searchButtonIcon.classList.replace("bx-x", "bx-search");
    searchForm.classList.remove("show");
  }
});

const switchMode = document.getElementById("switch-mode");

switchMode.addEventListener("change", function () {
  if (this.checked) {
    document.body.classList.add("dark");
  } else {
    document.body.classList.remove("dark");
  }
});

function toggleSearch() {
  var searchForm = document.getElementById("searchForm");
  searchForm.classList.toggle("expanded");
}

function addTodo() {
  var todoList = document.querySelector(".todo-list");
  var newTodo = document.createElement("li");
  newTodo.innerHTML =
    '<p>New Todo</p><i class="bx bx-dots-vertical-rounded" onclick="showContextMenu(this)"></i>';
  todoList.appendChild(newTodo);
}

function showContextMenu(icon) {
  var contextMenu = document.getElementById("contextMenu");
  contextMenu.style.display = "block";
  contextMenu.style.left = icon.offsetLeft + icon.offsetWidth + "px";
  contextMenu.style.top = icon.offsetTop + "px";

  document.addEventListener("click", function hideContextMenu() {
    contextMenu.style.display = "none";
    document.removeEventListener("click", hideContextMenu);
  });
}

function editTodo() {
  alert("Edit todo");
}

function deleteTodo() {
  var contextMenu = document.getElementById("contextMenu");
  var listItem = contextMenu.previousElementSibling;
  listItem.parentNode.removeChild(listItem);
}
