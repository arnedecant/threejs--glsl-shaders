uniform float u_time;
uniform vec3 u_color;

void main() {

    vec3 color = vec3(0.0, (sin(u_time) + 1.0) / 2.0, (cos(u_time) + 1.0) / 2.0);
    gl_FragColor = vec4(color, 1.0);

}