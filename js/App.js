import { fetchImages } from 'api';
import Thumbnails from 'Thumbnails';
import Lightbox from 'Lightbox';

export default class App {
  constructor({ subReddit, page }) {
    this.subReddit = subReddit;
    this.page = page;
    this.images = null;
    this.activeImageIndex = null;

    this.thumbnails = new Thumbnails(this.onThumbnailClick.bind(this));
    this.lightbox = new Lightbox({
      onPrevImageClick: this.onLightboxPrev.bind(this),
      onNextImageClick: this.onLightboxNext.bind(this),
      onClear: this.onLightboxClear.bind(this),
    });

    this.cacheElements();
    this.createListeners();
  }

  /**
   * Load images from the API, render the thumbnails
   */
  render() {
    this.thumbnails.clear();
    fetchImages({ subReddit: this.subReddit, page: this.page })
      .then(images => {
        this.images = images;
        this.thumbnails.render(this.images);
      });
  }

  onLightboxPrev() {
    if (this.activeImageIndex !== null) {
      this.activeImageIndex = Math.max(0, this.activeImageIndex - 1);
      this.lightbox.render(this.images[this.activeImageIndex]);
    }
  }

  onLightboxNext() {
    if (this.activeImageIndex !== null) {
      this.activeImageIndex = Math.min(this.images.length - 1, this.activeImageIndex + 1);
      this.lightbox.render(this.images[this.activeImageIndex]);
    }
  }

  onLightboxClear() {
    this.activeImageIndex = null;
  }

  cacheElements() {
    this.thumbnailsEl = document.getElementById('thumbnails');
    this.subredditInputEl = document.getElementById('subreddit');
    this.pageEl = document.getElementById('page');
    this.pagePrevEl = document.querySelector('.pagination.prev');
    this.pageNextEl = document.querySelector('.pagination.next');
  }

  createListeners() {
    document.addEventListener('keydown', this.onGlobalKeydown.bind(this));
    this.subredditInputEl.addEventListener('keydown', this.onSubredditKeydown.bind(this));
    this.pagePrevEl.addEventListener('click', this.onPagePrevClick.bind(this));
    this.pageNextEl.addEventListener('click', this.onPageNextClick.bind(this));
  }

  onGlobalKeydown(event) {
    switch (event.key) {
      case 'Escape':
        this.lightbox.clear();
        break;
      case 'ArrowLeft':
        this.onLightboxPrev();
        break;
      case 'ArrowRight':
        this.onLightboxNext();
        break;
      default:
        break;
    }
  }

  onSubredditKeydown(event) {
    if (event.key === 'Enter') {
      this.subReddit = event.currentTarget.value;
      this.page = 0;
      this.render();
      this.updatePageNumber();
    }
  }

  onThumbnailClick({ link, mp4 }, index) {
    this.activeImageIndex = index;
    this.lightbox.render(this.images[this.activeImageIndex]);
  }

  onPagePrevClick() {
    this.page = Math.max(0, this.page - 1);
    this.updatePageNumber();
    this.render();
  }

  onPageNextClick() {
    this.page++;
    this.updatePageNumber();
    this.render();
  }

  updatePageNumber() {
    this.pageEl.innerHTML = `Page ${this.page + 1}`;
    this.pagePrevEl.disabled = this.page === 0;
  }
}
