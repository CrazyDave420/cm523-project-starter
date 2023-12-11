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

const styles = {
  hiding: [
    {
      featureType: "poi.business",
      stylers: [{ visibility: "off" }],
    },
  ],
};

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 13,
    center: { lat: 42.3601, lng: -71.0589 },
    styles: styles.hiding
  });

  setMarkers(map);
}

function setMarkers(map) {
  const defaultIcon = {
    url: 'https://drive.google.com/uc?export=download&id=1ZCe8VLK-H4WucfUThl9-a4dolcGanzpg',
    size: new google.maps.Size(32, 37),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(16, 37),
    styles: styles.hiding
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
    ["MGM Music Hall", 42.347076, -71.094566, 1, ['../images/mgm1.jpg',] , "New to the venue scene, MGM Music Hall just opened in Spring of 2022. Shortly after it hosted the royal couple’s Earthshot Prize Awards. The 5,000-capacity music venue primarily books national touring acts like Sam Hunt and Jimmy Eat World. It’s part of Crossroads Presents who own and manage 6 of Boston’s most notorious music venues.", "2 Lansdowne St, Boston, MA 02215", "https://crossroadspresents.com/pages/mgm-fenway-music-hall"],
    ["Fenway Park", 42.3467, -71.0972, 2, ['../images/fenway1.jpg'], "Ballpark by day, concert venue by night. Fenway concerts are magical as the outdoor setting just enhances the experience. Major stars like Lady Gaga and Pink have took the stage at Fenway.", "4 Jersey St, Boston, MA 02215", "https://www.mlb.com/redsox/ballpark"],
    ["TD Garden", 42.3662, -71.0621, 3, ['../images/TD1.jpg'], "Another popular multi-use venue in Boston is none other than The Garden. Home to the Celtics and Bruins, TD Garden as serves as a temporary home for artists like The Jonas Brothers, The Killers, and on the horizon The Artic Monkeys and SZA. Learn more about upcoming acts here.", "100 Legends Way, Boston, MA 02114", "https://www.tdgarden.com/"],
    ["Roadrunner", 42.3566, -71.1439, 4, ['../images/roadrunner1.jpg'], "It seems we can’t escape sports here in Boston. Right across the stomping grounds of the Celtics and Bruins is a 50,000-square-foot music venue perfect for letting loose! The expansive music venue has a 3,500-count capacity and 3-stories to amplify the concert going experience!", "89 Guest Street, Boston, MA 02135", "https://roadrunnerboston.com/"],
    ["House of Blues", 42.3474068, -71.0959362, 5, ['../images/houseofblues1.jpg'], "The quintessential Boston concert venue, many Boston-born artists return to perform at the House of Blues after a major industry breakthrough. Past performers include Charlotte Sands, Sasha Alex Sloan, and also international talent like The Kooks.", "15 Lansdowne St, Boston, MA 02215 ", "https://www.houseofblues.com/boston"],
    ["Paradise Rock Club", 42.3517507, -71.1195613, 6, ['../images/paradise-rock-club-1.jpg'], "The tiny 933 capacity rock club on Comm. Ave. is perfect if you want an intimate setting. Practically everyone is in the first row at this concert venue known for hosting alternative bands. The rock club is under the same ownership of Crossroads Presents and has been in business since 1977.", "967 Commonwealth Ave, Boston, MA 02215", "https://crossroadspresents.com/pages/paradise-rock-club"],
    ["Brighton Music Hall", 42.3526574, -71.1326369, 7, ['../images/brightonmusichall1.jpg'], "Brighton Music Hall is one of Boston’s most coveted music venues. Weezer and Dropkick Murphys are some of the mega talents to grace the stage of the 500-capacity venue. They book a mix of large touring acts and local bands to keep things interesting. View the upcoming lineup online.", "158 Brighton Ave, Allston, MA 02134", "https://crossroadspresents.com/pages/brighton-music-hall"],
  ];
  
  bostonVenues.forEach(venue => {
    const marker = new google.maps.Marker({
      position: { lat: venue[1], lng: venue[2] },
      map: map,
      icon: defaultIcon,
      title: venue[0],
      zIndex: venue[3],
    });

    marker.addListener('click', () => {
      const detailsElement = document.getElementById('venue-details');
      if (!detailsElement) return; // 确保元素存在
  
      // 设置详细信息的 HTML 结构
      detailsElement.innerHTML = `
        <button class="back-button">Back</button>
        <h3>${venue[0]}</h3>
        <div class="image-carousel">
          <img src="${venue[4][0]}" alt="${venue[0]}" style="width:100%;">
          <button class="prev-button">上一张</button>
          <button class="next-button">下一张</button>
        </div>
        <p>${venue[5]}</p>
        <p>${venue[6]}</p>
        <a href="${venue[7]}" target="_blank">Official Website</a>
      `;
  
      // 获取图片元素和按钮的引用
      const imageElement = detailsElement.querySelector('.image-carousel img');
      const prevButton = detailsElement.querySelector('.prev-button');
      const nextButton = detailsElement.querySelector('.next-button');
  
      let currentImageIndex = 0;
  
      // 更新图片显示函数
      const updateImage = () => {
        imageElement.src = venue[4][currentImageIndex];
      };
  
      // 上一张图片按钮点击事件
      prevButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex > 0) ? currentImageIndex - 1 : venue[4].length - 1;
        updateImage();
      });
  
      // 下一张图片按钮点击事件
      nextButton.addEventListener('click', () => {
        currentImageIndex = (currentImageIndex + 1) % venue[4].length;
        updateImage();
      });
  
      // 显示详情面板
      detailsElement.classList.add('visible');
  
      // 返回按钮点击事件
      detailsElement.querySelector('.back-button').addEventListener('click', () => {
        detailsElement.classList.remove('visible');
      });
    });

    const infoWindowContent = document.createElement('div');
    infoWindowContent.style.width = '200px';
    const imageElement = document.createElement('img');
    imageElement.style.width = '100%';
    imageElement.src = venue[4];
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
