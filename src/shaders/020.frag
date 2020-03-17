uniform vec3 u_color_brick_a;
uniform vec3 u_color_brick_b;

varying vec2 v_uv;

float line(float x, float y, float line_width, float edge_width){
    
    return smoothstep(x-line_width/2.0-edge_width, x-line_width/2.0, y) - smoothstep(x+line_width/2.0, x+line_width/2.0+edge_width, y);

}

float brick(vec2 pt, float mortar_height, float edge_thickness) {

    float result = 0.0;
    
    result += line(pt.y, 0.0, mortar_height, edge_thickness);
    result += line(pt.y, 0.5, mortar_height, edge_thickness);
    result += line(pt.y, 1.0, mortar_height, edge_thickness);

    if (pt.y > 0.5) pt.x = fract(pt.x + 0.5);

    result += line(pt.x, 0.5, mortar_height, edge_thickness);

    return result;

}

void main (void) {

    vec2 uv = fract(v_uv * 10.0);
    float brick = brick(uv, 0.05, 0.001);

    vec3 color = mix(u_color_brick_a, u_color_brick_b, brick);

    gl_FragColor = vec4(color, 1.0); 

}