"use strict";


Physijs.scripts.worker = '../physijs_worker.js';
Physijs.scripts.ammo = 'examples/js/ammo.js';

// Set up the scene, camera, renderer, and controls as global variables.
var scene, camera, renderer, controls;

var table, loader, tableMaterial;

init();
animate();

// Sets up the scene.
function init() {

      // Create the scene and set the scene size.
        
    scene = new Physijs.Scene({ fixedTimeStep: 1 / 120 });
    scene.setGravity(new THREE.Vector3( 0, -30, 0 ));
    
    
    
      var WIDTH = window.innerWidth,
          HEIGHT = window.innerHeight;

      // Create a renderer and add it to the DOM.
      renderer = new THREE.WebGLRenderer({antialias:true});
      renderer.setSize(WIDTH, HEIGHT);
      document.body.appendChild(renderer.domElement);

      // Create a camera, zoom it out from the model a bit, and add it to the scene.
      camera = new THREE.PerspectiveCamera(45, WIDTH / HEIGHT, 1, 2000);
      camera.position.set(0,0,100);
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
    
    
    /*
    
    var texture = new THREE.Texture();
    
    var imageLoader = new THREE.ImageLoader();
    imageLoader.load( "models/kia.jpg", function (image) {
                     texture.image = image;
                     texture.needsUpdate = true;
                     } );
    
    // Load in the mesh and add it to the scene.
    var objLoader = new THREE.OBJLoader();
    objLoader.load( "models/kia.obj", function (object) {
                   object.traverse(function (child) {
                                   if (child instanceof THREE.Mesh) {
                                   child.material.map = texture;
                                   }
                                   });
                   scene.add(object);
                   });
///*
     
     */
      // texture
    
    /*
    
      var texture = new THREE.Texture();

      var imageLoader = new THREE.ImageLoader();
      imageLoader.load( "models/plato/plato.jpg", function (image) {
        texture.image = image;
        texture.needsUpdate = true;
      } );

      // Load in the mesh and add it to the scene.
      var objLoader = new THREE.OBJLoader();
      objLoader.load( "models/plato/plato-1.obj", function (object) {
        object.traverse(function (child) {
          if (child instanceof Physijs.BoxMesh) {
            child.material.map = texture;
          }
        });
        scene.add(object);
      });
    */
    
    
    var texture = new THREE.Texture();
    
    var imageLoader = new THREE.ImageLoader();
    imageLoader.load( "models/plato/plato.jpg", function (image) {
                     texture.image = image;
                     texture.needsUpdate = true;
                     } );
    
    // Load in the mesh and add it to the scene.
    var objLoader = new THREE.OBJLoader();
    objLoader.load( "models/plato/plato-1.obj", function (object) {
                   object.traverse(function (child) {
                                   if (child instanceof Physijs.BoxMesh) {
                                   child.material.map = texture;
                                   Console.Log("help me");
                                   
                                   }
                                   });
                   object.position.y = 1.0;
                   
                   object.position.x = -10.0;
                   object.scale.x = object.scale.y = object.scale.z = 1.3;
                   scene.add(object);
                   });
    
    ////  let's create a table
    
    
     
     
     /// Loader
     loader = new THREE.TextureLoader();
     
     // Materials
     tableMaterial = Physijs.createMaterial(
     new THREE.MeshLambertMaterial({ map: loader.load( 'images/wood.jpg' )}),
     .9, // high friction
     .2 // low restitution
     );
     tableMaterial.map.wrapS = tableMaterial.map.wrapT = THREE.RepeatWrapping;
     tableMaterial.map.repeat.set( 5, 5 );
    
    var table = new Physijs.BoxMesh(new THREE.BoxGeometry(30, 1, 30), tableMaterial, 100, { restitution: .2, friction: .8} );
    table.position.y = -.5;
    table.recieveShadow = true;
    scene.add(table);
    
    
    
    

    // Load in the mesh and add it to the scene.
    var objLoader = new THREE.OBJLoader();
    objLoader.load( "models/Toast upload.obj", function (object) {
                   object.traverse(function (child) {
                                   if (child instanceof Physijs.ConvexMesh) {
                                   child.material.map = texture;
                                   }
                                   });
                   
                   object.position.y = 2.0;
                    object.position.x = 10.0;
                   object.scale.x = object.scale.y = object.scale.z = 1;
                   scene.add(object);
                   });
    
    
    
    
//*/
    
/*
      // BEGIN Clara.io JSON loader code
      var objLoader = new THREE.ObjectLoader();
      objLoader.load("models/teapot-claraio.json", function ( object ) {
            scene.add( object );
          } );
      // END Clara.io JSON loader code
*/
    
/*
      var jsonLoader = new THREE.JSONLoader();
      jsonLoader.load( "models/logo.js", function(geometry){
      var material = new THREE.MeshLambertMaterial({color: 0x55B663});
        var mesh = new THREE.Mesh(geometry, material);
        scene.add(mesh);
      });
*/
      // Add OrbitControls so that we can pan around with the mouse.
      controls = new THREE.OrbitControls(camera, renderer.domElement);

}


    // Renders the scene and updates the render as needed.
function animate() {

      requestAnimationFrame(animate);
      
      // Render the scene.
        
    scene.simulate(); // run physics
      renderer.render(scene, camera);
      controls.update();

}
