/* ========================================
   main.js — Three.js 3D Scene + Interactivity
   ======================================== */

import * as THREE from 'three';

// ─── Three.js Scene ─────────────────────
const canvas = document.getElementById('three-canvas');
const scene = new THREE.Scene();
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 30;

const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.setClearColor(0x000000, 0);

// ─── Color Palette ──────────────────────
const accentColor = new THREE.Color(0x6c63ff);
const secondaryColor = new THREE.Color(0x00d4aa);
const pulseColor = new THREE.Color(0xff6b9d);

// ─── Neural Network Nodes ───────────────
const nodeCount = 80;
const nodePositions = [];
const networkGroup = new THREE.Group();

// Create neuron nodes in layered clusters (like a neural net)
const layers = [
    { count: 12, x: -20, spread: 18 },
    { count: 16, x: -8, spread: 20 },
    { count: 20, x: 4, spread: 22 },
    { count: 16, x: 16, spread: 20 },
    { count: 16, x: 28, spread: 18 },
];

layers.forEach((layer) => {
    for (let i = 0; i < layer.count; i++) {
        const y = (Math.random() - 0.5) * layer.spread;
        const z = (Math.random() - 0.5) * 30 - 10;
        nodePositions.push(new THREE.Vector3(layer.x + (Math.random() - 0.5) * 6, y, z));
    }
});

