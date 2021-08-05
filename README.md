# Teste StayApp

Esse é um teste técnico para o cargo de Desenvolvedor Front-End na StayApp.

## Leitura do problema

A ideia é criar um CRUD de uma entidade de produtos de um market-place. 

### Market-place

Um market-place pode ser considerado como um sistema de loja e-commerce onde, diferentemente dos e-commerce comuns, existem parceiros que vendem através da loja. Sendo assim, como o foco não é a construção de um market-place completo, foi decidido omitir, da entidade, o vendedor.

### Atributos

As propriedades, ou atributos, aqui considerados mais relevantes para a criação de uma entidade de produto de um market-place são:

* **ID** - *Number/Integer* - Identificador único do produto.
* **Nome** - *String* - O nome do produto.
* **Description** - *String* - A descrição do produto. Deve ser possível inserir um texto com formatação (editor Wysiwyg).
* **Images** - *String[]* - Array de strings onde cada string representa o link para uma imagem do produto. Devido ao uso de dados *mockados* ou *micro back-ends*, foi escolhido não utilizar um input para envio de imagens, pois tiraria o foco do projeto.
* **Price** - *Number/Double* - O preço do produto.
