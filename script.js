'use strict';

///////////////////////////////////////

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

///////////////////////////////////////

const learnMoreButton = document.querySelector('.btn--scroll-to');
const section1 = document.querySelector('#section--1');

///////////////////////////////////////

const tabs = document.querySelectorAll('.operations__tab');

//get the container
const tabsContainer = document.querySelector('.operations__tab-container');

//get all 3 contents
const tabsContent = document.querySelectorAll('.operations__content');

///////////////////////////////////////

const nav = document.querySelector('.nav');

///////////////////////////////////////
// Modal window

const openModal = e => {
  e.preventDefault();
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = e => {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

//switch the for-loop into a for-each loop instead for cleaner code

btnsOpenModal.forEach(btn => btn.addEventListener('click', openModal));

btnCloseModal.addEventListener('click', closeModal);

overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (e) {
  if (e.key === 'Escape' && !modal.classList.contains('hidden')) {
    closeModal();
  }
});

//////////////////////////////////////////////////////////

/* 

  Page Navigation - using event delegation

  While this method works its not efficient as if we have
  over 1000 navlinks this will go through all of them, this
  will make the 
  
  */

// const navLink = document.querySelectorAll('.nav__links')

// navLink.forEach(navlink => navlink.addEventListener('click',(e) => {
// // Prevent default html anchor tags/hrefs from activating.
//   e.preventDefault();

//   const id = navlink.getAttribute('href')
//   //checking if we get the correct href value from the html navlinks
//   console.log(id);

//   //proceed to get said href of id and scroll to the section in the html
//   document.querySelector(id).scrollIntoView({behavior:'smooth'})
// }))

//////////////////////////////////////////////////////////
/* 

  Event delegation will ensure 
  that instead of the event listener being attached to every navlink element which is memory inefficient and will affect performance 

*/

//get the parent element instead of the navlinks, which if you look at the html will be nav__links

const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', e => {
  e.preventDefault();

  /*
  
    Matching strategy - ignore clicks that basically dont happen in the navlinks
    match the event listener to the parent element of the nav__link class we want

  */

  if (e.target.classList.contains('nav__link')) {
    //assign the href of said navlink to value and queryselector it, then scroll into section
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({ behavior: 'smooth' });
  }
});

//////////////////////////////////////////////////////////

const h1 = document.querySelector('h1');

/*

 console.log(h1.querySelectorAll('.highlights'));
 console.log(h1.childNodes);
 console.log(h1.children);


 console.log(h1.parentNode);
 console.log(h1.parentElement);

 an example of getting the header and manipulating its style
 h1.closest('.header').style.background = 'var(--gradient-primary)';

*/
// h1.parentElement.children
// console.log([...h1.parentElement.children]);

//this is how we dom traverse :)
// [...h1.parentElement.children].forEach(el => {
//   if(el != h1)
//   el.style.background = 'pink'
// })

//////////////////////////////////////////////////////////
//Implementing Smooth Scrolling for the learnMore Button

//Old Stlye of Doing it

// const btnScrollTo = document.querySelector('.btn--scroll-to')
// const section1 = document.querySelector('#section--1')

// learnMoreButton.addEventListener('click',(e)=>{

//   /*

//   //we will use the getBoundingClientRect to get the rectangular position of the section we want relative to the page and will then scroll to that upon clicking.

//   const s1Coordinates = section1.getBoundingClientRect();
//   console.log(e.target.getBoundingClientRect())
//    console.log("Getting the current scroll of the page's offset X/Y values");
//    console.log(`X offset: ${window.pageXOffset}, y offset: ${window.pageYOffset}`);

//   console.log(`Height and width of the page
//    Height: ${document.documentElement.clientHeight}
//    Width: ${document.documentElement.clientWidth}
//    `);

//   */
//     //scroll to position of section smoothly, getting its left and top coordinates from the top of the page

//   /*
//     //old style
//     // window.scrollTo({

//     //   left: s1Coordinates.left + window.scrollX,
//     //   top: s1Coordinates.top + window.scrollY,
//     //   behaviour: 'smooth'

//     // });

//     //new style for smooth scrolling to section
//   */

//   section1.scrollIntoView({behavior:"smooth"});

//   });

//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
//Tabbed component

//get all tabs

