'use strict';

// Utility function to toggle element classes
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); };

// Sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// Sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () { elementToggleFunc(sidebar); });

// Custom select variables - For "Projects" page
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-select-value]");
const navBtns = document.querySelectorAll("[data-nav-btn]");
const contentItems = document.querySelectorAll('[data-content]');

// Function to show content based on category
function showContent(category) {
  contentItems.forEach(item => {
    if (item.getAttribute('data-content') === category) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
}

// Event listener for select box
select.addEventListener("click", function () { elementToggleFunc(this); });

selectItems.forEach(item => {
  item.addEventListener('click', () => {
    selectValue.textContent = item.textContent;
    const category = item.getAttribute('data-select-item');
    showContent(category);
    elementToggleFunc(select);
  });
});

// Add event listener to nav buttons
navBtns.forEach(button => {
  button.addEventListener('click', () => {
    navBtns.forEach(btn => btn.classList.remove('active'));
    button.classList.add('active');
    const category = button.getAttribute('data-nav-btn');
    showContent(category);
  });
});

// Add event in all filter button items for large screen
let lastClickedBtn = navBtns[0];

for (let i = 0; i < navBtns.length; i++) {
  navBtns[i].addEventListener("click", function () {
    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    //filterFunc(selectedValue);
    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;
  });
}

// Page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// Add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {
    console.log('Button clicked');

    for (let j = 0; j < pages.length; j++) {
      if (this.innerHTML.toLowerCase() === pages[j].dataset.page) {
        pages[j].classList.add("active");
        navigationLinks[j].classList.add("active");
        window.scrollTo(0, 0);

        // Initialize content for "Research" page
        if (pages[j].dataset.page === 'research') {
          const defaultCategory = 'general';
          showContent(defaultCategory);
          selectValue.textContent = document.querySelector(`[data-select-item="${defaultCategory}"]`).textContent;
        }
      } else {
        pages[j].classList.remove("active");
        navigationLinks[j].classList.remove("active");
      }
    }
  });
}
