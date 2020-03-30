const getVideoId = require('get-video-id');

import { isQuillVideoBlot, isInsideQuillVideoBlot } from './utils';
import { QuillVideoBindings } from './bindings';
import { STYLES } from './styles';

const guid = () => ([1e7]+-1e3+-4e3+-8e3+-1e11).replace(/[018]/g, c  => (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16));
function addStyleString(id, str) {
	var node = document.createElement('style');
	node.id = id;
	node.innerHTML = str;
  if (document.readyState === 'loading') {
    return document.addEventListener('DOMContentLoaded', () => document.head.appendChild(node));
  }
  document.head.appendChild(node);
}

const CUSTOM_BLUR_EVENT_NAME = guid('quill-video-event');
const CUSTOM_FOCUS_EVENT_NAME = guid('quill-video-focus');
const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const FORMATS = [ 'left', 'center', 'right', 'full' ];
const ICONS = {
	left: '<svg><path d="M2 16.99V9.047c0-.112.042-.22.123-.32a.384.384 0 0 1 .32-.152h11.93c.102 0 .2.05.296.15.09.103.14.21.14.322v7.943c0 .122-.05.225-.14.31a.44.44 0 0 1-.31.13H2.44a.427.427 0 0 1-.44-.44zm5.847 3.517v-.87c0-.1.038-.194.114-.28.08-.086.17-.13.27-.13h14.22c.13 0 .23.046.32.14.09.09.14.18.14.27v.87a.42.42 0 0 1-.14.332c-.09.08-.19.13-.31.13H8.23a.34.34 0 0 1-.274-.14.545.545 0 0 1-.107-.34zm0-14.108v-.92c0-.13.038-.23.114-.32a.35.35 0 0 1 .27-.13h14.22c.13 0 .23.04.32.13s.14.19.14.31v.92c0 .09-.04.18-.14.26-.09.08-.19.13-.31.13H8.23c-.1 0-.19-.05-.267-.13a.447.447 0 0 1-.11-.27zm8.497 7.09v-.9c0-.15.048-.27.144-.37a.477.477 0 0 1 .328-.14l5.624-.01c.12 0 .23.04.32.14.093.09.14.21.14.36v.9c0 .11-.047.21-.14.32-.09.1-.2.15-.32.15l-5.625.01c-.12 0-.23-.05-.327-.15a.467.467 0 0 1-.144-.33zm0-3.58v-.86c0-.11.048-.22.144-.32.097-.1.207-.16.328-.15l5.624-.01c.12 0 .23.05.32.15.092.1.14.21.14.32v.87c0 .13-.047.24-.14.32-.09.08-.2.12-.32.12l-5.625.01a.45.45 0 0 1-.334-.13.408.408 0 0 1-.13-.32zm0 7.04v-.9c0-.15.05-.27.146-.37a.474.474 0 0 1 .327-.14l5.624-.01c.13 0 .23.04.33.14.09.09.14.21.14.36v.89c0 .11-.04.21-.13.32-.09.1-.2.15-.32.15l-5.62.01c-.12 0-.23-.05-.32-.16a.485.485 0 0 1-.14-.32z" fill-rule="evenodd"></path></svg>',
	center: '<svg><path d="M5 20.558v-.9c0-.122.04-.226.122-.312a.404.404 0 0 1 .305-.13h13.347a.45.45 0 0 1 .32.13c.092.086.138.19.138.312v.9a.412.412 0 0 1-.138.313.435.435 0 0 1-.32.13H5.427a.39.39 0 0 1-.305-.13.432.432 0 0 1-.122-.31zm0-3.554V9.01c0-.12.04-.225.122-.31a.4.4 0 0 1 .305-.13h13.347c.122 0 .23.043.32.13.092.085.138.19.138.31v7.994a.462.462 0 0 1-.138.328.424.424 0 0 1-.32.145H5.427a.382.382 0 0 1-.305-.145.501.501 0 0 1-.122-.328zM5 6.342v-.87c0-.12.04-.23.122-.327A.382.382 0 0 1 5.427 5h13.347c.122 0 .23.048.32.145a.462.462 0 0 1 .138.328v.87c0 .12-.046.225-.138.31a.447.447 0 0 1-.32.13H5.427a.4.4 0 0 1-.305-.13.44.44 0 0 1-.122-.31z" fill-rule="evenodd"></path></svg>',
	right: '<svg style="transform: rotate(180deg)"><path d="M2 16.99V9.047c0-.112.042-.22.123-.32a.384.384 0 0 1 .32-.152h11.93c.102 0 .2.05.296.15.09.103.14.21.14.322v7.943c0 .122-.05.225-.14.31a.44.44 0 0 1-.31.13H2.44a.427.427 0 0 1-.44-.44zm5.847 3.517v-.87c0-.1.038-.194.114-.28.08-.086.17-.13.27-.13h14.22c.13 0 .23.046.32.14.09.09.14.18.14.27v.87a.42.42 0 0 1-.14.332c-.09.08-.19.13-.31.13H8.23a.34.34 0 0 1-.274-.14.545.545 0 0 1-.107-.34zm0-14.108v-.92c0-.13.038-.23.114-.32a.35.35 0 0 1 .27-.13h14.22c.13 0 .23.04.32.13s.14.19.14.31v.92c0 .09-.04.18-.14.26-.09.08-.19.13-.31.13H8.23c-.1 0-.19-.05-.267-.13a.447.447 0 0 1-.11-.27zm8.497 7.09v-.9c0-.15.048-.27.144-.37a.477.477 0 0 1 .328-.14l5.624-.01c.12 0 .23.04.32.14.093.09.14.21.14.36v.9c0 .11-.047.21-.14.32-.09.1-.2.15-.32.15l-5.625.01c-.12 0-.23-.05-.327-.15a.467.467 0 0 1-.144-.33zm0-3.58v-.86c0-.11.048-.22.144-.32.097-.1.207-.16.328-.15l5.624-.01c.12 0 .23.05.32.15.092.1.14.21.14.32v.87c0 .13-.047.24-.14.32-.09.08-.2.12-.32.12l-5.625.01a.45.45 0 0 1-.334-.13.408.408 0 0 1-.13-.32zm0 7.04v-.9c0-.15.05-.27.146-.37a.474.474 0 0 1 .327-.14l5.624-.01c.13 0 .23.04.33.14.09.09.14.21.14.36v.89c0 .11-.04.21-.13.32-.09.1-.2.15-.32.15l-5.62.01c-.12 0-.23-.05-.32-.16a.485.485 0 0 1-.14-.32z" fill-rule="evenodd"></path></svg>',
	full: '<svg><path d="M3 17.004V9.01a.4.4 0 0 1 .145-.31.476.476 0 0 1 .328-.13h17.74c.12 0 .23.043.327.13a.4.4 0 0 1 .145.31v7.994a.404.404 0 0 1-.145.313.48.48 0 0 1-.328.13H3.472a.483.483 0 0 1-.327-.13.402.402 0 0 1-.145-.313zm2.212 3.554v-.87c0-.13.05-.243.145-.334a.472.472 0 0 1 .328-.137H19c.124 0 .23.045.322.137a.457.457 0 0 1 .138.335v.86c0 .12-.046.22-.138.31a.478.478 0 0 1-.32.13H5.684a.514.514 0 0 1-.328-.13.415.415 0 0 1-.145-.32zm0-14.246v-.84c0-.132.05-.243.145-.334A.477.477 0 0 1 5.685 5H19a.44.44 0 0 1 .322.138.455.455 0 0 1 .138.335v.84a.451.451 0 0 1-.138.334.446.446 0 0 1-.32.138H5.684a.466.466 0 0 1-.328-.138.447.447 0 0 1-.145-.335z" fill-rule="evenodd"></path></svg>',
}

