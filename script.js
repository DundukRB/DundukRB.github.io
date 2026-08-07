const scriptText = 'loadstring(game:HttpGet("https://raw.githubusercontent.com/DundukRB/Bestscript/refs/heads/main/script"))()';

const copyButton = document.getElementById('copyButton');
const copyText   = document.getElementById('copyText');
const toast      = document.getElementById('toast');

let resetTimer;
let toastTimer;

async function copyScript() {
    let copied = false;

    try {
        if (navigator.clipboard && window.isSecureContext) {
            await navigator.clipboard.writeText(scriptText);
            copied = true;
        } else {
            copied = fallbackCopy(scriptText);
        }
    } catch (e) {
        copied = fallbackCopy(scriptText);
    }

    if (copied) {
        showCopied();
        showToast();
        vibrate();
    } else {
        showError();
    }
}

function fallbackCopy(text) {
    const ta = document.createElement('textarea');
    ta.value = text;
    ta.style.cssText = 'position:fixed;left:-9999px;top:-9999px;';
    document.body.appendChild(ta);
    ta.focus();
    ta.select();
    let ok = false;
    try { ok = document.execCommand('copy'); } catch (_) {}
    document.body.removeChild(ta);
    return ok;
}

function showCopied() {
    clearTimeout(resetTimer);
    copyText.textContent = 'COPIED!';
    copyButton.classList.remove('error');
    copyButton.classList.add('copied');

    resetTimer = setTimeout(() => {
        copyText.textContent = 'COPY SCRIPT';
        copyButton.classList.remove('copied');
    }, 1800);
}

function showError() {
    clearTimeout(resetTimer);
    copyText.textContent = 'ERROR';
    copyButton.classList.remove('copied');
    copyButton.classList.add('error');

    resetTimer = setTimeout(() => {
        copyText.textContent = 'COPY SCRIPT';
        copyButton.classList.remove('error');
    }, 1800);
}

function showToast() {
    clearTimeout(toastTimer);
    toast.classList.add('show');
    toastTimer = setTimeout(() => toast.classList.remove('show'), 2200);
}

function vibrate() {
    if (navigator.vibrate) navigator.vibrate([40, 30, 40]);
}

/* ═══════════ PARTICLES ═══════════ */

(function initParticles() {
    const canvas = document.getElementById('particleCanvas');
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    let W, H;
    const particles = [];
    const PARTICLE_COUNT = 60;

    function resize() {
        W = canvas.width  = window.innerWidth;
        H = canvas.height = window.innerHeight;
    }

    window.addEventListener('resize', resize);
    resize();

    class Particle {
        constructor() { this.reset(true); }
        reset(initial) {
            this.x = Math.random() * W;
            this.y = initial ? Math.random() * H : H + 10;
            this.r = Math.random() * 1.8 + 0.4;
            this.speed = Math.random() * 0.4 + 0.1;
            this.drift = (Math.random() - 0.5) * 0.3;
            this.alpha = Math.random() * 0.4 + 0.05;
            const colors = ['59,130,246','6,182,212','168,85,247','236,72,153','255,255,255'];
            this.color = colors[Math.floor(Math.random() * colors.length)];
        }
        update() {
            this.y -= this.speed;
            this.x += this.drift;
            if (this.y < -10 || this.x < -10 || this.x > W + 10) this.reset(false);
        }
        draw() {
            ctx.beginPath();
            ctx.arc(this.x, this.y, this.r, 0, Math.PI * 2);
            ctx.fillStyle = `rgba(${this.color},${this.alpha})`;
            ctx.fill();
        }
    }

    for (let i = 0; i < PARTICLE_COUNT; i++) particles.push(new Particle());

    function animate() {
        ctx.clearRect(0, 0, W, H);
        for (const p of particles) { p.update(); p.draw(); }
        requestAnimationFrame(animate);
    }
    animate();
})();
