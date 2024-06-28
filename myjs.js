
// Replace with your actual Windy API key
const apiKey = "fZnrhlxo9z9aT8uuSPMwzg9aSuY9wQAJ";

// Replace with the webcam ID you choose from Windy

const webcam_image_div = document.getElementsByClassName("webcam_image_div")[0];


async function pullWebcamId(long,lat){
  const apiUrl_webcam = `https://api.windy.com/webcams/api/v3/webcams?nearby=${lat},${long},10`
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
    const first5Webcams = webcam_list.webcams.slice(0, 6);
    console.log(JSON.stringify(first5Webcams, null, 2));
    console.log(first5Webcams.slice(0, 5).map(webcam => webcam.webcamId))
    //return(first5Webcams[0].webcamId)
    return (first5Webcams.slice(0, 6).map(webcam => webcam.webcamId))
  }

  return getWebcam();

}

async function updateWebcamImage(long, lat) {

  const webcamIds_new = await pullWebcamId(long, lat);
  webcam_image_div.innerHTML = "";


  for (const webcam_curr of webcamIds_new){
    
  
    const webcamId_new = webcam_curr;
    console.log(`this webcam ${webcamId_new}`)
    const apiUrl = `https://api.windy.com/webcams/api/v3/webcams/${webcamId_new}?include=categories,images,location,player,urls&lang=en`;

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
          const webcam_image = document.createElement('img');
          //document.getElementById("webcam_image").src = imageUrl;
          webcam_image.src = imageUrl;
          webcam_image_div.appendChild(webcam_image);
          
        }
    }
    getImage()
  }


}

async function getCityCoordinates(apiUrl) {
  const response = await fetch(apiUrl);
  
  const city_object = await response.json();
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

//updateWebcamImage();
getCity();


