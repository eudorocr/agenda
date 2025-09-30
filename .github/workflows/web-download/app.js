const OWNER = 'eudorocr';
const REPO = 'agenda';


async function loadLatest() {
const statusEl = document.getElementById('status');
const infoEl = document.getElementById('info');
const errEl = document.getElementById('error');
const tagEl = document.getElementById('tag');
const pubEl = document.getElementById('published');
const btn = document.getElementById('downloadBtn');


try {
statusEl.textContent = 'Consultando GitHub…';
const res = await fetch(`https://api.github.com/repos/${OWNER}/${REPO}/releases/tags/latest`);
if (!res.ok) throw new Error('No se encontró el release "latest". Ejecuta el workflow una vez.');
const rel = await res.json();


const apk = rel.assets.find(a => a.name.endsWith('.apk'));
if (!apk) throw new Error('El Release no contiene un .apk');


tagEl.textContent = rel.tag_name;
pubEl.textContent = new Date(rel.published_at).toLocaleString();
btn.href = apk.browser_download_url;


statusEl.classList.add('hidden');
infoEl.classList.remove('hidden');
} catch (e) {
statusEl.classList.add('hidden');
errEl.textContent = e.message;
errEl.classList.remove('hidden');
}
}


document.getElementById('year').textContent = new Date().getFullYear();
loadLatest();
