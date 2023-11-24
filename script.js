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
/* Page Navigation - using event delegation

  While this method works its not efficient as if we have
  over 1000 navlinks this will go through all of them, this
  will make the */

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
/* Event delegation will ensure 
  that instead of the event listener being attached to every navlink element which is memory inefficient and will affect performance */

//get the parent element instead of the navlinks, which if you look at the html will be nav__links
const navLinks = document.querySelector('.nav__links');
navLinks.addEventListener('click', e => {
  e.preventDefault();

  //Matching strategy - ignore clicks that basically dont happen in the navlinks
  //match the event listener to the parent element of the nav__link class we want
  if (e.target.classList.contains('nav__link')) {

    //assign the href of said navlink to value and queryselector it, then scroll into section
    const id = e.target.getAttribute('href');
    document.querySelector(id).scrollIntoView({behavior:'smooth'})
  }
});

//////////////////////////////////////////////////////////

const h1 = document.querySelector('h1')

// console.log(h1.querySelectorAll('.highlights'));
// console.log(h1.childNodes);
// console.log(h1.children);


// console.log(h1.parentNode);
// console.log(h1.parentElement);

//an example of getting the header and manipulating its style
// h1.closest('.header').style.background = 'var(--gradient-primary)';

h1.parentElement.children
console.log([...h1.parentElement.children]);


//this is how we dom traverse :) 
[...h1.parentElement.children].forEach(el => {
  if(el != h1)
  el.style.background = 'pink'
})


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
const tabs = document.querySelectorAll('.operations__tab')

//get the container
const tabsContainer = document.querySelector('.operations__tab-container');

//get all 3 contents
const tabsContent = document.querySelectorAll('.operations__content');


//use event delegation on the tabs parent element which is the container.
tabsContainer.addEventListener('click', (e) => {
e.preventDefault();

//to make sure we are not clicking just the span or the button which have different parent elements, we look for the closest container parent element that we are using
const buttonClicked = e.target.closest('.operations__tab')

console.log(buttonClicked);

//if we click the button - ternary operator
const ifButtonClicked = () =>{

  //guard clause - google what that is
    if(!buttonClicked) return ;


  //if button is clicked 
  tabs.forEach(tab =>{
    //remove active from all tabs
    tab.classList.remove('operations__tab--active')
    //tab that was clicked? add active css
    buttonClicked.classList.add('operations__tab--active')

    //we did it like this because we want only one active tab at a time
  })
}
ifButtonClicked();




})

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
