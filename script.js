let dadosJSON;
let chart;

const categoriaSelect = document.getElementById("categoriaSelect");
const produtoSelect = document.getElementById("produtoSelect");
const marcaSelect = document.getElementById("marcaSelect");

fetch('data.json')
    .then(res => res.json())
    .then(data => {
        dadosJSON = data;
        preencherCategorias();
    });

function preencherCategorias() {
    categoriaSelect.innerHTML = '<option value="">Selecione</option>';
    dadosJSON.categorias.forEach((cat, i) => {
        categoriaSelect.innerHTML += `<option value="${i}">${cat.nome}</option>`;
    });
}

categoriaSelect.addEventListener('change', () => {
    const catIndex = categoriaSelect.value;
    produtoSelect.innerHTML = '<option value="">Selecione</option>';
    marcaSelect.innerHTML = '<option value="">Selecione</option>';
    if (catIndex !== "") {
        const produtos = dadosJSON.categorias[catIndex].produtos;
        produtos.forEach((prod, i) => {
            produtoSelect.innerHTML += `<option value="${i}">${prod.nome}</option>`;
        });
    }
});

produtoSelect.addEventListener('change', () => {
    const catIndex = categoriaSelect.value;
    const prodIndex = produtoSelect.value;
    marcaSelect.innerHTML = '<option value="">Selecione</option>';
    if (catIndex !== "" && prodIndex !== "") {
        const marcas = dadosJSON.categorias[catIndex].produtos[prodIndex].marcas;
        marcas.forEach((marca, i) => {
            marcaSelect.innerHTML += `<option value="${i}">${marca.nome}</option>`;
        });
    }
});

marcaSelect.addEventListener('change', () => {
    const catIndex = categoriaSelect.value;
    const prodIndex = produtoSelect.value;
    const marcaIndex = marcaSelect.value;
    if (catIndex !== "" && prodIndex !== "" && marcaIndex !== "") {
        const marca = dadosJSON.categorias[catIndex].produtos[prodIndex].marcas[marcaIndex];
        atualizarGrafico(marca.nome, marca.vendas);
    }
});

function atualizarGrafico() {
    let dados = [];

    const categoriaSelecionada = selectCategoria.value;
    const produtoSelecionado = selectProduto.value;
    const marcaSelecionada = selectMarca.value;

    if (!categoriaSelecionada && !produtoSelecionado && !marcaSelecionada) {
        // Nenhum filtro: mostra todas as marcas
        dadosJSON.categorias.forEach(categoria => {
            categoria.produtos.forEach(produto => {
                produto.marcas.forEach(marca => {
                    dados.push({
                        nome: `${marca.nome} (${produto.nome})`,
                        vendas: marca.vendas
                    });
                });
            });
        });
    } else {
        // Filtros aplicados
        const categoria = dadosJSON.categorias.find(c => c.nome === categoriaSelecionada);
        if (!categoria) return;

        const produtosFiltrados = produtoSelecionado
            ? categoria.produtos.filter(p => p.nome === produtoSelecionado)
            : categoria.produtos;

        produtosFiltrados.forEach(produto => {
            const marcasFiltradas = marcaSelecionada
                ? produto.marcas.filter(m => m.nome === marcaSelecionada)
                : produto.marcas;

            marcasFiltradas.forEach(marca => {
                dados.push({
                    nome: marca.nome,
                    vendas: marca.vendas
                });
            });
        });
    }

    // Atualiza o gráfico
    const labels = ["Jan", "Fev", "Mar", "Abr"];
    const datasets = dados.map(m => ({
        label: m.nome,
        data: m.vendas,
        fill: false,
        borderColor: gerarCor(),
        tension: 0.1
    }));

    if (grafico) {
        grafico.destroy();
    }

    grafico = new Chart(ctx, {
        type: 'line',
        data: {
            labels,
            datasets
        },
        options: {
            responsive: true,
            plugins: {
                legend: { position: 'top' },
                title: {
                    display: true,
                    text: 'Vendas por Marca'
                }
            }
        }
    });
}
