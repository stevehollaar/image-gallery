export default class Thumbnails {
  constructor(onThumbnailClick) {
    this.el = document.getElementById('thumbnails');
    this.onThumbnailClick = onThumbnailClick;
  }

  clear() {
    this.el.innerHTML = '';
  }

  render(images) {
    this.clear();
    if (images.length) {
      images
        .forEach((image, index) => {
          const thumbnailDiv = document.createElement('div');
          thumbnailDiv.classList.add('thumbnail');
          thumbnailDiv.style.backgroundImage = `url(${image.thumbnailUrl})`;
          thumbnailDiv.addEventListener('click', () => this.onThumbnailClick(image, index));

          this.el.appendChild(thumbnailDiv);
        });
    } else {
      this.el.innerHTML = `
        <div>
          <h2>No images to display</h2>
        <div>
      `;
    }
  }
}
