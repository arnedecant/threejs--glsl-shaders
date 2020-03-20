#define PI 3.141592653589
#define PI2 6.28318530718

varying vec2 v_uv;
varying vec3 v_position;

uniform sampler2D u_tex_rhino;
uniform float u_time;
uniform float u_ripple_duration;

void main() {
    
    vec2 p = v_position.xy;
    float len = length(p);

    vec2 ripple = v_uv + p / len * 0.03 * cos(len * 12.0 - u_time * 4.0);
    float delta = (sin(mod(u_time, u_ripple_duration) * (PI2 / u_ripple_duration)) + 1.0) / 2.0;
    vec2 uv = mix(ripple, v_uv, delta);

    // float pct = abs(sin(u_time));
    // vec2 uv = mix(ripple, v_uv, pct);
    
    vec3 color = texture2D(u_tex_rhino, uv).rgb;

    gl_FragColor = vec4(color, 1.0); 

}