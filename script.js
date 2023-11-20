'use strict';

///////////////////////////////////////
// Modal window

const modal = document.querySelector('.modal');
const overlay = document.querySelector('.overlay');
const btnCloseModal = document.querySelector('.btn--close-modal');
const btnsOpenModal = document.querySelectorAll('.btn--show-modal');

const openModal =  (e) => {
  e.preventDefault(); 
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal =  (e) => {
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

const message = document.createElement('div')

//lets programmatically build it to display a cookie message, first lets add our prepared cookie message css to it

message.classList.add('.cookie-message');
// message.textContent = 'We use cookies for improved functionality and content'
message.innerHTML = 'We use cookies for improved functionality and content. <button class="btn btn--close-cookie"> Got it! </button>'
const header = document.querySelector('header')
header.append(message)
//can also use before or after methods but we will stick to append for now
// header.before(message)


// Now we want to delete the element
//after we created the cookie message we want the button to delete it. so we first make action listener then do delete element??

document.querySelector('.btn--close-cookie').addEventListener('click',() =>{

  //remove method is recent
  message.remove()
  //Back then we had to do the method style below
  // header.removeChild(message)
})
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