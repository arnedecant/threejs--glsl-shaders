#define PI 3.141592653589
#define PI2 6.28318530718

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_tex;
uniform float u_time;

varying vec2 v_uv;

//Based on http://clockworkchilli.com/blog/8_a_fire_shader_in_glsl_for_your_webgl_games

void main (void)
{
	vec4 col;
	vec3 color;

	if (v_uv.x < 0.5){
		if (v_uv.y < 0.5){
			col = texture2D(u_tex, v_uv * 2.0);
			color = vec3(col.b);
		}else{
			col = texture2D(u_tex, v_uv * 2.0-vec2(0.0, 1.0));
			color = vec3(col.r);
		}
	}else{
		if (v_uv.y<0.5){
			col = texture2D(u_tex, v_uv*2.0-vec2(1.0, 0.0));
			color = vec3(col.a);
		}else{
			col = texture2D(u_tex, v_uv*2.0-vec2(1.0, 1.0));
			color = vec3(col.g);
		}
	}

	gl_FragColor = vec4(color, 1.0);

}