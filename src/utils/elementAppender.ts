"use strict"

type appendChild = <T extends keyof HTMLElementTagNameMap>(
	tagName: T,
	parentNode: HTMLElement
) => HTMLElementTagNameMap[T]

const elementAppender: appendChild = (tagName, parentNode) =>
	parentNode.appendChild(document.createElement(tagName))

export default elementAppender
