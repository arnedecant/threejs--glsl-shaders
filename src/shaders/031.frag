#include <noise>

uniform float u_time;

varying vec3 v_position;

void main() {

    vec2 p = v_position.xy;
    float time = (sin(u_time) + 1.0) / 2.0;
    float scale = 650.0; // 800.0
    vec3 color;
    bool marble = true;

    p *= scale;

    if (marble) {

        float d = perlin(p.x, p.y) * scale; 
        float u = p.x + d;
        float v = p.y + d;
        
        d = perlin(u, v) * scale;
        float noise = perlin(p.x + d, p.y + d);

        // color = vec3(0.6 * (vec3(2.0 * noise) - vec3(noise * 0.1, noise * 0.2 - sin(u / 30.0) * 0.1, noise * 0.3 + sin(v / 40.0) * 0.2)));
        color = vec3(0.1 * (vec3(15.0 * noise) - vec3(noise * 0.9, noise * 0.9 - sin(u / 30.0) * 0.01, noise * 0.8 + sin(v / 40.0) * 0.9)));
    
    } else {

        color = vec3(perlin(p.x, p.y));
    
    }

    gl_FragColor = vec4(color, 1.0);

}