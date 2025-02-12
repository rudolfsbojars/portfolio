import React from "react";
import * as THREE from "three";
import "../three/three.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { FlakesTexture } from "three/examples/jsm/Addons.js";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";

var scene;
var camera;
var renderer;
var controls;
var head = [];

initEniroment();

let envMapLoader = new THREE.PMREMGenerator(renderer);

new RGBELoader().setPath("../").load("hdrimage.hdr", function (hdrmap) {
  let envMap = envMapLoader.fromCubemap(hdrmap);
  let texture = new THREE.CanvasTexture(new FlakesTexture());
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 10;
  texture.repeat.y = 6;

  const metallicMaterial = new THREE.MeshPhysicalMaterial({
    clearcoat: 1,
    clearcoatRoughness: 0.6,
    metalness: 0.9,
    roughness: 0.1,
    color: 0xa4a4a4,
    normalMap: texture,
    normalScale: new THREE.Vector2(0.15, 0.15),
    envMap: envMap.texture,
  });

  new GLTFLoader().load("./head.glb", function (glb) {
    const headGeo = glbSceneToGeometry(glb.scene);
    for (let i = 0; i < 25; i++) {
      head[i] = new THREE.Mesh(headGeo, metallicMaterial);
      head[i].scale.set(0.05, 0.05, 0.05);
      scene.add(head[i]);
      head[i].position.x = Math.floor(Math.random() * 200 - 100);
      head[i].position.y = Math.floor(Math.random() * 120 - 60);
      head[i].position.z = Math.floor(Math.random() * 50 - 25);
      head[i].rotation.x = Math.PI / (1 + Math.floor(Math.random() * 20));
      head[i].rotation.y = Math.PI / (1 + Math.floor(Math.random() * 20));
      head[i].rotation.z = Math.PI / (1 + Math.floor(Math.random() * 20));
    }
  });
});

animate();

function animate() {
  requestAnimationFrame(animate);
  let time = performance.now() * 0.0005;

  head.forEach((mesh, i) => {
    let offset = i * 0.005;
    mesh.rotation.x += 0.0005;
    mesh.rotation.y += 0.0007;

    mesh.position.y += Math.sin(time + i) * 0.02;
  });
  controls.update();
  renderer.render(scene, camera);
}

window.addEventListener("resize", () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  camera.aspect = width / height;
  camera.updateProjectionMatrix();
  renderer.setSize(width, height);
});

window.addEventListener("scroll", () => {
  let scrollFactor =
    window.scrollY / (document.body.scrollHeight - window.innerHeight);
  scrollFactor = Math.min(Math.max(scrollFactor, 0), 1);

  scene.background = new THREE.Color().lerpColors(
    new THREE.Color(0x1e1e1e),
    new THREE.Color(0xdddddd),
    scrollFactor
  );

  head.forEach((mesh) => {
    mesh.material.wireframe = scrollFactor > 0.5;
    mesh.material.roughness = 0.1 + scrollFactor * 0.5;
    mesh.material.metalness = 0.9 - scrollFactor * 0.8;
    mesh.material.opacity = 1 - scrollFactor * 0.2;
    mesh.material.transparent = scrollFactor > 0.8;
  });
});

function initEniroment() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x000000);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(0, 0, 60);

  renderer = new THREE.WebGLRenderer({
    canvas: document.querySelector("#bg"),
    alpha: true,
    antialias: true,
  });

  renderer.setPixelRatio(window.devicePixelRatio);
  renderer.setSize(window.innerWidth, window.innerHeight);
  renderer.render(scene, camera);
  renderer.outputEncoding = THREE.SRGBEncoding;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.25;

  const pointLight = new THREE.PointLight(0xffffff, 10000);
  pointLight.position.set(200, 400, 200);
  const ambientLight = new THREE.AmbientLight();

  scene.add(pointLight);

  controls = new OrbitControls(camera, renderer.domElement);
  controls.enableDamping = true;
  controls.dampingFactor = 0.05;
}

function glbSceneToGeometry(glbScene) {
  const geometries = [];

  glbScene.traverse((child) => {
    if (child.isMesh) {
      const clonedGeometry = child.geometry.clone();
      addUVs(clonedGeometry);
      clonedGeometry.applyMatrix4(child.matrixWorld);
      geometries.push(clonedGeometry);
    }
  });

  if (geometries.length === 0) return null;

  return mergeGeometries(geometries);
}

function addUVs(geometry) {
  if (!geometry.attributes.position) {
    console.error("Geometry has no position attribute!");
    return;
  }

  geometry.computeBoundingBox();
  const { min, max } = geometry.boundingBox;
  const range = new THREE.Vector3().subVectors(max, min);

  const positions = geometry.attributes.position.array;
  const uvs = new Float32Array((positions.length / 3) * 2);

  for (let i = 0; i < positions.length; i += 3) {
    const x = positions[i];
    const y = positions[i + 1];

    uvs[(i / 3) * 2] = (x - min.x) / range.x;
    uvs[(i / 3) * 2 + 1] = (y - min.y) / range.y;
  }

  geometry.setAttribute("uv", new THREE.BufferAttribute(uvs, 2));
}
