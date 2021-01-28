"use strict"

import { fromEvent } from "rxjs"
import { first, map, take, tap } from "rxjs/operators"

const click$ = fromEvent(document, "click")

click$
	.pipe(
		tap(console.log),
		// map(event => ({
		// 	clientY: event.clientY,
		// 	clientX: event.clientX,
		// }))

		map(({ clientX, clientY }) => ({ clientY, clientX })),
		first(event => event.clientY >= 150)
	)
	.subscribe({
		next: val => console.log("next:", val),
		complete: () => console.log("Complete!"),
	})
