
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
      console.log(JSON.stringify(image_object, null, 2));
      if (imageUrl) {
          const webcam_image = document.createElement('img');
          webcam_image.classList.add('webcam-img');
          //document.getElementById("webcam_image").src = imageUrl;
          webcam_image.src = imageUrl;
          webcam_image.setAttribute('data-src',imageUrl)
          webcam_image_div.appendChild(webcam_image);

          
        }
    }
    getImage()
  }


}

async function getCityCoordinates(apiUrl) {
  const response = await fetch(apiUrl);
  
  const city_object = await response.json();
  console.log('hi')
  console.log(JSON.stringify(city_object, null, 2));
  return city_object[0];
}

function parseDt(weatherDate_str){

    weatherDate = new Date(weatherDate_str);

    // Extract the hour, date, and whether it's AM or PM
    let hours = weatherDate.getHours();
    const ampm = hours >= 12 ? 'PM' : 'AM';
    hours = hours % 12;
    hours = hours ? hours : 12; // The hour '0' should be '12'

    const formattedTime = `${hours} ${ampm}`;
    const formattedDate = weatherDate.toISOString().split('T')[0];

    console.log(`Time: ${formattedTime}`);
    console.log(`Date: ${formattedDate}`);

    return [formattedDate,formattedTime]


}

async function updateWeather(lon, lat){

  const api_key = "c7778451b0b032729ec94b6b0390dd0d";

  
  const apiUrl =  `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${api_key}`;
  
  const response = await fetch(apiUrl);
  const weatherResponse = await response.json();

  const weatherDiv = document.getElementsByClassName('weather_readings')[0]; 
  weatherDiv.innerHTML = "";
  weather_3 = weatherResponse.list.slice(0,3);
  
  const weatherValues = document.getElementsByClassName('weather_values')[0];
  
  // const weatherHeading = document.createElement('p');
  // weatherHeading.innerHTML = "";
  // weatherHeading.innerText = "This displays the weather for the next 6 hours";
  // weatherValues.insertBefore(weatherHeading, weatherValues.firstChild);

  if (!document.getElementById('weatherHeading')) {
    const weatherHeading = document.createElement('p');
    weatherHeading.id = 'weatherHeading';  // Add an id to identify it later
    weatherHeading.innerText = "This displays the weather for the next 6 hours";
    weatherValues.insertBefore(weatherHeading, weatherValues.firstChild);
  }


  

  

  for (const weather_info of weather_3){
    const weatherBlock = document.createElement('div');
    weatherBlock.classList.add("hourly_weather_card");
    const parsedDate = parseDt(weather_info.dt_txt)
    const weatherBlock_weather_date = document.createElement('h3');
    weatherBlock_weather_date.innerText = parsedDate[0];
    const weatherBlock_weather_time = document.createElement('h3');
    weatherBlock_weather_time.innerText = parsedDate[1]
    //weather_info.dt_txt
    const weatherBlock_weather_reading = document.createElement('p');
    weatherBlock_weather_reading.innerText =  (Math.round(10*((weather_info.main.feels_like - 273.15) * 1.8 + 32)))/10

    weatherBlock.appendChild(weatherBlock_weather_date);
    weatherBlock.appendChild(weatherBlock_weather_time);
    weatherBlock.appendChild(weatherBlock_weather_reading);
    weatherDiv.appendChild(weatherBlock);


  }

  //console.log(JSON.stringify(, null, 2));

  //return weatherResponse.list.slice(0,3)
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
        await updateWeather(city_object.lon, city_object.lat);
      } else {
        console.error('Failed to fetch city data.');
      }

    });
  });
}


document.addEventListener('DOMContentLoaded', () => {
  const modal = document.getElementById('imageModal');
  const modalImg = document.getElementById('modalImage');
  const closeModal = document.getElementsByClassName('close')[0];

  document.addEventListener('click', (event) => {
    if (event.target.classList.contains('webcam-img')) {
      modal.style.display = "block";
      modalImg.src = event.target.getAttribute('data-src');
    }
  });

  closeModal.onclick = function() {
    modal.style.display = "none";
  }

  window.onclick = function(event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  }
});






// Call the function to update the image initially

//updateWebcamImage();
getCity();



