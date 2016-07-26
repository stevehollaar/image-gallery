export default class ImageModel {
  // https://api.imgur.com/models/gallery_image
  constructor({
    id,
    title,
    mp4,
    bandwidth,
    nsfw,
    type,
  }) {
    this.id = id;
    this.title = title;
    this.mp4 = mp4;
    this.isEmpty = bandwidth === 0;
    this.sfw = !nsfw;
    this.extension = type.replace('image/', '');
    this.link = `//i.imgur.com/${id}.${this.extension}`;
    this.thumbnailUrl = `//i.imgur.com/${id}b.${this.extension}`;
  }
}
