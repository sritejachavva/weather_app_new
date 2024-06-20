
// Replace with your actual Windy API key
const apiKey = "fZnrhlxo9z9aT8uuSPMwzg9aSuY9wQAJ";

// Replace with the webcam ID you choose from Windy
const webcamId = "1604839522"; // Replace with actual ID


async function pullWebcamId(long,lat){
  const apiUrl_webcam = `https://api.windy.com/webcams/api/v3/webcams?nearby=${lat},${long},20`
  const headers = new Headers();
  headers.append("X-WINDY-API-KEY", apiKey);

  const options = {
    method: 'GET', // GET is the default method for fetching data
    headers: headers
  };

  async function getWebcam() {
    const response = await fetch(apiUrl_webcam, options);
    const webcam_list = await response.json();
    console.log('hi')
    console.log(`${long},${lat}`)
    const first5Webcams = webcam_list.webcams.slice(0, 5);
    console.log(JSON.stringify(first5Webcams, null, 2));

  }

  getWebcam();



}

async function updateWebcamImage(long, lat) {

  const webcamId_new = await pullWebcamId(long, lat);
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
    //console.log(image_object);
  }
  getImage()


}

async function getCityCoordinates(apiUrl) {
  const response = await fetch(apiUrl);
  
  const city_object = await response.json();
  //console.log(city_object[0]);
  return city_object[0];
}

async function getCity(){
  
  geocode_api = '667319ec4ce14834079376zde583560';
  
  let city_object = {};
  
  document.addEventListener('DOMContentLoaded', function() {
    const submitBtn = document.getElementById('submitBtn');
    submitBtn.addEventListener('click', async function() {
      const cityInput = document.getElementById('city').value;
      // You can now use the cityInput variable to fetch weather or webcam data

      const apiUrl = `https://geocode.maps.co/search?q=${cityInput}&api_key=${geocode_api}`;
      city_object = await getCityCoordinates(apiUrl);

      if (city_object) {
        await updateWebcamImage(city_object.lon, city_object.lat);
      } else {
        console.error('Failed to fetch city data.');
      }

    });
  });

  
  
  

}




// Call the function to update the image initially

updateWebcamImage();
getCity();
//  <object class="wavy-curve" type="image/svg+xml" data="wavy-curve.svg"></object>


