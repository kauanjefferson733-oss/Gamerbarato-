const produtos = [
    {
        id: 1,
        nome: "Mouse Gamer Pro RGB 16000 DPI",
        preco: "R$ 249,90",
        cat: "pc",
        destaque: true,
        desc: "O mouse definitivo para alta performance competitiva.",
        forte: "Sensor de alta precisão e switches ópticos.",
        fraco: "Cabo um pouco rígido.",
        quem: "Jogadores de FPS e MOBA profissionais.",
        vale: "Sim, pelo custo-benefício em relação a marcas premium."
    },
    {
        id: 2,
        nome: "Headset Surround 7.1 Wireless",
        preco: "R$ 450,00",
        cat: "console",
        destaque: false,
        desc: "Imersão total sem fios para longas sessões de gameplay.",
        forte: "Bateria dura 30 horas e áudio espacial.",
        fraco: "Microfone mediano.",
        quem: "Donos de PS5 e Xbox Series.",
        vale: "Vale cada centavo pelo conforto."
    },
    {
        id: 3,
        nome: "Controle Mobile Bluetooth Pro",
        preco: "R$ 189,00",
        cat: "mobile",
        destaque: true,
        desc: "Transforme seu celular em um console portátil.",
        forte: "Latência zero e encaixe universal.",
        fraco: "Não compatível com alguns tablets grandes.",
        quem: "Jogadores de Emuladores e Cloud Gaming.",
        vale: "Obrigatório para quem joga no celular."
    },
    {
        id: 4,
        nome: "Teclado Mecânico Switch Blue",
        preco: "R$ 320,00",
        cat: "pc",
        destaque: false,
        desc: "Feedback tátil e sonoro para maior precisão.",
        forte: "Construção em alumínio.",
        fraco: "Muito barulhento para ambientes divididos.",
        quem: "Digitadores e gamers raiz.",
        vale: "Sim, se você gosta do 'click' clássico."
    }
];

const productGrid = document.getElementById('productGrid');
const filterBtns = document.querySelectorAll('.cat-btn');

// Função para renderizar produtos
function renderProducts(lista) {
    if(!productGrid) return; // Segurança caso não esteja na index
    
    productGrid.innerHTML = lista.map(p => `
        <div class="product-card">
            <div class="img-placeholder"><i class="fas fa-gamepad"></i></div>
            <div class="product-info">
                <h3>${p.nome}</h3>
                <p class="price">${p.preco}</p>
                <div class="card-actions">
                    <button class="btn-shop">Ver na Shop</button>
                    <button class="btn-details" onclick="verDetalhes(${p.id})">Ver Detalhes</button>
                </div>
            </div>
        </div>
    `).join('');
}

// Sistema de Filtro
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        
        const filter = btn.dataset.filter;
        if(filter === 'todos') {
            renderProducts(produtos);
        } else if(filter === 'destaques') {
            renderProducts(produtos.filter(p => p.destaque));
        } else {
            renderProducts(produtos.filter(p => p.cat === filter));
        }
    });
});

// Ir para detalhes (salva no localStorage)
function verDetalhes(id) {
    const produto = produtos.find(p => p.id === id);
    localStorage.setItem('selectedProduct', JSON.stringify(produto));
    window.location.href = 'produto.html';
}

// Pesquisa Básica
document.getElementById('searchInput')?.addEventListener('input', (e) => {
    const termo = e.target.value.toLowerCase();
    const filtrados = produtos.filter(p => p.nome.toLowerCase().includes(termo));
    renderProducts(filtrados);
});

// Inicialização
renderProducts(produtos);
