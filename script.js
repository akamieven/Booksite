// بيانات الكتاب
const authorsData = [
    {
        id: 1,
        name: "غسان كنفاني",
        image: "https://i.postimg.cc/054GzSS1/5b2cc74e67c83d85a860d5c9ff81c0d4.jpg",
        bio: `
غسان كنفاني (عكا 9 أبريل 1936 - بيروت 8 يوليو 1972) هو روائي وقاص وصحفي فلسطيني، ويعتبر أحد أشهر الكتاب والصحافيين العرب في القرن العشرين. فقد كانت أعماله الأدبية من روايات وقصص قصيرة متجذرة في عمق الثقافة العربية والفلسطينية. ولد في عكا، شمال فلسطين، في التاسع من نيسان عام 1936م، وعاش في يافا حتى أيار 1948 حين أجبر على اللجوء مع عائلته في بادئ الأمر إلى لبنان ثم إلى سوريا. عاش وعمل في دمشق ثم في الكويت وبعد ذلك في بيروت منذ 1960 وفي تموز 1972، استشهد في بيروت مع ابنة أخته لميس في انفجار سيارة مفخخة على أيدي عملاء إسرائيليين.

أصدر غسان كنفاني حتى تاريخ وفاته المبكّر ثمانية عشر كتاباً، وكتب مئات المقالات والدراسات في الثقافة والسياسة وكفاح الشعب الفلسطيني. في أعقاب اغتياله تمّت إعادة نشر جميع مؤلفاته بالعربية، في طبعات عديدة. وجمعت رواياته وقصصه القصيرة ومسرحياته ومقالاته ونشرت في أربعة مجلدات. وتُرجمت معظم أعمال غسان الأدبية إلى سبع عشرة لغة ونُشرت في أكثر من 20 بلداً، وتمّ إخراج بعضها في أعمال مسرحية وبرامج إذاعية في بلدان عربية وأجنبية عدة. اثنتان من رواياته تحولتا إلى فيلمين سينمائيين. وما زالت أعماله الأدبية التي كتبها بين عامي 1956 و1972 تحظى اليوم بأهمية متزايدة.

على الرغم من أن روايات غسان وقصصه القصيرة ومعظم أعماله الأدبية الأخرى قد كتبت في إطار قضية فلسطين وشعبها فإن مواهبه الأدبية الفريدة أعطتها جاذبية عالمية شاملة. 
`,
        quotes: [
            { text: "لقد اهترأت هذه الأقوال العتيقة، هذه المعادلات الحسابية المترعة بالأخاديع.. مرة تقولون أن أخطاءنا تبرر أخطاءكم، ومرة تقولون أن الظلم لا يصحح بظلم آخر.. تستخدمون المنطق الأول لتبرير وجودكم هنا، وتستخدمون المنطق الثاني لتتجنبوا العقاب الذي تستحقونه.. ويخيل إليَّ أنكم تتمتعون الى أقصى حد بهذه اللعبة الطريفة.. وها أنت تحاول مرة جديدة أن تجعل من ضعفنا حصان الطراد الذي تعتلي صهوته.. لا، أنا لا أتحدث إليك مفترضًا أنك عربي، والآن أنا أكثر من يعرف أن الإنسان هو قضية، وليس لحمًا ودمًا يتوارثه جيلٌ وراءَ جيلٍ مثلما يتبادل البائعُ والزبون معلباتِ اللحمِ المقدَّد؛ إنما أتحدث إليك مفترضًا أنك في نهاية الأمر إنسان.. يهودي.. أو فلتكن ما تشاء.. ولكن عليك أن تدرك الأشياء كما ينبغي.. وأنا أعرف أنك ذات يوم ستدرك هذه الأشياء، وتدرك أن أكبر جريمة يمكن لأي إنسان أن يرتكبها، كائنًا من كان، هي أن يعتقد ولو للحظة أن ضعف الآخرين وأخطاءهم هي التي تشكل حقه في الوجود على حسابهم، وهي التي تبرر له أخطاءه وجرائمه..", book: "عائد إلى حيفا", tag: "لايوجد" },
            { text: "إن الإنسان هو قضية، وليس لحمًا ودمًا.", book: "عائد إلى حيفا", tag: "واقع" }
        ]
    },
    {
        id: 2,
        name: "جلال الدين الرومي",
        image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/30/Mevlana_Statue_in_Buca.jpg/640px-Mevlana_Statue_in_Buca.jpg",
        bio: "شاعر، فقيه، ومتصوف فارسي مسلم، صاحب المثنوي الشهير.",
        quotes: [
            { text: "لا تحزن، فكل شيء تفقده يعود إليك في هيئة أخرى.", book: "المثنوي", tag: "حكمة" },
            { text: "ما تبحث عنه يبحث عنك.", book: "ديوان شمس التبريزي", tag: "حب" }
        ]
    }
];

// دالة عرض الكتاب
function renderAuthors(filterText = "") {
    const container = document.getElementById('authorsContainer');
    if (!container) return;
    
    container.innerHTML = ""; 

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
        card.onclick = () => openModal(author);
        container.appendChild(card);
    });
}

// دالة فتح النافذة
function openModal(author) {
    const modal = document.getElementById('authorModal');
    const modalBody = document.getElementById('modalBody');
    
    let quotesHTML = author.quotes.map(q => `
        <div class="quote-box" style="margin-bottom:15px; border-right:4px solid orange; padding:10px; background:#f0f0f010">
            <p style="font-size:1.1rem; margin-bottom:5px;">"${q.text}"</p>
            <small style="color:gray;"><i class="fas fa-book"></i> ${q.book || 'بدون مصدر'} | #${q.tag || 'عام'}</small>
        </div>
    `).join('');

    modalBody.innerHTML = `
        <div style="text-align: center">
            <img src="${author.image}" style="width:100px; height:100px; border-radius:50%; object-fit:cover;">
            <h2 style="margin-top:10px;">${author.name}</h2>
            <p style="font-size:0.9rem; color:#888; margin:15px 0;">${author.bio}</p>
            <hr style="margin:20px 0; opacity:0.1;">
            <div style="text-align: right;">
                ${quotesHTML}
            </div>
        </div>
    `;
    modal.style.display = 'flex';
}

// إغلاق النافذة
document.querySelector('.close-btn').onclick = () => {
    document.getElementById('authorModal').style.display = 'none';
};

// البحث والوضع الليلي
document.getElementById('searchInput').oninput = (e) => renderAuthors(e.target.value);

document.getElementById('themeToggle').onclick = () => {
    document.body.classList.toggle('dark-mode');
};

// تشغيل عند التحميل
window.onload = () => renderAuthors();
