"use client";

import { useEffect, useRef, useState } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js";
import { RoundedBoxGeometry } from "three/examples/jsm/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/examples/jsm/environments/RoomEnvironment.js";

/**
 * Interactive 3D product cube for the home hero.
 * - Model: /models/taglus-cube.glb (6 faces = Premium, PU Flex, Ultra, Hard & Soft, Smiles, TUFF)
 * - Spins on its own around a tilted axis, so every face (incl. top & bottom) comes round.
 * - Drag / swipe in any direction (left, right, up, down) to spin it yourself; it keeps the
 *   momentum and then eases back into the automatic spin.
 * - Arrow keys work too when the cube is focused.
 * - Stops rendering when scrolled off-screen (saves battery).
 */

const MODEL_URL = "/models/taglus-cube.glb";
const AUTO_AXIS = new THREE.Vector3(0.35, 1, 0.18).normalize();
const AUTO_SPEED = 0.55; // rad / second
const DRAG_SENSITIVITY = 0.008; // rad per pixel
// BoxGeometry face order: +X, -X, +Y, -Y, +Z, -Z  →  material names stored in the GLB
const FACE_ORDER = ["puflex", "hardsoft", "smiles", "tuff", "premium", "ultra"];

/** Soft round shadow texture drawn once on a canvas */
function makeShadowTexture() {
  const c = document.createElement("canvas");
  c.width = c.height = 256;
  const g = c.getContext("2d")!;
  const grd = g.createRadialGradient(128, 128, 0, 128, 128, 128);
  grd.addColorStop(0, "rgba(0,10,30,0.85)");
  grd.addColorStop(0.45, "rgba(0,20,60,0.45)");
  grd.addColorStop(1, "rgba(0,0,0,0)");
  g.fillStyle = grd;
  g.fillRect(0, 0, 256, 256);
  const t = new THREE.CanvasTexture(c);
  t.colorSpace = THREE.SRGBColorSpace;
  return t;
}

