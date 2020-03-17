uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;

varying vec2 v_uv;

float random (vec2 st, float seed) {

    const float a = 12.9898;
    const float b = 78.233;
    const float c = 43758.543123;

    return fract(sin(dot(st, vec2(a, b)) + seed) * c );

}

void main(){   

    vec3 color = random(v_uv, u_time) * vec3(1.0);

    gl_FragColor  = vec4(color, 1.0);

}