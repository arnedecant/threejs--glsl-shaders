// -------------------------------------------------------------------
// :: App
// -------------------------------------------------------------------

import Engine from './engine'

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

		this.$interface = document.querySelector('.interface')
		this.$index = this.$interface.querySelector('input[name="index"]')

		// properties

		// events

		window.addEventListener('resize', this.resize.bind(this), false)
		window.addEventListener('mousemove', this.mousemove.bind(this))
		window.addEventListener('touchmove', this.mousemove.bind(this))
		document.body.addEventListener('click', this.click.bind(this))
		document.body.addEventListener('submit', this.submit.bind(this))

		// init

		const vertexShaders = [...document.querySelectorAll('[data-shader^="vertex"]')] // .textContent
		const fragmentShaders = [...document.querySelectorAll('[data-shader^="fragment"]')] // .textContent

		vertexShaders.forEach((s) => SHADERS.vertex.push(s.textContent))
		fragmentShaders.forEach((s) => SHADERS.fragment.push(s.textContent))

		this.setup()

	}

	setup() {

		this.clock = new THREE.Clock()

		this.url = new URL(window.location.href)
		const index = this.url.searchParams.get('index') || 0

		this.uniforms = {
			u_time: { value: 0.0 },
			u_mouse: { value: { x: 0.0, y: 0.0 } },
			u_resolution: { value: { x: 0.0, y: 0.0 } },
			u_color: { value: new THREE.Color(0xAA00FF) },
			u_color_brick_a: { value: new THREE.Color(0xff0000) },
			u_color_brick_b: { value: new THREE.Color(0x00ffff) },
			u_color_fire_a: { value: new THREE.Color(0xff0000) },
			u_color_fire_b: { value: new THREE.Color(0xffff00) },
			u_tex: { value: new THREE.TextureLoader().load("https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/flame.png") },
		}

		this.fill = this.url.searchParams.get('fill') || 0
		this.index = parseInt(index) || 0
		this.$index.value = this.index
		
		this.resize()
		this.init()

	}

	init() {
		
		ENGINE.clear()

		ENGINE.scene.background = new THREE.Color(0x333333)

		const geometry = new THREE.PlaneGeometry(2, 2)
		const material = new THREE.ShaderMaterial({ 
			uniforms: this.uniforms,
			vertexShader: SHADERS.vertex[this.index],
			fragmentShader: SHADERS.fragment[this.index]
		})
		const plane = new THREE.Mesh(geometry, material)

		ENGINE.add(plane)
	
		this.render()

	}

	resize(e) {

		ENGINE.resize(this.fill)
		
		if (!this.uniforms.u_resolution) return

		this.uniforms.u_resolution.value.x = window.innerWidth
		this.uniforms.u_resolution.value.y = window.innerHeight

	}

	mousemove(e) {

		if (!this.uniforms.u_mouse) return

		this.uniforms.u_mouse.value.x = (e.touches) ? e.touches[0].clientX : e.clientX
		this.uniforms.u_mouse.value.y = (e.touches) ? e.touches[1].clientY : e.clientY

	}

	click(e) {

		const name = e.target.getAttribute('name')
		const tempIndex = this.index

		switch (name) {
			case 'left': this.index--
				break
			case 'right': this.index++
				break
			default: return
		}

		const reload = this.reload()
		if (!reload) this.index = tempIndex

	}

	submit(e) {

		e.preventDefault()

		const tempIndex = this.index
		this.index = parseInt(this.$index.value)

		const reload = this.reload()
		if (!reload) this.index = tempIndex

	}

	reload() {

		let reload = true

		if (!SHADERS.vertex[this.index]) reload = false
		if (!SHADERS.fragment[this.index]) reload = false

		if (reload) {
			this.url.searchParams.set('index', this.index)
			window.location.href = this.url
			return true
		} else {
			alert('Index unreachable')
			return false
		}

	}

	render(timestamp) {

		if (window.STOP) return
		
		this.uniforms.u_time.value = this.clock.getElapsedTime()

		window.requestAnimationFrame(this.render.bind(this))

		ENGINE.render(timestamp)

	}

}

export default new App()

// debugging helpers

window.onError = (error) => console.error(JSON.stringify(error))
window.stop = () => window.STOP = true
window.start = (once = false) => {
	if (!once) window.STOP = false
	APP.render()
}