//use event delegation on the tabs parent element which is the container.
tabsContainer.addEventListener('click', e => {
  e.preventDefault();

  //to make sure we are not clicking just the span or the button which have different parent elements, we look for the closest container parent element that we are using
  const buttonClicked = e.target.closest('.operations__tab');

  // console.log(buttonClicked);

  //if we click the button - ternary operator
  const ifButtonClicked = () => {
    //guard clause - google what that is
    if (!buttonClicked) return;

    //if button is clicked
    tabs.forEach(tab => {
      //remove active from all tabs
      tab.classList.remove('operations__tab--active');

      //remove content of tab that is not active
      tabsContent.forEach(content =>
        content.classList.remove('operations__content--active')
      );

      //tab that was clicked? add active css
      buttonClicked.classList.add('operations__tab--active');

      //we did it like this because we want only one active tab at a time
      //now we want to active the content area associated with the tab selected
      document
        .querySelector(`.operations__content--${buttonClicked.dataset.tab}`)
        .classList.add(`operations__content--active`);
    });
  };
  ifButtonClicked();
});
//////////////////////////////////////////////////////////////////////////
/**
 * Creating the Menu fade animation:
 * will be using event delegation so we use the parent element of menu and logo which is the nav itself
 */

//making a method to handle opacity

const handleOpacity = function (e) {
  //I tried to use shorthand method but since we dont have anything to point to as this currently we use old style function instead of shorthand
  if (e.target.classList.contains('nav__link')) {
    const link = e.target;

    const siblings = link.closest('.nav').querySelectorAll('.nav__link');

    const logo = link.closest('.nav').querySelector('img');

    siblings.forEach(el => {
      if (el != link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

//passing argument into the handle opacity so we can use the 'this' function above
nav.addEventListener('mouseover', handleOpacity.bind(0.5));

nav.addEventListener('mouseout', handleOpacity.bind(1));

//////////////////////////////////////////////////////////////////////////
/** Applying sticky to navbar
 *
 * we can do scrollevent (compare Y of getboundclientrect vs section y offset)
 *
 * or even better. . . we use intersection observer API
 *
 */

// const observerCallback = function (entries, observer) {
// /**
//  * entries - array of threshold entries
//  */

// entries.forEach(entry => {
//   console.log(entry);
// })
// }

// const observerOptions = {
//   /**  root: the element target element is intersecting. with root being null we observe our target
//    *  intersecting the entire viewport
//     */
//   root: null,
//   threshold : 0.1
// }

// const observer = new IntersectionObserver(observerCallback,observerOptions)
// observer.observe(section1)

const header = document.querySelector('.header');

const navHeight = nav.getBoundingClientRect().height;

const stickyNav = function (entries) {
  const [entry] = entries;
  // console.log(entry);

  if (!entry.isIntersecting) nav.classList.add('sticky');
  else nav.classList.remove('sticky');
};
const headObserver = new IntersectionObserver(stickyNav, {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
});

headObserver.observe(header);

//////////////////////////////////////////////////////////
/** Applying intersection observer to section
 *
 * we can do scrollevent (compare Y of getboundclientrect vs section y offset)
 *
 *
 */

const sectionWork = function(){


const allSections = document.querySelectorAll('.section');

const revealSection = (entries, observer) => {
  const [entry] = entries;
  // console.log(entry);
  if (!entry.isIntersecting) return;

  entry.target.classList.remove('section--hidden');
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.15,
});

allSections.forEach(function (sect) {
  sectionObserver.observe(sect);
  sect.classList.add('section--hidden')
});
};

sectionWork();

//////////////////////////////////////////////////////////
//Lazy Loading Images for performance (for people will low specs)

const imgTarget = document.querySelectorAll('img[data-src]');
// console.log(imgTarget);

const loadImg = function (entries, observer) {
  const [entry] = entries;

  // console.log(entry);

  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;

  //we will only remove blur filter when the page and images have finished loading

  entry.target.addEventListener('load', () => {
    entry.target.classList.remove('lazy-img');
  });

  //to prevent memory leak since we dont need to observe no more
  observer.unobserve(entry.target);
};

const imgObserver = new IntersectionObserver(loadImg, {
  root: null,
  threshold: 0,
  rootMargin: '200px',
});

imgTarget.forEach(img => imgObserver.observe(img));

////////////////////////////////////////////////////////

//setting slider with all functionality associated with slide
const slider = function(){


const slides = document.querySelectorAll('.slide');
const sliderBtnLeft = document.querySelector('.slider__btn--left');
const sliderBtnRight = document.querySelector('.slider__btn--right');
let currSlide = 0;
const maxSlides = slides.length;
const dotsContainer = document.querySelector('.dots');



const createDots = function () {
  slides.forEach((_, i) => {
    dotsContainer.insertAdjacentHTML(
      'beforeend',
      `<button class="dots__dot" data-slide="${i}"></button>`
    );
  });
};


const setActiveDot = function (slide){
 const dots = document.querySelectorAll('.dots__dot')
 dots.forEach(dot => dot.classList.remove('dots__dot--active'))
  
 document.querySelector(`.dots__dot[data-slide="${slide}"]`)
 .classList.add('dots__dot--active')
}

const goToSlide = function (slide) {
  slides.forEach((s, i) => {
    s.style.transform = `translateX(${100 * (i - slide)}%)`;
    //slide 1 - 2 - 3 - 4
    //      0% - 100% - 200% - 300%
  });
};

//setting up initialiser
const init = () =>{
  //upon page loading start at slide 0;
  goToSlide(0);
  createDots();
  setActiveDot(0)
  
  }
  init();

//previous slide function put into a method name for clean code

const prevSlide = function () {
  if (currSlide === 0) {
    currSlide = maxSlides - 1;
  } else {
    currSlide--;
  }
  goToSlide(currSlide);
  setActiveDot(currSlide)
};

//next slide function put into a method name for clean code
const nextSlide = function () {
  if (currSlide === maxSlides - 1) {
    currSlide = 0;
  } else {
    currSlide++;
  }
  goToSlide(currSlide);
  setActiveDot(currSlide);
};

//call next and prev slide function like this for clean code format
sliderBtnLeft.addEventListener('click', prevSlide);
sliderBtnRight.addEventListener('click', nextSlide);

//also add the keyboard event listener
document.addEventListener('keydown', e => {
  if (e.key === 'ArrowLeft') prevSlide();
  e.key === 'ArrowRight' && nextSlide();
});


//adding another event handler to parent element of the dots, which is the dot container
const dotClicked = function(e) {
  
  //if target clicked contains dots__dot class
  if (e.target.classList.contains('dots__dot')){
    
    //destructure target to get the slide
    const { slide } = e.target.dataset;
  goToSlide(slide);
  setActiveDot(slide);

}}

dotsContainer.addEventListener('click', dotClicked)

};

slider();
//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
/* Selecting elements */
// document.querySelectorAll
// document.querySelector

//These two return collections - a collection basically unlike the nodeList presented by queryselector changes with updates created to contents of collection, aka if we delete a button from getelementsbyclass then the collection will have lost that button
// document.getElementById()
// const allBtns = document.getElementsByTagName('btn')
// console.log(allBtns);
// document.getElementsByClassName

/*Creating and Inserting Elements*/
//.insertAdjcentHTML

//we have used insertAdjacentHTML to append movements in our bankist app, since movements are an array of movements, but we will create an element from scratch below

// const message = document.createElement('div')

// //lets programmatically build it to display a cookie message, first lets add our prepared cookie message css to it

// message.classList.add('.cookie-message');
// // message.textContent = 'We use cookies for improved functionality and content'
// message.innerHTML = 'We use cookies for improved functionality and content. <button class="btn btn--close-cookie"> Got it! </button>'
// const header = document.querySelector('header')
// header.append(message)
//can also use before or after methods but we will stick to append for now
// header.before(message)

// Now we want to delete the element
//after we created the cookie message we want the button to delete it. so we first make action listener then do delete element??

// document.querySelector('.btn--close-cookie').addEventListener('click',() =>{

//   //remove method is recent
//   // message.remove()
//   //Back then we had to do the method style below
//   // header.removeChild(message)
// })

// message.style.backgroundColor =  '#37383d'
// message.style.color =  'wheat'
// message.style.width =  '100vw'
// message.style.textAlign = 'center'

//manipulating the documentElement, changing all colors that used primary color from css into another color
// document.documentElement.style.setProperty('--color-primary','pink')

//////////////////////////////////////////////////////////
//Lets change attributes

// const logo = document.querySelector('.nav__logo')
// console.log(logo);

/**
 * How to set a style on an element
 *
 * example below
 * element.style.backgroundColor =  '#37383d'
 */

/** when you want to add a class dont do: element.className = 'logo'
 * because doing what I just did in line 115 will override existing classes
 *
 * so instead we do
 * element.classList.add('logo')
 * ^this is bettter
 *
 * other methods include:
 * classList.remove()
 * classList.toggle()
 * classList.contains()
 *
 */

//////////////////////////////////////////////////////////

//////////////////////////////////////////////////////////
/**
 * Notes on How DOM works behind the scenes/interally:
 *
 * Dom is the interface between our JS code and the HTML documents the browser renders
 * DOM allows our JS code to interact with the website and manipulate it
 * this can happen via changing html elements/set styles/classes/attributes/responses to events
 *
 * DOM tree is generated from the HTML page and using JS we interact with it
 * DOM is a complex API that also contains a lot of methods and properties we can interact with
 *
 * Since DOM tree is a tree, we kind of interact with NODES (Refer to data structures and algorithms to understand how NODES work and how that relates to trees)
 *
 * So DOM - Every single node in the DOM tree is of type NODE
 * These Node's are represented in JS as an Object, the object gets access to special NODE methods and properties such as textContent, childNodes, ParentNodes etc
 *
 * NODE has couple of child types such as Element/Text/Comment/Document
 * text childnode has stuff like <p> text that is found in paragraph is considered text childnode </p>
 * comment childnode has well . . .  html <!-- --> comments...
 * element node is the <p></p> of paragraphs in html
 */
//////////////////////////////////////////////////////////
