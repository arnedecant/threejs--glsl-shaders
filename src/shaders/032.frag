#define PI 3.141592653589

varying vec2 v_uv;
varying vec3 v_position;

uniform sampler2D u_tex_rhino;
uniform float u_time;

vec2 rotate(vec2 pt, float theta, float aspect) {

	float c = cos(theta);
	float s = sin(theta);
	mat2 mat = mat2(c, s, -s, c);

    pt.y /= aspect;
    pt = mat * pt;
    pt.y *= aspect;

	return pt;

}

float inRect(vec2 pt, vec2 bottomLeft, vec2 topRight) {

    vec2 s = step(bottomLeft, pt) - step(topRight, pt);

    return s.x * s.y;

}

void main() {
    
    vec2 center = vec2(0.5);
    vec2 uv = v_uv;

    // mirror
    // uv.x = 1.0 - uv.x;

    // rotate
    // float rotation = PI / 2.0;
    float rotation = u_time * 2.0;
    uv = rotate(uv - center, rotation, 2.0 / 1.5) + center; 

    vec3 tex = texture2D(u_tex_rhino, uv).rgb;
    vec3 bg = vec3(0.0);

    float t = inRect(uv, vec2(0.0), vec2(1.0));
    vec3 color = mix(bg, tex, t);

    gl_FragColor = vec4(color, 1.0); 

}