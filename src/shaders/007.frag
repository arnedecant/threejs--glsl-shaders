uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

varying vec2 v_uv;
varying vec3 v_position;

void main() {

    // vec3 color = vec3(0.0);
    // color.r = clamp(v_position.x, 0.0, 1.0);
    // color.g = clamp(v_position.y, 0.0, 1.0);
    // color.b = clamp(v_position.z, 0.0, 1.0);

    vec3 color = clamp(v_position, 0.0, 1.0);
    gl_FragColor = vec4(color, 1.0);

}