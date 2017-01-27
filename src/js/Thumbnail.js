export default class Thumbnail {
	constructor(props) {
		this.props = props;

		this.root = new Image(this.props.width_sq, this.props.height_sq);
		this.root.addEventListener('click', this.props.onClick);
	}

	render() {
		this.root.src = this.props.url_sq;
		this.root.className = 'thumbnail';
		this.root.alt = this.props.title;

		return this.root;
	}
}