// Draw nodes as glowing spheres
const nodeMeshes = [];
nodePositions.forEach((pos) => {
    const size = Math.random() * 0.25 + 0.15;
    const geo = new THREE.SphereGeometry(size, 12, 12);
    const mat = new THREE.MeshBasicMaterial({
        color: accentColor.clone().lerp(secondaryColor, Math.random()),
        transparent: true,
        opacity: 0.7 + Math.random() * 0.3,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.position.copy(pos);
    mesh.userData.baseOpacity = mat.opacity;
    mesh.userData.pulseSpeed = Math.random() * 2 + 1;
    mesh.userData.pulseOffset = Math.random() * Math.PI * 2;
    networkGroup.add(mesh);
    nodeMeshes.push(mesh);
});

// Draw connections between nearby nodes
const connectionLines = [];
const maxDist = 12;
const linePositions = [];
const lineColors = [];

for (let i = 0; i < nodePositions.length; i++) {
    for (let j = i + 1; j < nodePositions.length; j++) {
        const dist = nodePositions[i].distanceTo(nodePositions[j]);
        if (dist < maxDist) {
            linePositions.push(
                nodePositions[i].x, nodePositions[i].y, nodePositions[i].z,
                nodePositions[j].x, nodePositions[j].y, nodePositions[j].z
            );
            const alpha = 1 - dist / maxDist;
            const col = accentColor.clone().lerp(secondaryColor, Math.random() * 0.5);
            lineColors.push(col.r, col.g, col.b, col.r, col.g, col.b);
            connectionLines.push({ from: i, to: j, alpha });
        }
    }
}

const lineGeo = new THREE.BufferGeometry();
lineGeo.setAttribute('position', new THREE.Float32BufferAttribute(linePositions, 3));
lineGeo.setAttribute('color', new THREE.Float32BufferAttribute(lineColors, 3));
const lineMat = new THREE.LineBasicMaterial({
    vertexColors: true,
    transparent: true,
    opacity: 0.12,
    blending: THREE.AdditiveBlending,
});
const linesMesh = new THREE.LineSegments(lineGeo, lineMat);
networkGroup.add(linesMesh);

// ─── Data Signal Pulses ─────────────────
const signalCount = 30;
const signals = [];
for (let i = 0; i < signalCount; i++) {
    const conn = connectionLines[Math.floor(Math.random() * connectionLines.length)];
    const geo = new THREE.SphereGeometry(0.12, 8, 8);
    const mat = new THREE.MeshBasicMaterial({
        color: Math.random() > 0.5 ? 0x00d4aa : 0xff6b9d,
        transparent: true,
        opacity: 0.9,
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.from = conn.from;
    mesh.userData.to = conn.to;
    mesh.userData.t = Math.random();
    mesh.userData.speed = 0.3 + Math.random() * 0.7;
    networkGroup.add(mesh);
    signals.push(mesh);
}

scene.add(networkGroup);
networkGroup.position.set(-5, 0, 0);

// ─── DNA Data Helix ─────────────────────
const helixGroup = new THREE.Group();
const helixPoints = 60;
for (let i = 0; i < helixPoints; i++) {
    const t = (i / helixPoints) * Math.PI * 4;
    const y = (i / helixPoints - 0.5) * 40;

    // Strand A
    const xA = Math.cos(t) * 3;
    const zA = Math.sin(t) * 3;
    const geoA = new THREE.SphereGeometry(0.1, 6, 6);
    const matA = new THREE.MeshBasicMaterial({ color: 0x6c63ff, transparent: true, opacity: 0.4 });
    const meshA = new THREE.Mesh(geoA, matA);
    meshA.position.set(xA, y, zA);
    helixGroup.add(meshA);

    // Strand B
    const xB = Math.cos(t + Math.PI) * 3;
    const zB = Math.sin(t + Math.PI) * 3;
    const geoB = new THREE.SphereGeometry(0.1, 6, 6);
    const matB = new THREE.MeshBasicMaterial({ color: 0x00d4aa, transparent: true, opacity: 0.4 });
    const meshB = new THREE.Mesh(geoB, matB);
    meshB.position.set(xB, y, zB);
    helixGroup.add(meshB);

    // Connecting rungs
    if (i % 3 === 0) {
        const rungGeo = new THREE.BufferGeometry().setFromPoints([
            new THREE.Vector3(xA, y, zA),
            new THREE.Vector3(xB, y, zB),
        ]);
        const rungMat = new THREE.LineBasicMaterial({
            color: 0x8b83ff, transparent: true, opacity: 0.15,
        });
        helixGroup.add(new THREE.Line(rungGeo, rungMat));
    }
}
helixGroup.position.set(25, 0, -12);
scene.add(helixGroup);

// ─── Brain Sphere (Layered Icosahedrons) ─
const brainGroup = new THREE.Group();
[6, 4.5, 3].forEach((radius, idx) => {
    const geo = new THREE.IcosahedronGeometry(radius, idx === 0 ? 2 : 1);
    const mat = new THREE.MeshBasicMaterial({
        color: [0x6c63ff, 0x00d4aa, 0x8b83ff][idx],
        wireframe: true,
        transparent: true,
        opacity: [0.08, 0.12, 0.18][idx],
    });
    const mesh = new THREE.Mesh(geo, mat);
    mesh.userData.rotSpeed = (idx + 1) * 0.08;
    brainGroup.add(mesh);
});
brainGroup.position.set(-22, -5, -15);
scene.add(brainGroup);

// ─── Ambient Particles (subtle background) ─
const ambientCount = 800;
const ambGeo = new THREE.BufferGeometry();
const ambPos = new Float32Array(ambientCount * 3);
const ambCol = new Float32Array(ambientCount * 3);
const ambSizes = new Float32Array(ambientCount);

for (let i = 0; i < ambientCount; i++) {
    const i3 = i * 3;
    ambPos[i3] = (Math.random() - 0.5) * 100;
    ambPos[i3 + 1] = (Math.random() - 0.5) * 100;
    ambPos[i3 + 2] = (Math.random() - 0.5) * 60 - 15;
    const c = accentColor.clone().lerp(secondaryColor, Math.random());
    ambCol[i3] = c.r; ambCol[i3 + 1] = c.g; ambCol[i3 + 2] = c.b;
    ambSizes[i] = Math.random() * 1.5 + 0.3;
}
ambGeo.setAttribute('position', new THREE.BufferAttribute(ambPos, 3));
ambGeo.setAttribute('color', new THREE.BufferAttribute(ambCol, 3));
ambGeo.setAttribute('size', new THREE.BufferAttribute(ambSizes, 1));

const ambMat = new THREE.ShaderMaterial({
    uniforms: {
        uTime: { value: 0 },
        uPixelRatio: { value: renderer.getPixelRatio() },
    },
    vertexShader: `
    attribute float size;
    varying vec3 vColor;
    uniform float uTime;
    uniform float uPixelRatio;
    void main() {
      vColor = color;
      vec3 pos = position;
      pos.y += sin(uTime * 0.2 + position.x * 0.04) * 1.0;
      pos.x += cos(uTime * 0.15 + position.z * 0.04) * 0.8;
      vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
      gl_PointSize = size * uPixelRatio * (60.0 / -mvPosition.z);
      gl_Position = projectionMatrix * mvPosition;
    }
  `,
    fragmentShader: `
    varying vec3 vColor;
    void main() {
      float d = length(gl_PointCoord - vec2(0.5));
      if (d > 0.5) discard;
      float alpha = 1.0 - smoothstep(0.0, 0.5, d);
      alpha *= 0.35;
      gl_FragColor = vec4(vColor, alpha);
    }
  `,
    transparent: true,
    vertexColors: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
});

const ambientParticles = new THREE.Points(ambGeo, ambMat);
scene.add(ambientParticles);

// ─── Mouse Parallax ─────────────────────
const mouse = { x: 0, y: 0 };
const targetCamera = { x: 0, y: 0 };

document.addEventListener('mousemove', (e) => {
    mouse.x = (e.clientX / window.innerWidth - 0.5) * 2;
    mouse.y = (e.clientY / window.innerHeight - 0.5) * 2;
});

// ─── Animation Loop ─────────────────────
const clock = new THREE.Clock();

function animate() {
    requestAnimationFrame(animate);
    const elapsed = clock.getElapsedTime();
    const delta = clock.getDelta();

    // Update ambient particles
    ambMat.uniforms.uTime.value = elapsed;

    // Pulse neural network nodes
    nodeMeshes.forEach((node) => {
        const pulse = Math.sin(elapsed * node.userData.pulseSpeed + node.userData.pulseOffset);
        node.material.opacity = node.userData.baseOpacity * (0.6 + 0.4 * pulse);
        const s = 1 + pulse * 0.15;
        node.scale.set(s, s, s);
    });

    // Animate data signals along connections
    signals.forEach((sig) => {
        sig.userData.t += sig.userData.speed * 0.008;
        if (sig.userData.t > 1) {
            sig.userData.t = 0;
            // Pick a new random connection
            const conn = connectionLines[Math.floor(Math.random() * connectionLines.length)];
            sig.userData.from = conn.from;
            sig.userData.to = conn.to;
        }
        const from = nodePositions[sig.userData.from];
        const to = nodePositions[sig.userData.to];
        sig.position.lerpVectors(from, to, sig.userData.t);
        sig.material.opacity = Math.sin(sig.userData.t * Math.PI) * 0.9;
    });

    // Rotate network subtly
    networkGroup.rotation.y = Math.sin(elapsed * 0.05) * 0.1;

    // Rotate DNA helix
    helixGroup.rotation.y = elapsed * 0.15;

    // Rotate brain sphere layers
    brainGroup.children.forEach((mesh, idx) => {
        mesh.rotation.x = elapsed * mesh.userData.rotSpeed;
        mesh.rotation.y = elapsed * mesh.userData.rotSpeed * 0.7;
    });
    brainGroup.position.y = -5 + Math.sin(elapsed * 0.3) * 2;

    // Ambient particles drift
    ambientParticles.rotation.y = elapsed * 0.015;

    // Mouse parallax camera movement
    targetCamera.x = mouse.x * 3;
    targetCamera.y = -mouse.y * 3;
    camera.position.x += (targetCamera.x - camera.position.x) * 0.05;
    camera.position.y += (targetCamera.y - camera.position.y) * 0.05;
    camera.lookAt(scene.position);

    renderer.render(scene, camera);
}

animate();

// Resize handler
window.addEventListener('resize', () => {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    ambMat.uniforms.uPixelRatio.value = renderer.getPixelRatio();
});

// ─── Scroll-Based Reveal ────────────────
const revealElements = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const delay = entry.target.dataset.delay || 0;
                setTimeout(() => {
                    entry.target.classList.add('visible');
                }, delay);
            }
        });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
);

