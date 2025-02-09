import React from "react";
import * as THREE from "three";
import "../three/three.css";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls";
import { RGBELoader } from "three/examples/jsm/loaders/RGBELoader";
import { mergeGeometries } from "three/examples/jsm/utils/BufferGeometryUtils.js";
import { FlakesTexture } from "three/examples/jsm/Addons.js";
import { MarchingCubes } from "three/examples/jsm/objects/MarchingCubes.js";

var scene;
var camera;
var renderer;
var controls;
var sphereMesh;
var effect;

initEniroment();

let envMapLoader = new THREE.PMREMGenerator(renderer);

new RGBELoader().setPath("../").load("envmapstreet.hdr", function (hdrmap) {
  let envMap = envMapLoader.fromCubemap(hdrmap);
  let texture = new THREE.CanvasTexture(new FlakesTexture());
  texture.wrapS = THREE.RepeatWrapping;
  texture.wrapT = THREE.RepeatWrapping;
  texture.repeat.x = 10;
  texture.repeat.y = 6;

  const sphereMaterial = {
    clearcoat: 1.0,
    clearcoatRoughness: 0.1,
    metalness: 0.9,
    roughness: 0.5,
    color: 0x1cdfae,
    normalMap: texture,
    normalScale: new THREE.Vector2(0.15, 0.15),
    envMap: envMap.texture,
  };

  const sphereGeo = new THREE.SphereGeometry(100, 64, 64);
  const sphereMat = new THREE.MeshPhysicalMaterial(sphereMaterial);
  sphereMesh = new THREE.Mesh(sphereGeo, sphereMat);
  scene.add(sphereMesh);

  const resolution = 50;
  effect = new MarchingCubes(resolution, sphereMat, true, true, 100000);
  scene.add(effect);
  effect.addBall(0.3, 0.3, 0.3, 0.5);
  effect.addBall(-0.3, -0.3, -0.3, 0.5);
  effect.addBall(0, 0, 0, 0.5);
});

const gridHelper = new THREE.GridHelper(1000, 200);
//scene.add(gridHelper);

animate();

function animate() {
  requestAnimationFrame(animate);
  //sphereMesh.rotation.x += 0.0005;
  //sphereMesh.rotation.y += 0.003;
  effect.update();
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

function initEniroment() {
  scene = new THREE.Scene();
  scene.background = new THREE.Color(0x0d0d0d);
  camera = new THREE.PerspectiveCamera(
    75,
    window.innerWidth / window.innerHeight,
    0.1,
    1000
  );

  camera.position.set(100, 100, 100);

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

  const pointLight = new THREE.PointLight(0xffffff, 100000);
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

/*
  geometry2 = new THREE.CapsuleGeometry(6, 12, 10, 20);
  const capsule = new THREE.Mesh(geometry2, boxMaterial);
  capsule.castShadow = true;
  capsule.receiveShadow = true;
  scene.add(capsule);

  count = geometry2.attributes.position.count;

  positionClone = JSON.parse(
    JSON.stringify(geometry2.attributes.position.array)
  );

  normalClone = JSON.parse(JSON.stringify(geometry2.attributes.position.array));
  const now = Date.now() / 200;
  for (let i = 0; i < count; i++) {
    const uX = geometry2.attributes.uv.getX(i) * Math.PI * 8;
    const uY = geometry2.attributes.uv.getY(i) * Math.PI * 8;

    const xangle = uX + now;
    const xsin = Math.sin(xangle) * 0.2;
    const yangle = uY + now;
    const ycos = Math.cos(yangle) * 0.2;

    const ix = i * 3;
    const iy = i * 3 + 1;
    const iz = i * 3 + 2;

    geometry2.attributes.position.setX(
      i,
      positionClone[ix] + normalClone[ix] * (xsin + ycos)
    );
    geometry2.attributes.position.setY(
      i,
      positionClone[iy] + normalClone[iy] * (xsin + ycos)
    );
    geometry2.attributes.position.setZ(
      i,
      positionClone[iz] + normalClone[iz] * (xsin + ycos)
    );

    geometry2.computeVertexNormals();
    geometry2.attributes.position.needsUpdate = true;
  }

    glbLoader.load("./kawashaki_ninja_h2.glb", function (glb) {
    const cloudGeoemetry = glbSceneToGeometry(glb.scene);
    const cloudMaterial = new THREE.MeshStandardMaterial({
      color: 0xb3b3b3,
      metalness: 1.2,
      roughness: 0,
      envMap: envMap,
      envMapIntensity: 0.05,
    });
    const cloudMesh = new THREE.Mesh(cloudGeoemetry, cloudMaterial);
    cloudMesh.scale.set(10, 10, 10);
    scene.add(cloudMesh);
  });

    const barGeometry = new THREE.BoxGeometry(1000, 2, 2);
  const barMaterial = new THREE.MeshStandardMaterial({
    //color: 0xb3b3b3,
  });

  const lightBar = new THREE.Mesh(barGeometry, barMaterial);
  scene.add(lightBar);
  lightBar.castShadow = true;

  const light = new THREE.RectAreaLight(0xb3b3b3, 10000, 1000, 2);
  //lightBar.add(light);

  lightBar.position.y = 35;
  lightBar.rotation.x = Math.PI / 2 + Math.PI;

  const raycaster = new THREE.Raycaster();
const clickMouse = new THREE.Vector2();
const vector3 = new THREE.Vector3();
const MAX_CLICK_DISTANCE = 10;

window.addEventListener("click", (event) => {
  clickMouse.x = (event.clientX / Window.innerWidth) * 2 + 1;
  clickMouse.y = (event.clientY / Window.innerHeight) * 2 + 1;
  raycaster.setFromCamera(clickMouse, camera);
  const found = raycaster.intersectObjects(scene.children);
  if (found.length > 0 && found[0].object.geometry) {
    const mesh = found[0].object;
    mesh.position.x = 20;

    geometry.computeVertexNormals();
    geometry.attributes.position.needsUpdate = true;
  }
});

const glbLoader = new GLTFLoader();


const textureLoader = new RGBELoader();
let envMap;

textureLoader.load("/envmapstreet.hdr", (texture) => {
  texture.mapping = THREE.EquirectangularReflectionMapping;
  envMap = texture;
    */
