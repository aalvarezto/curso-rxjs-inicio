"use strict"

import { Observable, Observer } from "rxjs"

const observer: Observer<any> = {
	next: value => console.log("siguiente [next]:", value),
	error: error => console.warn("error [obs]:", error),
	complete: () => console.info("completado [obs]"),
}

const obs$ = new Observable<string>(subs => {
	subs.next("Hola")
	subs.next("Mundo")

	subs.next("Hola")
	subs.next("Mundo")

	// const a = undefined
	// a = a.map(v => v)

	subs.complete()
})

obs$.subscribe(observer)

// obs$.subscribe(
// 	valor => console.log("next: ", valor),
// 	error => console.warn("error: ", error),
// 	() => console.log("Completado")
// )
