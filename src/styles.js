const TRANSPARENT_PIXEL = 'data:image/gif;base64,R0lGODlhAQABAIAAAAAAAP///yH5BAEAAAAALAAAAAABAAEAAAIBRAA7';
const PLAY = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 598 354" style="enable-background:new 0 0 598 354;">
  <path fill="#dae3eb" d="M557.18,0H40.82C18.31,0,0,18.31,0,40.82v272.35C0,335.68,18.31,354,40.82,354h516.36c22.51,0,40.82-18.32,40.82-40.83
  V40.82C598,18.31,579.69,0,557.18,0z M560,313.17c0,1.56-1.27,2.83-2.82,2.83H40.82c-1.55,0-2.82-1.27-2.82-2.83V40.82
  c0-1.56,1.27-2.82,2.82-2.82h516.36c1.55,0,2.82,1.26,2.82,2.82V313.17z"/>
  <path fill="#dae3eb" d="M361.97,146.81l-90.68-55.26c-10.9-6.64-24.58-6.89-35.71-0.64c-11.12,6.25-18.04,18.06-18.04,30.82v110.53
  c0,12.76,6.92,24.57,18.04,30.82c5.38,3.02,11.35,4.52,17.31,4.52c6.39,0,12.77-1.72,18.4-5.16l90.68-55.26
  c10.62-6.47,16.95-17.75,16.95-30.18C378.92,164.56,372.59,153.28,361.97,146.81z M255.54,126.45L338.48,177l-82.94,50.54V126.45z"
/>
</svg>`;
const LINK = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="white" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';
const LINKVALID = '<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="#3eb0ef" d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/></svg>';

export const STYLES = `
.quill-video {
  --accent-color: #3eb0ef;
  display: flex;
  flex-flow: column;
  justify-content: center;
  align-items: center;
  outline: none;
  cursor: pointer;
  position: relative;
}

.quill-video__wrapper {
  position: relative;
  width: 100%;
  padding-bottom: 56.25%; /* 16:9 */
	height: 0;
}

.quill-video__wrapper::before {
  content: "";
  width: 100%;
  height: 100%;
  top: 0;
  left: 0;
  position: absolute;
  z-index: 1;
}

.quill-video[data-format=full] {
  width: 100%;
  margin: 0 0 12px;
}
.quill-video[data-format=center] {
  max-width: 50%;
  margin: 0 auto 12px;
  width: 100%;
}
.quill-video[data-format=left] {
  width: calc(50% - 12px);
  float: left;
  margin: 0 12px 12px 0;
}
.quill-video[data-format=right] {
  width: calc(50% - 12px);
  float: right;
  margin: 0 0 12px 12px;
}
.quill-video iframe {
  box-sizing: border-box;
  border: 1px solid transparent;
  transition: box-shadow .15s;
  width: 100%;
  position: absolute;
  top: 0;
  left: 0;
  height: 100%;
  pointer-events: none;
}
.quill-video:hover iframe {
  box-shadow: 0 0 0 1px var(--accent-color);
}

.quill-video:focus-within iframe {
  box-shadow: 0 0 0 2px var(--accent-color);
}

.quill-video figcaption, textarea.quill-video__caption-edit {
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

textarea.quill-video__caption-edit {
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

.quill-video figcaption:empty { display: none; }
.quill-video:focus-within figcaption:empty { display: block; }
.quill-video:focus-within figcaption:focus-within::before { display: none; }
.quill-video:focus-within figcaption:empty::before {
  content: "Type caption for video (optional)";
  color: rgba(0,0,0,.33);
  pointer-events: none;
}

.quill-video .quill-video__format {
  position: relative;
  height: 32px;
  bottom: 42px;
  margin-bottom: -32px;
  display: flex;
  background-color: rgba(0,0,0,.75);
  border-radius: 4px;
  z-index: 2;
}

.quill-video .quill-video__format input {
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

.quill-video .quill-video__format label {
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
.quill-video .quill-video__format label::before,
.quill-video .quill-video__format label::after {
  display: none !important;
}
.quill-video .quill-video__format label svg {
  fill: currentColor;
  pointer-events: none;
  width: 26px;
  height: 26px;
}
.quill-video .quill-video__format input:checked + label {
  color: var(--accent-color);
}
.quill-video  input.quill-video__alt {
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
  width: 32px;
  transition: width .28s, color .15s, border-color .15s;
  z-index: 4;
}

.quill-video  input.quill-video__alt:valid {
  color: var(--accent-color);
}

.quill-video  input.quill-video__alt:focus {
  width: calc(100% - 2px);
  color: rgb(0,0,0,.85);
}

.quill-video  input.quill-video__alt:focus + figcaption {
  opacity: 0;
}


.quill-video  input.quill-video__link {
  position: absolute;
  height: 32px;
  width: calc(100% - 2px);
  min-width: 32px;
  top: 0.8rem;
  left: 50%;
  max-width: calc(100% - 16px);
  background-size: 20px;
  box-sizing: border-box;
  transform: translateX(-50%);
  line-height: 20px;
  padding: 0 4px;
  border-radius: 5px;
  background: rgba(0,0,0,.75);
  border: 1px solid rgba(0,0,0,.75);
  font-size: 11px;
  display: inline;
  transition: width .28s, color .15s, border-color .15s;
  z-index: 4;
  font-weight: bold;
  background-repeat: no-repeat;
  background-position: center;
  color: white;
  cursor: pointer;
}

.quill-video input.quill-video__link:valid {
  width: 32px;
  border: 1px solid var(--accent-color);
  color: transparent;
  background-image:
    url(data:image/svg+xml;charset=US-ASCII,${encodeURIComponent(LINKVALID)});
}

.quill-video  input.quill-video__link:focus {
  width: calc(100% - 2px);
  color: white;
  background-image: none;
}

.quill-video  input.quill-video__link::placeholder {
  color: rgba(255, 255, 255, .75);
}

.quill-video input.quill-video__link:valid::placeholder {
  color: transparent
}

.quill-video  input.quill-video__link:focus::placeholder {
  color: rgba(255, 255, 255, .75);
}

.quill-video a {
  display: none;
}

.quill-video iframe[src^="${TRANSPARENT_PIXEL}"] {
  background-color: #F5F9FC;
  background-image: linear-gradient(-45deg, transparent calc(50% - 1px), rgb(218, 227, 235) 50%, transparent calc(50% + 1px));
  background-repeat: repeat;
  background-size: 0.6rem 0.6rem;
  background-position: center;
}

.quill-video input[type=file] {
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

.quill-video iframe[src^="${TRANSPARENT_PIXEL}"] ~ input[type=file] {
  display: block;
}

.quill-video .ql-tooltip { display: none !important; }

.quill-video iframe[src^="${TRANSPARENT_PIXEL}"] {
  background-color: #F5F9FC;
  background-image:
    url(data:image/svg+xml;charset=US-ASCII,${encodeURIComponent(PLAY)});
  background-repeat: no-repeat;
  background-size: 33%;
  background-position: center;
}


`;