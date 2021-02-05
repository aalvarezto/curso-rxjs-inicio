"use strict"

import createElement from "./createElement"
import elementAppender from "./elementAppender"

const clean = (element: HTMLElement) => {
	element.innerHTML = ""
	return element
}

export { elementAppender, createElement, clean }
