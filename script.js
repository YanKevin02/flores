const audio = new Audio('./Lisboa - ANAVITÓRIA.mp3');
let isPlaying = false;
let fullscreenSolicitado = false;
audio.loop = true;
audio.volume = 0.3;

const btnMusica = document.getElementById('btn-musica');
const telaInicialFullscreen = document.getElementById('tela-inicial-fullscreen');
const btnEntrarFullscreen = document.getElementById('btn-entrar-fullscreen');
let telaInicialAtiva = true;

function atualizarBotaoMusica() {
btnMusica.textContent = isPlaying ? '⏸' : '▶';
btnMusica.setAttribute('aria-label', isPlaying ? 'Pausar música' : 'Tocar música');
}

async function tocarMusica() {
try {
   await audio.play();
   isPlaying = true;
   atualizarBotaoMusica();
} catch (e) {
   console.log('Reprodução bloqueada pelo navegador.');
}
}

function pausarMusica() {
audio.pause();
isPlaying = false;
atualizarBotaoMusica();
}

function alternarMusica() {
if (isPlaying) {
   pausarMusica();
} else {
   tocarMusica();
}
}

async function solicitarTelaCheia() {
if (document.fullscreenElement || fullscreenSolicitado) {
   return;
}
fullscreenSolicitado = true;
try {
   await document.documentElement.requestFullscreen();
} catch (e) {
   fullscreenSolicitado = false;
}
}

function atualizarTelaInicial() {
if (!telaInicialAtiva) {
   telaInicialFullscreen.classList.add('is-hidden');
   return;
}

if (document.fullscreenElement) {
   telaInicialFullscreen.classList.add('is-hidden');
   telaInicialAtiva = false;
} else {
   telaInicialFullscreen.classList.remove('is-hidden');
}
}

btnMusica.addEventListener('click', alternarMusica);
btnEntrarFullscreen.addEventListener('click', async () => {
await solicitarTelaCheia();
atualizarTelaInicial();
});

document.addEventListener('fullscreenchange', atualizarTelaInicial);

window.addEventListener('load', () => {
atualizarBotaoMusica();
atualizarTelaInicial();
});

window.addEventListener('pointerdown', () => {
solicitarTelaCheia();
atualizarTelaInicial();
if (!isPlaying) {
   tocarMusica();
}
}, { once: true });

