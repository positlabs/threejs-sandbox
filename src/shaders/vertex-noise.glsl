

uniform float time;
varying vec2 vUv;
varying float fogAmount;
varying vec4 vertexColor;

#pragma glslify: snoise3 = require(glsl-noise/simplex/3d);

void main() {

	vUv = uv;

	vec3 coord = vec3( uv, -time );
	vec3 n = snoise3(position * coord) * normal * vec3(10.) + position;
	gl_Position = projectionMatrix * modelViewMatrix * vec4( n, 1.0 );
	vertexColor = vec4(1., 1., 1., 1.);

}

