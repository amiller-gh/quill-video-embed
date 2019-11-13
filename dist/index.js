'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var guid = function guid() {
	return ([1e7] + -1e3 + -4e3 + -8e3 + -1e11).replace(/[018]/g, function (c) {
		return (c ^ window.crypto.getRandomValues(new Uint8Array(1))[0] & 15 >> c / 4).toString(16);
	});
};
function addStyleString(id, str) {
	var node = document.createElement('style');
	node.id = id;
	node.innerHTML = str;
	document.body.appendChild(node);
}

var FORMATS = ['left', 'center', 'right', 'full'];
var ICONS = {
	left: '<svg><path d="M2 16.99V9.047c0-.112.042-.22.123-.32a.384.384 0 0 1 .32-.152h11.93c.102 0 .2.05.296.15.09.103.14.21.14.322v7.943c0 .122-.05.225-.14.31a.44.44 0 0 1-.31.13H2.44a.427.427 0 0 1-.44-.44zm5.847 3.517v-.87c0-.1.038-.194.114-.28.08-.086.17-.13.27-.13h14.22c.13 0 .23.046.32.14.09.09.14.18.14.27v.87a.42.42 0 0 1-.14.332c-.09.08-.19.13-.31.13H8.23a.34.34 0 0 1-.274-.14.545.545 0 0 1-.107-.34zm0-14.108v-.92c0-.13.038-.23.114-.32a.35.35 0 0 1 .27-.13h14.22c.13 0 .23.04.32.13s.14.19.14.31v.92c0 .09-.04.18-.14.26-.09.08-.19.13-.31.13H8.23c-.1 0-.19-.05-.267-.13a.447.447 0 0 1-.11-.27zm8.497 7.09v-.9c0-.15.048-.27.144-.37a.477.477 0 0 1 .328-.14l5.624-.01c.12 0 .23.04.32.14.093.09.14.21.14.36v.9c0 .11-.047.21-.14.32-.09.1-.2.15-.32.15l-5.625.01c-.12 0-.23-.05-.327-.15a.467.467 0 0 1-.144-.33zm0-3.58v-.86c0-.11.048-.22.144-.32.097-.1.207-.16.328-.15l5.624-.01c.12 0 .23.05.32.15.092.1.14.21.14.32v.87c0 .13-.047.24-.14.32-.09.08-.2.12-.32.12l-5.625.01a.45.45 0 0 1-.334-.13.408.408 0 0 1-.13-.32zm0 7.04v-.9c0-.15.05-.27.146-.37a.474.474 0 0 1 .327-.14l5.624-.01c.13 0 .23.04.33.14.09.09.14.21.14.36v.89c0 .11-.04.21-.13.32-.09.1-.2.15-.32.15l-5.62.01c-.12 0-.23-.05-.32-.16a.485.485 0 0 1-.14-.32z" fill-rule="evenodd"></path></svg>',
	center: '<svg><path d="M5 20.558v-.9c0-.122.04-.226.122-.312a.404.404 0 0 1 .305-.13h13.347a.45.45 0 0 1 .32.13c.092.086.138.19.138.312v.9a.412.412 0 0 1-.138.313.435.435 0 0 1-.32.13H5.427a.39.39 0 0 1-.305-.13.432.432 0 0 1-.122-.31zm0-3.554V9.01c0-.12.04-.225.122-.31a.4.4 0 0 1 .305-.13h13.347c.122 0 .23.043.32.13.092.085.138.19.138.31v7.994a.462.462 0 0 1-.138.328.424.424 0 0 1-.32.145H5.427a.382.382 0 0 1-.305-.145.501.501 0 0 1-.122-.328zM5 6.342v-.87c0-.12.04-.23.122-.327A.382.382 0 0 1 5.427 5h13.347c.122 0 .23.048.32.145a.462.462 0 0 1 .138.328v.87c0 .12-.046.225-.138.31a.447.447 0 0 1-.32.13H5.427a.4.4 0 0 1-.305-.13.44.44 0 0 1-.122-.31z" fill-rule="evenodd"></path></svg>',
	right: '<svg style="transform: rotate(180deg)"><path d="M2 16.99V9.047c0-.112.042-.22.123-.32a.384.384 0 0 1 .32-.152h11.93c.102 0 .2.05.296.15.09.103.14.21.14.322v7.943c0 .122-.05.225-.14.31a.44.44 0 0 1-.31.13H2.44a.427.427 0 0 1-.44-.44zm5.847 3.517v-.87c0-.1.038-.194.114-.28.08-.086.17-.13.27-.13h14.22c.13 0 .23.046.32.14.09.09.14.18.14.27v.87a.42.42 0 0 1-.14.332c-.09.08-.19.13-.31.13H8.23a.34.34 0 0 1-.274-.14.545.545 0 0 1-.107-.34zm0-14.108v-.92c0-.13.038-.23.114-.32a.35.35 0 0 1 .27-.13h14.22c.13 0 .23.04.32.13s.14.19.14.31v.92c0 .09-.04.18-.14.26-.09.08-.19.13-.31.13H8.23c-.1 0-.19-.05-.267-.13a.447.447 0 0 1-.11-.27zm8.497 7.09v-.9c0-.15.048-.27.144-.37a.477.477 0 0 1 .328-.14l5.624-.01c.12 0 .23.04.32.14.093.09.14.21.14.36v.9c0 .11-.047.21-.14.32-.09.1-.2.15-.32.15l-5.625.01c-.12 0-.23-.05-.327-.15a.467.467 0 0 1-.144-.33zm0-3.58v-.86c0-.11.048-.22.144-.32.097-.1.207-.16.328-.15l5.624-.01c.12 0 .23.05.32.15.092.1.14.21.14.32v.87c0 .13-.047.24-.14.32-.09.08-.2.12-.32.12l-5.625.01a.45.45 0 0 1-.334-.13.408.408 0 0 1-.13-.32zm0 7.04v-.9c0-.15.05-.27.146-.37a.474.474 0 0 1 .327-.14l5.624-.01c.13 0 .23.04.33.14.09.09.14.21.14.36v.89c0 .11-.04.21-.13.32-.09.1-.2.15-.32.15l-5.62.01c-.12 0-.23-.05-.32-.16a.485.485 0 0 1-.14-.32z" fill-rule="evenodd"></path></svg>',
	full: '<svg><path d="M3 17.004V9.01a.4.4 0 0 1 .145-.31.476.476 0 0 1 .328-.13h17.74c.12 0 .23.043.327.13a.4.4 0 0 1 .145.31v7.994a.404.404 0 0 1-.145.313.48.48 0 0 1-.328.13H3.472a.483.483 0 0 1-.327-.13.402.402 0 0 1-.145-.313zm2.212 3.554v-.87c0-.13.05-.243.145-.334a.472.472 0 0 1 .328-.137H19c.124 0 .23.045.322.137a.457.457 0 0 1 .138.335v.86c0 .12-.046.22-.138.31a.478.478 0 0 1-.32.13H5.684a.514.514 0 0 1-.328-.13.415.415 0 0 1-.145-.32zm0-14.246v-.84c0-.132.05-.243.145-.334A.477.477 0 0 1 5.685 5H19a.44.44 0 0 1 .322.138.455.455 0 0 1 .138.335v.84a.451.451 0 0 1-.138.334.446.446 0 0 1-.32.138H5.684a.466.466 0 0 1-.328-.138.447.447 0 0 1-.145-.335z" fill-rule="evenodd"></path></svg>'
};

