window.THREE = require('threejs/build/three.js');
require("threejs/examples/js/controls/FlyControls");
console.log(THREE)

var container = document.body, 
renderer, 
scene, 
material,
camera, 
mesh, 
fov = 30;

// create a scene
scene = new THREE.Scene();
scene.fog = new THREE.FogExp2( 0x000000, 0.005 );

camera = new THREE.PerspectiveCamera( 
	fov, 
	window.innerWidth / window.innerHeight, 
	1, 
	10000 );
camera.position.z = 100;
camera.target = new THREE.Vector3( 0, 0, 0 );
scene.add( camera );

controls = new THREE.FlyControls( camera, document.body);
controls.movementSpeed = 1000;
controls.rollSpeed = Math.PI / 12;
controls.autoForward = false;
controls.dragToLook = false;

// material = new THREE.MeshPhongMaterial( {
material = new THREE.ShaderMaterial( {
	wireframe: true,
	// wireframeLinewidth: 1,
	side: THREE.DoubleSide,
	vertexShader: require('shaders/vertex-noise.glsl')(),
	fragmentShader: require('shaders/fragment-depth.glsl')(),
	uniforms: {
		time:   { type: "f", value: 1.0 },
		scale:  { type: "v2", value: new THREE.Vector2( .015, .015 ) },
		offset: { type: "v2", value: new THREE.Vector2( 0, 0 ) }
	}
} );

var geometry = new THREE.IcosahedronGeometry( 60, 4 );
console.log(geometry);

// create a sphere and assign the material
mesh = new THREE.Mesh( geometry, material );
scene.add( mesh );

// create the renderer and attach it to the DOM
renderer = new THREE.WebGLRenderer();
renderer.setSize( window.innerWidth, window.innerHeight );

document.body.appendChild( renderer.domElement );

var clock = new THREE.Clock();

function render() {
	var delta = clock.getDelta(),
		time = clock.getElapsedTime() * 10;

	material.uniforms['time'].value = time *.01;	

	controls.movementSpeed = 3000 * delta;
	controls.update( delta );

	// let there be light
	renderer.render( scene, camera );
	requestAnimationFrame( render );

}

render();

