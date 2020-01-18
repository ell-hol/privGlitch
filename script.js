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