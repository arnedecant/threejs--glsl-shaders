#define PI 3.1415926538

uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

varying vec2 v_uv;
varying vec3 v_position;

mat2 getRotationMatrix(float theta) {

    float s = sin(theta);
    float c = cos(theta);

    return mat2(c, -s, s, c);

}

mat2 getScaleMatrix(float scale) {

    return mat2(scale, 0, 0, scale);

}

// returns 1.0 when a point (pt) is inside a rectangle defined by size and center

float rect(vec2 pt, vec2 anchor, vec2 size, vec2 center) {

    vec2 p = pt - center;
    vec2 halfSize = size * 0.5;

    float horz = step(-halfSize.x - anchor.x, p.x) - step(halfSize.x - anchor.x, p.x);
    float vert = step(-halfSize.y - anchor.y, p.y) - step(halfSize.y - anchor.y, p.y);

    return horz * vert;

}

float circle(vec2 pt, vec2 center, float radius) {
    
    vec2 p = pt - center;

    return 1.0 - step(radius, length(p));

}

float circle(vec2 pt, vec2 center, float radius, bool soften) {
    
    vec2 p = pt - center;
    float edge = (soften) ? radius * 0.05 : 0.0;

    return 1.0 - smoothstep(radius - edge, radius + edge, length(p));

}

float circle(vec2 pt, vec2 center, float radius, float line_width) {
    
    vec2 p = pt - center;
    float len = length(p);
    float half_line_width = line_width / 2.0;

    return step(radius - half_line_width, len) - step(radius + half_line_width, len);

}

float circle(vec2 pt, vec2 center, float radius, float line_width, bool soften) {
    
    vec2 p = pt - center;
    
    float len = length(p);
    float half_line_width = line_width / 2.0;
    float edge = (soften) ? radius * half_line_width : 0.0;

    float inner = radius - half_line_width;
    float outer = radius + half_line_width;

    return smoothstep(inner - edge, inner + edge, len) - smoothstep(outer - edge, outer + edge, len);

}

float line(float a, float b, float line_width, float edge_thickness) {
    
    float half_line_width = line_width / 0.5;

    return smoothstep(a - half_line_width - edge_thickness, a - half_line_width, b) - smoothstep(a + half_line_width, a + half_line_width + edge_thickness, b);

}

void main() {

    float x = sin(v_uv.x * PI * 4.0);
    x = mix(0.1, 0.9, (x + 1.0) / 2.0);
    
    float line = line(v_uv.y, x, 0.1, 0.006);
    vec3 color = vec3(0.0, 1.0, 1.0) * line;

    gl_FragColor = vec4(color, 1.0);

}

// void main() {

//     float x = sin(v_position.x * PI * 2.0);
//     x = mix(-0.8, 0.8, (x + 1.0) / 2.0);
    
//     float line = line(v_position.y, x, 0.005, 0.01);
//     vec3 color = vec3(0.0, 1.0, 1.0) * line;

//     gl_FragColor = vec4(color, 1.0);

// }