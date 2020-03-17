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

void main() {

    vec2 tilecount = vec2(10.0);
    vec2 center = vec2(0.5);
    mat2 rotation = getRotationMatrix(u_time);

    vec2 p = fract(v_uv * tilecount);
    
    vec2 pt = rotation * (p - center) + center;

    float square = rect(pt, vec2(0.0), vec2(0.68), center);
    vec3 color = vec3(0.0, 1.0, 1.0) * square;

    gl_FragColor = vec4(color, 1.0);

}