uniform float u_time;
uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform vec3 u_color;

varying vec2 v_uv;
varying vec3 v_position;

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

    vec3 yellow = vec3(1.0, 1.0, 0.0);
    vec3 green = vec3(0.0, 1.0, 0.0);

    float yellowRect = rect(v_position.xy, vec2(0.3), vec2(-0.5, 0.0));
    float greenRect = rect(v_position.xy, vec2(0.4), vec2(0.5, 0.0));

    // float r = step(greenRect, yellowRect);
    // float inRect = yellowRect + greenRect;

    // vec3 color = vec3(r, 1.0, 0.0) * inRect;

    vec3 color = yellow * yellowRect + green * greenRect;

    gl_FragColor = vec4(color, 1.0);

}