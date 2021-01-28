"use strict"

const elementAppender = (tagName, parentNode) =>
	parentNode.appendChild(document.createElement(tagName))

export { elementAppender }
