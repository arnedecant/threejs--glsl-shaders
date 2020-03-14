uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

varying vec2 v_uv;
varying vec3 v_position;

void main() {

    vec3 color = vec3(0.0);

    // color.r = step(-1.0, v_position.x);
    // color.g = step(-1.0, v_position.y);

    color.r = smoothstep(-0.2, 0.2, v_position.x);
    color.g = smoothstep(-0.2, 0.2, v_position.y);

    gl_FragColor = vec4(color, 1.0);

}