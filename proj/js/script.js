const bodyWidthPredetermined = 770;

let isBigMenuRemoved = false; //! important flag/logical gate

const headerElsRefAssocArr = {
  navPrimary: document.querySelector('.nav-contacts-primary'),
  navSecondary: document.querySelector('.nav-contacts-secondary'),
  mobileNav: document.querySelector('.nav-mobile'),
};

const headerEl = document.querySelector('.main-header');

const optionBtns = {
  openBtn: headerElsRefAssocArr.mobileNav.querySelector('.open-btn'),
  closeBtn: headerElsRefAssocArr.mobileNav.querySelector('.close-btn'),
};

const mobileHeader = document.querySelector('.mobile-header');

const allAnchorTagEl = document.querySelectorAll('a[name="info-a"]:link');

const cvAnchorEl = document.querySelector(
  '.personal-projects-list .project-item-box .project-link'
);

const arrowBtns = document.querySelectorAll('.arrow');

arrowBtns.forEach((el) => el.addEventListener('click', toggleEducationInfo));

headerElsRefAssocArr.mobileNav.addEventListener('click', toggleMobileOptions);

allAnchorTagEl.forEach((linkElement) =>
  linkElement.addEventListener('click', smoothScrollTo)
);

cvAnchorEl.addEventListener('click', smoothScrollTo);

window.addEventListener('resize', changeMenuBar);

initialScreenLoad();

//Initial render of page
function initialScreenLoad() {
  const bodyWidthPx = document.body.clientWidth;

  if (bodyWidthPx <= bodyWidthPredetermined) {
    isBigMenuRemoved = true;
    headerEl.removeChild(headerElsRefAssocArr.navPrimary);
    headerEl.removeChild(headerElsRefAssocArr.navSecondary);
    headerEl.appendChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = 'center';
  } else {
    headerEl.appendChild(headerElsRefAssocArr.navPrimary);
    headerEl.appendChild(headerElsRefAssocArr.navSecondary);
    headerEl.removeChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = 'space-between';
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

    headerEl.style.justifyContent = 'center';
  } else if (bodyWidthPx > bodyWidthPredetermined && isBigMenuRemoved) {
    //Attaching elements
    isBigMenuRemoved = false;

    headerEl.appendChild(headerElsRefAssocArr.navPrimary);
    headerEl.appendChild(headerElsRefAssocArr.navSecondary);
    headerEl.removeChild(headerElsRefAssocArr.mobileNav);

    headerEl.style.justifyContent = 'space-between';
  }
}

//Options toggle for mobile options layout
function toggleMobileOptions() {
  optionBtns.openBtn.classList.toggle('toggle-display');
  optionBtns.closeBtn.classList.toggle('toggle-display');
  mobileHeader.classList.toggle('toggle-display');
}

//Education achievements box to be interactive
function toggleEducationInfo(ev) {
  const targetEl = ev.target.parentElement;
  const spanEl = targetEl.parentElement.querySelector('.more-info');
  const currEducationBox =
    ev.target.parentElement.parentElement.nextElementSibling; // always true

  targetEl.parentElement
    .querySelector('.btn-down')
    .classList.toggle('toggle-display');

  targetEl.parentElement
    .querySelector('.btn-up')
    .classList.toggle('toggle-display');

  currEducationBox.classList.toggle('toggle-display');

  if (spanEl.textContent === 'More Info') {
    spanEl.textContent = 'Hide Info';
  } else {
    spanEl.textContent = 'More Info';
  }
}

/* Implementing smooth scrolling */
/* Selecting elements that only have the href property */
function smoothScrollTo(ev) {
  ev.preventDefault();

  const element = ev.target;
  const href = element.getAttribute('href');
  let pixelValue = 0;

  if (href !== '#homePage' && href.startsWith('#')) {
    const element = document.querySelector(href);
    const headerOffset = 56; //56 pixels top from the section element
    const elementPosition = element.getBoundingClientRect().top;
    const offsetPosition = elementPosition + window.scrollY - headerOffset;

    pixelValue = offsetPosition;
  }

  if (href === '#homePage') {
    pixelValue = 0;
  }

  window.scrollTo({
    top: pixelValue,
    behavior: 'smooth',
  });

  //Close mobile nav after choosing an option
  if (element.classList.contains('mobile-nav-link')) {
    toggleMobileOptions();
  }
}
