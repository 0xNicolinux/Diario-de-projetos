/* Cena 3D de fundo: folhas e lápis flutuando; a câmera avança com o scroll. */
(function () {
  const cv = document.getElementById("gl");
  if (!window.THREE) return;
  let r; try { r = new THREE.WebGLRenderer({ canvas: cv, alpha: true, antialias: true }); } catch (e) { return; }
  const reduce = matchMedia("(prefers-reduced-motion: reduce)").matches;
  r.setPixelRatio(Math.min(devicePixelRatio, 1.5));
  const scene = new THREE.Scene(), cam = new THREE.PerspectiveCamera(55, 1, .1, 120);
  scene.fog = new THREE.Fog(0x5a4636, 14, 70);
  scene.add(new THREE.AmbientLight(0xffffff, .75));
  const sun = new THREE.DirectionalLight(0xfff1cf, .9); sun.position.set(4, 8, 6); scene.add(sun);

  const c = document.createElement("canvas"); c.width = 256; c.height = 340;
  const x = c.getContext("2d"); x.fillStyle = "#fff"; x.fillRect(0, 0, 256, 340);
  x.strokeStyle = "#8fb2e0"; for (let y = 40; y < 340; y += 22) { x.beginPath(); x.moveTo(0, y); x.lineTo(256, y); x.stroke(); }
  x.strokeStyle = "#e07a7a"; x.beginPath(); x.moveTo(40, 0); x.lineTo(40, 340); x.stroke();
  const tex = new THREE.CanvasTexture(c);
  const tints = [0xffffff, 0xfff3a8, 0xfdf2d0, 0xcfe3ff];
  const items = [], mats = [];
  for (let i = 0; i < 46; i++) {
    const m = new THREE.MeshStandardMaterial({ map: tex, color: tints[i % 4], side: THREE.DoubleSide }); mats.push(m);
    const s = new THREE.Mesh(new THREE.PlaneGeometry(2.2, 2.9), m);
    s.position.set((Math.random() < .5 ? -1 : 1) * (4.5 + Math.random() * 7), (Math.random() - .5) * 11, 6 - Math.random() * 80);
    s.rotation.set(Math.random() * 3, Math.random() * 3, Math.random() * 3);
    s.userData = { v: (Math.random() - .5) * .006, o: Math.random() * 6, y: s.position.y }; scene.add(s); items.push(s);
  }
  for (let i = 0; i < 10; i++) {
    const g = new THREE.Group();
    g.add(new THREE.Mesh(new THREE.CylinderGeometry(.09, .09, 2.2, 6), new THREE.MeshStandardMaterial({ color: 0xf2c200 })));
    const t = new THREE.Mesh(new THREE.ConeGeometry(.09, .3, 6), new THREE.MeshStandardMaterial({ color: 0xe8c9a0 })); t.position.y = -1.25; t.rotation.x = Math.PI; g.add(t);
    g.position.set((Math.random() < .5 ? -1 : 1) * (4 + Math.random() * 7), (Math.random() - .5) * 9, 4 - Math.random() * 76);
    g.rotation.set(Math.random() * 3, 0, Math.random() * 3);
    g.userData = { v: (Math.random() - .5) * .008, o: Math.random() * 6, y: g.position.y }; scene.add(g); items.push(g);
  }
  const S = { p: 0, tp: 0, mx: 0, my: 0, on: true, dark: false };
  const size = () => { r.setSize(innerWidth, innerHeight, false); cam.aspect = innerWidth / innerHeight; cam.updateProjectionMatrix(); };
  size(); addEventListener("resize", size);
  addEventListener("pointermove", e => { S.mx = e.clientX / innerWidth - .5; S.my = e.clientY / innerHeight - .5; });
  const prog = () => scrollY / Math.max(1, document.documentElement.scrollHeight - innerHeight);
  let t = 0;
  (function loop() {
    requestAnimationFrame(loop); if (!S.on) return;
    S.tp = prog(); S.p += (S.tp - S.p) * .06; t += reduce ? 0 : .01;
    cam.position.set(S.mx * 1.4, -S.my * .9 - S.p * 2, 7 - S.p * 74);
    cam.lookAt(S.mx * 2, -S.p * 2, cam.position.z - 12);
    items.forEach(o => { const d = o.userData; o.rotation.x += d.v; o.rotation.y += d.v * 1.4; o.position.y = d.y + Math.sin(t + d.o) * .4; });
    r.render(scene, cam);
  })();
  window.Scene = {
    pause: v => { S.on = !v; },
    setDark: d => { S.dark = d; scene.fog.color.set(d ? 0x17120f : 0x5a4636); mats.forEach((m, i) => m.color.setHex(d ? [0x8b93b5, 0x9a8f5a, 0x8d8670, 0x7f93c4][i % 4] : tints[i % 4])); }
  };
})();
