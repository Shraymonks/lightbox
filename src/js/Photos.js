const API_KEY = '';

const ENDPOINT = `https://api.flickr.com/services/rest/?method=flickr.photosets.getPhotos&api_key=${API_KEY}&format=json&nojsoncallback=1&photoset_id=72157647495646843&extras=url_sq,url_m`;

export async function getPhotos() {
	const response = await fetch(ENDPOINT);
	const data = await response.json();

	if (data.stat === 'ok') {
		return data.photoset.photo;
	}
}
