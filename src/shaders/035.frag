#define PI 3.141592653589
#define PI2 6.28318530718

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;
uniform float u_ripple_duration;
uniform sampler2D u_tex;

varying vec2 v_uv;

void main (void) {

    vec2 p = -1.0 + 2.0 * v_uv;
    float len = length(p);
    float time = (sin(u_time) + 1.0) * 5.0;

    vec2 ripple = v_uv + (p / len) * cos(len * 12.0 - time * 4.0) * 0.03;
    float delta = time / u_ripple_duration;

    vec2 uv = mix(ripple, v_uv, delta);
    vec4 tex = texture2D(u_tex, uv);

    vec3 col1 = tex.brg;
    vec3 col2 = tex.gbr;

    if (mod(delta, 2.0) > 1.0) {
        col1 = tex.gbr;
        col2 = tex.brg;
    }

    delta = fract(delta);

    float fade = smoothstep(delta * 1.4, delta * 2.5, len);
    vec3 color = mix(col2, col1, fade);

    gl_FragColor = vec4(color, 1.0); 

}