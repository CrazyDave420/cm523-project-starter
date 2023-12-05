/* WRITE YOUR JS HERE... YOU MAY REQUIRE MORE THAN ONE JS FILE. IF SO SAVE IT SEPARATELY IN THE SCRIPTS DIRECTORY */
const mapContainer = document.querySelector('.map-container');
const textBox = document.querySelector('.text-box');
const h2Element = document.querySelector('header.container h2');
const paragraphs = document.querySelectorAll('.container p');
const button = document.querySelector('button');
const headerContainer = document.querySelector('header.container');

button.addEventListener('click', function() {
  // 切换 map-container 的显示
  mapContainer.style.display = mapContainer.style.display === 'block' ? 'none' : 'block';

  // 隐藏 header 的背景图片
  headerContainer.classList.add('header-no-bg');

  // 隐藏 h2 元素
  if (h2Element) {
    h2Element.style.display = 'none';
  }

  // 更新 text-box 的样式，可以在这里调整高度
  textBox.style.padding = '10px';
  textBox.style.height = 'auto'; // 根据需要调整

  // 隐藏段落和按钮
  paragraphs.forEach(element => {
    element.style.display = 'none';
  });
  button.style.display = 'none';
});