revealElements.forEach((el) => revealObserver.observe(el));

// ─── Skill Ring Animation ────────────────
const skillRings = document.querySelectorAll('.skill-ring');
const circumference = 2 * Math.PI * 26; // r=26

const ringObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const percent = parseInt(entry.target.dataset.percent);
                const offset = circumference - (percent / 100) * circumference;
                const fillCircle = entry.target.querySelector('.ring-fill');
                fillCircle.style.strokeDashoffset = offset;
                ringObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

skillRings.forEach((ring) => ringObserver.observe(ring));

// ─── Stat Counter Animation ─────────────
const statNumbers = document.querySelectorAll('.stat-number');

const counterObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                const target = parseInt(entry.target.dataset.count);
                let current = 0;
                const increment = target / 40;
                const timer = setInterval(() => {
                    current += increment;
                    if (current >= target) {
                        current = target;
                        clearInterval(timer);
                    }
                    entry.target.textContent = Math.ceil(current);
                }, 40);
                counterObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.5 }
);

statNumbers.forEach((num) => counterObserver.observe(num));

// ─── Navbar Scroll Effect ───────────────
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('.section');

window.addEventListener('scroll', () => {
    // Navbar background
    if (window.scrollY > 80) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }

    // Active section highlighting
    let current = '';
    sections.forEach((section) => {
        const sectionTop = section.offsetTop - 200;
        if (window.scrollY >= sectionTop) {
            current = section.getAttribute('id');
        }
    });

    navLinks.forEach((link) => {
        link.classList.remove('active');
        if (link.dataset.section === current) {
            link.classList.add('active');
        }
    });
});

// ─── Mobile Menu Toggle ─────────────────
const mobileMenuBtn = document.getElementById('mobile-menu-btn');
const navLinksContainer = document.querySelector('.nav-links');

