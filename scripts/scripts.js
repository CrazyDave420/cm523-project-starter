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

function setMarkers(map) {
  const defaultIcon = {
    url: 'https://drive.google.com/uc?export=download&id=1ZCe8VLK-H4WucfUThl9-a4dolcGanzpg',
    size: new google.maps.Size(32, 37),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(16, 37),
  };

  const hoverIcon = {
    url: 'https://drive.google.com/uc?export=download&id=1ZCe8VLK-H4WucfUThl9-a4dolcGanzpg',
    size: new google.maps.Size(32, 42),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(16, 42),
  };

  const shape = {
    coords: [1, 1, 1, 20, 18, 20, 18, 1],
    type: 'poly',
  };

  const bostonVenues = [
    ["MGM Music Hall", 42.347076, -71.094566, 1, '../images/mgm1.jpg'],
    ["Fenway Park", 42.3467, -71.0972, 2, '../images/fenway1.jpg'],
    ["TD Garden", 42.3662, -71.0621, 3, '../images/TD1.jpg'],
    ["Roadrunner", 42.3566, -71.1439, 4, '../images/roadrunner1.jpg'],
    ["House of Blues", 42.3474068, -71.0959362, 5, '../images/houseofblues1.jpg'],
    ["Paradise Rock Club", 42.3517507, -71.1195613, 6, '../images/paradise-rock-club-1.jpg'],
    ["Brighton Music Hall", 42.3526574, -71.1326369, 7, '../images/brightonmusichall1.jpg'],
  ];
  
  bostonVenues.forEach(venue => {
    const marker = new google.maps.Marker({
      position: { lat: venue[1], lng: venue[2] },
      map: map,
      icon: defaultIcon,
      title: venue[0],
      zIndex: venue[3],
    });

    const infoWindowContent = document.createElement('div');
    infoWindowContent.style.width = '200px';
    const imageElement = document.createElement('img');
    imageElement.style.width = '100%';
    imageElement.src = venue[4]; // 设置图片
    infoWindowContent.style.backgroundColor = '#ffffff';
    infoWindowContent.style.color = '#726E97';
    infoWindowContent.style.fontFamily = 'Roboto, sans-serif';
    const venueNameElement = document.createElement('h3');
    venueNameElement.textContent = venue[0];
    infoWindowContent.appendChild(imageElement);
    infoWindowContent.appendChild(venueNameElement);

    const infoWindow = new google.maps.InfoWindow({
      content: infoWindowContent
    });

    marker.addListener('mouseover', () => {
      marker.setIcon(hoverIcon);
      marker.setZIndex(google.maps.Marker.MAX_ZINDEX + 1);
      infoWindow.open(map, marker);
    });

    marker.addListener('mouseout', () => {
      marker.setIcon(defaultIcon);
      marker.setZIndex(venue[3]);
      infoWindow.close();
    });
  });
}
  

window.initMap = initMap;
