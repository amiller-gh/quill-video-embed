const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const UPLOAD = '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512"><path fill="#dae3eb" stroke="#F5F9FC" stroke-width="8" d="M398.1,233.2c0-1.2,0.2-2.4,0.2-3.6c0-65-51.8-117.6-115.7-117.6c-46.1,0-85.7,27.4-104.3,67c-8.1-4.1-17.2-6.5-26.8-6.5c-29.5,0-54.1,21.9-58.8,50.5C57.3,235.2,32,269.1,32,309c0,50.2,40.1,91,89.5,91H224v-80l-48.2,0l80.2-83.7l80.2,83.6l-48.2,0v80h110.3c45.2,0,81.7-37.5,81.7-83.4C480,270.6,443.3,233.3,398.1,233.2z"/></svg>';

export const STYLES = `
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
  max-width: 50%;
  margin: 0 auto 12px;
  width: 100%;
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

.quill-image figcaption, textarea.quill-image__caption-edit {
  display: block;
  width: calc(100% - 56px);
  text-align: center;
  line-height: 18px;
  margin: 4px 28px 0;
  padding: 4px 0 0;
  outline: none;
  color: rgba(0,0,0,.68);
  font-size: 13px;
  transition: opacity .28s;
  position: relative;
  z-index: 2;
}

textarea.quill-image__caption-edit {
  position: absolute;
  padding: 4px 0 0 !important;
  resize: none !important;
  border: none !important;
  top: calc(100% - 4px);
  left: 0;
  transform: translateY(-100%);
  background: transparent;
  z-index: 3;
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
  background-color: rgba(0,0,0,.75);
  border-radius: 4px;
  z-index: 2;
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
  z-index: 4;
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

.quill-image img[src^="${TRANSPARENT_PIXEL}"] {
  width: 100%;
  min-width: 280px;
  max-width: 100%;
  height: 0;
  padding-bottom: 71%;
  background-color: #F5F9FC;
  background-image: linear-gradient(-45deg, transparent calc(50% - 1px), rgb(218, 227, 235) 50%, transparent calc(50% + 1px));
  background-repeat: repeat;
  background-size: 0.6rem 0.6rem;
  background-position: center;
}

.quill-image input[type=file] {
  display: none;
  position: absolute;
  cursor: pointer;
  opacity: 0;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  z-index: 1;
}

.quill-image img[src^="${TRANSPARENT_PIXEL}"] ~ input[type=file] {
  display: block;
}

.quill-image .ql-tooltip { display: none !important; }

.quill-image:focus-within img[src^="${TRANSPARENT_PIXEL}"] {
  width: 100%;
  min-width: 280px;
  max-width: 100%;
  height: 0;
  padding-bottom: 71%;
  background-color: #F5F9FC;
  background-image:
    url(data:image/svg+xml;charset=US-ASCII,${encodeURIComponent(UPLOAD)});
  background-repeat: no-repeat;
  background-size: 50%;
  background-position: center;

}

`;