mobileMenuBtn.addEventListener('click', () => {
    mobileMenuBtn.classList.toggle('open');
    navLinksContainer.classList.toggle('open');
});

// Close mobile menu when a link is clicked
navLinksContainer.querySelectorAll('.nav-link').forEach((link) => {
    link.addEventListener('click', () => {
        mobileMenuBtn.classList.remove('open');
        navLinksContainer.classList.remove('open');
    });
});

// ─── Typing Effect ──────────────────────
const typingElement = document.getElementById('typing-text');
const phrases = [
    'Generative AI Developer',
    'LLM Engineer',
    'NLP Specialist',
    'Voice AI Builder',
    'Deep Learning Enthusiast',
];

let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;
let typeSpeed = 80;

function typeEffect() {
    const currentPhrase = phrases[phraseIndex];

    if (isDeleting) {
        charIndex--;
        typeSpeed = 40;
    } else {
        charIndex++;
        typeSpeed = 80;
    }

    typingElement.textContent = currentPhrase.substring(0, charIndex);

    if (!isDeleting && charIndex === currentPhrase.length) {
        typeSpeed = 2000; // Pause at end
        isDeleting = true;
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        phraseIndex = (phraseIndex + 1) % phrases.length;
        typeSpeed = 400; // Pause before next word
    }

    setTimeout(typeEffect, typeSpeed);
}

typeEffect();

// ─── Smooth Scroll for Anchor Links ─────
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(anchor.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ─── Contact Form ───────────────────────
const contactForm = document.getElementById('contact-form');
const submitBtn = document.getElementById('submit-btn');
const formStatus = document.getElementById('form-status');

contactForm.addEventListener('submit', (e) => {
    e.preventDefault();

    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    if (!name || !email || !message) {
        formStatus.textContent = 'Please fill in all fields.';
        formStatus.className = 'form-status error';
        return;
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
        formStatus.textContent = 'Please enter a valid email address.';
        formStatus.className = 'form-status error';
        return;
    }

    // Simulate submission
    submitBtn.classList.add('loading');
    submitBtn.disabled = true;

    setTimeout(() => {
        submitBtn.classList.remove('loading');
        submitBtn.disabled = false;
        formStatus.textContent = '✨ Message sent successfully! I\'ll get back to you soon.';
        formStatus.className = 'form-status success';
        contactForm.reset();

        setTimeout(() => {
            formStatus.className = 'form-status';
        }, 5000);
    }, 1500);
});

// ─── Profile Image Fallback ─────────────
const profileImg = document.getElementById('profile-img');
if (profileImg) {
    profileImg.addEventListener('error', () => {
        // Create a gradient placeholder
        profileImg.style.display = 'none';
        const wrapper = profileImg.parentElement;
        wrapper.style.background = 'linear-gradient(135deg, #6c63ff 0%, #00d4aa 100%)';
        wrapper.style.display = 'flex';
        wrapper.style.alignItems = 'center';
        wrapper.style.justifyContent = 'center';
        wrapper.style.fontSize = '4rem';
        wrapper.style.borderRadius = '16px';
        wrapper.innerHTML = '<div style="color: white; font-size: 5rem; font-family: Space Grotesk, sans-serif; font-weight: 700;">N</div>' + wrapper.innerHTML;
    });
}

// ─── Preloader ──────────────────────────
const preloader = document.getElementById('preloader');
window.addEventListener('load', () => {
    setTimeout(() => {
        preloader.classList.add('hidden');
        // Trigger staggered hero animation after preloader fades
        const staggerItems = document.querySelectorAll('.stagger-item');
        staggerItems.forEach((item, index) => {
            setTimeout(() => {
                item.classList.add('visible');
            }, 200 + index * 150);
        });
    }, 2000);
});

// ─── Cursor Glow ────────────────────────
const cursorGlow = document.getElementById('cursor-glow');
let cursorX = 0, cursorY = 0;
let glowX = 0, glowY = 0;

document.addEventListener('mousemove', (e) => {
    cursorX = e.clientX;
    cursorY = e.clientY;
});

function updateCursorGlow() {
    glowX += (cursorX - glowX) * 0.1;
    glowY += (cursorY - glowY) * 0.1;
    cursorGlow.style.left = glowX + 'px';
    cursorGlow.style.top = glowY + 'px';
    requestAnimationFrame(updateCursorGlow);
}
updateCursorGlow();

// ─── Back to Top ────────────────────────
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
    if (window.scrollY > 500) {
        backToTop.classList.add('visible');
    } else {
        backToTop.classList.remove('visible');
    }
});

backToTop.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
});
