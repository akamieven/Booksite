// 1. البيانات (الداتا) - يمكنك إضافة المزيد هنا
const authorsData = [
    {
        id: 1,
        name: "غسان كنفاني",
        image: "https://i.postimg.cc/054GzSS1/5b2cc74e67c83d85a860d5c9ff81c0d4.jpg",
        bio: "غسان كنفاني (عكا 9 أبريل 1936 - بيروت 8 يوليو 1972) هو روائي وقاص وصحفي فلسطيني، ويعتبر أحد أشهر الكتاب والصحافيين العرب في القرن العشرين. فقد كانت أعماله الأدبية من روايات وقصص قصيرة متجذرة في عمق الثقافة العربية والفلسطينية. ولد في عكا، شمال فلسطين، في التاسع من نيسان عام 1936م، وعاش في يافا حتى أيار 1948 حين أجبر على اللجوء مع عائلته في بادئ الأمر إلى لبنان ثم إلى سوريا. عاش وعمل في دمشق ثم في الكويت وبعد ذلك في بيروت منذ 1960 وفي تموز 1972، استشهد في بيروت مع ابنة أخته لميس في انفجار سيارة مفخخة على أيدي عملاء إسرائيليين.

أصدر غسان كنفاني حتى تاريخ وفاته المبكّر ثمانية عشر كتاباً، وكتب مئات المقالات والدراسات في الثقافة والسياسة وكفاح الشعب الفلسطيني. في أعقاب اغتياله تمّت إعادة نشر جميع مؤلفاته بالعربية، في طبعات عديدة. وجمعت رواياته وقصصه القصيرة ومسرحياته ومقالاته ونشرت في أربعة مجلدات. وتُرجمت معظم أعمال غسان الأدبية إلى سبع عشرة لغة ونُشرت في أكثر من 20 بلداً، وتمّ إخراج بعضها في أعمال مسرحية وبرامج إذاعية في بلدان عربية وأجنبية عدة. اثنتان من رواياته تحولتا إلى فيلمين سينمائيين. وما زالت أعماله الأدبية التي كتبها بين عامي 1956 و1972 تحظى اليوم بأهمية متزايدة.

على الرغم من أن روايات غسان وقصصه القصيرة ومعظم أعماله الأدبية الأخرى قد كتبت في إطار قضية فلسطين وشعبها فإن مواهبه الأدبية الفريدة أعطتها جاذبية عالمية شاملة. ",
        quotes: [
            { text: " أتعرفين؟ طوال عشرين سنة كنت أتصور أن بوابة "مندلبوم" ستفتح ذات يوم.. ولكن أبدًا أبدًا لم أتصور أنها ستفتح من الناحية الأخرى.. لم يكن ذلك يخطر لي على بال، ولذلك فحين فتحوها هم بدا لي الأمر مرعبًا وسخيفًا وإلى حد كبير مهينًا تمامًا... قد أكون مجنونًا لو قلت لك أن كل الأبواب يجب ألا تفتح إلا من جهة واحدة، وإنها إذا فتحت من الجهة الأخرى فيجب اعتبارها مغلقة لا تزال، ولكن تلك هي الحقيقة..", book: "عائد إلى حيفا", tag: "واقع"},
            { text: "ولكن متى تكفُّون عن اعتبار ضعف الآخرين وأخطائهم مجيرة لحساب ميزاتكم؟! لقد اهترأت هذه الأقوال العتيقة، هذه المعادلات الحسابية المترعة بالأخاديع.. مرة تقولون أن أخطاءنا تبرر أخطاءكم، ومرة تقولون أن الظلم لا يصحح بظلم آخر.. تستخدمون المنطق الأول لتبرير وجودكم هنا، وتستخدمون المنطق الثاني لتتجنبوا العقاب الذي تستحقونه.. ويخيل إليَّ أنكم تتمتعون الى أقصى حد بهذه اللعبة الطريفة.. وها أنت تحاول مرة جديدة أن تجعل من ضعفنا حصان الطراد الذي تعتلي صهوته.. لا، أنا لا أتحدث إليك مفترضًا أنك عربي، والآن أنا أكثر من يعرف أن الإنسان هو قضية، وليس لحمًا ودمًا يتوارثه جيلٌ وراءَ جيلٍ مثلما يتبادل البائعُ والزبون معلباتِ اللحمِ المقدَّد؛ إنما أتحدث إليك مفترضًا أنك في نهاية الأمر إنسان.. يهودي.. أو فلتكن ما تشاء.. ولكن عليك أن تدرك الأشياء كما ينبغي.. وأنا أعرف أنك ذات يوم ستدرك هذه الأشياء، وتدرك أن أكبر جريمة يمكن لأي إنسان أن يرتكبها، كائنًا من كان، هي أن يعتقد ولو للحظة أن ضعف الآخرين وأخطاءهم هي التي تشكل حقه في الوجود على حسابهم، وهي التي تبرر له أخطاءه وجرائمه..", book: "عائد إلى حيفا", tag: "واقع" }
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
