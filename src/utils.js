
export function isQuillVideoBlot(node) {
	node = node.domNode || node;
	return !!(node && node.classList && node.classList.contains('quill-video'));
}

export function isInsideQuillVideoBlot(node) {
	while (node && node !== node.parentElement) {
		if (isQuillVideoBlot(node)) { return true; }
		node = node.parentElement;
	}
}

export function getPrevQuillVideoBlot(node) {
	while (node && node !== node.parent) {
		if (node.prev && isQuillVideoBlot(node.prev)) { return node.prev; }
		node = node.parent;
	}
	return null;
}

export function getNextQuillVideoBlot(node) {
	while (node && node !== node.parent) {
		if (node.next && isQuillVideoBlot(node.next)) { return node.next; }
		node = node.parent;
	}
	return null;
}