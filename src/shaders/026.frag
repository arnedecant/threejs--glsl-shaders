uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float u_time;
uniform sampler2D u_tex_fire;

varying vec2 v_uv;

void main() {

    vec2 uv;
    vec2 noise = vec2(0.0);

    // Generate noisy y value
    uv = vec2(v_uv.x * 0.7 - 0.01, fract(v_uv.y - u_time * 0.27));
    noise.y = (texture2D(u_tex_fire, uv).a-0.5) * 2.0;
    uv = vec2(v_uv.x * 0.45 + 0.033, fract(v_uv.y * 1.9 - u_time * 0.61));
    noise.y += (texture2D(u_tex_fire, uv).a-0.5) * 2.0;
    uv = vec2(v_uv.x * 0.8 - 0.02, fract(v_uv.y * 2.5 - u_time * 0.51));
    noise.y += (texture2D(u_tex_fire, uv).a - 0.5) * 2.0;

    noise = clamp(noise, -1.0, 1.0);

    float perturb = (1.0 - v_uv.y) * 0.35 + 0.02;
    noise = (noise * perturb) + v_uv - 0.02;

    vec4 color = texture2D(u_tex_fire, noise);
    color = vec4(color.r * 2.0, color.g * 0.9, (color.g / color.r) * 0.2, 1.0);
    noise = clamp(noise, 0.05, 1.0);
    color.a = texture2D(u_tex_fire, noise).b * 2.0;
    color.a = color.a * texture2D(u_tex_fire, v_uv).b;

    gl_FragColor = color;

}