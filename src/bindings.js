import { isQuillImageBlot, getPrevQuillImageBlot, getNextQuillImageBlot } from './utils';

export const QuillImageBindings = {
	'quill-image:backspace': {
		key: 'backspace',
		handler: function(range, keycontext) {
			const blot = this.quill.getLeaf(range.index)[0];
			const node = blot.domNode;
			if (isQuillImageBlot(node)) { return true; }
      const prevQuillImageBlock = getPrevQuillImageBlot(blot);
			if (prevQuillImageBlock && !blot.value()) {
				this.quill.deleteText(range.index, 1, this.quill.constructor.sources.USER);
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
