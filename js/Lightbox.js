export default class Lightbox {
  constructor({ onPrevImageClick, onNextImageClick, onClear }) {
    this.onPrevImageClick = onPrevImageClick;
    this.onNextImageClick = onNextImageClick;
    this.onClear = onClear;

    this.el = document.getElementById('lightbox');
    this.contentEl = document.getElementById('lightbox-content');
    this.lighboxPrevEl = document.querySelector('.lightbox-button.prev');
    this.lighboxNextEl = document.querySelector('.lightbox-button.next');
    this.closeEl = document.getElementById('lightbox-close');
    this.titleEl = document.getElementById('lightbox-title');

    this.lighboxPrevEl.addEventListener('click', this.onPrevImageClick);
    this.lighboxNextEl.addEventListener('click', this.onNextImageClick);
    this.contentEl.addEventListener('click', this.clear.bind(this));
    this.closeEl.addEventListener('click', this.clear.bind(this));
  }

  clear() {
    this.el.classList.remove('active');
    this.contentEl.innerHTML = '';
    this.titleEl.innerHTML = '';
    this.onClear();
  }

  render(image) {
    this.el.classList.add('active');
    this.contentEl.innerHTML = '';

    const { mp4, link, title } = image;
    let imageDiv = null;
    this.contentEl.innerHTML = '';
    if (mp4) {
      imageDiv = document.createElement('video');
      this.contentEl.appendChild(imageDiv);
      imageDiv.outerHTML = `
        <video class="image" preload="auto" autoplay="autoplay" muted="muted" loop="loop">
            <source src="${mp4}" type="video/mp4">
        </video>
      `;
    } else {
      imageDiv = document.createElement('div');
      imageDiv.classList.add('image');
      imageDiv.style.backgroundImage = `url(${link})`;
      this.contentEl.appendChild(imageDiv);
    }

    this.titleEl.innerHTML = title;
  }
}
