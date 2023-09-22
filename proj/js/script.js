const headerElsRefAssocArr = {
  navPrimary: document.querySelector(".nav-contacts-primary"),
  navSecondary: document.querySelector(".nav-contacts-secondary"),
};
const headerEl = document.querySelector(".main-header");
let isMenuRemoved = false; //!

window.addEventListener("resize", changeMenuBar);

function changeMenuBar(event) {
  let bodyWidthPx = document.body.clientWidth;

  if (bodyWidthPx <= 1008 && !isMenuRemoved) {
    isMenuRemoved = true;

    headerEl.removeChild(headerElsRefAssocArr.navPrimary);
    headerEl.removeChild(headerElsRefAssocArr.navSecondary);
  } else if (bodyWidthPx > 1008 && isMenuRemoved) {
    isMenuRemoved = false;
    headerEl.appendChild(headerElsRefAssocArr.navPrimary);
    headerEl.appendChild(headerElsRefAssocArr.navSecondary);
  }
}
