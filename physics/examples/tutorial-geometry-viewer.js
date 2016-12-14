"use strict";


Physijs.scripts.worker = '../physijs_worker.js';
Physijs.scripts.ammo = 'examples/js/ammo.js';

// Set up the scene, camera, renderer, and controls as global variables.
var scene, camera, renderer, controls;

var table, loader, tableMaterial;

var xLaunch, yLaunch, zLaunch;

var keyboard = new THREEx.KeyboardState();

var toast, plate;

var gui = new dat.gui.GUI();


var obj = {

x: 9,
y: 9,
z: 7,

};



gui.remember(obj);
gui.add(obj, 'x');
gui.add(obj, 'y');
gui.add(obj, 'z');


init();
animate();

// Sets up the scene.
function init() {

      // Create the scene and set the scene size.

    
   
    scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
    scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
    
    var loader = new THREE.TextureLoader();
    
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;

      // Create a renderer and add it to the DOM.
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(WIDTH, HEIGHT);
      document.body.appendChild(renderer.domElement);

      // Create a camera, zoom it out from the model a bit, and add it to the scene.
      camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 2000);
      camera.position.set(0,15,75);
	  camera.lookAt(new THREE.Vector3(0, 7, 0));
      //camera.position.set(0,6,0);
      scene.add(camera);

      // Create an event listener that resizes the renderer with the browser window.
      window.addEventListener('resize', function() {
        var WIDTH = window.innerWidth,
            HEIGHT = window.innerHeight;
        renderer.setSize(WIDTH, HEIGHT);
        camera.aspect = WIDTH / HEIGHT;
        camera.updateProjectionMatrix();
      });

      // Set the background color of the scene.
      renderer.setClearColor(0xFFF777, 1);

      // Create a light, set its position, and add it to the scene.
      var pointLight = new THREE.PointLight(0xffffff);
      pointLight.position.set(0,10,0);
      scene.add(pointLight);

      var directionalLight1 = new THREE.DirectionalLight( 0xffeedd );
      directionalLight1.position.set( 0, 0, 1 );
      scene.add( directionalLight1 );

      var directionalLight2 = new THREE.DirectionalLight( 0xffeedd );
      directionalLight2.position.set( 1, 0, 0 );
      scene.add( directionalLight2 );

      var directionalLight3 = new THREE.DirectionalLight( 0xffeedd );
      directionalLight3.position.set( 0, 0, -1 );
      scene.add( directionalLight3 );
       
    
    // Load in the mesh and add it to the scene.
    var objLoader = new THREE.OBJLoader();
    objLoader.load( "models/plato/plato-1.obj", function (object) {
                   
                   var toast_geometry = new THREE.CylinderGeometry(2.0, 2.0, 0.1);
                   
                   var mesh = new Physijs.CylinderMesh( toast_geometry, tableMaterial,  10,{ restitution: 0.2, friction: 0.8});
                   
                   
                   
                   object.add(mesh)
                   
                   object.traverse(function (child) {
                                 //  Console.Log("help me");
                                   if (child instanceof Physijs.CylinderMesh) {
                                   child.material.map = texture;
                                   //Console.Log("help me");
                                   
                    
                                   
                                   
                                   
                                   }
                                   });

             
                   
                   object.position.y = 10.0;
                   
                   object.position.x = -10.0;
                   object.scale.x = object.scale.y = object.scale.z = 2;
              
              
              
                   scene.add(object);
                   });
    
    
    
    
    // Materials
    tableMaterial = Physijs.createMaterial(
                                           new THREE.MeshLambertMaterial({ map: loader.load( 'images/wood.jpg' )}),
                                           .9, // high friction
                                           .2 // low restitution
                                           );
    tableMaterial.map.wrapS = tableMaterial.map.wrapT = THREE.RepeatWrapping;
    tableMaterial.map.repeat.set( 5, 5 );
    
    
    
    
    var toast_geometry = new THREE.CylinderGeometry(2.0, 2.0, 0.1);
    
       plate = new Physijs.CylinderMesh( toast_geometry, tableMaterial,  10,{ restitution: 0.2, friction: 0.8});
    
    
    
    plate.position.y = 10.0;
    
    plate.position.x = -20.0;
    plate.scale.x = plate.scale.y = plate.scale.z = 2;
    
    scene.add(plate)
    
    
    
    
    
    
  
    ////  let's create a table

    
    var table = new Physijs.BoxMesh(new THREE.BoxGeometry(60, 1, 60), tableMaterial, 0, { restitution: .2, friction: .8} );
    table.position.y = -.5;
    table.recieveShadow = true;
    scene.add(table);
    
    
    
    
	var toast_material = Physijs.createMaterial(
			new THREE.MeshLambertMaterial({ map: loader.load("models/toast.png" )}),
			.4,
			.4
		);
		toast_material.map.wrapS = toast_material.map.wrapT = THREE.RepeatWrapping;
		toast_material.map.repeat.set(1, .5);

	var toast_geometry = new THREE.BoxGeometry(6.0, 6.0, 0.6);

    toast = new Physijs.BoxMesh(toast_geometry, toast_material,  10,{ restitution: 0.2, friction: 0.8} );
	
	toast.position.y = 9.0;
	toast.position.x = 20.0;

	toast.scale.x = toast.scale.y = toast.scale.z = 1;
	scene.add(toast);


      // Add OrbitControls so that we can pan around with the mouse.
      controls = new THREE.OrbitControls(camera, renderer.domElement);

    xLaunch = -12.0;
    yLaunch = 30.0;
    zLaunch = 0.0;
    



}

function launch()
{
		toast.setLinearVelocity(new THREE.Vector3(obj.x, obj.y, obj.z));
        toast.setAngularVelocity(new THREE.Vector3(1.0, 0.75, 0.0));
}

function reset()
{
	toast.setLinearVelocity(new THREE.Vector3(0, 0, 0));
	toast.setAngularVelocity(new THREE.Vector3(0, 0, 0));
	toast.position.y = 9.0;
	toast.position.x = 20.0;
	toast.position.z = 0.0;
	scene.add(toast);

}


    // Renders the scene and updates the render as needed.
function animate() {
    

	  if(keyboard.pressed("L"))
	  {
		launch();
	  }	
	  if(keyboard.pressed("R"))
	  {
		reset();
	  }
		
      requestAnimationFrame(animate);
      
      // Render the scene.
        
    scene.simulate(); // run physics
      renderer.render(scene, camera);
      //controls.update();

}
