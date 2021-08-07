# Teste StayApp

Esse é um teste técnico para o cargo de Desenvolvedor Front-End na StayApp.

## Leitura do problema

A ideia é criar um CRUD de uma entidade de produtos de um market-place. 

### Market-place

Um market-place pode ser considerado como um sistema de loja e-commerce onde, diferentemente dos e-commerce comuns, existem parceiros que vendem através da loja. Sendo assim, como o foco não é a construção de um market-place completo, foi decidido omitir, da entidade, o vendedor.

### Atributos

Foram escolhidas poucas propriedades para manter o foco no processo de criação e não na entidade, facilitando assim a leitura:

* **ID** - *Number/Integer* - Identificador único do produto.
* **Nome** - *String* - O nome do produto.
* **Descrição** - *String* - A descrição do produto. Deve ser possível inserir um texto com formatação (editor Wysiwyg).
* **Imagens** - *String[]* - Array de strings onde cada string representa o link para uma imagem do produto. Devido ao uso de dados *mockados* ou *micro back-ends*, foi escolhido não utilizar um input para envio de imagens, pois tiraria o foco do projeto.
* **Preço** - *Number/Double* - O preço do produto.

**OBS:** Para o retorno dos dados **mockados** foi adicionado um atributo de avaliação, chamado de **rating** que é um número aleatório entre 0 e 5.

### Informações

Foi tentado manter o foco na ideia de simular, minimamente, um ambiente onde uma pessoa logada teria acesso a listagens dos seus produtos, podendo ver informações como avaliação, dos seus produtos, além de gerenciar os mesmos ou adicionar novos. Aqui foi utilizado apenas o campo de **avaliação** pela ideia de tentar manter o foco na simplicidade.

Além disso, não foi tentado criar uma **"página bonitinha"** visto que isso tomaria muito mais tempo pensando em design do que criando páginas a aplicação em si, além de que o projeto tem o proposito de ser simples.

Foi criada, também, uma pequena **home page** para que o projeto não ficasse com uma pagina inicial em branco.

## Angular

Mesmo tendo mais conhecimentos na stack de React, escolhi usar o Angular no projeto por ser um desafio, visto que apenas havia lido algumas das documentações e visto algumas aulas sobre o mesmo e, também, por questão de ser a linguagem trabalhada pela Stay-App.

## Rodando

Antes de mais nada, clone o repositório:

```bash
git clone https://github.com/EduardoJM/teste-stayapp-marketplace.git
cd teste-stayapp-marketplace
```

Instale as dependências:

```bash
npm install
```

### Servidor para os dados mockados

Para os dados mockados foi criado um mini servidor carregando os dados a partir de um json, utilizando **Python** e **FastAPI**. Para rodar o mesmo, é recomendado ou utilizar os ambientes **Docker** ou então, criar um **virtualenv**:

```bash
cd mock
python -m virtualenv env
source env/bin/activate
```

Instalar as dependências:

```bash
pip install -r requirements.txt
```

Executar o servidor:

```bash
uvicorn main:app --reload
```

Assim, o servidor estará rodando em `http://localhost:8000`.

### Testes

Como não tinha, ainda, trabalhado com testes em Angular, decidi usar o projeto pra tentar criar, seguindo algumas das documentações do Angular, alguns testes para o projeto. Eles não cobrem todos os arquivos e funcionalidades, porém foram um bom exercício de iniciante. Para rodar os testes, execute, na raíz do projeto:

```bash
npm run test
```

Ou, diretamente com o `ng`:

```bash
ng test
```

### Versão de Desenvolvimento do Projeto

```bash
npm start
```

Ou, diretamente com o `ng`:

```bash
ng serve
```

### Docker

Existem duas versões de **containerização** para **docker** aqui, a primeira, de desenvolvimento, roda o servidor de dados **mockados** e uma versão de **desenvolvimento** do angular. A segunda, roda o mesmo servidor de dados **mockados** e uma versão de **produção** do projeto angular, utilizando um Dockerfile multi-staged para buildar a aplicação num container do node **Node** e rodar num container **nginx-alpine** tornando a imagem da aplicação angular extremamente leve (~25\30mb).

Para executar a versão de desenvolvimento utilize:

```bash
docker-compose -f docker-compose.yml up
```

Ou, simplesmente:

```bash
docker-compose up
```

Para executar a versão de produção, porém, o parâmetro `-f` é obrigatório:

```bash
docker-compose -f docker-compose.prod.yml up
```

Em ambos os casos, a api com os dados mockados estará disponível em `localhost:8000` e a aplicação angular disponível em `localhost:4200`.
