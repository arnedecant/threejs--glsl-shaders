// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import Engine from './engine'
import Game from './game'
import Preloader from './helpers/preloader'

class App {

	constructor() {

		// create new engine: setup scene, camera & lighting
		// and load vertex and fragment shaders in memory

		window.ENGINE = new Engine({ container: document.body })
		window.APP = this
		window.SHADERS = {
			vertex: [],
			fragment: []
		}

		// elements

		// properties

		// events

		window.addEventListener('resize', this.resize.bind(this), false)
		// window.addEventListener('mousemove', this.mousemove.bind(this))
		// document.body.addEventListener('click', this.click.bind(this))

		// init

		const vertexShaders = [...document.querySelectorAll('[data-shader-type="vertex"]')] // .textContent
		const fragmentShaders = [...document.querySelectorAll('[data-shader-type="fragment"]')] // .textContent

		this.preload()

	}

	preload() {

		this.init()

	}

	init() {

		
	
		this.render()

	}

	resize(e) {

		ENGINE.resize()

	}

	mousemove(e) {

	}

	click(e) {

	}

	render(timestamp) {

        if (window.STOP) return

		window.requestAnimationFrame(this.render.bind(this))

		GAME.render(timestamp)
		ENGINE.render(timestamp)

	}

}

export default new App()

// debugging helpers

window.onError = (error) => console.error(JSON.stringify(error))
window.stop = () => window.STOP = true
window.start = (once = false) => {
	if (!once) window.STOP = false
	GAME.render()
}