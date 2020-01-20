let inputFiles = document.getElementById("fileInput");
let imgElement = document.getElementById("image");
let thumbnail = document.getElementById("thumbnail");
// let rapportText = document.getElementById("rapportText");

let imgURLs = [];

let currentTab = "avant";
let avantLoaded = false;
let apresLoaded = false;
let srcAvant = "";
let srcApres = "";

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

      if (currentTab === "avant") {
        srcAvant = tmpImgURL;
        console.log("AVANT");
        displayImageFromSrc(srcAvant);
        avantLoaded = true;

        console.log(srcAvant);
        currentTab = "apres";
      } else {
        srcApres = tmpImgURL;
        console.log("APRES");
        displayImageFromSrc(srcApres);
        apresLoaded = true;

        console.log(srcApres);
      }

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

async function displayImageFromSrc(imgSrc) {
  imgElement.src = imgSrc;
}

// Optionnel mais bon..
let notice = $("#notice");
let understood = document.getElementById("understood");

understood.onclick = function() {
  console.log("bla");
  notice.toggle();
};

let loadingIcon = document.getElementById("loading");

function hideElement(element) {
  element.style.display = "none";
}

function showElement(element) {
  element.style.display = "block";
}

function toggleVisibility(element) {
  let elVisibility = element.style.display;
  let hidden = elVisibility === "none";
  hidden ? (element.style.display = "block") : (element.style.display = "none");
}

// For mock purposes
function waitForResult() {
  setTimeout(function() {
    hideElement(loadingIcon);
    showElement(imgRapport);
  }, 2000);
}

let imgRapport = document.getElementById("imgRapport");

//hideElement(loadingIcon)

//toggleVisibility(loadingIcon)

$("#avant").click(function() {
  currentTab = "avant";
  toggleTabs();
  !avantLoaded
    ? displayImageFromSrc(
        "https://cdn.glitch.com/971334d3-6598-4986-b799-31a359192533%2Favant.png?v=1579511071669"
      )
    : displayImageFromSrc(srcAvant);
});

$("#apres").click(function() {
  currentTab = "apres";
  toggleTabs();
  !apresLoaded
    ? displayImageFromSrc(
        "https://cdn.glitch.com/971334d3-6598-4986-b799-31a359192533%2Fapres.png?v=1579511066642"
      )
    : displayImageFromSrc(srcApres);
});

function toggleTabs() {
  $("#apresAnchor").toggleClass("active");
  $("#avantAnchor").toggleClass("active");
  $("#avant").toggleClass("blue");
  $("#apres").toggleClass("blue");
}

let startAnalysisButton = $("#startAnalysis");
startAnalysisButton.click(function() {
  waitForResult();
  $("#exampleModal").modal();
});
