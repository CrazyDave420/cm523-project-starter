/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */
const mapContainer = document.querySelector('.map-container');
const textBox = document.querySelector('.text-box');
const h2Element = document.querySelector('header.container h2');
const paragraphs = document.querySelectorAll('.container p');
const button = document.querySelector('button');
const headerContainer = document.querySelector('header.container');

button.addEventListener('click', function() {
  mapContainer.style.display = mapContainer.style.display === 'block' ? 'none' : 'block';

  headerContainer.classList.add('header-no-bg');

  if (h2Element) {
    h2Element.style.display = 'none';
  }

  textBox.style.padding = '10px';
  textBox.style.height = 'auto';

  paragraphs.forEach(element => {
    element.style.display = 'none';
  });
  button.style.display = 'none';
});


function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: 42.3601, lng: -71.0589 }
  });

  setMarkers(map);
}


  const bostonVenues = [
    ["MGM Music Hall", 42.347076, -71.094566, 1],
    ["Fenway Park", 42.3467, -71.0972, 2],
    ["TD Garden", 42.3662, -71.0621, 3],
    ["Roadrunner", 42.3566, -71.1439, 4],
    ["House of Blues", 42.3474068, -71.0959362, 5],
    ["Paradise Rock Club", 42.3517507, -71.1195613, 6],
    ["Agganis Arena", 42.3522233, -71.11773, 7],
    ["Brighton Music Hall", 42.3526574, -71.1326369, 8],
  ];


  bostonVenues.forEach(place => {
    const marker = new google.maps.Marker({
      position: { lat: place[1], lng: place[2] },
      map: map,
      title: place[0]

    });
  });

  function setMarkers(map) {
    const image = {
      url: 'path/to/your/custom-icon.png', // 您的自定义图标 URL
      size: new google.maps.Size(20, 32),
      origin: new google.maps.Point(0, 0),
      anchor: new google.maps.Point(0, 32),
    };
  
    const shape = {
      coords: [1, 1, 1, 20, 18, 20, 18, 1],
      type: 'poly',
    };
  
    bostonVenues.forEach(venue => {
      new google.maps.Marker({
        position: { lat: venue[1], lng: venue[2] },
        map: map,
        icon: image,
        shape: shape,
        title: venue[0],
        zIndex: venue[3],
      });
    });
  }
  

window.initMap = initMap;