function selectAll(el) {
	if (el.setSelectionRange) {
		el.setSelectionRange(0, el.value.length);
		return;
	}
	var selection = window.getSelection();
	var range = document.createRange();
	range.selectNodeContents(el);
	selection.removeAllRanges();
	selection.addRange(range);
}

function makeMenu(node) {
	var nav = document.createElement('nav');
	nav.className = 'quill-image__format';
	var _iteratorNormalCompletion = true;
	var _didIteratorError = false;
	var _iteratorError = undefined;

	try {
		for (var _iterator = FORMATS[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
			var format = _step.value;

			var button = document.createElement('input');
			var label = document.createElement('label');
			button.id = node.id + '-' + format;
			label.setAttribute('for', button.id);
			label.innerHTML = ICONS[format] || format;
			button.setAttribute('type', 'radio');
			button.textContent = format;

			button.dataset.format = format;
			label.dataset.format = format;
			var activeFormat = node.dataset.format || 'center';
			if (activeFormat === format) button.checked = true;
			button.name = 'format';
			nav.appendChild(button);
			nav.appendChild(label);
		}
	} catch (err) {
		_didIteratorError = true;
		_iteratorError = err;
	} finally {
		try {
			if (!_iteratorNormalCompletion && _iterator.return) {
				_iterator.return();
			}
		} finally {
			if (_didIteratorError) {
				throw _iteratorError;
			}
		}
	}

	nav.addEventListener('click', function (e) {
		var srcEl = e.srcElement;
		node.pause = true;
		node.focus();
		if (srcEl.dataset.format) {
			node.dataset.format = srcEl.dataset.format;
		}
	}, true);

	return nav;
}

function makeAltButton(node) {
	var altButton = document.createElement('input');
	altButton.className = 'quill-image__alt';
	altButton.placeholder = 'Alt text for image (optional)';
	altButton.required = true;
	altButton.value = node.querySelector('img').alt ? "Alt" : "";
	altButton.addEventListener('input', function (e) {
		return node.querySelector('img').alt = altButton.value || "";
	});
	altButton.addEventListener('blur', function (e) {
		return altButton.value = node.querySelector('img').alt ? "Alt" : "";
	});
	altButton.addEventListener('focus', function (e) {
		altButton.value = node.querySelector('img').alt || "";
		selectAll(altButton);
	});
	return altButton;
}

var STYLES = '\n\t.quill-image {\n\t\t--accent-color: #3eb0ef;\n\t\tdisplay: flex;\n\t\tflex-flow: column;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\toutline: none;\n\t\tcursor: pointer;\n\t\tposition: relative;\n\t}\n\t.quill-image[data-format=full] {\n\t\twidth: 100%;\n\t\tmargin: 0 0 12px;\n\t}\n\t.quill-image[data-format=center] {\n\t\twidth: 100%;\n\t\tmargin: 0 auto 12px;\n\t\twidth: fit-content;\n\t}\n\t.quill-image[data-format=center] img {\n\t\twidth: auto;\n\t}\n\t.quill-image[data-format=left] {\n\t\twidth: calc(50% - 12px);\n\t\tfloat: left;\n\t\tmargin: 0 12px 12px 0;\n\t}\n\t.quill-image[data-format=right] {\n\t\twidth: calc(50% - 12px);\n\t\tfloat: right;\n\t\tmargin: 0 0 12px 12px;\n\t}\n\t.quill-image img {\n\t\tbox-sizing: border-box;\n\t\tborder: 1px solid transparent;\n\t\ttransition: box-shadow .15s;\n\t\twidth: 100%;\n\t}\n\t.quill-image:hover img {\n\t\tbox-shadow: 0 0 0 1px var(--accent-color);\n\t}\n\n\t.quill-image:focus-within img {\n\t\tbox-shadow: 0 0 0 2px var(--accent-color);\n\t}\n\n\t.quill-image figcaption {\n\t\tdisplay: block;\n\t\twidth: 100%;\n\t\theight: 24px;\n\t\ttext-align: center;\n\t\tline-height: 24px;\n\t\tmargin-top: 4px;\n\t\toutline: none;\n\t\tcursor: text;\n\t\tcolor: rgba(0,0,0,.68);\n\t\tfont-size: 13px;\n\t}\n\n\t.quill-image figcaption:empty { display: none; }\n\t.quill-image:focus-within figcaption:empty { display: block; }\n\t.quill-image:focus-within figcaption:focus-within::before { display: none; }\n\t.quill-image:focus-within figcaption:empty::before {\n\t\tcontent: "Type caption for image (optional)";\n\t\tcolor: rgba(0,0,0,.33);\n\t\tpointer-events: none;\n\t}\n\n\t.quill-image .quill-image__format {\n\t\tposition: absolute;\n\t\tbottom: 36px;\n\t\tleft: 50%;\n\t\ttransform: translateX(-50%);\n\t\tdisplay: flex;\n\t\tbackground-color: rgba(0,0,0,.66);\n\t\tborder-radius: 4px;\n\t}\n\n\t.quill-image .quill-image__format input {\n\t\t--webkit-appearance: none;\n\t\tappearance: none;\n\t\twidth: 1px;\n\t\theight: 1px;\n\t\tborder: none;\n\t\tbackground: transparent;\n\t\tpadding: 0;\n\t\tmargin: 0;\n\t\topacity: 0.00001;\n\t}\n\n\t.quill-image .quill-image__format label {\n\t\twidth: 32px;\n\t\theight: 32px;\n\t\tdisplay: flex;\n\t\tcursor: pointer;\n\t\t--webkit-appearance: none;\n\t\tappearance: none;\n\t\tborder: none;\n\t\tcolor: white;\n\t\tjustify-content: center;\n\t\talign-items: center;\n\t\tmargin: 0;\n    padding: 0;\n\t}\n\t.quill-image .quill-image__format label::before,\n\t.quill-image .quill-image__format label::after {\n\t\tdisplay: none !important;\n\t}\n\t.quill-image .quill-image__format label svg {\n\t\tfill: currentColor;\n\t\tpointer-events: none;\n\t\twidth: 26px;\n\t\theight: 26px;\n\t}\n\t.quill-image .quill-image__format input:checked + label {\n\t\tcolor: var(--accent-color);\n\t}\n\t.quill-image  input.quill-image__alt {\n\t\tposition: absolute;\n    bottom: 3px;\n    right: 1px;\n    line-height: 18px;\n    padding: 0 4px;\n    border-radius: 5px;\n    background: white;\n    border: 1px solid currentColor;\n    color: rgba(0,0,0,.25);\n    font-size: 11px;\n    display: inline;\n\t\twidth: 24px;\n\t\ttransition: width .28s, color .15s, border-color .15s;\n\t}\n\t.quill-image  input.quill-image__alt:valid {\n\t\tcolor: var(--accent-color);\n\t}\n\t.quill-image  input.quill-image__alt:focus {\n\t\twidth: calc(100% - 2px);\n\t\tcolor: rgb(0,0,0,.85);\n\t}\n\n';

function makeEmbed(quill, Quill) {
	if (!document.getElementById('quill-image-styles')) {
		addStyleString('quill-image-styles', STYLES);
	}

	var Delta = Quill.import('delta');
	var BlockEmbed = Quill.import('blots/block/embed');

	var ImageBlot = function (_BlockEmbed) {
		_inherits(ImageBlot, _BlockEmbed);

		_createClass(ImageBlot, null, [{
			key: 'create',
			value: function create(value) {
				var node = _get(ImageBlot.__proto__ || Object.getPrototypeOf(ImageBlot), 'create', this).call(this);
				node.id = value.imageId;
				node.setAttribute('contenteditable', false);
				node.setAttribute('tabIndex', -1);
				node.dataset.format = value.format || 'center';
				var img = document.createElement('img');
				img.setAttribute('alt', value.alt || '');
				img.setAttribute('src', value.src);

				var caption = document.createElement('figcaption');
				caption.innerText = value.caption || '';
				caption.setAttribute('tabIndex', -1);

				node.appendChild(img);
				node.appendChild(caption);

				// Quill focuses out on mousedown... Thanks Quill...
				caption.addEventListener('mousedown', function (e) {
					if (document.activeElement === caption) {
						return;
					}
					ImageBlot.complexify(node);
				}, true);
				caption.addEventListener('mouseup', function () {
					return node.pause = false;
				});

				caption.addEventListener('focus', function (e) {
					selectAll(e.target);
					node.pause = false;
				});

				// Quill futzes with focus out on mousedown... Thanks Quill...
				node.addEventListener('mousedown', function () {
					return node.pause = true;
				}, true);

				node.addEventListener('focusin', function () {
					var active = document.activeElement;
					if (node !== active || !node.contains(active)) {
						return;
					}
					ImageBlot.complexify(node);
					node.pause = false;
				}, false);

				node.addEventListener('focusout', function (e) {
					var active = document.activeElement;
					if (node.pause || node === active || node.contains(active)) {
						node.pause = false;return;
					}
					ImageBlot.simplify(node);
					// Force a text-change trigger so consumers get the updated markup!
					setTimeout(function () {
						return quill.updateContents(new Delta().retain(Infinity), 'user');
					}, 10);
				}, false);

				return node;
			}
		}, {
			key: 'complexify',
			value: function complexify(node) {
				if (node.querySelector('.quill-image__format')) {
					return;
				}
				node.querySelector('figcaption').setAttribute('contenteditable', true);
				node.appendChild(makeMenu(node));
				node.appendChild(makeAltButton(node));
			}
		}, {
			key: 'simplify',
			value: function simplify(node) {
				node.querySelector('figcaption').removeAttribute('contenteditable');
				Array.from(node.querySelectorAll('.quill-image__format')).forEach(function (e) {
					return e.remove();
				});
				Array.from(node.querySelectorAll('.quill-image__alt')).forEach(function (e) {
					return e.remove();
				});
			}
		}, {
			key: 'value',
			value: function value(node) {
				return {
					imageId: node.id,
					alt: node.querySelector('img').getAttribute('alt') || undefined,
					src: node.querySelector('img').getAttribute('src'),
					caption: node.querySelector('figcaption').innerText || undefined,
					format: node.dataset.format || 'center'
				};
			}
		}]);

		function ImageBlot(dom, attrs) {
			_classCallCheck(this, ImageBlot);

			var _this = _possibleConstructorReturn(this, (ImageBlot.__proto__ || Object.getPrototypeOf(ImageBlot)).call(this, dom, attrs));

			dom._blot = _this;
			return _this;
		}

		_createClass(ImageBlot, [{
			key: 'value',
			value: function value() {
				return { image: ImageBlot.value(this.domNode) };
			}
		}]);

		return ImageBlot;
	}(BlockEmbed);

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
		if (isQuillImageBlot(node)) {
			return true;
		}
		node = node.parentElement;
	}
}

