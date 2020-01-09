import { isQuillImageBlot, isInsideQuillImageBlot } from './utils';
import { QuillImageBindings } from './bindings';
import { STYLES } from './styles';

const guid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c  => (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
function addStyleString(id, str) {
	var node = document.createElement('style');
	node.id = id;
	node.innerHTML = str;
  if (document.readyState === 'loading') {
    return document.addEventListener('DOMContentLoaded', () => document.body.appendChild(node));
  }
  document.body.appendChild(node);
}

const CUSTOM_EVENT_NAME = guid('quill-image-event');
const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
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


function makeEmbed(Quill, options) {
	if (!document.getElementById('quill-image-styles')) { addStyleString('quill-image-styles', STYLES); }

	const BlockEmbed = Quill.import('blots/block/embed');
	let raf = undefined;

	class ImageBlot extends BlockEmbed {
		static create(value) {
			let node = super.create();
			node.id = value.imageId;
			node.setAttribute('contenteditable', false);
			node.setAttribute('tabIndex', -1);
			node.dataset.format = value.format || 'center';
			let img = document.createElement('img');
			img.setAttribute('alt', value.alt || '');
			img.setAttribute('src', value.src || TRANSPARENT_PIXEL);

			let input = document.createElement('input');
			input.setAttribute('type', 'file');
			input.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
			node._input = input;

			let caption = document.createElement('figcaption');
			caption.innerText = value.caption || '';
			caption.setAttribute('tabIndex', -1);

			node.appendChild(img);
			node.appendChild(caption);

			input.addEventListener('change', (e) => {
				var files = e.target.files, file;
				if (files.length > 0) {
					file = files[0];
					const type = file.type;
					const reader = new FileReader();
					reader.onload = async (e) => {
						let dataUrl = e.target.result;
						img.setAttribute('src', dataUrl);
						dataUrl = await options.handler(node.id, dataUrl, type);
						img.setAttribute('src', dataUrl);
						input.value = '';
					}
					reader.readAsDataURL(file)
				}
			});

			caption.addEventListener('focus', (e) => { selectAll(e.target); }, true);

			// Quill focuses out on mousedown... Thanks Quill...
			node.addEventListener('mousedown', (evt) => evt.stopPropagation(), false);
			node.addEventListener('mouseup', (evt) => evt.stopPropagation(), false);
			node.addEventListener('click', (evt) => evt.stopPropagation(), false);
			node.addEventListener('keydown', (evt) => evt.stopPropagation(), false);
			node.addEventListener('keyup', (evt) => evt.stopPropagation(), false);
			node.addEventListener('keypress', (evt) => evt.stopPropagation(), false);
			node.addEventListener('change', (evt) => evt.stopPropagation(), false);
			node.addEventListener('input', (evt) => evt.stopPropagation(), false);
			node.addEventListener('update', (evt) => evt.stopPropagation(), false);
			node.addEventListener('dragover', (evt) => { evt.preventDefault(); evt.target.focus(); evt.dataTransfer.dropEffect = "move"; }, false);
			node.addEventListener('drop', (evt) => {
				if (evt.dataTransfer && evt.dataTransfer.files && evt.dataTransfer.files.length) {
					[].forEach.call(evt.dataTransfer.files, file => {
						var type = file.type
						if (!type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i)) return;
						evt.stopPropagation();
						evt.preventDefault();
						const reader = new FileReader()
						reader.onload = async (e) => {
							let dataUrl = e.target.result;
							img.setAttribute('src', dataUrl);
							dataUrl = await options.handler(node.id, dataUrl, type);
							img.setAttribute('src', dataUrl);
							input.value = '';
						}
						const blob = file.getAsFile ? file.getAsFile() : file
						if (blob instanceof Blob) reader.readAsDataURL(blob)
					});
				}
			}, false);

			node.addEventListener('focusin', () => {
				window.cancelAnimationFrame(raf);
				raf = window.requestAnimationFrame(() => ImageBlot.process(node));
			}, false);

			node.addEventListener('focusout', (e) => {
				window.cancelAnimationFrame(raf);
				raf = window.requestAnimationFrame(() => ImageBlot.process(node));
			}, false);

			return node;
		}

		static process(node) {
			const active = document.activeElement;
			const isFocused = node === active || node.contains(active);
			if (isFocused) { ImageBlot.complexify(node); }
			else { ImageBlot.simplify(node); }
		}

		static complexify(node) {
			console.log('complexify', !!node.querySelector('.quill-image__format'), document.activeElement);
			if (!!node.querySelector('.quill-image__format')) { return; }
			const caption = node.querySelector('figcaption');
			caption && caption.setAttribute('contenteditable', true);
			node.insertBefore(makeMenu(node), caption);
			node.insertBefore(makeAltButton(node), caption);
			node.appendChild(node._input);
		}

		static simplify(node) {
			console.log('simplify', !node.querySelector('.quill-image__format'), document.activeElement);
			if (!node.querySelector('.quill-image__format')) { return; }
			const caption = node.querySelector('figcaption');
			caption && caption.removeAttribute('contenteditable');
			Array.from(node.querySelectorAll('.quill-image__format')).forEach(e => e.remove());
			Array.from(node.querySelectorAll('.quill-image__alt')).forEach(e => e.remove());
			node.removeChild(node._input);
			setTimeout(() => {
				node.dispatchEvent(new Event(CUSTOM_EVENT_NAME, { "bubbles": true }));
			}, 10);
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
			// We need to hold on to the blot instance so our global keyboard handlers can do their jobs.
			dom._blot = this;
		}

		value() { return { image: ImageBlot.value(this.domNode) }; }
		get isBlock() { return true; }
	}
	ImageBlot.blotName = 'image';
	ImageBlot.tagName = 'figure';
	ImageBlot.className = 'quill-image';
	Quill.register(ImageBlot);
	return ImageBlot;
}

