# Diário de Projetos

Caderno digital interativo que reúne projetos desenvolvidos durante o curso no SENAI. Cada projeto é apresentado como um capítulo, com descrição, objetivo, curiosidades e acesso à experiência publicada.

## Funcionalidades

- **Apresentação em formato de diário:** páginas pautadas, anotações e cartões inspirados em um caderno físico.
- **Índice gerado automaticamente:** capítulos, numeração e páginas são derivados da lista de projetos.
- **Projetos integrados:** abre experiências dentro da página por meio de `iframe`, com opção de abrir em uma nova aba.
- **Prévia dos projetos:** em telas maiores, os cartões podem exibir miniaturas das experiências.
- **Tema claro e escuro:** alternância de aparência.
- **Progresso local:** registra no navegador quais projetos já foram abertos.
- **Detalhe visual em 3D:** folhas e lápis acompanham a navegação usando Three.js.

## Como executar localmente

O projeto é uma página estática e não exige instalação de dependências nem etapa de build. Recomenda-se iniciar um servidor HTTP local, pois os projetos são carregados em `iframe` e alguns recursos são obtidos de serviços externos.

Com Node.js:

~~~bash
npx serve .
~~~

Ou utilize a extensão Live Server no Visual Studio Code.

Abra o endereço local informado pelo servidor. Abrir `index.html` diretamente pelo sistema de arquivos pode limitar alguns recursos. Caso uma experiência não carregue no player incorporado, utilize a opção de abri-la em uma nova aba.

## Adicionar um projeto

Os dados dos capítulos ficam em `js/data.js`, no array `window.PROJECTS`. Adicione um objeto à lista:

~~~js
{
  id: "meu-projeto",
  name: "Nome do projeto",
  tags: ["Categoria", "Tecnologia"],
  desc: "Resumo curto exibido no cartão.",
  about: "Explique do que se trata o projeto.",
  goal: "Descreva o objetivo do projeto.",
  facts: [
    "Curiosidade ou detalhe interessante.",
    "Outra informação sobre o projeto."
  ],
  involvement: "Descreva sua participação.",
  url: "https://exemplo.com/meu-projeto/",
  repo: "https://github.com/usuario/meu-projeto",
  emoji: "🚀",
  bg: "linear-gradient(135deg, #f6c177, #e07a5f)"
}
~~~

A ordem dos objetos define a ordem dos capítulos no diário.

### Campos

| Campo | Finalidade |
|---|---|
| `id` | Identificador único usado para registrar o progresso. |
| `name` | Nome exibido para o projeto. |
| `tags` | Categorias e tecnologias exibidas no cartão. |
| `desc` | Resumo curto. |
| `about` | Apresentação mais detalhada. |
| `goal` | Objetivo do projeto. |
| `facts` | Lista de fatos ou curiosidades. |
| `involvement` | Descrição da participação no desenvolvimento. |
| `url` | Endereço da versão publicada. |
| `repo` | Link para o repositório de código. |
| `emoji` | Símbolo mostrado no cartão. |
| `bg` | Valor CSS usado no fundo da capa. |

Mantenha os identificadores `id` únicos e preencha os campos utilizados pela interface. Recarregue a página após editar `data.js`.

## Tecnologias

- **HTML5** — estrutura da página.
- **CSS3** — layout responsivo, temas e animações.
- **JavaScript** — geração dos capítulos e interações.
- **Three.js** — cena 3D decorativa.
- **Google Fonts** — tipografia.

Three.js e as fontes são carregados de serviços externos; alguns detalhes visuais dependem de conexão com a internet. As experiências dos projetos também são hospedadas externamente.

## Dados e privacidade

A lista de projetos fica no arquivo `js/data.js`. O progresso de navegação é armazenado no `localStorage` do navegador e não é sincronizado entre dispositivos. Limpar os dados do site pode remover esse histórico.

## Autoria

Desenvolvido por **Nícolas Adriel** como registro de projetos, experiências e aprendizados durante o curso no SENAI.