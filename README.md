# Quill Image
A quill editor module that enables image insertion through drab/drop, clipboard paste, and the default toolbars. Configuration has callback hook where you can upload the image to your servers. The base64 image preview will be replaces with the returned public URL. The inserted image has support for basic layout (float left, float right, center, and full width), image captions, and alt text.

## Install
```bash
yarn add quill-image --save
```

## Usage

### ES6

```javascript
import Quill from 'quill'
const { QuillImage, QuillImageBindings } = require('quill-image');

const imgBlot = new QuillImage(Quill, { handler: imageHandler });

const quill = new Quill('#editor-container', {
  modules: {
    keyboard: {
      bindings: {
        ...QuillImageBindings,
      }
    }
  }
})

/**
* Do something to our dropped or pasted image
* @param.quill - the quill instance
* @param.guid - a unique guid for this image, if required
* @param.imageDataUrl - image's base64 url
* @param.type - image's mime type
*/
async function handler(quill, guid, dataUrl, type) {
  // give a default mime type if the type was null
  if (!type) type = 'image/png';

  // Convert base64 to blob
  const blob = await fetch(b64Image).then(res => res.blob());

  // Generate a filename
  const filename = `${guid}.${type.match(/^image\/(\w+)$/i)[1]}`;

  // Generate a form data
  const formData = new FormData();
  formData.append('filename', filename);
  formData.append('file', blob);

  // Upload your file here – promise should resolve with the public URL
  return new Promise((resolve) => {
    setTimeout(() => resolve('https://media2.giphy.com/media/RQgzLsPYlzrBC/source.gif'), 3000);
  });
}

const quill = new Quill(dom);
imgBlot.insert(quill);
```

If you did not config a image handler, it will insert the base64 image into the quill editor directory after you drop/paste a image.


































