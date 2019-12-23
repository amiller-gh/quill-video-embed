const guid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c  => (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
function addStyleString(id, str) {
	var node = document.createElement('style');
	node.id = id;
	node.innerHTML = str;
	document.body.appendChild(node);
}

const FORMATS = [ 'left', 'center', 'right', 'full' ];
const ICONS = {
	left: '<svg><path d="M2 16.99V9.047c0-.112.042-.22.123-.32a.384.384 0 0 1 .32-.152h11.93c.102 0 .2.05.296.15.09.103.14.21.14.322v7.943c0 .122-.05.225-.14.31a.44.44 0 0 1-.31.13H2.44a.427.427 0 0 1-.44-.44zm5.847 3.517v-.87c0-.1.038-.194.114-.28.08-.086.17-.13.27-.13h14.22c.13 0 .23.046.32.14.09.09.14.18.14.27v.87a.42.42 0 0 1-.14.332c-.09.08-.19.13-.31.13H8.23a.34.34 0 0 1-.274-.14.545.545 0 0 1-.107-.34zm0-14.108v-.92c0-.13.038-.23.114-.32a.35.35 0 0 1 .27-.13h14.22c.13 0 .23.04.32.13s.14.19.14.31v.92c0 .09-.04.18-.14.26-.09.08-.19.13-.31.13H8.23c-.1 0-.19-.05-.267-.13a.447.447 0 0 1-.11-.27zm8.497 7.09v-.9c0-.15.048-.27.144-.37a.477.477 0 0 1 .328-.14l5.624-.01c.12 0 .23.04.32.14.093.09.14.21.14.36v.9c0 .11-.047.21-.14.32-.09.1-.2.15-.32.15l-5.625.01c-.12 0-.23-.05-.327-.15a.467.467 0 0 1-.144-.33zm0-3.58v-.86c0-.11.048-.22.144-.32.097-.1.207-.16.328-.15l5.624-.01c.12 0 .23.05.32.15.092.1.14.21.14.32v.87c0 .13-.047.24-.14.32-.09.08-.2.12-.32.12l-5.625.01a.45.45 0 0 1-.334-.13.408.408 0 0 1-.13-.32zm0 7.04v-.9c0-.15.05-.27.146-.37a.474.474 0 0 1 .327-.14l5.624-.01c.13 0 .23.04.33.14.09.09.14.21.14.36v.89c0 .11-.04.21-.13.32-.09.1-.2.15-.32.15l-5.62.01c-.12 0-.23-.05-.32-.16a.485.485 0 0 1-.14-.32z" fill-rule="evenodd"></path></svg>',
	center: '<svg><path d="M5 20.558v-.9c0-.122.04-.226.122-.312a.404.404 0 0 1 .305-.13h13.347a.45.45 0 0 1 .32.13c.092.086.138.19.138.312v.9a.412.412 0 0 1-.138.313.435.435 0 0 1-.32.13H5.427a.39.39 0 0 1-.305-.13.432.432 0 0 1-.122-.31zm0-3.554V9.01c0-.12.04-.225.122-.31a.4.4 0 0 1 .305-.13h13.347c.122 0 .23.043.32.13.092.085.138.19.138.31v7.994a.462.462 0 0 1-.138.328.424.424 0 0 1-.32.145H5.427a.382.382 0 0 1-.305-.145.501.501 0 0 1-.122-.328zM5 6.342v-.87c0-.12.04-.23.122-.327A.382.382 0 0 1 5.427 5h13.347c.122 0 .23.048.32.145a.462.462 0 0 1 .138.328v.87c0 .12-.046.225-.138.31a.447.447 0 0 1-.32.13H5.427a.4.4 0 0 1-.305-.13.44.44 0 0 1-.122-.31z" fill-rule="evenodd"></path></svg>',
	right: '<svg style="transform: rotate(180deg)"><path d="M2 16.99V9.047c0-.112.042-.22.123-.32a.384.384 0 0 1 .32-.152h11.93c.102 0 .2.05.296.15.09.103.14.21.14.322v7.943c0 .122-.05.225-.14.31a.44.44 0 0 1-.31.13H2.44a.427.427 0 0 1-.44-.44zm5.847 3.517v-.87c0-.1.038-.194.114-.28.08-.086.17-.13.27-.13h14.22c.13 0 .23.046.32.14.09.09.14.18.14.27v.87a.42.42 0 0 1-.14.332c-.09.08-.19.13-.31.13H8.23a.34.34 0 0 1-.274-.14.545.545 0 0 1-.107-.34zm0-14.108v-.92c0-.13.038-.23.114-.32a.35.35 0 0 1 .27-.13h14.22c.13 0 .23.04.32.13s.14.19.14.31v.92c0 .09-.04.18-.14.26-.09.08-.19.13-.31.13H8.23c-.1 0-.19-.05-.267-.13a.447.447 0 0 1-.11-.27zm8.497 7.09v-.9c0-.15.048-.27.144-.37a.477.477 0 0 1 .328-.14l5.624-.01c.12 0 .23.04.32.14.093.09.14.21.14.36v.9c0 .11-.047.21-.14.32-.09.1-.2.15-.32.15l-5.625.01c-.12 0-.23-.05-.327-.15a.467.467 0 0 1-.144-.33zm0-3.58v-.86c0-.11.048-.22.144-.32.097-.1.207-.16.328-.15l5.624-.01c.12 0 .23.05.32.15.092.1.14.21.14.32v.87c0 .13-.047.24-.14.32-.09.08-.2.12-.32.12l-5.625.01a.45.45 0 0 1-.334-.13.408.408 0 0 1-.13-.32zm0 7.04v-.9c0-.15.05-.27.146-.37a.474.474 0 0 1 .327-.14l5.624-.01c.13 0 .23.04.33.14.09.09.14.21.14.36v.89c0 .11-.04.21-.13.32-.09.1-.2.15-.32.15l-5.62.01c-.12 0-.23-.05-.32-.16a.485.485 0 0 1-.14-.32z" fill-rule="evenodd"></path></svg>',
	full: '<svg><path d="M3 17.004V9.01a.4.4 0 0 1 .145-.31.476.476 0 0 1 .328-.13h17.74c.12 0 .23.043.327.13a.4.4 0 0 1 .145.31v7.994a.404.404 0 0 1-.145.313.48.48 0 0 1-.328.13H3.472a.483.483 0 0 1-.327-.13.402.402 0 0 1-.145-.313zm2.212 3.554v-.87c0-.13.05-.243.145-.334a.472.472 0 0 1 .328-.137H19c.124 0 .23.045.322.137a.457.457 0 0 1 .138.335v.86c0 .12-.046.22-.138.31a.478.478 0 0 1-.32.13H5.684a.514.514 0 0 1-.328-.13.415.415 0 0 1-.145-.32zm0-14.246v-.84c0-.132.05-.243.145-.334A.477.477 0 0 1 5.685 5H19a.44.44 0 0 1 .322.138.455.455 0 0 1 .138.335v.84a.451.451 0 0 1-.138.334.446.446 0 0 1-.32.138H5.684a.466.466 0 0 1-.328-.138.447.447 0 0 1-.145-.335z" fill-rule="evenodd"></path></svg>',
}

function selectAll(el) {
	if (el.setSelectionRange) {
		el.setSelectionRange(0, el.value.length);
		return;
	}
	let selection = window.getSelection();
	let range = document.createRange();
	range.selectNodeContents(el);
	selection.removeAllRanges();
	selection.addRange(range);
}

function makeMenu(node) {
	const nav = document.createElement('nav');
	nav.className = 'quill-image__format';
	for (let format of FORMATS) {
		const button = document.createElement('input');
		const label = document.createElement('label');
		button.id = `${node.id}-${format}`;
		label.setAttribute('for', button.id);
		label.innerHTML = ICONS[format] || format;
		button.setAttribute('type', 'radio');
		button.textContent = format;

		button.dataset.format = format;
		label.dataset.format = format;
		const activeFormat = node.dataset.format || 'center';
		if (activeFormat === format) button.checked = true;
		button.name = 'format';
		nav.appendChild(button);
		nav.appendChild(label);
	}

	nav.addEventListener('click', (e) => {
		const srcEl = e.srcElement;
		node.pause = true;
		node.focus();
		if (srcEl.dataset.format) { node.dataset.format = srcEl.dataset.format; }
	}, true);

	return nav;
}

function makeAltButton(node) {
	const altButton = document.createElement('input');
	altButton.className = 'quill-image__alt';
	altButton.placeholder = 'Alt text for image (optional)';
	altButton.required = true;
	altButton.value = node.querySelector('img').alt ? "Alt" : "";
	altButton.addEventListener('input', e => node.querySelector('img').alt = altButton.value || "");
	altButton.addEventListener('blur', e => altButton.value = node.querySelector('img').alt ? "Alt" : "");
	altButton.addEventListener('focus', e => {
		altButton.value = node.querySelector('img').alt || "";
		selectAll(altButton);
	});
	return altButton;
}

const STYLES = `
	.quill-image {
		--accent-color: #3eb0ef;
		display: flex;
		flex-flow: column;
		justify-content: center;
		align-items: center;
		outline: none;
		cursor: pointer;
		position: relative;
	}
	.quill-image[data-format=full] {
		width: 100%;
		margin: 0 0 12px;
	}
	.quill-image[data-format=center] {
		width: 100%;
		margin: 0 auto 12px;
		width: fit-content;
	}
	.quill-image[data-format=center] img {
		width: auto;
		max-width: 75%;
	}
	.quill-image[data-format=left] {
		width: calc(50% - 12px);
		float: left;
		margin: 0 12px 12px 0;
	}
	.quill-image[data-format=right] {
		width: calc(50% - 12px);
		float: right;
		margin: 0 0 12px 12px;
	}
	.quill-image img {
		box-sizing: border-box;
		border: 1px solid transparent;
		transition: box-shadow .15s;
		width: 100%;
	}
	.quill-image:hover img {
		box-shadow: 0 0 0 1px var(--accent-color);
	}

	.quill-image:focus-within img {
		box-shadow: 0 0 0 2px var(--accent-color);
	}

	.quill-image figcaption {
		display: block;
		width: calc(100% - 56px);
		text-align: center;
		line-height: 18px;
		margin: 4px 28px 0;
		padding: 4px 0 0;
		outline: none;
		cursor: text;
		color: rgba(0,0,0,.68);
		font-size: 13px;
		transition: opacity .28s;
	}

	.quill-image figcaption:empty { display: none; }
	.quill-image:focus-within figcaption:empty { display: block; }
	.quill-image:focus-within figcaption:focus-within::before { display: none; }
	.quill-image:focus-within figcaption:empty::before {
		content: "Type caption for image (optional)";
		color: rgba(0,0,0,.33);
		pointer-events: none;
	}

	.quill-image .quill-image__format {
		position: relative;
		height: 32px;
		bottom: 42px;
		margin-bottom: -32px;
		display: flex;
		background-color: rgba(0,0,0,.66);
		border-radius: 4px;
	}

	.quill-image .quill-image__format input {
		--webkit-appearance: none;
		appearance: none;
		width: 1px;
		height: 1px;
		border: none;
		background: transparent;
		padding: 0;
		margin: 0;
		opacity: 0.00001;
	}

	.quill-image .quill-image__format label {
		width: 32px;
		height: 32px;
		display: flex;
		cursor: pointer;
		--webkit-appearance: none;
		appearance: none;
		border: none;
		color: white;
		justify-content: center;
		align-items: center;
		margin: 0;
    padding: 0;
	}
	.quill-image .quill-image__format label::before,
	.quill-image .quill-image__format label::after {
		display: none !important;
	}
	.quill-image .quill-image__format label svg {
		fill: currentColor;
		pointer-events: none;
		width: 26px;
		height: 26px;
	}
	.quill-image .quill-image__format input:checked + label {
		color: var(--accent-color);
	}
	.quill-image  input.quill-image__alt {
		position: relative;
		height: 20px;
		box-sizing: border-box;
		margin-bottom: -20px;
    top: 6px;
    left: 50%;
    transform: translateX(-50%);
    line-height: 20px;
    padding: 0 4px;
    border-radius: 5px;
    background: white;
    border: 1px solid currentColor;
    color: rgba(0,0,0,.25);
    font-size: 11px;
    display: inline;
		width: 24px;
		transition: width .28s, color .15s, border-color .15s;
		z-index: 1;
	}

	.quill-image  input.quill-image__alt:valid {
		color: var(--accent-color);
	}

	.quill-image  input.quill-image__alt:focus {
		width: calc(100% - 2px);
		color: rgb(0,0,0,.85);
	}

	.quill-image  input.quill-image__alt:focus + figcaption {
		opacity: 0;
	}

`;

function makeEmbed(quill, Quill) {
	if (!document.getElementById('quill-image-styles')) { addStyleString('quill-image-styles', STYLES); }

	const Delta = Quill.import('delta');
	const BlockEmbed = Quill.import('blots/block/embed');

	class ImageBlot extends BlockEmbed {
		static create(value) {
			let node = super.create();
			node.id = value.imageId;
			node.setAttribute('contenteditable', false);
			node.setAttribute('tabIndex', -1);
			node.dataset.format = value.format || 'center';
			let img = document.createElement('img');
			img.setAttribute('alt', value.alt || '');
			img.setAttribute('src', value.src);

			let caption = document.createElement('figcaption');
			caption.innerText = value.caption || '';
			caption.setAttribute('tabIndex', -1);

			node.appendChild(img);
			node.appendChild(caption);

			// Quill focuses out on mousedown... Thanks Quill...
			caption.addEventListener('mousedown', (e) => {
				if (document.activeElement === caption) { return; }
				ImageBlot.complexify(node);
			}, true);
			caption.addEventListener('mouseup', () => node.pause = false);

			caption.addEventListener('focus', (e) => {
				selectAll(e.target);
				node.pause = false;
			});

			// Quill futzes with focus out on mousedown... Thanks Quill...
			node.addEventListener('mousedown', () => node.pause = true, true);

			node.addEventListener('focusin', () => {
				const active = document.activeElement;
				if (node !== active || !node.contains(active)) { return; }
				ImageBlot.complexify(node);
				node.pause = false;
			}, false);

			node.addEventListener('focusout', (e) => {
				const active = document.activeElement;
				if (node.pause || node === active || node.contains(active)) { node.pause = false; return; }
				ImageBlot.simplify(node);
				// Force a text-change trigger so consumers get the updated markup!
				setTimeout(() => quill.updateContents(new Delta().retain(Infinity), 'user'), 10);
			}, false);

			return node;
		}

		static complexify(node) {
			if (node.querySelector('.quill-image__format')) { return; }
			const caption = node.querySelector('figcaption');
			caption && caption.setAttribute('contenteditable', true);
			node.insertBefore(makeMenu(node), caption);
			node.insertBefore(makeAltButton(node), caption);
		}

		static simplify(node) {
			const caption = node.querySelector('figcaption');
			caption && caption.removeAttribute('contenteditable');
			Array.from(node.querySelectorAll('.quill-image__format')).forEach(e => e.remove());
			Array.from(node.querySelectorAll('.quill-image__alt')).forEach(e => e.remove());
		}

		static value(node) {
			return {
				imageId: node.id,
				alt: node.querySelector('img').getAttribute('alt') || undefined,
				src: node.querySelector('img').getAttribute('src'),
				caption: node.querySelector('figcaption') ? node.querySelector('figcaption').innerText || undefined : undefined,
				format: node.dataset.format || 'center',
			};
		}

		constructor(dom, attrs){
			super(dom, attrs);
			dom._blot = this;
		}

		value() { return { image: ImageBlot.value(this.domNode) }; }
	}
	ImageBlot.blotName = 'image';
	ImageBlot.tagName = 'figure';
	ImageBlot.className = 'quill-image';
	Quill.register(ImageBlot);
	return ImageBlot;
}

function isQuillImageBlot(node) {
	node = node.domNode || node;
	return !!(node && node.classList && node.classList.contains('quill-image'));
}

function isInsideQuillImageBlot(node) {
	while (node && node !== node.parentElement) {
		if (isQuillImageBlot(node)) { return true; }
		node = node.parentElement;
	}
}

function getPrevQuillImageBlot(node) {
	while (node && node !== node.parent) {
		if (node.prev && isQuillImageBlot(node.prev)) { return node.prev; }
		node = node.parent;
	}
	return null;
}

function getNextQuillImageBlot(node) {
	while (node && node !== node.parent) {
		if (node.next && isQuillImageBlot(node.next)) { return node.next; }
		node = node.parent;
	}
	return null;
}

export const QuillImageBindings = {
	'quill-image:backspace': {
		key: 'backspace',
		handler: function(range, keycontext) {
			const blot = this.quill.getLeaf(range.index)[0];
			const node = blot.domNode;
			if (isQuillImageBlot(node)) { return true; }
			const prevQuillImageBlock = getPrevQuillImageBlot(blot);
			if (prevQuillImageBlock && !blot.value()) {
				this.quill.setSelection(this.quill.getIndex(prevQuillImageBlock), 0);
				prevQuillImageBlock.domNode.focus();
				return false;
			}
			return true;
		}
	},
	'quill-image:up': {
		key: 'up',
		handler: function(range, keycontext) {
			const blot = this.quill.getLeaf(range.index)[0];
			const prevQuillImageBlock = getPrevQuillImageBlot(blot);
			if (prevQuillImageBlock) {
				this.quill.setSelection(this.quill.getIndex(prevQuillImageBlock), 0);
				prevQuillImageBlock.domNode.focus();
				return false;
			}
			return true;
		}
	},
	'quill-image:down': {
		key: 'down',
		handler: function(range, keycontext) {
			const blot = this.quill.getLeaf(range.index)[0];
			const nextQuillImageBlock = getNextQuillImageBlot(blot);
			if (nextQuillImageBlock) {
				this.quill.setSelection(this.quill.getIndex(nextQuillImageBlock), 0);
				nextQuillImageBlock.domNode.focus();
				return false;
			}
			return true;
		}
	},
};

export class QuillImage {

	constructor(quill, options = {}) {
		this.quill = quill;
		this.options = options;
		this.handleDrop = this.handleDrop.bind(this);
		this.handlePaste = this.handlePaste.bind(this);
		this.handleKeyDown = this.handleKeyDown.bind(this);

		this.insert = this.insert.bind(this);
		this.embed = makeEmbed(quill, quill.constructor);

		this.quill.root.addEventListener('drop', this.handleDrop, false);
		this.quill.root.addEventListener('paste', this.handlePaste, false);
		this.quill.root.addEventListener('keydown', this.handleKeyDown, true);

		quill.getModule('toolbar').addHandler('image', (clicked) => {
			if (clicked) {
				let fileInput = quill.container.querySelector('input.ql-image[type=file]')
				if (fileInput == null) {
					fileInput = document.createElement('input')
					fileInput.setAttribute('type', 'file')
					fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon')
					fileInput.classList.add('ql-image')
					fileInput.addEventListener('change', (e) => {
						var files = e.target.files, file;
						if (files.length > 0) {
							file = files[0];
							var type = file.type;
							var reader = new FileReader();
							reader.onload = (e) => {
								this.insert(e.target.result, type, e);
								fileInput.value = '';
							}
							reader.readAsDataURL(file)
						}
					})
				}
				fileInput.click()
			}
		});
	}

	handleKeyDown(e) {

		// TODO: Enable basic text shortcuts anywhere inside of our plugin (stealing them back from Quill).
		if (isInsideQuillImageBlot(e.target)) {
			if (e.keyCode === 65 && e.metaKey) {
				e.preventDefault();
				e.stopImmediatePropagation();
				// TODO: Select All
			}
			else if (e.keyCode === 67 && e.metaKey) {
				e.preventDefault();
				e.stopImmediatePropagation();
				// TODO: Copy
			}
			else if ( e.keyCode === 86 && e.metaKey) {
				e.preventDefault();
				e.stopImmediatePropagation();
				// TODO: Paste
			}
		}

		if (!isQuillImageBlot(e.target)) { return; }

		// Delete
		const scrollPos = document.scrollingElement.scrollTop;
		if (e.keyCode === 8) {
			e.preventDefault();
			e.stopPropagation();
			const idx = this.quill.getIndex(e.target._blot);
			this.quill.deleteText(idx, 1, 'user');
			this.quill.setSelection(idx + 1, 0);
		}
		// Tab Key
		else if (e.keyCode === 9) {
			e.preventDefault();
			e.stopPropagation();
			// TODO: Implement focus trap
		}
		// Enter Key
		else if (e.keyCode === 13 || e.keyCode === 32) {
			e.preventDefault();
			e.stopPropagation();
			// TODO: Implement enter and space key functionality.
		}
		// Up Arrow
		else if (e.keyCode === 38) {
			e.preventDefault();
			e.stopPropagation();
			const idx = this.quill.getIndex(e.target._blot);
			this.quill.setSelection(idx - 1, 0);
			const leaf = this.quill.getLeaf(idx - 1)[0];
			if (isQuillImageBlot(leaf)) { leaf.domNode.focus(); }
		}
		// Down Arrow
		else if (e.keyCode === 40) {
			e.preventDefault();
			e.stopPropagation();
			const idx = this.quill.getIndex(e.target._blot);
			this.quill.setSelection(idx + 1, 0);
			const leaf = this.quill.getLeaf(idx + 1)[0];
			if (isQuillImageBlot(leaf)) { leaf.domNode.focus(); }
		}
		document.scrollingElement.scrollTop = scrollPos;
	}

	/* handle image drop event
	*/
	handleDrop (e) {
		e.preventDefault()
		if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
			if (document.caretRangeFromPoint) {
				const selection = document.getSelection()
				const range = document.caretRangeFromPoint(e.clientX, e.clientY)
				if (selection && range) {
					selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset)
				}
			}
			this.readFiles(e.dataTransfer.files, this.insert, e)
		}
	}

	/* handle image paste event
	*/
	handlePaste (e) {
		if (e.clipboardData && e.clipboardData.items && e.clipboardData.items.length) {
			this.readFiles(e.clipboardData.items, this.insert, e)
		}
	}

	/* read the files
	*/
	readFiles (files, callback, e) {
		[].forEach.call(files, file => {
			var type = file.type
			if (!type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i)) return
			e.preventDefault()
			const reader = new FileReader()
			reader.onload = (e) => {
				callback(e.target.result, type)
			}
			const blob = file.getAsFile ? file.getAsFile() : file
			if (blob instanceof Blob) reader.readAsDataURL(blob)
		})
	}

	/* insert into the editor
	*/
	async insert (dataUrl, type) {
		const quill = this.quill;
		const imageId = guid();
		const index = (quill.getSelection() || {}).index || this.quill.getLength();
		quill.insertEmbed(index, 'image', {
			imageId,
			src: dataUrl,
			alt: undefined,
			caption: undefined,
			format: 'center',
		}, 'user');
		quill.formatText(index, 1, 'image');
		if (typeof this.options.handler === 'function') {
			const url = await this.options.handler(this.quill, imageId, dataUrl, type);
			document.getElementById(imageId).querySelector('img').setAttribute('src', url);
		}
	}
}