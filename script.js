$(function () {
    fetch('data.json')
        .then(response => response.json())
        .then(data => {
            initAppWithData(data);
        })
        .catch(error => {
            console.error('Erro ao carregar data.json:', error);
        });
});

function initAppWithData(mockData) {
    const categoriaSelect = $('#categoriaSelect');
    const produtoSelect = $('#produtoSelect');
    const marcaSelect = $('#marcaSelect');
    const meses = ['Jan', 'Feb', 'Mar', 'Apr'];
    let chart;

    function updateSelect(selectElement, options) {
        selectElement.empty();
        options.forEach(opt => {
            selectElement.append(`<option value="${opt}">${opt}</option>`);
        });
    }

    function updateProdutoOptions(categoria) {
        const produtos = Object.keys(mockData[categoria] || {});
        updateSelect(produtoSelect, produtos);
        updateMarcaOptions(categoria, produtos[0]);
    }

    function updateMarcaOptions(categoria, produto) {
        const marcas = Object.keys((mockData[categoria] && mockData[categoria][produto]) || {});
        updateSelect(marcaSelect, marcas);
        updateChart(categoria, produto, marcas[0]);
    }

    function updateChart(categoria, produto, marca) {
        const data = mockData[categoria]?.[produto]?.[marca] || [];
        const chartData = {
            labels: meses,
            datasets: [{
                label: `${marca} - Vendas`,
                backgroundColor: 'rgba(60,141,188,0.9)',
                borderColor: 'rgba(60,141,188,0.8)',
                fill: false,
                data: data
            }]
        };
        const options = {
            responsive: true,
            maintainAspectRatio: false,
            scales: {
                xAxes: [{ gridLines: { display: false } }],
                yAxes: [{ gridLines: { display: false }, ticks: { beginAtZero: true } }]
            }
        };
        if (chart) chart.destroy();
        const ctx = document.getElementById('lineChart').getContext('2d');
        chart = new Chart(ctx, { type: 'line', data: chartData, options: options });
    }

    const categorias = Object.keys(mockData);
    updateSelect(categoriaSelect, categorias);
    updateProdutoOptions(categorias[0]);

    categoriaSelect.on('change', function () {
        const categoria = $(this).val();
        updateProdutoOptions(categoria);
    });

    produtoSelect.on('change', function () {
        const categoria = categoriaSelect.val();
        const produto = $(this).val();
        updateMarcaOptions(categoria, produto);
    });

    marcaSelect.on('change', function () {
        const categoria = categoriaSelect.val();
        const produto = produtoSelect.val();
        const marca = $(this).val();
        updateChart(categoria, produto, marca);
    });
}