function getVideoUrl(url) {
	if (!url) { return TRANSPARENT_PIXEL; }
	const { id, service } = getVideoId(url);
	if (!id || !service) { return TRANSPARENT_PIXEL; }
	switch (service) {
		case 'youtube': return `https://www.youtube.com/embed/${id}`;
		case 'vimeo': return `https://player.vimeo.com/video/${id}`;
		case 'vine': return `https://vine.co/v/${id}/embed/simple`;
		case 'videopress': return `https://videopress.com/embed/${id}`;
		default: return TRANSPARENT_PIXEL;
	}
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
	nav.className = 'quill-video__format';
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
	altButton.className = 'quill-video__alt';
	altButton.placeholder = 'Title text for video (optional)';
	altButton.required = true;
	altButton.value = node.querySelector('iframe').title ? "Title" : "";

	altButton.addEventListener('keydown', e => e.keyCode === 13 ? e.preventDefault() : null, true);
	altButton.addEventListener('keyup', e => e.keyCode === 13 ? e.preventDefault() : null, true);
	altButton.addEventListener('keypress', e => e.keyCode === 13 ? e.preventDefault() : null, true);

	altButton.addEventListener('input', e => node.querySelector('iframe').title = altButton.value || "");
	altButton.addEventListener('blur', e => altButton.value = node.querySelector('iframe').title ? "Title" : "");
	altButton.addEventListener('focus', e => {
		altButton.value = node.querySelector('iframe').title || "";
		selectAll(altButton);
	});
	return altButton;
}

