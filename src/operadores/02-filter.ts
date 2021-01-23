"use strict"

import { from, fromEvent, range } from "rxjs"
import { filter, map } from "rxjs/operators"

// range(1, 10)
// 	.pipe(filter(val => val % 2 === 1))
// 	.subscribe(console.log)

// range(20, 30)
// 	.pipe(
// 		filter((val, i) => {
// 			console.log("index", i)
// 			return val % 2 === 1
// 		})
// 	)
// 	.subscribe(console.log)

interface Personaje {
	tipo: string
	nombre: string
}

const personajes: Personaje[] = [
	{
		tipo: "héroe",
		nombre: "Batman",
	},
	{
		tipo: "héroe",
		nombre: "Robin",
	},
	{
		tipo: "villano",
		nombre: "Joker",
	},
]

from(personajes)
	.pipe(filter(({ tipo }) => tipo.includes("roe")))
	.subscribe(console.log)

const keyup$ = fromEvent<KeyboardEvent>(document, "keyup").pipe(
	map(event => event.code), // keyboardEvent, string
	filter(key => key === "Enter")
)

keyup$.subscribe(console.log)
