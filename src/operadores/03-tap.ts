"use strict"

import { range } from "rxjs"
import { map, tap } from "rxjs/operators"

const numeros$ = range(1, 5)

numeros$
	.pipe(
		tap(x => {
			console.log("antes", x)
			return 100
		}),
		map(val => val * 10),
		tap(x => console.log("después", x)),
		tap({
			next: valor => console.log("después", valor),
			complete: () => console.log("Se terminó todo"),
		})
	)
	.subscribe(val => console.log("subs", val))
