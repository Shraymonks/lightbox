import {getPhotos} from './Photos';
import Lightbox from './Lightbox';
import Thumbnail from './Thumbnail';

export default class Gallery {
	constructor() {
		this.root = document.createElement('div');
		this.root.className = 'gallery';
		this.photos = [];

		getPhotos().then(photos => {
			this.photos = photos;
			this.lightbox = new Lightbox(photos);
			this.render();
		});
	}

	render() {
		this.root.innerHTML = '';

		if (this.photos.length) {
			const fragment = document.createDocumentFragment();
			this.photos.forEach((photo, index) => {
				const handleThumbnailClick = () => this.lightbox.open(index);

				const thumbnail = new Thumbnail({
					...photo,
					onClick: handleThumbnailClick
				});

				fragment.appendChild(thumbnail.render());
			});

			this.root.appendChild(fragment);
		}

		return this.root;
	}
}
