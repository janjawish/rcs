// Mobile nav toggle
const toggle = document.querySelector('.nav-toggle');
const links = document.querySelector('.nav-links');

if (toggle && links) {
  toggle.addEventListener('click', () => {
    const open = links.classList.toggle('is-open');
    toggle.setAttribute('aria-expanded', open ? 'true' : 'false');
  });

  // close on link click (mobile)
  links.querySelectorAll('a').forEach(a => {
    a.addEventListener('click', () => {
      links.classList.remove('is-open');
      toggle.setAttribute('aria-expanded', 'false');
    });
  });
}

// Footer year
const y = document.getElementById('year');
if (y) y.textContent = new Date().getFullYear();

// Contact form: open email client (no backend)
const form = document.getElementById('contactForm');
if (form) {
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    const data = new FormData(form);

    const name = (data.get('name') || '').toString().trim();
    const email = (data.get('email') || '').toString().trim();
    const phone = (data.get('phone') || '').toString().trim();
    const subject = (data.get('subject') || 'Demande de devis').toString().trim();
    const message = (data.get('message') || '').toString().trim();

    const body = [
      `Nom: ${name}`,
      `Email: ${email}`,
      `Téléphone: ${phone}`,
      ``,
      message
    ].join('\n');

    const mailto = `mailto:contact@rcs-groupe-etude.fr?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  });
}

// Simple project modals
const modal = document.getElementById('modal');
const modalContent = document.getElementById('modalContent');

const details = {
  esa: {
    title: "Bâtiment Mario Nikis — ESA (Paris)",
    body: `
      <p><strong>Période :</strong> 2018–2019<br/>
      <strong>Rôle :</strong> Ingénieur études structure (GECIBA Structures — filiale PCM)</p>
      <p>Études d'exécution : renforcements structurels, modélisations, conformité sur 12 000 m².</p>
      <p><strong>Résultat :</strong> bâtiment tertiaire sécurisé livré pour l’Agence Spatiale Européenne.</p>
      <p><a class="link" target="_blank" rel="noopener" href="https://www.pcm-ingenierie.fr/realisations/rehabilitation_lourde_mario_nikis/">Référence publique PCM</a></p>
      <p class="small muted">Crédit visuel : © PCM / ESA</p>
    `
  },
  morland: {
    title: "Morland",
    body: `
      <p><strong>Période :</strong> à compléter<br/>
      <strong>Rôle :</strong> à compléter</p>
      <p>Études structure et coordination technique, livrables d’exécution, contrôle cohérence maquette/plans.</p>
      <p><strong>Résultat :</strong> interfaces optimisées, livrables fiabilisés pour l’exécution.</p>
    `
  },
  sways: {
    title: "SWAYS",
    body: `
      <p><strong>Période :</strong> à compléter<br/>
      <strong>Rôle :</strong> à compléter</p>
      <p>Coordination BIM, clash detection, préparation plans + quantités orientés chantier.</p>
      <p><strong>Résultat :</strong> réduction des reprises et meilleure coordination multi-lots.</p>
    `
  },
  ilp: {
    title: "ILP — Îlot Perret",
    body: `
      <p><strong>Période :</strong> à compléter<br/>
      <strong>Rôle :</strong> à compléter</p>
      <p>Standards BIM, gabarits, paramètres partagés, contrôle qualité livrables.</p>
      <p><strong>Résultat :</strong> process BIM robuste, livrables homogènes.</p>
    `
  },
  v25: {
    title: "Ateliers V25",
    body: `
      <p><strong>Période :</strong> à compléter<br/>
      <strong>Rôle :</strong> à compléter</p>
      <p>Production BIM orientée exécution : plans, détails, cohérence structure/archi, coordination.</p>
      <p><strong>Résultat :</strong> livrables prêts chantier et meilleure maîtrise délais/coûts.</p>
    `
  }
};

function openModal(key){
  if (!modal || !modalContent) return;
  const d = details[key];
  if (!d) return;

  modalContent.innerHTML = `<h3>${d.title}</h3>${d.body}`;
  modal.setAttribute('aria-hidden','false');
  document.body.style.overflow = 'hidden';
}

function closeModal(){
  if (!modal) return;
  modal.setAttribute('aria-hidden','true');
  document.body.style.overflow = '';
}

document.querySelectorAll('[data-modal]').forEach(btn=>{
  btn.addEventListener('click', ()=> openModal(btn.dataset.modal));
});

document.querySelectorAll('[data-close]').forEach(el=>{
  el.addEventListener('click', closeModal);
});

document.addEventListener('keydown', (e)=>{
  if (e.key === 'Escape') closeModal();
});
