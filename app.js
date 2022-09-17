const leftButton = document.querySelector(".main__buttons-button-left");
const rightButton = document.querySelector(".main__buttons-button-right");

const slidesNodeList = document.getElementsByClassName("main__card"); //NodeList → Array-like but not exactly an array
const slides = Array.from(slidesNodeList);

//This object will handle all the important properties of our slider-carousel
const sliderData = {
  direction: 0,
  slideOutIndex: 0,
  slideInIndex: 0,
};

const indexElements = document.getElementsByClassName("main__card-index"); //HTMLCollection → Array

leftButton.addEventListener("click", changeSlider);
rightButton.addEventListener("click", changeSlider);

function changeSlider(e) {
  /*
  If the user clicks on the left button → direction = -1 
  Else the direction = 1
*/
  e.target.disabled = true;

  this.classList.contains("main__buttons-button-right")
    ? (sliderData.direction = 1)
    : (sliderData.direction = -1);

  //This is the current slide that the user is watching
  sliderData.slideOutIndex = slides.findIndex((slide) => {
    return !slide.classList.contains("hide");
  });

  //Here we'll manage the next or previous slide

  let userClicksNextOnLastSlide =
    sliderData.slideOutIndex + sliderData.direction > slides.length - 1;
  let userClicksPreviousOnFirstSlide =
    sliderData.slideOutIndex + sliderData.direction < 0;

  if (userClicksNextOnLastSlide) {
    sliderData.slideInIndex = 0;
  } else if (userClicksPreviousOnFirstSlide) {
    sliderData.slideInIndex = slides.length - 1;
  } else {
    //Just pass to the previous/next slide
    sliderData.slideInIndex = sliderData.slideOutIndex + sliderData.direction;
  }

  console.group("Slider data");
  console.log(sliderData);
  console.groupEnd("Slider data");

  const { direction, slideOutIndex, slideInIndex } = sliderData;

  indexElements[slideOutIndex].classList?.remove("index-active");
  console.group("SlideOut info: ");
  slideOut(slides[slideOutIndex], direction);
  console.groupEnd("SlideOut info: ");

  indexElements[slideInIndex].classList.add("index-active");
  console.group("SlideIn info: ");
  console.log(slideInIndex === 2 ? "Last slide" : "");
  slideIn(slides[slideInIndex], direction);
  console.groupEnd("SlideIn info: ");

  setTimeout(() => {
    e.target.disabled = false;
  }, 750);
}

function slideOut(slide, direction) {
  let leftOrRight = direction === -1 ? "right" : "left";

  let slideOutAnimationClassName = `slide-out-${leftOrRight}`;
  slide.classList.add(slideOutAnimationClassName);

  setTimeout(() => {
    slide.classList.add("hide");
    slide.classList.remove(slideOutAnimationClassName);
  }, 750);
}

function slideIn(slide, direction) {
  let leftOrRight = direction === -1 ? "left" : "right";
  console.log("index = ", slides.indexOf(slide));

  let slideInAnimationClassName = `slide-in-${leftOrRight}`;
  setTimeout(() => {
    slide.classList.remove("hide");
  }, 750);

  slide.classList.add(slideInAnimationClassName);

  slide.addEventListener("animationend", () => {
    slide.classList.remove(slideInAnimationClassName);
  });
}

console.log(slides);
