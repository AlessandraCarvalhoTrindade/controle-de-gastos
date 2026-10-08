const form = document.getElementById("form");
const lista = document.getElementById("lista");
const totalEl = document.getElementById("total");

let gastos = JSON.parse(localStorage.getItem("gastos")) || [];

function salvar() {
  localStorage.setItem("gastos", JSON.stringify(gastos));
}

function formatarValor(valor) {
  return valor.toLocaleString("pt-BR", {
    style: "currency",
    currency: "BRL"
  });
}

function atualizarTotal() {
  const total = gastos.reduce((acc, gasto) => acc + Number(gasto.valor), 0);
  totalEl.innerText = formatarValor(total);
}

function renderizar() {
  lista.innerHTML = "";

  gastos.forEach((gasto, index) => {
    const li = document.createElement("li");
    li.innerHTML = `
      <div class="info">
        <span class="descricao">${gasto.descricao}</span>
        <span class="categoria">${gasto.categoria}</span>
      </div>
      <div style="display: flex; align-items: center; gap: 10px;">
        <span class="valor">${formatarValor(Number(gasto.valor))}</span>
        <button class="btn-excluir" onclick="excluir(${index})">✕</button>
      </div>
    `;
    lista.appendChild(li);
  });

  atualizarTotal();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const descricao = document.getElementById("descricao").value.trim();
  const valor = document.getElementById("valor").value;
  const categoria = document.getElementById("categoria").value;

  if (!descricao || !valor) return;

  gastos.push({
    descricao,
    valor,
    categoria
  });

  form.reset();
  salvar();
  renderizar();
});

function excluir(index) {
  gastos.splice(index, 1);
  salvar();
  renderizar();
}

renderizar();
