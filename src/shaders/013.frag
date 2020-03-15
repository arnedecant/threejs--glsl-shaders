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

// returns 1.0 when a point (pos) is inside a rectangle defined by size and center

float rect(vec2 pos, vec2 size, vec2 center) {

    vec2 p = pos - center;
    vec2 halfSize = size * 0.5;

    // float horz = (v_position.x > -halfSize.x && v_position.x < halfSize.x) ? 1.0 : 0.0;
    float horz = step(-halfSize.x, p.x) - step(halfSize.x, p.x);
    float vert = step(-halfSize.y, p.y) - step(halfSize.y, p.y);

    return horz * vert;

}

void main() {

    vec2 center = vec2(0.5, 0.0);
    mat2 mat = getRotationMatrix(u_time);
    vec2 pt = mat * (v_position.xy - center) + center;

    float square = rect(pt, vec2(0.5), center);
    vec3 color = vec3(0.0, 1.0, 1.0) * square;

    gl_FragColor = vec4(color, 1.0);

}