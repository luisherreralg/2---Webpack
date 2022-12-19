import "./style.css";
import * as THREE from "three";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import gsap from "gsap";
import * as lil from "lil-gui";

/**
 * * -------------------- DEBUG --------------------
 */
const gui = new lil.GUI({ closed: true, width: 400 });
gui.hide();
window.addEventListener("keydown", (event) => {
  if (event.key === "h") {
    if (gui._hidden) {
      gui.show();
    } else {
      gui.hide();
    }
  }
});

/**
 * * -------------------- CURSOR --------------------
 */
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (event) => {
  cursor.x = event.clientX / sizes.width - 0.5;
  // Hay que invertir el valor del cursor.y
  // Ya que cuando el cursor baja es positivo
  // Mientras que en three.js el eje y es positivo cuando sube
  // Resumen: Que el cursor.y y three.js funcionan diferente y haq que hacer que se entiendan
  cursor.y = -(event.clientY / sizes.height - 0.5);
});

/**
 * * -------------------- SCENE --------------------
 */
const canvas = document.querySelector(".webgl");
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

// Debug
gui.add(group.position, "y").min(-3).max(3).step(0.01).name("Eje Y");
gui.add(group.position, "x").min(-3).max(3).step(0.01).name("Eje X");
gui.add(group.position, "z").min(-3).max(3).step(0.01).name("Eje Z");
gui.add(group, "visible");

let cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({
    color: "green",
  })
);
group.add(cube1);

// Debug Cube1
gui.add(cube1.material, "wireframe").name("Cube1 Wireframe");
gui.addColor(cube1.material, "color").name("Cube1 Color");

const parameters = {
  spin: () => {
    gsap.to(cube1.rotation, {
      duration: 1,
      y: cube1.rotation.y + 10,
    });
  },
};
gui.add(parameters, "spin");

// const cube2 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({
//     color: 0x00ff00,
//   })
// );
// cube2.position.x = -2;
// group.add(cube2);

// const cube3 = new THREE.Mesh(
//   new THREE.BoxGeometry(1, 1, 1),
//   new THREE.MeshBasicMaterial({
//     color: 0x0000ff,
//   })
// );
// cube3.position.x = 2;
// group.add(cube3);

// Axis Helper (para poder ver los ejes)
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * * -------------------- SIZES --------------------
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  // Update Sizes
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // Update Camera
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // Update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// ? Double click function
// window.addEventListener("dblclick", () => {
//   const fullscreenElement =
//     document.fullscreenElement || document.webkitFullscreenElement;

//   if (!fullscreenElement) {
//     if (canvas.requestFullscreen) {
//       canvas.requestFullscreen();
//     } else if (canvas.webkitRequestFullscreen) {
//       canvas.webkitRequestFullscreen();
//     }
//   } else {
//     if (document.exitFullscreen) {
//       document.exitFullscreen();
//     } else if (document.webkitExitFullscreen) {
//       document.webkitExitFullscreen();
//     }
//   }
// });

/**
 * * -------------------- CAMERA --------------------
 */
const fov = 75;
const aspectRatio = sizes.width / sizes.height;
const near = 0.1;
const far = 100;
const camera = new THREE.PerspectiveCamera(fov, aspectRatio, near, far);

// ? Ortographic camera settings
// const left = -1 * aspectRatio;
// const right = 1 * aspectRatio;
// const top = 1;
// const bottom = -1;
// const camera = new THREE.OrthographicCamera(
//   left,
//   right,
//   top,
//   bottom,
//   near,
//   far
// );

camera.position.z = 3;
// camera.position.y = 2;
// camera.position.x = 2;
camera.lookAt(group.position);
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * * -------------------- RENDERER --------------------
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});

// Para que tenga el tamaño que queremos
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * * -------------------- ANIMATIONS --------------------
 */

// Clock;
const clock = new THREE.Clock();

const tick = () => {
  // Clock
  const elapsedTime = clock.getElapsedTime();

  // // Update Camera
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;

  // camera.lookAt(new THREE.Vector3()) // Centro de coordenadas 0,0,0
  camera.lookAt(group.position);

  // Update Object
  // group.rotation.y = elapsedTime * Math.PI * 0.4;

  // Update Controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // De esta manera llamamos a la función por cada frame de la pantalla
  window.requestAnimationFrame(tick);
};
tick();