// Genera 18 imágenes PNG en posiciones aleatorias
const cantidad = 10;
const pngUrl1 = 'https://i.postimg.cc/1znkzM1N/d41ef946c455e1a52cc09145cae1e8c5-1.png';
const pngUrl2 = 'https://i.postimg.cc/W1LjxhFv/de2e32da1ca2eed1ce61afd9e86056d3.png';
const contenedor = document.getElementById('png-regados');
contenedor.style.position = 'fixed';
contenedor.style.top = '0';
contenedor.style.left = '0';
contenedor.style.width = '100vw';
contenedor.style.height = '100vh';
contenedor.style.pointerEvents = 'auto';
function getResponsiveSize() {
if (window.innerWidth <= 600) {
   // Móvil: aún más grande
   return 90 + Math.random() * 60;
} else {
   // Escritorio: aún más grande
   return 120 + Math.random() * 80;
}
}
// Animación flotante
function animarFlotantes() {
const imgs = contenedor.querySelectorAll('img');
imgs.forEach((img, idx) => {
   const baseTop = parseFloat(img.style.top);
   const baseLeft = parseFloat(img.style.left);
   img.animate([
      { transform: img.style.transform },
      { transform: `${img.style.transform} translateY(-12px) scale(1.08)` },
      { transform: img.style.transform }
   ], {
      duration: 3200 + Math.random() * 1200,
      direction: 'alternate',
      iterations: Infinity,
      easing: 'ease-in-out',
      delay: idx * 120
   });
   img.onclick = function (e) {
      e.stopPropagation();
      mostrarAnimacion3D(img, idx, img.src === pngUrl1 ? 'yellow' : 'red');
   };
   img.style.cursor = 'pointer';
});
}
function posicionarPNGs() {
contenedor.innerHTML = '';
const posiciones = [];
const minDist = 120; // distancia mínima en px
// Primer PNG
for (let i = 0; i < cantidad; i++) {
   let valido = false, topPx, leftPx, intentos = 0;
   let ancho = getResponsiveSize();
   while (!valido && intentos < 100) {
      topPx = Math.random() * 0.85 * window.innerHeight;
      leftPx = Math.random() * 0.90 * window.innerWidth;
      valido = true;
      for (const pos of posiciones) {
      const dx = leftPx - pos.left;
      const dy = topPx - pos.top;
      if (Math.sqrt(dx * dx + dy * dy) < minDist) {
         valido = false;
         break;
      }
      }
      intentos++;
   }
   posiciones.push({ top: topPx, left: leftPx });
   const img = document.createElement('img');
   img.src = pngUrl1;
   img.alt = 'Flor de Girassol';
   img.style.position = 'absolute';
   img.style.width = ancho + 'px';
   img.style.opacity = 0.85 + Math.random() * 0.15;
   img.style.top = topPx + 'px';
   img.style.left = leftPx + 'px';
   img.style.transform = `rotate(${Math.random() * 360}deg)`;
   img.style.filter = 'drop-shadow(0 2px 16px #fff8)';
   img.style.transition = 'width 0.3s';
   img.style.userSelect = 'none';
   img.style.webkitUserSelect = 'none';
   img.style.msUserSelect = 'none';
   img.style.mozUserSelect = 'none';
   img.style.khtmlUserSelect = 'none';
   img.style.oUserSelect = 'none';
   img.dataset.tipo = 'amarilla';
   contenedor.appendChild(img);
}
// Segundo PNG
for (let i = 0; i < cantidad; i++) {
   let valido = false, topPx, leftPx, intentos = 0;
   let ancho = getResponsiveSize();
   while (!valido && intentos < 100) {
      topPx = Math.random() * 0.85 * window.innerHeight;
      leftPx = Math.random() * 0.90 * window.innerWidth;
      valido = true;
      for (const pos of posiciones) {
      const dx = leftPx - pos.left;
      const dy = topPx - pos.top;
      if (Math.sqrt(dx * dx + dy * dy) < minDist) {
         valido = false;
         break;
      }
      }
      intentos++;
   }
   posiciones.push({ top: topPx, left: leftPx });
   const img = document.createElement('img');
   img.src = pngUrl2;
   img.alt = 'Flor de Rosa';
   img.style.position = 'absolute';
   img.style.width = ancho + 'px';
   img.style.opacity = 0.85 + Math.random() * 0.15;
   img.style.top = topPx + 'px';
   img.style.left = leftPx + 'px';
   img.style.transform = `rotate(${Math.random() * 360}deg)`;
   img.style.filter = 'drop-shadow(0 2px 16px #fff8)';
   img.style.transition = 'width 0.3s';
   img.style.userSelect = 'none';
   img.style.webkitUserSelect = 'none';
   img.style.msUserSelect = 'none';
   img.style.mozUserSelect = 'none';
   img.style.khtmlUserSelect = 'none';
   img.style.oUserSelect = 'none';
   img.dataset.tipo = 'roja';
   contenedor.appendChild(img);
}
animarFlotantes();
}

// Mensajes románticos únicos
const mensajesRomanticos = [
'Você é a luz dos meus dias escuros🌅',
'Cada flor me lembra você💛',
'Com você eu sou mais feliz!',
'Te amar é a melhor esperiência!',
'Você é meu maior presente🎁',
'Você é a resposta das minhas orações🙏',
'Sua alegria me alegra o coração!',
'Você me motiva a ser alguém melhor!',
'Viver contigo é um sonho realizado!',
'Eu te amo como Cristo ama a igreja❤️',
'Eu te amo como José ama Maria❤️',
];

// Modal y animación Three.js
function cerrarModal() {
document.getElementById('modal-romantico').style.display = 'none';
}

