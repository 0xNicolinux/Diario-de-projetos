# Diário de Projetos

Um caderno digital interativo para reunir projetos desenvolvidos durante o curso no SENAI — com descrições, aprendizados, curiosidades e acesso aos jogos diretamente pela página.

## Funcionalidades

- **Visual de caderno:** páginas pautadas, anotações e cartões inspirados em um diário físico.
- **Índice automático:** os capítulos, a numeração e as páginas são gerados a partir da lista de projetos.
- **Jogos integrados:** abra os projetos na própria página, navegue entre eles ou use a opção de nova aba.
- **Prévia ao vivo:** em telas maiores, os jogos podem aparecer em miniatura nos cartões.
- **Tema claro/escuro:** alterne a aparência conforme sua preferência.
- **Progresso salvo localmente:** o site registra no navegador quais projetos você já abriu.
- **Cena 3D decorativa:** folhas e lápis acompanham a navegação pela página.

## Como executar localmente

O projeto é uma página estática e não precisa de instalação de dependências nem de processo de build. Como os jogos são carregados em `iframe` e alguns recursos vêm de serviços externos, é recomendável abrir o site por um servidor HTTP local.

1. Baixe ou clone este repositório.
2. Entre na pasta do projeto.
3. Inicie um servidor local. Por exemplo, com Node.js instalado:

   ```bash
   npx serve .
   ```

4. Abra no navegador o endereço local informado pelo comando.

Também é possível usar a extensão **Live Server** no Visual Studio Code.

> Abrir o `index.html` diretamente pelo sistema de arquivos pode causar limitações em alguns recursos. Se um jogo não carregar dentro da página, tente a opção **Nova aba** do player.

## Como adicionar um projeto

Edite `js/data.js` e acrescente um objeto ao array `window.PROJECTS`. A ordem dos objetos define a ordem dos capítulos no diário.

```js
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
  involvement: "Conte qual foi sua participação.",
  url: "https://exemplo.com/meu-projeto/",
  repo: "https://github.com/usuario/meu-projeto",
  emoji: "🚀",
  bg: "linear-gradient(135deg, #f6c177, #e07a5f)"
}
```

### Campos importantes

| Campo | Para que serve |
|---|---|
| `id` | Identificador único usado para registrar o progresso |
| `name` | Nome do projeto |
| `tags` | Lista de etiquetas exibidas no cartão |
| `desc` | Resumo curto |
| `about` | Descrição do projeto |
| `goal` | Objetivo do projeto |
| `facts` | Lista de curiosidades ou destaques |
| `involvement` | Descrição da sua participação |
| `url` | Endereço publicado do projeto ou jogo |
| `repo` | Link para o repositório de código |
| `emoji` | Símbolo exibido na capa do cartão |
| `bg` | Fundo CSS da capa do cartão |

Mantenha os `id` únicos e preencha todos os campos usados pela interface. Depois de salvar `data.js`, recarregue a página para conferir as alterações.

## Tecnologias utilizadas

- **HTML5** — estrutura e conteúdo.
- **CSS3** — layout responsivo, animações e temas.
- **JavaScript** — criação dos capítulos e interações.
- **[Three.js](https://threejs.org/)** — cenário 3D decorativo.
- **Google Fonts** — tipografias usadas no estilo de caderno.

O Three.js e as fontes são carregados de serviços externos; por isso, alguns detalhes visuais podem não aparecer sem conexão com a internet. Os jogos também são hospedados externamente.

## Dados e privacidade

A lista de projetos fica no arquivo `js/data.js`. O progresso dos projetos abertos é guardado no `localStorage` do próprio navegador e não é sincronizado entre dispositivos. Limpar os dados do site no navegador pode apagar esse progresso.

Feito por **Nícolas Adriel** como registro de projetos, experiências e aprendizados durante o curso.
