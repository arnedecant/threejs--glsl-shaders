#define PI 3.14159265359
#define PI2 6.28318530718

uniform vec2 u_mouse;
uniform vec2 u_resolution;
uniform float u_time;

varying vec2 v_uv;
varying vec3 v_position;

float circle(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness) {

	pt -= center;

	float len = length(pt);
	float result = smoothstep(radius-line_width/2.0-edge_thickness, radius-line_width/2.0, len) - smoothstep(radius + line_width/2.0, radius + line_width/2.0 + edge_thickness, len);

	return result;

}

float line(float x, float y, float line_width, float edge_thickness) {

	return smoothstep(x-line_width/2.0-edge_thickness, x-line_width/2.0, y) - smoothstep(x+line_width/2.0, x+line_width/2.0+edge_thickness, y);

}

float sweep(vec2 pt, vec2 center, float radius, float line_width, float edge_thickness){
	
	vec2 d = pt - center;
	float theta = u_time * 2.0;
	vec2 p = vec2(cos(theta), -sin(theta)) * radius;
	float h = dot(d, p) / dot(p, p);
	h = clamp(h, 0.0, 1.0);
	float l = length(d - p * h);

	float gradient = 0.0;
	const float gradient_angle = PI * 1.5;

	if (length(d) < radius) {

		float angle = mod(theta + atan(d.y, d.x), PI2);
		gradient = clamp(gradient_angle - angle, 0.0, gradient_angle) / gradient_angle * 0.5;
	
	}

	return gradient + 1.0 - smoothstep(line_width, line_width + edge_thickness, l);

}

float polygon(vec2 pt, vec2 center, float radius, int sides, float rotate, float edge_thickness){
	
	pt -= center;

	// Angle and radius from the current pixel
	float theta = atan(pt.y, pt.x) + rotate;
	float rad = PI2/float(sides);

	// Shaping function that modulate the distance
	float d = cos(floor(0.5 + theta/rad)*rad-theta)*length(pt);

	return 1.0 - smoothstep(radius, radius + edge_thickness, d);

}

void main (void) {

	const float line_width = 0.002;
	const float edge_thickness = 0.001;

	vec3 axis_color = vec3(0.8);
	vec3 color = vec3(0.0);

	// axis x & y
	color += line(v_uv.x, 0.5, line_width, edge_thickness) * axis_color;
	color += line(v_uv.y, 0.5, line_width, edge_thickness) * axis_color;
	
	// circles
	color += circle(v_uv, vec2(0.5), 0.3, line_width, edge_thickness) * axis_color;
	color += circle(v_uv, vec2(0.5), 0.2, line_width, edge_thickness) * axis_color;
	color += circle(v_uv, vec2(0.5), 0.1, line_width, edge_thickness) * axis_color;

	// sweep
	color += sweep(v_uv, vec2(0.5), 0.3, 0.003, edge_thickness) * vec3(0.1, 0.3, 1.0); 

	gl_FragColor = vec4(color, 1.0); 

}