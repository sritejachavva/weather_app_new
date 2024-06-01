
// Replace with your actual Windy API key
const apiKey = "fZnrhlxo9z9aT8uuSPMwzg9aSuY9wQAJ";

// Replace with the webcam ID you choose from Windy
const webcamId = "1604839522"; // Replace with actual ID

function updateWebcamImage() {
  const apiUrl = `https://api.windy.com/webcams/api/v3/webcams/${webcamId}?include=categories,images,location,player,urls&lang=en`;

  const headers = new Headers();
  headers.append("X-WINDY-API-KEY", apiKey);

  const options = {
    method: 'GET', // GET is the default method for fetching data
    headers: headers
  };

  async function getImage() {
    const response = await fetch(apiUrl, options);
    const image_object = await response.json();
    imageUrl = image_object.images.current.preview
    if (imageUrl) {
        document.getElementById("webcam_image").src = imageUrl;
      }
    console.log(image_object);
  }
  getImage()


}

// Update the image every 5 minutes (adjust as needed)

// Call the function to update the image initially
updateWebcamImage();