class QuillImage {

	constructor(Quill, options = {}) {
		const Delta = Quill.import('delta');

		this.options = options;
		if (typeof this.options.handler !== 'function') {
			this.options.handler = ((_quill, _id, data, _type) => { console.log(data); return data; });
		}

		const self = this;

		this.insert = this.insert.bind(this);
		this.embed = makeEmbed(Quill, options);

    const prev = Quill.prototype.setContents;
    Quill.prototype.setContents = function () {
      const quill = this;
			quill.root.addEventListener('drop', self.handleDrop.bind(self, quill), false);
			quill.root.addEventListener('paste', self.handlePaste.bind(self, quill), false);
			quill.root.addEventListener('keydown', self.handleKeyDown.bind(self, quill), true);

			// Force a text-change event trigger so consumers get the updated markup!
			quill.root.addEventListener(CUSTOM_EVENT_NAME, () => {
				quill.updateContents(new Delta().retain(Infinity), 'user');
			});

			quill.on('editor-change', () => {
				const range = quill.getSelection(false);
				if (range == null) return true;
				const [blot] = quill.getLine(range.index);
				const node = blot.domNode;
				if (isQuillImageBlot(node) && !node.contains(document.activeElement)) { node.focus(); }
				return true;
			});
			return prev.apply(quill, arguments);
		};

	}

	handleKeyDown(quill, e) {

		// TODO: Enable basic text shortcuts anywhere inside of our plugin (stealing them back from Quill).
		if (isInsideQuillImageBlot(e.target)) {
			e.stopImmediatePropagation();
			if (e.target.tagName !== 'TEXTAREA' || e.target.tagName !== 'INPUT') { /* NOOP */ }
			else if (e.keyCode === 65 && e.metaKey) {
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
			const idx = quill.getIndex(e.target._blot);
			quill.deleteText(idx, 1, 'user');
			quill.setSelection(idx + 1, 0);
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
			const idx = quill.getIndex(e.target._blot);
			quill.insertText(idx + 1, '\n', quill.constructor.sources.USER);
			quill.setSelection(idx + 1, quill.constructor.sources.SILENT);
			// TODO: Implement enter and space key functionality.
		}
		// Up / Left Arrow
		else if (e.keyCode === 38 || e.keyCode === 37) {
			e.preventDefault();
			e.stopPropagation();
			const idx = quill.getIndex(e.target._blot);
			quill.setSelection(idx - 1, 0);
			const leaf = quill.getLeaf(idx - 1)[0];
			if (isQuillImageBlot(leaf)) { leaf.domNode.focus(); }
		}
		// Down / Right Arrow
		else if (e.keyCode === 40 || e.keyCode === 39) {
			e.preventDefault();
			e.stopPropagation();
			const idx = quill.getIndex(e.target._blot);
			quill.setSelection(idx + 1, 0);
			const leaf = quill.getLeaf(idx + 1)[0];
			if (isQuillImageBlot(leaf)) { leaf.domNode.focus(); }
		}
		document.scrollingElement.scrollTop = scrollPos;
	}

	/* handle image drop event
	*/
	handleDrop (quill, e) {
		e.preventDefault()
		if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
			if (document.caretRangeFromPoint) {
				const selection = document.getSelection()
				const range = document.caretRangeFromPoint(e.clientX, e.clientY)
				if (selection && range) {
					selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset)
				}
			}
			this.readFiles(e.dataTransfer.files, this.insert.bind(this, quill), e)
		}
	}

	/* handle image paste event
	*/
	handlePaste (quill, e) {
		if (e.clipboardData && e.clipboardData.items && e.clipboardData.items.length) {
			this.readFiles(e.clipboardData.items, this.insert.bind(this, quill), e)
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
	async insert (quill, dataUrl, type) {
		const imageId = guid();
		const index = (quill.getSelection() || {}).index || quill.getLength();
		quill.insertEmbed(index, 'image', {
			imageId,
			src: dataUrl,
			alt: undefined,
			caption: undefined,
			format: 'center',
			handler: this.options.handler,
		}, 'user');
		quill.formatText(index, 1, 'image');
		document.getElementById(imageId).focus();
		if (dataUrl && type) {
			const url = await this.options.handler(quill, imageId, dataUrl, type);
			document.getElementById(imageId).querySelector('img').setAttribute('src', url);
		}
	}
}

export {
	QuillImage,
	QuillImageBindings
};
