"use strict"

import { fromEvent, Observable } from "rxjs"
import { debounceTime, map, mergeAll, pluck } from "rxjs/operators"

import { ajax } from "rxjs/ajax"
import { GithubUser } from "~interfaces/github-user.interface"
import { GithubUsersResp } from "~interfaces/github-users.interface"
import { elementAppender } from "./utils"

const body = document.querySelector("body")
const textInput = elementAppender("input", body)
const orderList = elementAppender("ol", body)

// Helpers
const mostrarUsuarios = (usuarios: GithubUser[]) => {
	console.log(usuarios)
	orderList.innerHTML = ""

	for (const usuario of usuarios) {
		const li = elementAppender("li", orderList)
		const img = elementAppender("img", li)
		img.src = usuario.avatar_url

		const anchor = elementAppender("a", li)
		anchor.href = usuario.html_url
		anchor.text = "Ver página"
		anchor.target = "_blank"
	}
}

// Streams
const input$ = fromEvent<KeyboardEvent>(textInput, "keyup")

input$
	.pipe(
		debounceTime<KeyboardEvent>(500),
		pluck<KeyboardEvent, string>("target", "value"),
		map<string, Observable<GithubUsersResp>>(texto =>
			ajax.getJSON(
				`https://api.github.com/search/users?q=${texto}` //
			)
		),
		mergeAll<GithubUsersResp>(),
		pluck<any, GithubUser[]>("items")
	)
	.subscribe(mostrarUsuarios)
