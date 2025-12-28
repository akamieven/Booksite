// 1. البيانات (الداتا) - يمكنك إضافة المزيد هنا
const authorsData = [
    {
        id: 1,
        name: "غسان كنفاني",
        image: "https://upload.wikimedia.org/wikipedia/commons/8/86/Ghassan_Kanafani_1970.jpg",
        bio: "روائي وقاص وصحفي فلسطيني، يعتبر أحد أشهر الكتاب والصحافيين العرب في القرن العشرين.",
        quotes: [
            { text: "خلقنا لنعترض، خلقنا لنقول لا.", tag: "ثورة" },
            { text: "أنا أحكي عن الحرية التي لا مقابل لها.", tag: "حرية" }
        ]
    },
    {
        id: 2,
        name: "جلال الدين الرومي",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mevlana_Statue_in_Buca.jpg/640px-Mevlana_Statue_in_Buca.jpg",
        bio: "شاعر، فقيه، ومتصوف فارسي مسلم.",
        quotes: [
            { text: "لا تحزن، فكل شيء تفقده يعود إليك في هيئة أخرى.", tag: "حكمة" },
            { text: "ما تبحث عنه يبحث عنك.", tag: "حب" }
        ]
    }
];

// 2. عرض الكتاب في الصفحة الرئيسية
const container = document.getElementById('authorsContainer');

function renderAuthors(filterText = "") {
    container.innerHTML = ""; // مسح المحتوى القديم
    
    // تصفية الكتاب حسب البحث
    const filteredAuthors = authorsData.filter(author => 
        author.name.includes(filterText)
    );

    filteredAuthors.forEach(author => {
        const card = document.createElement('div');
        card.className = 'author-card';
        card.innerHTML = `
            <img src="${author.image}" alt="${author.name}" class="author-img">
            <h3>${author.name}</h3>
        `;
        // عند الضغط على الكرت، نفتح التفاصيل
        card.onclick = () => openModal(author);
        container.appendChild(card);
    });
}

// 3. التعامل مع النافذة المنبثقة (Modal)
const modal = document.getElementById('authorModal');
const modalBody = document.getElementById('modalBody');
const closeBtn = document.querySelector('.close-btn');

function openModal(author) {
    // تجهيز الاقتباسات
    let quotesHTML = author.quotes.map(q => `
        <div class="quote-box">
            "${q.text}"
            <br><small>#${q.tag}</small>
        </div>
    `).join('');

    // وضع المحتوى داخل النافذة
    modalBody.innerHTML = `
        <div style="text-align: center">
            <img src="${author.image}" class="author-img" style="width: 120px; height: 120px;">
            <h2>${author.name}</h2>
            <p style="margin: 15px 0; color: #777;">${author.bio}</p>
            <hr style="margin: 20px 0; opacity: 0.2">
            <h3>اقتباسات مختارة:</h3>
            ${quotesHTML}
        </div>
    `;
    
    modal.style.display = 'flex';
}

closeBtn.onclick = () => modal.style.display = 'none';

// إغلاق النافذة عند الضغط خارجها
window.onclick = (event) => {
    if (event.target == modal) modal.style.display = 'none';
}

// 4. البحث
document.getElementById('searchInput').addEventListener('input', (e) => {
    renderAuthors(e.target.value);
});

// 5. الوضع الليلي (Dark Mode)
const themeToggle = document.getElementById('themeToggle');
themeToggle.onclick = () => {
    document.body.classList.toggle('dark-mode');
    const icon = themeToggle.querySelector('i');
    if (document.body.classList.contains('dark-mode')) {
        icon.className = 'fas fa-sun'; // تغيير الأيقونة لشمس
    } else {
        icon.className = 'fas fa-moon'; // تغيير الأيقونة لقمر
    }
};

// تشغيل الدالة لأول مرة
renderAuthors();
