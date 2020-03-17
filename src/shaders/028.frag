#include <noise>

uniform vec3 u_color_wood_a;
uniform vec3 u_color_wood_b;
uniform float u_wood_frequency;
uniform float u_wood_noise_scale;
uniform float u_wood_ring_scale;
uniform float u_wood_contrast;

varying vec3 v_position;

void main() {

    float n = snoise(v_position); 
    float ring = u_wood_contrast - fract(u_wood_noise_scale * n);
    float lerp = pow(ring, u_wood_ring_scale) + n;
    vec3 color = mix(u_color_wood_a, u_color_wood_b, lerp);

    gl_FragColor = vec4(color, 1.0);

}