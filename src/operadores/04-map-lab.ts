"use strict"

import { fromEvent } from "rxjs"
import { map, tap } from "rxjs/operators"

const texto = document.createElement("div")

texto.innerHTML = `
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer non dictum nulla, ut ultrices mauris. Fusce eu elit eu ex molestie pellentesque. Proin semper, justo vitae iaculis aliquam, leo justo malesuada ligula, ac semper diam lorem eget tortor. Aliquam imperdiet, est quis vulputate efficitur, velit arcu ultricies augue, ac varius dui neque sit amet nisl. Class aptent taciti sociosqu ad litora torquent per conubia nostra, per inceptos himenaeos. Vestibulum justo ligula, lobortis vel risus et, luctus pulvinar sem. Aliquam feugiat, nulla et mollis iaculis, tortor enim mattis magna, at dictum augue lorem non neque.
<br/><br/>
Morbi nec lacus sit amet augue aliquam pretium quis ac dolor. Fusce nec imperdiet mi. Fusce pellentesque purus non magna pellentesque egestas. Ut lacinia enim sit amet massa porta consequat. Morbi et est erat. Etiam malesuada, mauris eget porttitor vehicula, massa ipsum elementum urna, et blandit magna ante at arcu. Quisque interdum sem purus, id feugiat nulla semper a. Sed at volutpat massa, et ornare ex.
<br/><br/>
Fusce et libero consectetur, varius leo et, scelerisque mi. Etiam ac faucibus mi. Sed egestas ornare libero, ut laoreet eros pulvinar at. Praesent elementum elit aliquam ipsum porta malesuada quis mattis velit. Pellentesque posuere magna vitae urna pharetra pellentesque. Fusce blandit lectus pulvinar dolor cursus ornare. Pellentesque justo mauris, venenatis malesuada tortor aliquam, venenatis fermentum ipsum. Ut vitae sapien dapibus diam malesuada tincidunt. Proin nec posuere justo. Praesent sit amet hendrerit lorem, ac tristique ipsum. Mauris ultrices non lorem vitae cursus. Nullam sollicitudin odio eleifend risus consequat porta. Fusce cursus nisi id tortor mattis pellentesque. Sed ut porttitor magna, vitae maximus enim. Aenean convallis diam sed sodales commodo.
<br/><br/>
Aliquam commodo lectus eu turpis ultrices pellentesque. In sit amet dictum ante. In consectetur cursus nisl, a tincidunt mauris ultrices eu. Curabitur consectetur dignissim purus, lobortis commodo lorem tristique eget. Nullam massa lorem, euismod id arcu et, fringilla mollis ligula. Suspendisse quis hendrerit ipsum. Proin erat lectus, tempus a tempus eget, interdum ac tortor. Etiam ipsum tortor, ultrices ac vehicula at, vehicula eget nisl. Vestibulum sit amet pharetra metus. Morbi semper volutpat posuere. Proin euismod in augue in consectetur. Quisque lacinia in elit tempor gravida. Nullam vel fringilla diam. Nunc ultricies ornare urna, consectetur tempor orci semper sagittis.
<br/><br/>
Nulla facilisi. Suspendisse sed quam libero. Pellentesque faucibus ex in lacus tincidunt gravida. Nulla facilisi. Morbi nec placerat diam, eleifend congue lectus. Mauris facilisis neque eu tortor condimentum tempor. Proin a magna rutrum, dictum erat at, interdum enim. Ut imperdiet mattis euismod. Pellentesque libero eros, cursus nec dolor in, egestas pretium lectus. Nullam eget cursus dolor. Vivamus tellus eros, sodales vel tempus eu, semper non augue.
`

const body = document.querySelector("body")
body.append(texto)

const progressBar = document.createElement("div")
progressBar.setAttribute("class", "progress-bar")
body.append(progressBar)

// function que haga el cálculo
const calcularPorcentajeScroll = event => {
	const {
		scrollTop,
		scrollHeight,
		clientHeight,
	} = event.target.documentElement

	return (scrollTop / (scrollHeight - clientHeight)) * 100
}

// Streams
const scroll$ = fromEvent(document, "scroll")
// scroll$.subscribe(console.log)

const progress$ = scroll$.pipe(
	// map(event => calcularPorcentajeScroll(event)),
	map(calcularPorcentajeScroll),
	tap(console.log)
)

progress$.subscribe(porcentaje => {
	progressBar.style.width = `${porcentaje}%`
})
