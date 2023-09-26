const headerElsRefAssocArr = {
  navPrimary: document.querySelector(".nav-contacts-primary"),
  navSecondary: document.querySelector(".nav-contacts-secondary"),
  mobileNav: document.querySelector(".nav-mobile"),
};
let isBigMenuRemoved = false; //!

const headerEl = document.querySelector(".main-header");

const optionBtns = {
  openBtn: headerElsRefAssocArr.mobileNav.querySelector(".open-btn"),
  closeBtn: headerElsRefAssocArr.mobileNav.querySelector(".close-btn"),
};

const mobileHeader = document.querySelector(".mobile-header");
console.log(mobileHeader);

headerElsRefAssocArr.mobileNav.addEventListener("click", toggleMobileOptions);
window.addEventListener("resize", changeMenuBar);

initialScreenLoad();

function initialScreenLoad() {
  const bodyWidthPx = document.body.clientWidth;

  if (bodyWidthPx <= 1008) {
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

function changeMenuBar() {
  const bodyWidthPx = document.body.clientWidth;

  if (bodyWidthPx <= 1008 && !isBigMenuRemoved) {
    //Detaching elements
    isBigMenuRemoved = true;

    headerEl.removeChild(headerElsRefAssocArr.navPrimary);
    headerEl.removeChild(headerElsRefAssocArr.navSecondary);
    headerEl.appendChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = "center";
  } else if (bodyWidthPx > 1008 && isBigMenuRemoved) {
    //Attaching elements
    isBigMenuRemoved = false;

    headerEl.appendChild(headerElsRefAssocArr.navPrimary);
    headerEl.appendChild(headerElsRefAssocArr.navSecondary);
    headerEl.removeChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = "space-between";
  }
}

function toggleMobileOptions() {
  optionBtns.openBtn.classList.toggle("toggle-display");
  optionBtns.closeBtn.classList.toggle("toggle-display");
  mobileHeader.classList.toggle("toggle-display");
}
