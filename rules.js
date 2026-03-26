export async function loadRules() {
  const res = await fetch('./data/rules.json'); // <-- pas de slash au début
  return res.json();
}

export function buildForm(container, fields) {
  container.innerHTML = '';
  for (const f of fields) {
    const label = document.createElement('label');
    label.htmlFor = f.id;
    label.textContent = f.label;
    container.appendChild(label);
    let input;
    if (f.type === 'select') {
      input = document.createElement('select');
      input.id = f.id;
      const blank = document.createElement('option');
      blank.value = ''; blank.textContent = '— Choisir —';
      input.appendChild(blank);
      (f.options || []).forEach(opt => {
        const o = document.createElement('option');
        o.value = opt; o.textContent = opt;
        input.appendChild(o);
      });
    } else if (f.type === 'bool') {
      input = document.createElement('select'); input.id = f.id;
      ['Non','Oui'].forEach((opt,i) => {
        const o = document.createElement('option');
        o.value = i ? 'true' : 'false'; o.textContent = opt;
        input.appendChild(o);
      });
    } else {
      input = document.createElement('input');
      input.id = f.id; input.type = f.type || 'text';
      if (f.placeholder) input.placeholder = f.placeholder;
    }
    container.appendChild(input);
  }
}

export function matchRule(row, params) {
  // simple matcher with operators lt/lte/gt/gte/eq
  for (const [k, v] of Object.entries(row)) {
    if (k === 'recommendation' || k === 'duree') continue;
    const val = params[k];
    if (v && typeof v === 'object' && !Array.isArray(v)) {
      if ('lt' in v && !(Number(val) < v.lt)) return false;
      if ('lte' in v && !(Number(val) <= v.lte)) return false;
      if ('gt' in v && !(Number(val) > v.gt)) return false;
      if ('gte' in v && !(Number(val) >= v.gte)) return false;
      if ('eq' in v && !(String(val) === String(v.eq))) return false;
    } else {
      if (String(val) !== String(v)) return false;
    }
  }
  return true;
}