function getPrevQuillImageBlot(node) {
	while (node && node !== node.parent) {
		if (node.prev && isQuillImageBlot(node.prev)) {
			return node.prev;
		}
		node = node.parent;
	}
	return null;
}

function getNextQuillImageBlot(node) {
	while (node && node !== node.parent) {
		if (node.next && isQuillImageBlot(node.next)) {
			return node.next;
		}
		node = node.parent;
	}
	return null;
}

var QuillImageBindings = exports.QuillImageBindings = {
	'quill-image:backspace': {
		key: 'backspace',
		handler: function handler(range, keycontext) {
			var blot = this.quill.getLeaf(range.index)[0];
			var node = blot.domNode;
			if (isQuillImageBlot(node)) {
				return true;
			}
			var prevQuillImageBlock = getPrevQuillImageBlot(blot);
			if (prevQuillImageBlock) {
				this.quill.setSelection(this.quill.getIndex(prevQuillImageBlock), 0);
				prevQuillImageBlock.domNode.focus();
				return false;
			}
			return true;
		}
	},
	'quill-image:up': {
		key: 'up',
		handler: function handler(range, keycontext) {
			var blot = this.quill.getLeaf(range.index)[0];
			var prevQuillImageBlock = getPrevQuillImageBlot(blot);
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
		handler: function handler(range, keycontext) {
			var blot = this.quill.getLeaf(range.index)[0];
			var nextQuillImageBlock = getNextQuillImageBlot(blot);
			if (nextQuillImageBlock) {
				this.quill.setSelection(this.quill.getIndex(nextQuillImageBlock), 0);
				nextQuillImageBlock.domNode.focus();
				return false;
			}
			return true;
		}
	}
};

var QuillImage = exports.QuillImage = function () {
	function QuillImage(quill) {
		var _this2 = this;

		var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

		_classCallCheck(this, QuillImage);

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

		quill.getModule('toolbar').addHandler('image', function (clicked) {
			if (clicked) {
				var fileInput = quill.container.querySelector('input.ql-image[type=file]');
				if (fileInput == null) {
					fileInput = document.createElement('input');
					fileInput.setAttribute('type', 'file');
					fileInput.setAttribute('accept', 'image/png, image/gif, image/jpeg, image/bmp, image/x-icon');
					fileInput.classList.add('ql-image');
					fileInput.addEventListener('change', function (e) {
						var files = e.target.files,
						    file;
						if (files.length > 0) {
							file = files[0];
							var type = file.type;
							var reader = new FileReader();
							reader.onload = function (e) {
								_this2.insert(e.target.result, type, e);
								fileInput.value = '';
							};
							reader.readAsDataURL(file);
						}
					});
				}
				fileInput.click();
			}
		});
	}

	_createClass(QuillImage, [{
		key: 'handleKeyDown',
		value: function handleKeyDown(e) {

			// TODO: Enable basic text shortcuts anywhere inside of our plugin (stealing them back from Quill).
			if (isInsideQuillImageBlot(e.target)) {
				if (e.keyCode === 65 && e.metaKey) {
					e.preventDefault();
					e.stopImmediatePropagation();
					// TODO: Select All
				} else if (e.keyCode === 67 && e.metaKey) {
					e.preventDefault();
					e.stopImmediatePropagation();
					// TODO: Copy
				} else if (e.keyCode === 86 && e.metaKey) {
					e.preventDefault();
					e.stopImmediatePropagation();
					// TODO: Paste
				}
			}

			if (!isQuillImageBlot(e.target)) {
				return;
			}

			// Delete
			var scrollPos = document.scrollingElement.scrollTop;
			if (e.keyCode === 8) {
				e.preventDefault();
				e.stopPropagation();
				var idx = this.quill.getIndex(e.target._blot);
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
							var _idx = this.quill.getIndex(e.target._blot);
							this.quill.setSelection(_idx - 1, 0);
							var leaf = this.quill.getLeaf(_idx - 1)[0];
							if (isQuillImageBlot(leaf)) {
								leaf.domNode.focus();
							}
						}
						// Down Arrow
						else if (e.keyCode === 40) {
								e.preventDefault();
								e.stopPropagation();
								var _idx2 = this.quill.getIndex(e.target._blot);
								this.quill.setSelection(_idx2 + 1, 0);
								var _leaf = this.quill.getLeaf(_idx2 + 1)[0];
								if (isQuillImageBlot(_leaf)) {
									_leaf.domNode.focus();
								}
							}
			document.scrollingElement.scrollTop = scrollPos;
		}

		/* handle image drop event
  */

	}, {
		key: 'handleDrop',
		value: function handleDrop(e) {
			e.preventDefault();
			if (e.dataTransfer && e.dataTransfer.files && e.dataTransfer.files.length) {
				if (document.caretRangeFromPoint) {
					var selection = document.getSelection();
					var range = document.caretRangeFromPoint(e.clientX, e.clientY);
					if (selection && range) {
						selection.setBaseAndExtent(range.startContainer, range.startOffset, range.startContainer, range.startOffset);
					}
				}
				this.readFiles(e.dataTransfer.files, this.insert, e);
			}
		}

		/* handle image paste event
  */

	}, {
		key: 'handlePaste',
		value: function handlePaste(e) {
			if (e.clipboardData && e.clipboardData.items && e.clipboardData.items.length) {
				this.readFiles(e.clipboardData.items, this.insert, e);
			}
		}

		/* read the files
  */

	}, {
		key: 'readFiles',
		value: function readFiles(files, callback, e) {
			[].forEach.call(files, function (file) {
				var type = file.type;
				if (!type.match(/^image\/(gif|jpe?g|a?png|svg|webp|bmp)/i)) return;
				e.preventDefault();
				var reader = new FileReader();
				reader.onload = function (e) {
					callback(e.target.result, type);
				};
				var blob = file.getAsFile ? file.getAsFile() : file;
				if (blob instanceof Blob) reader.readAsDataURL(blob);
			});
		}

		/* insert into the editor
  */

	}, {
		key: 'insert',
		value: async function insert(dataUrl, type) {
			var quill = this.quill;
			var imageId = guid();
			var index = (quill.getSelection() || {}).index || this.quill.getLength();
			quill.insertEmbed(index, 'image', {
				imageId: imageId,
				src: dataUrl,
				alt: undefined,
				caption: undefined,
				format: 'center'
			}, 'user');
			quill.formatText(index, 1, 'image');
			if (typeof this.options.handler === 'function') {
				var url = await this.options.handler(this.quill, dataUrl, type);
				document.getElementById(id).querySelector('img').setAttribute('src', url);
			}
		}
	}]);

	return QuillImage;
}();