function makeLinkButton(node) {
	const linkButton = document.createElement('input');

	const iframe = node.querySelector('iframe');
	linkButton.className = 'quill-video__link';
	linkButton.placeholder = 'https://youtube.com/embed/000000000000';
	linkButton.required = true;
	linkButton.type = 'url';
	linkButton.value = iframe && iframe.getAttribute('src') !== TRANSPARENT_PIXEL ? iframe.getAttribute('src') : '';

	linkButton.addEventListener('keydown', e => e.keyCode === 13 ? e.preventDefault() : null, true);
	linkButton.addEventListener('keyup', e => e.keyCode === 13 ? e.preventDefault() : null, true);
	linkButton.addEventListener('keypress', e => e.keyCode === 13 ? e.preventDefault() : null, true);

	linkButton.addEventListener('input', e => {
		iframe.setAttribute('src', getVideoUrl(linkButton.value));
	});
	linkButton.addEventListener('blur', e => {
		iframe.setAttribute('src', getVideoUrl(linkButton.value));
	});
	linkButton.addEventListener('focus', e => {
		const url = iframe.getAttribute('src');
		linkButton.value = url && url !== TRANSPARENT_PIXEL ? url : '';
		selectAll(linkButton);
	});
	return linkButton;
}

function makeCaptionEdit(node){
	const captionInput = document.createElement('textarea');
	captionInput.className = 'quill-video__caption-edit';
	captionInput.placeholder = 'Type caption for video (optional)';
	captionInput.value = node.querySelector('figcaption').innerText.trim();
	captionInput.style.height = node.querySelector('figcaption').getBoundingClientRect().height + 'px';

	captionInput.addEventListener('input', e => {
		const el = node.querySelector('figcaption');
		el.innerText = e.target.value + '\n';
		captionInput.style.height = el.getBoundingClientRect().height + 'px';
	});

	captionInput.addEventListener('focus', e => { selectAll(e.target); });
	captionInput.addEventListener('keydown', e => e.keyCode === 13 ? e.preventDefault() : null, true);
	captionInput.addEventListener('keyup', e => e.keyCode === 13 ? e.preventDefault() : null, true);
	captionInput.addEventListener('keypress', e => e.keyCode === 13 ? e.preventDefault() : null, true);

	return captionInput;
}

function makeEmbed(Quill, options) {
	if (!document.getElementById('quill-video-styles')) { addStyleString('quill-video-styles', STYLES); }

	const BlockEmbed = Quill.import('blots/block/embed');

	class VideoBlot extends BlockEmbed {
		static create(value) {
			let node = super.create();
			node.id = value.videoId;
			node.setAttribute('contenteditable', false);
			node.setAttribute('tabIndex', -1);
			node.dataset.format = value.format || 'center';

			const wrapper = document.createElement('div');
			wrapper.classList.add('quill-video__wrapper');

			let iframe = document.createElement('iframe');
			iframe.setAttribute('title', value.title || '');
			iframe.setAttribute('src', getVideoUrl(value.src));
			iframe.setAttribute('frameborder', '0');
			iframe.setAttribute('allow', 'accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture');
			iframe.setAttribute('allowfullscreen', '1');

			let caption = document.createElement('figcaption');
			caption.innerText = value.caption || '';
			caption.setAttribute('tabIndex', -1);

			wrapper.appendChild(iframe);
			node.appendChild(wrapper);
			node.appendChild(caption);

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

			let raf = undefined;
			node.addEventListener('focusin', (e) => {
				window.cancelAnimationFrame(raf);
				raf = window.requestAnimationFrame(() => VideoBlot.process(node));
			}, false);

			node.addEventListener('focusout', (e) => {
				window.cancelAnimationFrame(raf);
			  raf = window.requestAnimationFrame(() => VideoBlot.process(node));
			}, false);

			return node;
		}

		static process(node) {
			const active = document.activeElement;
			const isFocused = node === active || node.contains(active);
			if (isFocused) { VideoBlot.complexify(node); }
			else { VideoBlot.simplify(node); }
		}

		static complexify(node) {
			const active = document.activeElement;
			if (!!node.querySelector('.quill-video__format')) { return; }
			// console.log('complexify', node.id);
			const caption = node.querySelector('figcaption');
			node.insertBefore(makeMenu(node), caption);
			node.insertBefore(makeAltButton(node), caption);
			node.insertBefore(makeLinkButton(node), caption);
			node.insertBefore(makeCaptionEdit(node), caption);
			if (active === caption) {
				node.querySelector('textarea').focus();
			}

			setTimeout(() => {
				node.dispatchEvent(new Event(CUSTOM_FOCUS_EVENT_NAME, { "bubbles": true }));
			}, 10);
		}

		static simplify(node) {
			if (!node.querySelector('.quill-video__format')) { return; }
			// console.log('simplify', node.id);
			const caption = node.querySelector('figcaption');
			caption.innerText = caption.innerText.trim();
			Array.from(node.querySelectorAll('.quill-video__format')).forEach(e => e.remove());
			Array.from(node.querySelectorAll('.quill-video__alt')).forEach(e => e.remove());
			Array.from(node.querySelectorAll('.quill-video__link')).forEach(e => e.remove());
			Array.from(node.querySelectorAll('.quill-video__caption-edit')).forEach(e => e.remove());
			setTimeout(() => {
				node.dispatchEvent(new Event(CUSTOM_BLUR_EVENT_NAME, { "bubbles": true }));
			}, 10);
		}

		static value(node) {
			return {
				videoId: node.id,
				alt: node.querySelector('iframe').getAttribute('title') || undefined,
				src: node.querySelector('iframe').getAttribute('src'),
				caption: node.querySelector('figcaption') ? node.querySelector('figcaption').innerText || undefined : undefined,
				format: node.dataset.format || 'center',
			};
		}

		constructor(dom, attrs){
			super(dom, attrs);
			// We need to hold on to the blot instance so our global keyboard handlers can do their jobs.
			dom._blot = this;
		}

		value() { return { video: VideoBlot.value(this.domNode) }; }
		get isBlock() { return true; }
	}
	VideoBlot.blotName = 'video';
	VideoBlot.tagName = 'figure';
	VideoBlot.className = 'quill-video';
	Quill.register(VideoBlot);
	return VideoBlot;
}

