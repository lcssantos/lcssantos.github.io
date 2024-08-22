async function shareImage() {
  try {
    canvas.toBlob((blob) => {
      const filesArray = [
        new File(
          [blob],
          document.querySelector("input").value.trim() + ".jpg",
          {
            type: "image/jpeg",
            lastModified: new Date().getTime(),
          }
        ),
      ];
      const shareData = { files: filesArray };
      navigator.share(shareData);
    });
  } catch (error) {
    alert("Não foi possível compartilhar a imagem");
  }
}

function saveImage() {
  try {
    canvas.toBlob(function(blob) {
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `perfil_${getCurrentDate()}.png`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    });
  } catch (error) {
    alert("Não foi possível baixar a imagem");
  }
}

function getCurrentDate() {
  const currentDate = new Date();
  
  const year = currentDate.getFullYear();
  const month = String(currentDate.getMonth() + 1).padStart(2, '0');
  const day = String(currentDate.getDate()).padStart(2, '0');
  
  const hours = String(currentDate.getHours()).padStart(2, '0');
  const minutes = String(currentDate.getMinutes()).padStart(2, '0');

  return `${year}_${month}_${day}_${hours}_${minutes}`;
}