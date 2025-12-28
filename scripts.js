// scripts.js
// يعتمد على بنية بيانات في data/quotes.json
const booksListEl = document.getElementById('booksList');
const quotesGrid = document.getElementById('quotesGrid');
const featuredQuote = document.getElementById('featuredQuote');
const featuredMeta = document.getElementById('featuredMeta');
const searchInput = document.getElementById('searchInput');
const tagFilter = document.getElementById('tagFilter');
const bookFilter = document.getElementById('bookFilter');
const modalBackdrop = document.getElementById('modalBackdrop');
const modalQuote = document.getElementById('modalQuote');
const modalRef = document.getElementById('modalRef');
const closeModal = document.getElementById('closeModal');
const saveFav = document.getElementById('saveFav');
const copyBtn = document.getElementById('copyBtn');
const openBook = document.getElementById('openBook');
const randomBtn = document.getElementById('randomBtn');
const readerToggle = document.getElementById('readerToggle');
const similarList = document.getElementById('similarList');

let data = { books: [], quotes: [] };
let currentQuote = null;
let favorites = JSON.parse(localStorage.getItem('quotes_favs') || '[]');

async function loadData(){
  try{
    const res = await fetch('data/quotes.json');
    data = await res.json();
    init();
  }catch(err){
    console.error('خطأ في تحميل البيانات', err);
  }
}

function init(){
  renderBooks();
  populateFilters();
  renderQuotes();
  setFeatured();
}

function renderBooks(){
  booksListEl.innerHTML = '';
  data.books.forEach(b=>{
    const el = document.createElement('div');
    el.className = 'book-card';
    el.innerHTML = `
      <div class="book-cover" aria-hidden="true">${b.cover ? '' : ''}</div>
      <div style="flex:1">
        <div style="font-weight:600">${b.title}</div>
        <div style="font-size:13px;color:var(--muted)">${b.year || ''}</div>
      </div>
    `;
    el.addEventListener('click', ()=> {
      bookFilter.value = b.id;
      applyFilters();
      window.scrollTo({top:220,behavior:'smooth'});
    });
    booksListEl.appendChild(el);
  });
}

function populateFilters(){
  // كتب
  bookFilter.innerHTML = '<option value="">كل الكتب</option>';
  data.books.forEach(b=>{
    const opt = document.createElement('option'); opt.value = b.id; opt.textContent = b.title; bookFilter.appendChild(opt);
  });
  // وسوم
  const tags = new Set();
  data.quotes.forEach(q=> q.tags.forEach(t=> tags.add(t)));
  tagFilter.innerHTML = '<option value="">كل الوسوم</option>';
  Array.from(tags).forEach(t=>{
    const opt = document.createElement('option'); opt.value = t; opt.textContent = t; tagFilter.appendChild(opt);
  });
}

function renderQuotes(list = data.quotes){
  quotesGrid.innerHTML = '';
  list.forEach(q=>{
    const book = data.books.find(b=>b.id===q.bookId) || {};
    const card = document.createElement('article');
    card.className = 'quote-card';
    card.innerHTML = `
      <div class="quote-text">${q.text}</div>
      <div class="quote-meta">
        <div>${book.title || 'كتاب غير معروف'} — ${q.chapter || ''}</div>
        <div class="actions">
          <button class="icon-btn" data-id="${q.id}" data-action="open">عرض</button>
          <button class="icon-btn" data-id="${q.id}" data-action="fav">${favorites.includes(q.id) ? '★' : '☆'}</button>
        </div>
      </div>
    `;
    quotesGrid.appendChild(card);
  });
}

function setFeatured(){
  const first = data.quotes[0];
  if(first){
    featuredQuote.textContent = first.text;
    const book = data.books.find(b=>b.id===first.bookId) || {};
    featuredMeta.textContent = `${book.title || ''} — ${book.year || ''}`;
  }
}

function openModalFor(id){
  const q = data.quotes.find(x=>x.id===id);
  if(!q) return;
  currentQuote = q;
  modalQuote.textContent = q.text;
  const book = data.books.find(b=>b.id===q.bookId) || {title:'كتاب غير معروف', year:''};
  modalRef.textContent = `${book.title} — ${book.year}. ${q.chapter ? q.chapter + '.' : ''} ${q.page ? 'صفحة ' + q.page + '.' : ''}`;
  modalBackdrop.style.display = 'flex';
  modalBackdrop.setAttribute('aria-hidden','false');
  renderSimilar(q);
}

