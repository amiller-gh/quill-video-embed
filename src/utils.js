
export function isQuillImageBlot(node) {
	node = node.domNode || node;
	return !!(node && node.classList && node.classList.contains('quill-image'));
}

export function isInsideQuillImageBlot(node) {
	while (node && node !== node.parentElement) {
		if (isQuillImageBlot(node)) { return true; }
		node = node.parentElement;
	}
}

export function getPrevQuillImageBlot(node) {
	while (node && node !== node.parent) {
		if (node.prev && isQuillImageBlot(node.prev)) { return node.prev; }
		node = node.parent;
	}
	return null;
}

export function getNextQuillImageBlot(node) {
	while (node && node !== node.parent) {
		if (node.next && isQuillImageBlot(node.next)) { return node.next; }
		node = node.parent;
	}
	return null;
}