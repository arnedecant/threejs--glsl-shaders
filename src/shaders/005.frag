uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

void main() {

    // vec2 v = u_mouse / u_resolution;
    // vec3 color = vec3(v.x, 0.0, v.y);
    // gl_FragColor = vec4(color, 1.0);

    // gl_FragCoord

    vec2 uv = gl_FragCoord.xy / u_resolution;

    vec3 color = mix(vec3(1.0, 0.0, 0.0), vec3(0.0, 0.0, 1.0), uv.y);
    gl_FragColor = vec4(color, 1.0);

}