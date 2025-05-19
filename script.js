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

function atualizarGrafico(nomeMarca, dadosVendas) {
    const ctx = document.getElementById('grafico').getContext('2d');
    const meses = ['Jan', 'Fev', 'Mar', 'Abr'];

    if (chart) chart.destroy();

    chart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: meses,
            datasets: [{
                label: `Vendas - ${nomeMarca}`,
                data: dadosVendas,
                backgroundColor: 'rgba(54, 162, 235, 0.6)'
            }]
        },
        options: {
            responsive: true,
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        precision: 0
                    }
                }
            }
        }
    });
}