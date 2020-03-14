uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

varying vec2 v_uv;
varying vec3 v_position;

void main() {

    // vec3 color = v_position;
    vec3 color = vec3(v_uv, 0.0);
    gl_FragColor = vec4(color, 1.0);

}