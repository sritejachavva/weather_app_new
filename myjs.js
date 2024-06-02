
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

//  <object class="wavy-curve" type="image/svg+xml" data="wavy-curve.svg"></object>



const cities = [
  { city: "New York", state: "NY" },
  { city: "Los Angeles", state: "CA" },
  { city: "Chicago", state: "IL" },
  { city: "Houston", state: "TX" },
  { city: "Phoenix", state: "AZ" },
  { city: "Philadelphia", state: "PA" },
  { city: "San Antonio", state: "TX" },
  { city: "San Diego", state: "CA" },
  { city: "Dallas", state: "TX" },
  { city: "San Jose", state: "CA" },
  { city: "Austin", state: "TX" },
  { city: "Jacksonville", state: "FL" },
  { city: "Fort Worth", state: "TX" },
  { city: "Columbus", state: "OH" },
  { city: "Charlotte", state: "NC" },
  { city: "San Francisco", state: "CA" },
  { city: "Indianapolis", state: "IN" },
  { city: "Seattle", state: "WA" },
  { city: "Denver", state: "CO" },
  { city: "Washington", state: "DC" },
  { city: "Boston", state: "MA" },
  { city: "El Paso", state: "TX" },
  { city: "Nashville", state: "TN" },
  { city: "Detroit", state: "MI" },
  { city: "Oklahoma City", state: "OK" },
  { city: "Portland", state: "OR" },
  { city: "Las Vegas", state: "NV" },
  { city: "Memphis", state: "TN" },
  { city: "Louisville", state: "KY" },
  { city: "Baltimore", state: "MD" },
  { city: "Milwaukee", state: "WI" },
  { city: "Albuquerque", state: "NM" },
  { city: "Tucson", state: "AZ" },
  { city: "Fresno", state: "CA" },
  { city: "Mesa", state: "AZ" },
  { city: "Sacramento", state: "CA" },
  { city: "Atlanta", state: "GA" },
  { city: "Kansas City", state: "MO" },
  { city: "Colorado Springs", state: "CO" },
  { city: "Miami", state: "FL" },
  { city: "Raleigh", state: "NC" },
  { city: "Omaha", state: "NE" },
  { city: "Long Beach", state: "CA" },
  { city: "Virginia Beach", state: "VA" },
  { city: "Oakland", state: "CA" },
  { city: "Minneapolis", state: "MN" },
  { city: "Tulsa", state: "OK" },
  { city: "Arlington", state: "TX" },
  { city: "Tampa", state: "FL" },
  { city: "New Orleans", state: "LA" },
  { city: "Wichita", state: "KS" },
  { city: "Cleveland", state: "OH" },
  { city: "Bakersfield", state: "CA" },
  { city: "Aurora", state: "CO" },
  { city: "Anaheim", state: "CA" },
  { city: "Honolulu", state: "HI" },
  { city: "Santa Ana", state: "CA" },
  { city: "Riverside", state: "CA" },
  { city: "Corpus Christi", state: "TX" },
  { city: "Lexington", state: "KY" },
  { city: "Henderson", state: "NV" },
  { city: "Stockton", state: "CA" },
  { city: "Saint Paul", state: "MN" },
  { city: "Cincinnati", state: "OH" },
  { city: "St. Louis", state: "MO" },
  { city: "Pittsburgh", state: "PA" },
  { city: "Greensboro", state: "NC" },
  { city: "Lincoln", state: "NE" },
  { city: "Anchorage", state: "AK" },
  { city: "Plano", state: "TX" },
  { city: "Orlando", state: "FL" },
  { city: "Irvine", state: "CA" },
  { city: "Newark", state: "NJ" },
  { city: "Durham", state: "NC" },
  { city: "Chula Vista", state: "CA" },
  { city: "Toledo", state: "OH" },
  { city: "Fort Wayne", state: "IN" },
  { city: "St. Petersburg", state: "FL" },
  { city: "Laredo", state: "TX" },
  { city: "Jersey City", state: "NJ" },
  { city: "Chandler", state: "AZ" },
  { city: "Madison", state: "WI" },
  { city: "Lubbock", state: "TX" },
  { city: "Scottsdale", state: "AZ" },
  { city: "Reno", state: "NV" },
  { city: "Buffalo", state: "NY" },
  { city: "Gilbert", state: "AZ" },
  { city: "Glendale", state: "AZ" },
  { city: "North Las Vegas", state: "NV" },
  { city: "Winston-Salem", state: "NC" },
  { city: "Chesapeake", state: "VA" },
  { city: "Norfolk", state: "VA" }
];

  const cityInput = document.getElementById('city');
  const datalist = document.getElementById('cities');

  cityInput.addEventListener('input', function() {
    const value = this.value.toLowerCase();
    datalist.innerHTML = '';
    if (value) {
      const filteredCities = cities.filter(
        cityObj => cityObj.city.toLowerCase().includes(value) || cityObj.state.toLowerCase().includes(value)
      );
      filteredCities.forEach(cityObj => {
        const option = document.createElement('option');
        option.value = `${cityObj.city}, ${cityObj.state}`;
        datalist.appendChild(option);
      });
    }
  });
