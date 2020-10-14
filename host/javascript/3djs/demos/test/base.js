
window.onload = function(){
    init();
    requestAnimationFrame(render);

    if(onLoadOver) onLoadOver();
}

function init(){
    initRender();
    initCamera();
    initScene();
    initLight();
    initGeometry();
    initBaseGeometry();
    initControl();
    initDatGui();
}

var renderer;
var camera;
var scene;

var light;

var geometry;
var mesh;


function initRender(){

    renderer = new THREE.WebGLRenderer({canvas:document.getElementById("c"), antialias:true});
    renderer.setClearColor(0x000000);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

}

function initCamera(){

    camera = new THREE.PerspectiveCamera(35, window.innerWidth/window.innerHeight, 0.1 , 3000);
    //camera = new THREE.PerspectiveCamera( 40, window.innerWidth / window.innerHeight, 1, 1000 );
    camera.position.set( 100, 100, 100);
    // camera.position.x = 0;
    // camera.position.y = 0;
    // camera.position.z = 600;
    // camera.up.x = 0;
    // camera.up.y = 1;
    // camera.up.z = 0;
    camera.lookAt({
        x : 0,
        y : 0,
        z : 0
    });

}

function lookAt(mesh){
    camera.lookAt({
        x : mesh.x,
        y : mesh.y,
        z : mesh.z
    });
}

function initScene(){
    scene = new THREE.Scene();
    scene.add(camera);
}

function initLight(){

    light = new THREE.AmbientLight(0xffffff, 1);
    scene.add(light);
}

function initGeometry(){
    
    var geometry = new THREE.CubeGeometry(10,10,10);

    var map = new THREE.TextureLoader().load( '../../textures/UV_Grid_Sm.jpg' );
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;

    material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );

    mesh = new THREE.Mesh(geometry, material);
    mesh.position.set(0,15,0);

    scene.add(mesh);
}

function initBaseGeometry(){

    var map = new THREE.TextureLoader().load( '../../textures/UV_Grid_Sm.jpg' );
    map.wrapS = map.wrapT = THREE.RepeatWrapping;
    map.anisotropy = 16;

    var material = new THREE.MeshPhongMaterial( { map: map, side: THREE.DoubleSide } );

    var geometry = new THREE.ParametricBufferGeometry( THREE.ParametricGeometries.plane( 100, 100 ), 10, 10 );
    geometry.center();
    object = new THREE.Mesh( geometry, material );
    object.position.set( 0, 0, 0 );
    scene.add( object );

    scene.add( new THREE.AxesHelper( 200 ) );
}

function initControl(){
    var controls = new THREE.OrbitControls( camera, renderer.domElement );
    controls.minDistance = 50;
    controls.maxDistance = 150;
    controls.maxPolarAngle = Math.PI / 2;
}

var GuiData = function() {
    this.message = 'dat.gui';
    this.btn1 = function(){
    }
};

var guiData = new GuiData();

function initDatGui(){
    var gui = new dat.GUI();
    gui.add(guiData, 'message');
    gui.add(guiData, 'btn1');
}

function render(){
    renderer.render(scene, camera);

    requestAnimationFrame(render);
}


