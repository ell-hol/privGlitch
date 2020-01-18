let inputFiles = document.getElementById("fileInput");
let imgElement = document.getElementById("image");
let thumbnail = document.getElementById("thumbnail");

let imgURLs = [];

inputFiles.addEventListener("change", async function() {
  console.log(inputFiles.files);
  for (let i = 0; i < inputFiles.files.length; i++) {
    let urlReader = new FileReader();
    urlReader.onloadstart = async function() {
      console.log("started loading");
    };

    urlReader.onloadend = async function() {
      console.log("loading ended");
      let tmpImgURL = urlReader.result;
      imgURLs.push(tmpImgURL);
      console.log("Finished pushing this one");
      appendImageToThumbnail(tmpImgURL);
      console.log(imgURLs);
    };
    await urlReader.readAsDataURL(inputFiles.files[i]);
  }
});

async function appendImageToThumbnail(imageURL) {
  let tmpImageElement = document.createElement("img");
  tmpImageElement.src = `${imageURL}`;
  tmpImageElement.class = "rounded float-left mx-2";
  tmpImageElement.onclick = function() {
    displayImage(tmpImageElement);
    console.log("clicked");
  };
  thumbnail.append(tmpImageElement);
}

async function appendImagesToThumbnail(imageURLs) {
  imageURLs.forEach(async function(imageURL) {
    await appendImageToThumbnail(imageURL);
  });
}

async function displayImage(imageElement) {
  imgElement.src = imageElement.src;
}

// Optionnel mais bon..
let notice = $("#notice")
let understood = document.getElementById("understood")

understood.onclick = function(){
  console.log('bla')
  notice.toggle()
}

let loadingIcon = document.getElementById("loading")


$("#exampleModal").modal()

function hideElement(element){
  element.style.display = "none"
}

function showElement(element){
  element.style.display = "block"
}

function toggleVisibility(element){
  let elVisibility = element.style.display
  let hidden = (elVisibility === 'none')
  hidden ? element.style.display = 'block' : element.style.display = "none" 
}

// For mock purposes
function waitForResult(){
  setTimeout(function(){
    hideElement(loadingIcon)
    showElement(imgRapport)
  }, 2000)
}

let imgRapport = document.getElementById("imgRapport")

//hideElement(loadingIcon)
waitForResult()


//toggleVisibility(loadingIcon)

