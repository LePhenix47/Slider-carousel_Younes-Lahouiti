const leftButton = document.querySelector(".main__buttons-button-left");
const rightButton = document.querySelector(".main__buttons-button-right");

const slidesNodeList = document.getElementsByClassName("main__card"); //NodeList → Array-like but not exactly an array
const slides = Array.from(slidesNodeList);

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
  this.classList.contains("main__buttons-button-right")
    ? (sliderData.direction = 1)
    : (sliderData.direction = -1);

  //This is the current slide that the user is watching
  sliderData.slideOutIndex = slides.findIndex((slide) => {
    return !slide.classList.contains("hide");
  });

  //Here we'll manage the next or previous slide

  let userClicksNextOnLastSlide =
    sliderData.slideOutIndex + sliderData.direction > slides.length
      ? true
      : false;
  let userClicksPreviousOnFirstSlide =
    sliderData.slideOutIndex + sliderData.direction < 0 ? true : false;

  if (userClicksNextOnLastSlide) {
    sliderData.slideInIndex = 0;
  } else if (userClicksPreviousOnFirstSlide) {
    sliderData.slideInIndex = slides.length - 1;
  } else {
    sliderData.slideInIndex = sliderData.slideOutIndex + sliderData.direction;
  }

  console.group("Slider data");
  console.log(sliderData);
  console.groupEnd("Slider data");
}

console.log(slides);
