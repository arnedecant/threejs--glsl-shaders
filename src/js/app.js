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
		this.$fill = this.$interface.querySelector('input#fill')

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
		const fill = this.url.searchParams.get('fill') || 0

		this.fill = parseInt(fill) || 0
		this.index = parseInt(index) || 0
		this.$index.value = this.index

		ENGINE.loader.setPath('https://s3-us-west-2.amazonaws.com/s.cdpn.io/2666677/')

		this.uniforms = {
			u_time: { value: 0.0 },
			u_mouse: { value: { x: 0.0, y: 0.0 } },
			u_resolution: { value: { x: 0.0, y: 0.0 } },
			u_color: { value: new THREE.Color(0xAA00FF) },
			u_color_brick_a: { value: new THREE.Color(0xff0000) },
			u_color_brick_b: { value: new THREE.Color(0x00ffff) },
			u_color_fire_a: { value: new THREE.Color(0xff0000) },
			u_color_fire_b: { value: new THREE.Color(0xffff00) },
			u_tex_fire: { value: ENGINE.load('flame.png') },
			u_tex_rhino: { value: ENGINE.load('sa1.jpg') },
			u_tex_carousel_1: { value: null },
			u_tex_carousel_2: { value: null },
			u_color_wood_a: { value: new THREE.Color(0x7d490b) },
			u_color_wood_b: { value: new THREE.Color(0xbb905d) },
			u_wood_frequency: { value: 2.0 },
			u_wood_noise_scale: { value: 6.0 },
			u_wood_ring_scale: { value: 0.6 },
			u_wood_contrast: { value: 4.0 },
			u_ripple_duration: { value: 8.0 }
		}
		
		this.resize()
		this.init()

	}

	init() {

		this.initCarousel()

		this.$fill.checked = this.fill
		if (this.fill) document.body.classList.add('fill')
		
		ENGINE.clear()
		ENGINE.scene.background = new THREE.Color(0x333333)

		let { width, height } = this.getDimensions()

		const geometry = new THREE.PlaneGeometry(width, height)
		const material = new THREE.ShaderMaterial({ 
			uniforms: this.uniforms,
			vertexShader: SHADERS.vertex[this.index],
			fragmentShader: SHADERS.fragment[this.index]
		})
		const plane = new THREE.Mesh(geometry, material)

		ENGINE.add(plane)
		
		this.render()

	}

	initCarousel() {

		const carousels = [33, 34]

		if (!carousels.includes(this.index)) return

		this.carousel = {
			images: [],
			$next: document.querySelector('.carousel__next'),
			$prev: document.querySelector('.carousel__prev'),
		}

		for (let i = 1; i <= 5; i++) {
			ENGINE.load(`sa${ i }.jpg`, (tex) => this.carousel.images.push(tex))
		}

		setTimeout(() => {
			this.carousel.$next.classList.add('show')
			this.carousel.$prev.classList.add('show')
		}, 500)

	}

	getDimensions() {

		let width = 2
		let height = 2

		const landscape = [31, 32, 33]

		if (landscape.includes(this.index)) height = 1.5

		return { width, height }

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

		// skip click for labels

		if (e.target.tagName === 'LABEL') return

		// store temporary values

		const name = e.target.getAttribute('name')
		const tempIndex = this.index
		const tempFill = this.fill

		// handle logic

		switch (name) {
			case 'left': this.index--
				break
			case 'right': this.index++
				break
			case 'fill': this.fill = this.$fill.checked ? 1 : 0
				break
			default: return
		}

		// reload page

		const reload = this.reload()
		if (reload) return

		// reset if reload failed
		
		this.index = tempIndex
		this.fill = tempFill

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
			this.url.searchParams.set('fill', this.fill)
		} else {
			alert('Index unreachable')
			return false
		}

		window.location.href = this.url
		return true

	}

	render(timestamp) {

		if (window.STOP) return
		
		this.uniforms.u_time.value += this.clock.getDelta()

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