function mostrarAnimacion3D(img, idx, color) {
const threeModal = document.getElementById('three-modal');
threeModal.style.display = 'flex';
threeModal.innerHTML = '';
// Three.js básico
const script = document.createElement('script');
script.src = 'https://cdn.jsdelivr.net/npm/three@0.152.2/build/three.min.js';
script.onload = function () {
   const THREE = window.THREE;
   const scene = new THREE.Scene();
   const camera = new THREE.PerspectiveCamera(60, window.innerWidth / window.innerHeight, 0.1, 1000);
   camera.position.set(0, 0, 14);
   const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
   renderer.setSize(window.innerWidth, window.innerHeight);
   renderer.setClearColor(0x000000, 0);
   threeModal.appendChild(renderer.domElement);
   // Luz
   scene.add(new THREE.AmbientLight(0xffffff, 0.8));
   const dirLight = new THREE.DirectionalLight(0xffffff, 0.7);
   dirLight.position.set(2, 4, 5);
   scene.add(dirLight);
   // Flor 3D cinematográfica
   const material = new THREE.MeshPhongMaterial({ color: color === 'yellow' ? 0xffd700 : 0xd60000, shininess: 80 });
   const petalMaterial = new THREE.MeshPhongMaterial({ color: color === 'yellow' ? 0xfff68f : 0xff6f6f, shininess: 60 });
   const center = new THREE.Mesh(new THREE.SphereGeometry(0.7, 32, 32), material);
   scene.add(center);
   const petals = [];
   for (let i = 0; i < 8; i++) {
      const petal = new THREE.Mesh(new THREE.SphereGeometry(0.35, 24, 24), petalMaterial);
      petal.position.x = Math.cos(i * Math.PI / 4) * 1.2;
      petal.position.y = Math.sin(i * Math.PI / 4) * 1.2;
      petal.position.z = 0;
      petal.scale.set(0.1, 0.1, 0.1);
      scene.add(petal);
      petals.push(petal);
   }
   // Cinemática: cámara se acerca, pétalos se abren, giro y brillo
   let frame = 0;
   let totalFrames = 80;
   function animate() {
      frame++;
      // Cámara se acerca y gira
      if (frame <= 40) {
      camera.position.z = 14 - (frame / 40) * 8;
      camera.position.x = Math.sin(frame / 40 * Math.PI) * 2.5;
      camera.lookAt(0, 0, 0);
      } else {
      camera.position.z = 6;
      camera.position.x = 0;
      camera.lookAt(0, 0, 0);
      }
      // Pétalos se abren
      petals.forEach((petal, i) => {
      let t = Math.min(frame / totalFrames, 1);
      petal.scale.set(0.1 + t * 0.9, 0.1 + t * 0.9, 0.1 + t * 0.9);
      petal.rotation.z += 0.03 + t * 0.08;
      });
      // Centro gira y brilla
      center.rotation.y += 0.09;
      material.shininess = 80 + Math.sin(frame / 8) * 40;
      renderer.render(scene, camera);
      if (frame < totalFrames) {
      requestAnimationFrame(animate);
      } else {
      setTimeout(() => {
         threeModal.style.display = 'none';
         threeModal.innerHTML = '';
         lanzarParticulas(img, color);
         mostrarModalRomantico(idx);
      }, 500);
      }
   }
   animate();
   window.addEventListener('resize', () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
   });
};
document.body.appendChild(script);
}

// Partículas
function lanzarParticulas(img, color) {
const cantidad = 22;
for (let i = 0; i < cantidad; i++) {
   const part = document.createElement('div');
   part.style.position = 'fixed';
   const rect = img.getBoundingClientRect();
   part.style.left = (rect.left + rect.width / 2) + 'px';
   part.style.top = (rect.top + rect.height / 2) + 'px';
   part.style.width = '12px';
   part.style.height = '12px';
   part.style.borderRadius = '50%';
   part.style.background = color === 'yellow' ? '#ffd700' : '#d60000';
   part.style.boxShadow = '0 0 12px #fff8';
   part.style.opacity = '0.85';
   part.style.zIndex = '120';
   part.style.pointerEvents = 'none';
   document.body.appendChild(part);
   const ang = Math.random() * 2 * Math.PI;
   const dist = 60 + Math.random() * 40;
   part.animate([
      { transform: 'scale(1)', opacity: 0.85 },
      { transform: `translate(${Math.cos(ang) * dist}px,${Math.sin(ang) * dist}px) scale(0.2)`, opacity: 0 },
   ], {
      duration: 900 + Math.random() * 400,
      easing: 'ease-out',
      fill: 'forwards'
   });
   setTimeout(() => part.remove(), 1200);
}
}

// Modal romántico
function mostrarModalRomantico(idx) {
document.getElementById('mensaje-romantico').textContent = mensajesRomanticos[idx % mensajesRomanticos.length];
document.getElementById('modal-romantico').style.display = 'flex';
}
posicionarPNGs();
window.addEventListener('resize', posicionarPNGs);