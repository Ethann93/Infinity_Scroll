'use strict';

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

// UNSPLASH API
let count = 5;
const apiKey = 'RKRS7U7Z54Q-MPzWKwKDfYPVoakHw0MPdUEl9J0VuAY';
let apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

//CHECK IF ALL IMAGES WERE LOADED
function imageLoaded() {
  imagesLoaded++;
  console.log(imagesLoaded);
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;

    count = 30;
    // console.log('ready =', ready);
  }
}

// HELPER FUNCTION TO SET ATTRIBUTES ON DOM ELEMENTS
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

// CREATE ELEMENTS FOR LINKS AND PHOTOS, ADD TO DOM
function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;
  //   console.log(`total images`, totalImages);
  //RUN FUNCTION FOR EACH OBJECT IN PHOTOSARRAY
  photosArray.forEach(photo => {
    //CREATE <a> TO LINK TO UNSPLASH
    const item = document.createElement(`a`);
    // item.setAttribute(`href`, photo.links.html);
    // item.setAttribute('target', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: `_blank`,
    });
    //CREATE <img> PER PHOTO
    const img = document.createElement(`img`);
    // img.setAttribute('src', photo.urls.regular);
    // img.setAttribute('alt', photo.alt_description);
    // img.setAttribute('title', photo.alt_description);
    setAttributes(img, {
      src: photo.urls.regular,
      alt: photo.alt_description,
      title: photo.alt_description,
    });
    //EVENT LISTENER, CHECK WHEN EACH IS FINISHED LOADING
    img.addEventListener(`load`, imageLoaded);
    //PUT <img> INSIDE <a>, THEN PUT BOTH INSIDE IMAGECONTAINER ELEMENT
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// CHECK TO SEE IF SCROLLING NEAR BOTTOM OF PAGE, LOAD MORE PHOTOS
window.addEventListener(`scroll`, () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
  //   console.log(`scrolled`);
});

//GET PHOTOS FROM UNSPLASH API
async function getPhotos() {
  try {
    const response = await fetch(apiUrl);
    photosArray = await response.json();
    displayPhotos();
    // console.log(photosArray);
    // const data = await response.json();
    // console.log(data);
  } catch (error) {
    // CATCH ERROR HERE
  }
}

// ON LOAD
getPhotos();
