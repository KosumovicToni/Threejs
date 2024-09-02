import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

//Setting up the scene

const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera( 100, innerWidth / innerHeight, 1, 1000 );
const renderer = new THREE.WebGLRenderer();
const container = document.getElementById('canvas');
const btn = document.getElementById('btn');

btn.addEventListener("click",inizialize)

renderer.setSize( window.innerWidth, window.innerHeight);            
container.appendChild( renderer.domElement );

const points_array = [[],[]];

const a = 10;
const b = 28;
const c = 8.0/3.0;

let start_points = []

let dt = 0.005;


const geometries= [new THREE.BufferGeometry(),new THREE.BufferGeometry()]

const materials = [new THREE.LineBasicMaterial({ color: 0xffff00, linewidth: 3 }),new THREE.LineBasicMaterial({ color: 0xA6FF96, linewidth: 3 })]

for(let i = 0; i < geometries.length; i++){
    scene.add( new THREE.Line(geometries[i], materials[i]));
}
camera.position.z = 70;


var controls;

controls = new OrbitControls( camera, renderer.domElement );
controls.addEventListener( 'change', render );

controls.update();

function addPoint(points, i){
    if(points){
        let dx = (a * (points.y - points.x))*dt;
        let dy = (points.x * (b-points.z)- points.y)*dt;
        let dz = (points.x * points.y - c * points.z)*dt;
    
        points.x+=dx;
        points.y+=dy;
        points.z+=dz;
    
        points_array[i].push( new THREE.Vector3( points.x, points.y, points.z ) );
        geometries[i].setFromPoints(points_array[i]);
    }
}

function inizialize() {
    var newData = document.forms.data;
    var formData = new FormData(newData);
    
    start_points.push({x: parseFloat(formData.get('first-x')),y: parseFloat(formData.get('first-y')), z: parseFloat(formData.get('first-z'))});    
    start_points.push({x: parseFloat(formData.get('second-x')),y: parseFloat(formData.get('second-y')), z: parseFloat(formData.get('second-z'))});
    
    btn.style.display = "none";
    animate()
}

function animate() {
    requestAnimationFrame( animate );

    for(let i = 0; i < start_points.length; i++){
        addPoint(start_points[i], i);
    }
    addPoint();
    renderer.render( scene, camera );
}

function render() {
    renderer.render( scene, camera );
}