"use strict"

import { fromEvent, Observable } from "rxjs"
import { debounceTime, map, mergeAll, pluck } from "rxjs/operators"

import { ajax } from "rxjs/ajax"
import { GithubUser } from "~interfaces/github-user.interface"
import { GithubUsersResp } from "~interfaces/github-users.interface"
import { clean } from "./utils"
import { createElement } from "./utils"
import { elementAppender } from "./utils"

const body = document.querySelector("body")
const textInput = elementAppender("input", body)
const orderList = elementAppender("ol", body)

// Helpers
const mostrarUsuarios = (usuarios: GithubUser[], x = clean(orderList)) =>
	usuarios.forEach(({ avatar_url, html_url }) =>
		orderList.appendChild(
			createElement(
				"li",
				{},
				createElement("img", {
					src: avatar_url,
					style: "border-radius: 50%;",
				}),
				createElement("a", {
					href: html_url,
					text: "Ver página",
					target: "_blank",
				})
			)
		)
	)

// Streams
fromEvent<KeyboardEvent>(textInput, "keyup")
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

// Helpers
// const mostrarUsuarios = (usuarios: GithubUser[]) =>
// {
// 	console.log(usuarios)
// 	orderList.innerHTML = ""

// 	usuarios.forEach(({ avatar_url, html_url }) =>
// 		clean(orderList).appendChild(
// 			createElement(
// 				"li",
// 				{},
// 				createElement("img", { src: avatar_url }),
// 				createElement("a", {
// 					href: html_url,
// 					text: "Ver página",
// 					target: "_blank",
// 				})
// 			)
// 		)
// 	)

// for (const { avatar_url, html_url } of usuarios) {
// 	const li = elementAppender("li", orderList)
// 	const img = elementAppender("img", li)
// 	img.src = avatar_url
// 	img.style.borderRadius = "50%"

// 	const anchor = elementAppender("a", li)
// 	anchor.href = html_url
// 	anchor.text = "Ver página"
// 	anchor.target = "_blank"
// }
// }
