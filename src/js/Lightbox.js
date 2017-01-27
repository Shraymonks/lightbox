function getScrollbarWidth() {
	const div = document.createElement('div');
	div.className = 'scrollbar-measure';
	document.body.appendChild(div);
	const scrollbarWidth = div.offsetWidth - div.clientWidth;
	document.body.removeChild(div);
	return scrollbarWidth;
}

const scrollbarWidth = getScrollbarWidth();

export default class Lightbox {
	constructor(photos) {
		this.photos = photos;
		this.currentIndex = 0;

		this.initElements();

	}

	openNext(event) {
		event.stopPropagation();
		this.open(this.currentIndex + 1);
	}

	openPrevious(event) {
		event.stopPropagation();
		this.open(this.currentIndex - 1);
	}

	open(index) {
		if (index < 0 || index >= this.photos.length) return;

		const photo = this.photos[index];

		this.currentIndex = index;

		this.root.style.display = 'flex';

		this.image.src = '';
		this.image.src = photo.url_m;
		this.image.height = photo.height_m;
		this.image.width = photo.width_m;
		this.image.alt = photo.title;

		this.title.textContent = photo.title;

		if (document.body.clientWidth < window.innerWidth) {
			document.body.style.paddingRight = `${scrollbarWidth}px`;
		}
		document.body.classList.add('prevent-scroll');

		if (index === 0) {
			this.previous.disabled = true;
		} else {
			this.previous.disabled = false;
		}

		if (index === this.photos.length - 1) {
			this.next.disabled = true;
		} else {
			this.next.disabled = false;
		}

		this.root.style.opacity = '1';
	}

	close() {
		this.root.style.opacity = '0';
	}

	preload(index) {
		if (index >= 0 && index < this.photos.length) {
			const image = new Image();
			image.src = this.photos[index].url_m;
		}
	}

	initElements() {
		this.root = document.getElementById('blocker');
		this.lightbox = document.getElementById('lightbox');
		this.title = this.lightbox.querySelector('h2');
		this.image = this.lightbox.querySelector('img');
		this.next = document.getElementById('next');
		this.previous = document.getElementById('previous');
		this.next.addEventListener('click', this.openNext.bind(this));
		this.previous.addEventListener('click', this.openPrevious.bind(this));

		this.lightbox.appendChild(this.title);
		this.lightbox.appendChild(this.image);
		this.lightbox.appendChild(this.next);
		this.lightbox.appendChild(this.previous);

		this.root.appendChild(this.lightbox);

		this.root.addEventListener('click', this.close.bind(this));
		this.root.addEventListener('transitionend', () => {
			if (this.root.style.opacity === '0') {
				this.root.style.display = 'none';
				document.body.classList.remove('prevent-scroll');
				document.body.style.paddingRight = '';
			}
		});


		// Preload adjacent images
		this.image.addEventListener('load', () => {
			this.preload(this.currentIndex + 1);
			this.preload(this.currentIndex - 1);
		});

		document.addEventListener('keyup', event => {
			switch (event.keyCode) {
				// esc
				case 27:
					this.close();
					break;

				// left
				case 37:
					this.open(this.currentIndex - 1);
					break;

				// right
				case 39:
					this.open(this.currentIndex + 1);
					break;
			}
		});
	}
}