closeModal.addEventListener('click', ()=> {
  modalBackdrop.style.display = 'none';
  modalBackdrop.setAttribute('aria-hidden','true');
});
modalBackdrop.addEventListener('click', (e)=> {
  if(e.target === modalBackdrop) closeModal.click();
});

document.addEventListener('click', (e)=>{
  const btn = e.target.closest('button');
  if(!btn) return;
  const id = btn.dataset.id;
  const action = btn.dataset.action;
  if(action === 'open') openModalFor(id);
  if(action === 'fav') toggleFav(id);
});

saveFav.addEventListener('click', ()=>{
  if(!currentQuote) return;
  toggleFav(currentQuote.id);
  saveFav.textContent = favorites.includes(currentQuote.id) ? 'محفوظ' : 'حفظ';
  renderQuotes();
});

copyBtn.addEventListener('click', ()=>{
  if(!currentQuote) return;
  const book = data.books.find(b=>b.id===currentQuote.bookId) || {};
  const text = `"${currentQuote.text}" — ${book.title || ''} (${book.year || ''}) ${currentQuote.page ? 'صفحة ' + currentQuote.page : ''}`;
  navigator.clipboard.writeText(text).then(()=> {
    copyBtn.textContent = 'تم النسخ';
    setTimeout(()=> copyBtn.textContent = 'نسخ مع المرجع',1200);
  });
});

openBook.addEventListener('click', ()=>{
  if(!currentQuote) return;
  bookFilter.value = currentQuote.bookId;
  applyFilters();
  closeModal.click();
});

function toggleFav(id){
  if(favorites.includes(id)) favorites = favorites.filter(x=>x!==id);
  else favorites.push(id);
  localStorage.setItem('quotes_favs', JSON.stringify(favorites));
  renderQuotes();
}

searchInput.addEventListener('input', ()=>{
  applyFilters();
});
tagFilter.addEventListener('change', applyFilters);
bookFilter.addEventListener('change', applyFilters);

function applyFilters(){
  const q = searchInput.value.trim().toLowerCase();
  const tag = tagFilter.value;
  const bookId = bookFilter.value;
  let list = data.quotes.filter(item=>{
    const book = (data.books.find(b=>b.id===item.bookId) || {}).title || '';
    const matchesText = item.text.toLowerCase().includes(q) || book.toLowerCase().includes(q) || item.tags.join(' ').toLowerCase().includes(q);
    const matchesTag = tag ? item.tags.includes(tag) : true;
    const matchesBook = bookId ? item.bookId === bookId : true;
    return matchesText && matchesTag && matchesBook;
  });
  renderQuotes(list);
}

randomBtn.addEventListener('click', ()=>{
  const idx = Math.floor(Math.random()*data.quotes.length);
  const q = data.quotes[idx];
  featuredQuote.textContent = q.text;
  const book = data.books.find(b=>b.id===q.bookId) || {};
  featuredMeta.textContent = `${book.title || ''} — ${book.year || ''}`;
  openModalFor(q.id);
});

readerToggle.addEventListener('click', ()=>{
  document.body.classList.toggle('reader-mode');
  readerToggle.textContent = document.body.classList.contains('reader-mode') ? 'خروج من القراءة' : 'قراءة';
});

function renderSimilar(q){
  const sims = data.quotes.filter(x=> x.id !== q.id && x.bookId === q.bookId).slice(0,4);
  if(sims.length === 0) similarList.textContent = '';
  else {
    similarList.innerHTML = '<strong>اقتباسات من نفس الكتاب</strong><ul></ul>';
    const ul = similarList.querySelector('ul');
    sims.forEach(s=>{
      const li = document.createElement('li');
      li.style.marginBottom = '6px';
      li.innerHTML = `<a href="#" data-id="${s.id}" class="sim-link">${s.text}</a>`;
      ul.appendChild(li);
    });
    similarList.querySelectorAll('.sim-link').forEach(a=>{
      a.addEventListener('click', (ev)=>{
        ev.preventDefault();
        openModalFor(a.dataset.id);
      });
    });
  }
}

loadData();