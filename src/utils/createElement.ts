"use strict"

type append = <T extends keyof HTMLElementTagNameMap>(
	tagName: T,
	props: {},
	...childs: HTMLElement[]
) => HTMLElementTagNameMap[T]

const createElement: append = (tagName, props, ...childs) => {
	const element = document.createElement(tagName)
	element.append(...childs)

	Object.keys(props).forEach(prop => (element[prop] = props[prop]))

	return element
}

export default createElement
