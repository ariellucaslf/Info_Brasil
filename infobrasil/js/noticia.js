document.addEventListener("DOMContentLoaded", () => {
  const params = new URLSearchParams(window.location.search);
  const id = params.get("id");

  if (!id) {
    document.getElementById("titulo-noticia").textContent = "Notícia não encontrada.";
    return;
  }

  fetch("data/noticias.json")
    .then(res => {
      if (!res.ok) throw new Error("Erro ao carregar JSON.");
      return res.json();
    })
    .then(noticias => {
      const noticia = noticias.find(n => String(n.id) === String(id));

      if (!noticia) {
        document.getElementById("titulo-noticia").textContent = "Notícia não encontrada.";
        return;
      }

      document.getElementById("titulo-noticia").textContent = noticia.titulo;
      document.getElementById("meta-noticia").textContent = `${noticia.estado} - ${noticia.data}`;
      document.getElementById("imagem-noticia").src = noticia.imagem || "imagens/padrao.jpg";
      document.getElementById("imagem-noticia").alt = noticia.titulo;
      document.getElementById("conteudo-noticia").textContent = noticia.conteudo;
      document.getElementById("categoria-noticia").textContent = noticia.categoria;
    })
    .catch(erro => {
      console.error(erro);
      document.getElementById("titulo-noticia").textContent = "Erro ao carregar a notícia.";
    });
});