export default function HeroCube({ className = "" }: { className?: string }) {
  const mountRef = useRef<HTMLDivElement>(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const mount = mountRef.current;
    if (!mount) return;

    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    /* ---------- renderer / scene / camera ---------- */
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: "high-performance" });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.NeutralToneMapping;
    renderer.toneMappingExposure = 1.05;
    renderer.setClearColor(0x000000, 0);
    mount.appendChild(renderer.domElement);
    renderer.domElement.style.display = "block";

    const scene = new THREE.Scene();
    // Wider lens = stronger perspective = the cube reads clearly as 3D
    const camera = new THREE.PerspectiveCamera(38, 1, 0.1, 50);
    camera.position.set(0, 0.15, 3.3);
    camera.lookAt(0, -0.02, 0);

    // Studio reflections (glossy box finish) + directional lights so every face is shaded differently
    const pmrem = new THREE.PMREMGenerator(renderer);
    const envTex = pmrem.fromScene(new RoomEnvironment(), 0.04).texture;
    scene.environment = envTex;

    scene.add(new THREE.AmbientLight(0xffffff, 0.35));
    const key = new THREE.DirectionalLight(0xffffff, 2.4);
    key.position.set(2.2, 3.2, 3.5);
    scene.add(key);
    const fill = new THREE.DirectionalLight(0xbcd6ff, 0.55);
    fill.position.set(-3, 0.5, 2);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(0x38bdf8, 2.2);
    rim.position.set(-2.5, 1.5, -3);
    scene.add(rim);
    const rim2 = new THREE.DirectionalLight(0x818cf8, 1.4);
    rim2.position.set(2.5, -1.5, -3);
    scene.add(rim2);

    // Soft contact shadow under the cube
    const shadowTex = makeShadowTexture();
    const shadow = new THREE.Mesh(
      new THREE.PlaneGeometry(1.7, 1.7),
      new THREE.MeshBasicMaterial({ map: shadowTex, transparent: true, depthWrite: false })
    );
    shadow.rotation.x = -Math.PI / 2;
    shadow.position.y = -0.95;
    scene.add(shadow);

    // tilt group follows the pointer slightly (parallax); pivot does the spinning
    const tilt = new THREE.Group();
    scene.add(tilt);

    const pivot = new THREE.Group();
    // Start at a nice 3/4 angle so three faces are visible straight away
    pivot.quaternion.setFromEuler(new THREE.Euler(0.42, -0.62, 0));
    tilt.add(pivot);

    /* ---------- load model ---------- */
    let disposed = false;
    new GLTFLoader().load(MODEL_URL, (gltf) => {
      if (disposed) return;
      const maxAniso = renderer.capabilities.getMaxAnisotropy();
      // Collect the 6 face textures from the GLB, then put them on a box with rounded edges
      const maps: Record<string, THREE.Texture> = {};
      gltf.scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          const mat = m as THREE.MeshStandardMaterial;
          if (mat.map) maps[mat.name] = mat.map;
        });
      });
      const materials = FACE_ORDER.map((name) => {
        const map = maps[name];
        if (map) {
          // GLB textures load as ImageBitmaps in glTF orientation (top row first), so `flipY` has no
          // effect; flip vertically through the UV transform to match RoundedBoxGeometry's UVs.
          map.repeat.set(1, -1);
          map.offset.set(0, 1);
          map.anisotropy = maxAniso;
          map.needsUpdate = true;
        }
        return new THREE.MeshPhysicalMaterial({
          map: map ?? null,
          roughness: 0.42,
          metalness: 0,
          clearcoat: 0.7,
          clearcoatRoughness: 0.28,
          envMapIntensity: 0.55,
        });
      });
      const cube = new THREE.Mesh(new RoundedBoxGeometry(1, 1, 1, 6, 0.045), materials);
      pivot.add(cube);
      setLoaded(true);
    });

    /* ---------- sizing ---------- */
    const resize = () => {
      const w = mount.clientWidth;
      const h = mount.clientHeight;
      if (!w || !h) return;
      renderer.setSize(w, h, false);
      renderer.domElement.style.width = "100%";
      renderer.domElement.style.height = "100%";
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    const ro = new ResizeObserver(resize);
    ro.observe(mount);

    /* ---------- interaction ---------- */
    // Angular velocity (rad/s) of the user's spin, in world space; decays back to the auto spin
    const userVel = new THREE.Vector3();
    let dragging = false;
    let lastX = 0;
    let lastY = 0;
    let lastT = 0;
    const tmpQ = new THREE.Quaternion();
    const tmpAxis = new THREE.Vector3();

    const rotateWorld = (axis: THREE.Vector3, angle: number) => {
      if (!angle) return;
      tmpQ.setFromAxisAngle(axis, angle);
      pivot.quaternion.premultiply(tmpQ);
    };

    const onDown = (e: PointerEvent) => {
      dragging = true;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = performance.now();
      userVel.set(0, 0, 0);
      renderer.domElement.setPointerCapture(e.pointerId);
      mount.style.cursor = "grabbing";
    };
    const onMove = (e: PointerEvent) => {
      if (!dragging) return;
      const now = performance.now();
      const dt = Math.max((now - lastT) / 1000, 1 / 240);
      const dx = e.clientX - lastX;
      const dy = e.clientY - lastY;
      lastX = e.clientX;
      lastY = e.clientY;
      lastT = now;
      // left/right → spin around vertical axis, up/down → spin around horizontal axis
      rotateWorld(tmpAxis.set(0, 1, 0), dx * DRAG_SENSITIVITY);
      rotateWorld(tmpAxis.set(1, 0, 0), dy * DRAG_SENSITIVITY);
      userVel.set((dy * DRAG_SENSITIVITY) / dt, (dx * DRAG_SENSITIVITY) / dt, 0).clampLength(0, 12);
    };
    const onUp = (e: PointerEvent) => {
      if (!dragging) return;
      dragging = false;
      if (renderer.domElement.hasPointerCapture(e.pointerId)) renderer.domElement.releasePointerCapture(e.pointerId);
      mount.style.cursor = "grab";
    };
    // pointer parallax (desktop hover)
    const tiltTarget = new THREE.Vector2();
    const onHover = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      const rect = mount.getBoundingClientRect();
      tiltTarget.set(((e.clientX - rect.left) / rect.width - 0.5) * 2, ((e.clientY - rect.top) / rect.height - 0.5) * 2);
    };
    const onLeave = () => tiltTarget.set(0, 0);

    const onKey = (e: KeyboardEvent) => {
      const kick = 4;
      if (e.key === "ArrowLeft") userVel.y -= kick;
      else if (e.key === "ArrowRight") userVel.y += kick;
      else if (e.key === "ArrowUp") userVel.x -= kick;
      else if (e.key === "ArrowDown") userVel.x += kick;
      else return;
      e.preventDefault();
    };

    const el = renderer.domElement;
    el.addEventListener("pointerdown", onDown);
    el.addEventListener("pointermove", onMove);
    el.addEventListener("pointerup", onUp);
    el.addEventListener("pointercancel", onUp);
    mount.addEventListener("keydown", onKey);
    mount.addEventListener("pointermove", onHover);
    mount.addEventListener("pointerleave", onLeave);

    /* ---------- render loop (only while visible) ---------- */
    let visible = true;
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      if (visible) clock.getDelta(); // skip the time spent off-screen
    });
    io.observe(mount);

    const clock = new THREE.Clock();
    let raf = 0;
    const autoSpeed = reduceMotion ? AUTO_SPEED * 0.3 : AUTO_SPEED;

    const tick = () => {
      raf = requestAnimationFrame(tick);
      if (!visible) return;
      const dt = Math.min(clock.getDelta(), 0.05);

      if (!dragging) {
        // user momentum, easing out
        const speed = userVel.length();
        if (speed > 0.001) {
          rotateWorld(tmpAxis.copy(userVel).normalize(), speed * dt);
          userVel.multiplyScalar(Math.exp(-2.2 * dt));
        }
        // automatic spin fades back in as the user's momentum dies down
        const blend = 1 - Math.min(speed / 3, 1);
        rotateWorld(AUTO_AXIS, autoSpeed * blend * dt);
      }

      // pointer parallax tilt (eased)
      tilt.rotation.y += (tiltTarget.x * 0.28 - tilt.rotation.y) * Math.min(dt * 4, 1);
      tilt.rotation.x += (tiltTarget.y * 0.2 - tilt.rotation.x) * Math.min(dt * 4, 1);

      // gentle float; the shadow shrinks/fades as the cube rises
      const f = Math.sin(clock.elapsedTime * 1.1);
      pivot.position.y = f * 0.05;
      shadow.scale.setScalar(1 - f * 0.08);
      (shadow.material as THREE.MeshBasicMaterial).opacity = 0.75 - f * 0.15;
      renderer.render(scene, camera);
    };
    tick();

    return () => {
      disposed = true;
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      el.removeEventListener("pointerdown", onDown);
      el.removeEventListener("pointermove", onMove);
      el.removeEventListener("pointerup", onUp);
      el.removeEventListener("pointercancel", onUp);
      mount.removeEventListener("keydown", onKey);
      mount.removeEventListener("pointermove", onHover);
      mount.removeEventListener("pointerleave", onLeave);
      shadowTex.dispose();
      envTex.dispose();
      pmrem.dispose();
      scene.traverse((o) => {
        const mesh = o as THREE.Mesh;
        if (!mesh.isMesh) return;
        mesh.geometry.dispose();
        const mats = Array.isArray(mesh.material) ? mesh.material : [mesh.material];
        mats.forEach((m) => {
          (m as THREE.MeshStandardMaterial).map?.dispose();
          m.dispose();
        });
      });
      renderer.dispose();
      el.remove();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      tabIndex={0}
      role="img"
      aria-label="3D cube showing the six Taglus aligner sheet boxes: Premium, PU Flex, Ultra, Hard & Soft, Smiles and TUFF. Drag to rotate."
      className={`cursor-grab outline-none [touch-action:pan-y] transition-opacity duration-700 ${
        loaded ? "opacity-100" : "opacity-0"
      } ${className}`}
    />
  );
}
