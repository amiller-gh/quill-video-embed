import { isQuillVideoBlot, getPrevQuillVideoBlot, getNextQuillVideoBlot } from './utils';

export const QuillVideoBindings = {
	'quill-video:backspace': {
		key: 'backspace',
		handler: function(range, keycontext) {
			const blot = this.quill.getLeaf(range.index)[0];
			const node = blot.domNode;
			if (isQuillVideoBlot(node)) { return true; }
      const prevQuillVideoBlock = getPrevQuillVideoBlot(blot);
			if (prevQuillVideoBlock && !blot.value()) {
				this.quill.deleteText(range.index, 1, this.quill.constructor.sources.USER);
				this.quill.setSelection(this.quill.getIndex(prevQuillVideoBlock), 0);
				prevQuillVideoBlock.domNode.focus();
				return false;
			}
			return true;
		}
	},
	'quill-video:up': {
		key: 'up',
		handler: function(range, keycontext) {
			const blot = this.quill.getLeaf(range.index)[0];
			const prevQuillVideoBlock = getPrevQuillVideoBlot(blot);
			if (prevQuillVideoBlock) {
				this.quill.setSelection(this.quill.getIndex(prevQuillVideoBlock), 0);
				prevQuillVideoBlock.domNode.focus();
				return false;
			}
			return true;
		}
	},
	'quill-video:down': {
		key: 'down',
		handler: function(range, keycontext) {
			const blot = this.quill.getLeaf(range.index)[0];
			const nextQuillVideoBlock = getNextQuillVideoBlot(blot);
			if (nextQuillVideoBlock) {
				this.quill.setSelection(this.quill.getIndex(nextQuillVideoBlock), 0);
				nextQuillVideoBlock.domNode.focus();
				return false;
			}
			return true;
		}
	},
};
