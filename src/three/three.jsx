import React from "react";
import * as THREE from "three";
import "../three/three.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";

var scene;
var camera;
var renderer;
var controls;

initEniroment();

const boxGeometry = new THREE.SphereGeometry(20, 64, 64);
const boxMaterial = new THREE.MeshStandardMaterial({
  color: 0xe6e6e6,
  metalness: 0.5,
  roughness: 0.1,
});
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
scene.add(boxMesh);

animate();

function animate() {
  requestAnimationFrame(animate);
  boxMesh.rotation.x += 0.01;
  boxMesh.rotation.y += 0.01;
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

  const pointLight = new THREE.PointLight(0xffffff, 200, 50);
  pointLight.position.set(0, 40, 0);
  const ambientLight = new THREE.AmbientLight(0x404040, 3);

  scene.add(pointLight, ambientLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
}
