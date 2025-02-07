import React from "react";
import * as THREE from "three";
import "../three/three.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

var scene;
var camera;
var renderer;
var controls;
var boxMaterial;

initEniroment();

const loader = new GLTFLoader();

loader.load("/cloud.glb", (gltf) => {
  const model = gltf.scene;
  scene.add(model);
});

const textureLoader = new RGBELoader();
let envMap;

textureLoader.load("/envmapstreet.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  envMap = texture;

  const boxGeometry = new THREE.SphereGeometry(20, 64, 128);
  boxMaterial = new THREE.MeshStandardMaterial({
    //color: 0xffffff,
    metalness: 1.2,
    roughness: 0,
    envMap: envMap,
    envMapIntensity: 0.05,
  });

  const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
  scene.add(boxMesh);
});

const gridHelper = new THREE.GridHelper(200, 50);
scene.add(gridHelper);

animate();

function animate() {
  requestAnimationFrame(animate);
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

function initEniroment() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0d);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    500
  );

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  camera.position.z = 50;
  camera.position.y = 50;
  camera.position.x = 50;
  renderer.render(scene, camera);

  const pointLight = new THREE.PointLight(0xffffff, 50, 50);
  pointLight.position.set(0, 40, 0);
  const ambientLight = new THREE.AmbientLight(0x404040, 3);

  scene.add(pointLight, ambientLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
}
