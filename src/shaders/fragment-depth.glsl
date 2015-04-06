uniform float time;
varying float vSurfaceColor;

void main( void ) {

	// vec3 coord = vec3( vUv, -time );
	// float n = surface3( coord );

	// gl_FragColor = vec4( 1., 1., 1., 1. );
	gl_FragColor = vec4( vec3(vSurfaceColor), 1. );

}