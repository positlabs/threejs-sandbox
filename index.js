

var container, 
	renderer, 
	scene, 
	camera, 
	mesh, 
	start = Date.now(),
	fov = 30;

window.addEventListener( 'load', function() {

	// create a scene
	scene = new THREE.Scene();

	// create a camera the size of the browser window
	// and place it 100 units away, looking towards the center of the scene
	camera = new THREE.PerspectiveCamera( 
		fov, 
		window.innerWidth / window.innerHeight, 
		1, 
		10000 );
	camera.position.z = 10;
	camera.target = new THREE.Vector3( 0, 0, 0 );

	scene.add( camera );

	material = new THREE.ShaderMaterial( {
		vertexShader: document.getElementById( 'vertexShader' ).textContent,
		fragmentShader: document.getElementById( 'fragmentShader' ).textContent,
		wireframe: true,
		side: THREE.DoubleSide,
		uniforms: { 
			// tExplosion: {
			// 	type: "t", 
			// 	value: THREE.ImageUtils.loadTexture( 'explosion.png' )
			// },
			time: { // float initialized to 0
				type: "f", 
				value: 0.0 
			}
		},
	} );

	// create a wireframe material		
	// material = new THREE.MeshBasicMaterial( { 
	//     color: 0xb7ff00, 
	//     wireframe: true 
	// } );
	
	// create a sphere and assign the material
	mesh = new THREE.Mesh( 
		new THREE.IcosahedronGeometry( 20, 4 ), 
		material 
	);
	scene.add( mesh );
	
	// create the renderer and attach it to the DOM
	renderer = new THREE.WebGLRenderer();
	renderer.setSize( window.innerWidth, window.innerHeight );
	
	document.body.appendChild( renderer.domElement );

	render();

} );

function render() {

	material.uniforms[ 'time' ].value = .00005 * ( Date.now() - start );

	// let there be light
	renderer.render( scene, camera );
	requestAnimationFrame( render );
	
}












// var worldWidth = 128, worldDepth = 128,
// 	worldHalfWidth = worldWidth / 2, worldHalfDepth = worldDepth / 2;

// var scene = new THREE.Scene();
// // scene.fog = new THREE.FogExp2( 0xaaccff, 0.0007 );

// var camera = new THREE.PerspectiveCamera( 75, window.innerWidth/window.innerHeight, 0.1, 1000 );
// // camera.position.x = 400;
// camera.rotation.x = -.5;
// camera.position.y = 200;
// console.log('camera', camera);

// var renderer = new THREE.WebGLRenderer();
// renderer.setSize( window.innerWidth, window.innerHeight );
// document.body.appendChild( renderer.domElement );

// var vertexShader = document.getElementById( 'vertexShader' ).textContent;
// var fragmentShader = document.getElementById( 'fragmentShader' ).textContent;

// var material = new THREE.MeshBasicMaterial( { 
// 	color: 0x00ff00,
// 	wireframe: true
// } );

// geometry = new THREE.PlaneGeometry( 20000, 20000, worldWidth - 1, worldDepth - 1 );
// geometry.applyMatrix( new THREE.Matrix4().makeRotationX( - Math.PI / 2 ) );

// var i, j, il, jl;
// for ( i = 0, il = geometry.vertices.length; i < il; i ++ ) {
// 	// geometry.vertices[i].y = Math.sin( i/3 ) *100 //* 100 * Math.random();
// }
// console.log( "triangles: " + geometry.faces.length * 2 + " faces: " + geometry.faces.length + " vertices: " + geometry.vertices.length );

// geometry.computeFaceNormals();
// geometry.computeVertexNormals();

// mesh = new THREE.Mesh( geometry, material );
// scene.add( mesh );

// camera.position.z = 5;

// var render = function () {
// 	requestAnimationFrame( render );

// 	//TODO: apply simplex noise to mesh via vertex shader

// 	renderer.render(scene, camera);
// };

// render();


