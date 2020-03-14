uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

varying vec2 v_uv;
varying vec3 v_position;

float rect(vec2 pos, vec2 size, vec2 center) {

    vec2 p = pos - center;
    vec2 halfSize = size * 0.5;

    float horz = (v_position.x > -halfsize.x && v_position.x < halfsize.x) ? 1.0 : 0.0

    return 1.0;

}

void main() {

    vec3 color = vec3(1.0, 1.0, 0.0);
    float inRect = rect(v_position.xy, vec2(1.0), vec2(0.0));

    color = color * inRect;

    gl_FragColor = vec4(color, 1.0);

}