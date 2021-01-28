"use strict"

import { asyncScheduler, fromEvent } from "rxjs"
import {
	debounceTime,
	distinctUntilChanged,
	pluck,
	throttleTime,
} from "rxjs/operators"

const click$ = fromEvent(document, "click")

click$.pipe(
	throttleTime(3000) //
)
// .subscribe(console.log)

// Ejemplo 2

const input = document.createElement("input")
document.querySelector("body").appendChild(input)

const input$ = fromEvent(input, "keyup")

input$
	.pipe(
		throttleTime(400, asyncScheduler, {
			leading: false,
			trailing: true,
		}),
		pluck("target", "value"),
		distinctUntilChanged() //
	)
	.subscribe(console.log)
