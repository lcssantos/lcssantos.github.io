const canvas = document.querySelector("canvas");
const canvasContext = canvas.getContext("2d");

const imageMask = new Image();
imageMask.src = "./img/mask.png";

const imageMaskSample = new Image();
imageMaskSample.src = "./img/maskSample.png";

let imageSelected = new Image();

function openImagePicker() {
  document.getElementById("slcImage").click();
}

function loadImageMask() {
  if (imageSelected.src) {
    canvasContext.drawImage(imageMask, 0, 0, 1080, 1080);
  } else {
    canvasContext.drawImage(imageMaskSample, 0, 0, 1080, 1080);
  }
  canvasContext.save();
  canvasContext.restore();
}

function changeImage(ev) {
  ev.preventDefault();

  if (ev.target.files && ev.target.files[0]) {
    const reader = new FileReader();

    reader.onload = (ev) => {
      imageSelected = new Image();
      canvasContext.clearRect(0, 0, canvas.width, canvas.height);
      imageSelected.src = ev.target.result;

      imageSelected.addEventListener("load", () => {
        const oldWidth = imageSelected.width;
        imageSelected.width = 1080;
        imageSelected.height = (1080 / oldWidth) * imageSelected.height;

        if (imageSelected.height < 1080) {
          const oldHeight = imageSelected.height;
          imageSelected.height = 1080;
          imageSelected.width =
            (1080 / oldHeight) * imageSelected.width;
        }

        canvasContext.drawImage(
          imageSelected,
          0 - (imageSelected.width - 1080) / 2,
          0 - (imageSelected.height - 1080) / 2,
          imageSelected.width,
          imageSelected.height
        );

        loadImageMask();
      });
    };

    reader.readAsDataURL(ev.target.files[0]);
  }
}

window.onload = () => {
    loadImageMask();
};