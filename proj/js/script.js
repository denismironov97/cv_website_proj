const bodyWidthPredetermined = 1015;

let isBigMenuRemoved = false; //! important flag/logical gate

const headerElsRefAssocArr = {
  navPrimary: document.querySelector(".nav-contacts-primary"),
  navSecondary: document.querySelector(".nav-contacts-secondary"),
  mobileNav: document.querySelector(".nav-mobile"),
};

const headerEl = document.querySelector(".main-header");

const optionBtns = {
  openBtn: headerElsRefAssocArr.mobileNav.querySelector(".open-btn"),
  closeBtn: headerElsRefAssocArr.mobileNav.querySelector(".close-btn"),
};

const mobileHeader = document.querySelector(".mobile-header");
const allAnchorTagEl = document.querySelectorAll('a[name="info-a"]:link');
const arrowBtns = document.querySelectorAll(".arrow");

arrowBtns.forEach((el) => el.addEventListener("click", toggleEducationInfo));

headerElsRefAssocArr.mobileNav.addEventListener("click", toggleMobileOptions);

allAnchorTagEl.forEach((linkElement) =>
  linkElement.addEventListener("click", smoothScrollTo)
);

window.addEventListener("resize", changeMenuBar);

initialScreenLoad();

//Initial render of page
function initialScreenLoad() {
  const bodyWidthPx = document.body.clientWidth;

  if (bodyWidthPx <= bodyWidthPredetermined) {
    isBigMenuRemoved = true;
    headerEl.removeChild(headerElsRefAssocArr.navPrimary);
    headerEl.removeChild(headerElsRefAssocArr.navSecondary);
    headerEl.appendChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = "center";
  } else {
    headerEl.appendChild(headerElsRefAssocArr.navPrimary);
    headerEl.appendChild(headerElsRefAssocArr.navSecondary);
    headerEl.removeChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = "space-between";
  }
}

//Resize and adapt the options menu layout based on client's width
function changeMenuBar() {
  const bodyWidthPx = document.body.clientWidth;

  if (bodyWidthPx <= bodyWidthPredetermined && !isBigMenuRemoved) {
    //Detaching elements
    isBigMenuRemoved = true;

    headerEl.removeChild(headerElsRefAssocArr.navPrimary);
    headerEl.removeChild(headerElsRefAssocArr.navSecondary);
    headerEl.appendChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = "center";
  } else if (bodyWidthPx > bodyWidthPredetermined && isBigMenuRemoved) {
    //Attaching elements
    isBigMenuRemoved = false;

    headerEl.appendChild(headerElsRefAssocArr.navPrimary);
    headerEl.appendChild(headerElsRefAssocArr.navSecondary);
    headerEl.removeChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = "space-between";
  }
}

//Options toggle for mobile options layout
function toggleMobileOptions() {
  optionBtns.openBtn.classList.toggle("toggle-display");
  optionBtns.closeBtn.classList.toggle("toggle-display");
  mobileHeader.classList.toggle("toggle-display");
}

//Education achievements box to be interactive
function toggleEducationInfo(ev) {
  const arrowBtn = ev.target.parentElement;
  const currEducationBox =
    ev.target.parentElement.parentElement.nextElementSibling; // always true

  //The next sibling is the up-button meaning the arrowBtn is the down-button
  if (arrowBtn.nextElementSibling) {
    arrowBtn.nextElementSibling.classList.toggle("toggle-display");
  } else {
    //is null meaning the arrowBtn is up-button itself

    arrowBtn.previousElementSibling.classList.toggle("toggle-display");
  }

  arrowBtn.classList.toggle("toggle-display");
  currEducationBox.classList.toggle("toggle-display");
}

/* Implementing smooth scrolling */
/* Selecting elements that only have the href property */

function smoothScrollTo(ev) {
  ev.preventDefault();

  const element = ev.target;
  const href = element.getAttribute("href");
  let pixelValue = 0;

  if (href !== "#" && href.startsWith("#")) {
    const element = document.querySelector(href);
    const headerOffset = 56; //56 pixels top from the section element
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    pixelValue = offsetPosition;
  }

  window.scrollTo({
    top: pixelValue,
    behavior: "smooth",
  });

  //Close mobile nav after choosing an option
  if (element.classList.contains("mobile-nav-link")) {
    toggleMobileOptions();
  }
}
