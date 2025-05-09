document.addEventListener("DOMContentLoaded", () => {
    const filtroEstado = document.getElementById("estado");
    const formBusca = document.getElementById("form-busca");
    const campoBusca = document.getElementById("campo-busca");
  
    let todasNoticias = [];
  
    fetch("data/noticias.json")
      .then(res => res.json())
      .then(data => {
        todasNoticias = data;
        renderizarNoticias(data);
      })
      .catch(err => console.error("Erro ao carregar JSON:", err));
  
    function renderizarNoticias(lista) {
      // Limpa todas as seções antes de renderizar
      const containers = document.querySelectorAll(".noticias-container");
      containers.forEach(container => container.innerHTML = "");
  
      lista.forEach(noticia => {
        const categoria = noticia.categoria;
        const container = document.querySelector(`.noticias-container[data-categoria="${categoria}"]`);
        if (container) {
          const card = criarCard(noticia);
          container.appendChild(card);
        }
      });
    }
  
    function criarCard(noticia) {
      const card = document.createElement("div");
      card.className = "card";
  
      card.innerHTML = `
        <img src="${noticia.imagem}" alt="${noticia.titulo}">
        <div class="card-content">
          <h3>${noticia.titulo}</h3>
          <p class="info">${noticia.data} - ${noticia.estado}</p>
          <p>${noticia.conteudo.substring(0, 100)}...</p>
          <a href="noticia.html?id=${noticia.id}">Leia mais</a>
        </div>
      `;
      return card;
    }
  
    // Filtro por estado
    if (filtroEstado) {
      filtroEstado.addEventListener("change", () => {
        const estadoSelecionado = filtroEstado.value;
        let filtradas = todasNoticias;
  
        if (estadoSelecionado) {
          filtradas = filtradas.filter(n => n.estado === estadoSelecionado);
        }
  
        renderizarNoticias(filtradas);
      });
    }
  
    // Busca por palavra-chave
    if (formBusca) {
      formBusca.addEventListener("submit", (e) => {
        e.preventDefault();
        const termo = campoBusca.value.toLowerCase().trim();
  
        const filtradas = todasNoticias.filter(n =>
          n.titulo.toLowerCase().includes(termo) ||
          n.conteudo.toLowerCase().includes(termo)
        );
  
        renderizarNoticias(filtradas);
      });
    }
  });