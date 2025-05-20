# Dashboard de Vendas por Marca

Este projeto consiste em uma interface com três campos de seleção dependentes entre si: **Categoria**, **Produto** e **Marca**. A seleção de uma categoria atualiza os produtos e marcas disponíveis; a seleção de um produto atualiza as marcas disponíveis.

Após a seleção da marca, é renderizado um gráfico com dados de vendas simulados (mock) para os **quatro primeiros meses do ano**.

## Funcionalidades

- 🔁 **Selects encadeados**:
  - Seleção de **Categoria** atualiza **Produto** e **Marca**
  - Seleção de **Produto** atualiza **Marca**
- 📊 **Gráfico de vendas por marca**
  - Dados simulados para **Janeiro a Abril**
- 📁 Dados carregados de um arquivo **JSON** local ou de uma **API mock**

## Tecnologias utilizadas

- HTML / CSS / JavaScript
- [Chart.js](https://www.chartjs.org/) para renderização dos gráficos
- JSON para simulação de dados
