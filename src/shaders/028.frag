#define PI 3.141592653589
#define PI2 6.28318530718

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform sampler2D u_tex_fire;
uniform float u_time;

varying vec2 v_uv;

// Based on http://clockworkchilli.com/blog/8_a_fire_shader_in_glsl_for_your_webgl_games

void main (void) {

    vec2 noise = vec2(0.0);
    float time = u_time;

    // Generate noisy x value
    vec2 uv = vec2(v_uv.x * 1.4 + 0.01, fract(v_uv.y - time * 0.69));
    noise.x = (texture2D(u_tex_fire, uv).w - 0.5) * 2.0;
    uv = vec2(v_uv.x * 0.5 - 0.033, fract(v_uv.y * 2.0 - time * 0.12));
    noise.x += (texture2D(u_tex_fire, uv).w - 0.5) * 2.0;
    uv = vec2(v_uv.x * 0.94 + 0.02, fract(v_uv.y * 3.0 - time * 0.61));
    noise.x += (texture2D(u_tex_fire, uv).w - 0.5) * 2.0;

    // Generate noisy y value
    uv = vec2(v_uv.x * 0.7 - 0.01, fract(v_uv.y - time * 0.27));
    noise.y = (texture2D(u_tex_fire, uv).w - 0.5) * 2.0;
    uv = vec2(v_uv.x * 0.45 + 0.033, fract(v_uv.y * 1.9 - time * 0.61));
    noise.y = (texture2D(u_tex_fire, uv).w - 0.5) * 2.0;
    uv = vec2(v_uv.x * 0.8 - 0.02, fract(v_uv.y * 2.5 - time * 0.51));
    noise.y += (texture2D(u_tex_fire, uv).w - 0.5) * 2.0;

    noise = clamp(noise, -1.0, 1.0);

    float perturb = (1.0 - v_uv.y) * 0.35 + 0.02;
    noise = (noise * perturb) + v_uv - 0.02;

    vec4 color = texture2D(u_tex_fire, noise);
    color = vec4(color.r * 2.0, color.g * 0.9, (color.g / color.r) * 0.2, 1.0);
    noise = clamp(noise, 0.05, 1.0);

    // NOTE: why doesn't this get cropped according to the alpha channel?
    color.a = texture2D(u_tex_fire, noise).b * 2.0;
    color.a = color.a * texture2D(u_tex_fire, v_uv).b;

    gl_FragColor = color;

}