class QuillVideo {

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
			quill.root.addEventListener('keydown', self.handleKeyDown.bind(self, quill), true);

			// Force a text-change event trigger so consumers get the updated markup!
			quill.root.addEventListener(CUSTOM_BLUR_EVENT_NAME, () => {
				quill.updateContents(new Delta().retain(Infinity), 'user');
			});

			quill.root.addEventListener(CUSTOM_FOCUS_EVENT_NAME, (e) => {
				const el = document.activeElement;
				const idx = quill.getIndex(e.target._blot);
				quill.setSelection(idx, 0, 'silent');
				el.focus();
			});

			quill.on('editor-change', () => {
				const range = quill.getSelection(false);
				if (range == null) return true;
				const [blot] = quill.getLine(range.index);
				const node = blot.domNode;
				const prev = window.scrollTop
				window.requestAnimationFrame(() => {
					if(node === document.activeElement || node.contains(document.activeElement)) { return; }
					if (isQuillVideoBlot(node) && !node.querySelector('.quill-video__format')) { node.focus(); }
					window.scrollTop = prev;
				});
				return true;
			});

			return prev.apply(quill, arguments);
		};

	}

	handleKeyDown(quill, e) {

		// TODO: Enable basic text shortcuts anywhere inside of our plugin (stealing them back from Quill).
		if (isInsideQuillVideoBlot(e.target)) {
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

		if (!isQuillVideoBlot(e.target)) { return; }

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
			if (isQuillVideoBlot(leaf)) { leaf.domNode.focus(); }
		}
		// Down / Right Arrow
		else if (e.keyCode === 40 || e.keyCode === 39) {
			e.preventDefault();
			e.stopPropagation();
			const idx = quill.getIndex(e.target._blot);
			quill.setSelection(idx + 1, 0);
			const leaf = quill.getLeaf(idx + 1)[0];
			if (isQuillVideoBlot(leaf)) { leaf.domNode.focus(); }
		}
		document.scrollingElement.scrollTop = scrollPos;
	}

	/* insert into the editor
	*/
	async insert (quill, dataUrl, type) {
		const videoId = guid();
		const index = (quill.getSelection() || {}).index || quill.getLength();
		quill.insertEmbed(index, 'video', {
			videoId,
			src: dataUrl,
			alt: undefined,
			link: undefined,
			caption: undefined,
			format: 'center',
			handler: this.options.handler,
		}, 'user');
		quill.formatText(index, 1, 'video');
		document.getElementById(videoId).focus();
	}
}

export {
	QuillVideo,
	QuillVideoBindings
};
