import "./style.css";
import * as THREE from "three";

/**
 * * -------------------- SCENE --------------------
 */
const scene = new THREE.Scene();

/**
 * * -------------------- OBJECTS --------------------
 */
const group = new THREE.Group();
// Todas estas transformaciones afectan a todo el grupo de cubos
// group.position.y = 1;
// group.scale.y = 2;
// group.rotation.y = 1;
scene.add(group);

const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0xff0000,
  })
);
group.add(cube1);

const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x00ff00,
  })
);
cube2.position.x = -2;
group.add(cube2);

const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: 0x0000ff,
  })
);
cube3.position.x = 2;
group.add(cube3);

// Axis Helper (para poder ver los ejes)
const axesHelper = new THREE.AxesHelper();
scene.add(axesHelper);

/**
 * * -------------------- SIZES --------------------
 */
const sizes = {
  width: 800,
  height: 600,
};

/**
 * * -------------------- CAMERA --------------------
 */
const fov = 75;
const aspectRatio = sizes.width / sizes.height;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio);
camera.position.z = 3;
scene.add(camera);

/**
 * * -------------------- RENDERER --------------------
 */
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// Para que tenga el tamaño que queremos
renderer.setSize(sizes.width, sizes.height);

renderer.render(scene, camera);
