title: ITCSS faz BEM - Parte 1
date: 2015-11-09 23:30:16
tags:
---


Você já se deparou com a seguinte pergunta: como posso organizar o css do meu app de forma simples, rápida mas que seja organizada/escalável caso meu app cresça ? Nesta série amiguinhos vou falar sobre o uso do ITCSS juntamente com o uso das regras de nomenclatura do BEM. Vou dividir em 3 posts para não ficar muito extenso e chato:

- BEM
- ITCSS
- Usando ITCSS + BEM.

**OBS**: Neste post vou dar apenas um overview sobre o assunto, então se você quer se aprofundar sobre BEM indico ler esse post [aqui](http://u.planb.com.br/blog/ti/metodologia-bem/), escrito pelo Lucas Germano um grande brother meu.

BEM é a sigla para **“block element modifier”**. Ele sugere que organizamos nossas estrutura/nomenclatura css em 3 níveis, bloco, elemento e modificador.

<h3>Bloco</h3>

Vamos imaginar que temos um página html um elemento article, que nada mais é do que um post de um blog que terá seu título e texto


```
    <article>

      <h1>Titulo do post</h1>

      <p>Texto do post</p>

    </article>

```

Analisando o código acima conseguimos visualizar que o elemento pai é a tag `<article>`, essa tag seria um elemento do tipo bloco. Elementos do tipo bloco são os elementos pai de um componente. O BEM prega o uso de classes ao invés de ID, então vamos dar uma classe para nosso elemento chamada de .post

```
    <article class='post'>

      <h1>Titulo do post</h1>

      <p>Texto do post</p>

    </article>

```

<h3>Elemento</h3>

Analisando novamente nosso código, se quisermos estilizar o titulo do nosso post poderíamos utilizar o css:

```
.post h1 { /* algum estilo lindo aqui dentro*/ }

```

mas sempre vamos utilizar um h1 dentro do nosso article? e se algum dev desinformado desse padrão colocar um h2 no lugar? Pensando nisso vamos dar uma classe para nosso título, algo como isso:

```
    <article class='post'>

      <h1 class='post__title'>Titulo do post</h1>

      <p>Texto do post</p>

    </article>

```

Perceba o que fizemos acima, repetimos o nome do elemento pai + __ + nome do nosso componente. O BEM prega o uso de dois undercores para dizermos que o elemento filho faz parte do elemento pai, quando algum outro dev da sua equipe bater o olho em um css assim:

```
.post__title { /*um estilo bem lindo aqui*/ }

```

ele vai saber que o titulo pertence ao componente post, simples não? Além de ficar fácil o entendimento do que se trata ainda economizamos um aninhamento de seletores melhorando nossa performance, **ISSO É AMOR!** Levando em consideração tudo que falei acima qual classe poderíamos dar ao texto do post? usando a mesma ideia de nomenclatura para elementos filhos: nome do pai + __ + nome do filho ficaria assim:


```
    <article class='post'>

      <h1 class='post__title'>Titulo do post</h1>

      <p class='post__text'>Texto do post</p>

    </article>

```

<h3>Modificadores</h3>

Como o própio nome já diz, elementos modificadores modificam o estilo atual, usamos isso para poder reutilizar ao máximo nosso css modificando apenas o que realmente importa. A regra de nomenclatura empregada pelo BEM para elementos modificadores é simples: nome do elemento +  --  + nome do modificador.

Vamos supor que existam posts patrocinados no nosso blog em que a cor da fonte do título de posts patrocinados será vermelha, vamos criar um modificador chamado `.post__title—-sponsored` aonde essa classe modifica apenas o que realmente precisamos ficando assim:

```
.post__title—-sponsored { color: red; }

```

o que resultaria em um resultado final assim:

```
    <article class=’post’>

      <h1 class=’post__title post__title—-sponsored’>Titulo do post</h1>

      <p class=’post__text’> Texto do post</p>

    </article>
    
```
Muitas pessoas dizem que as classes utilizando BEM ficam enormes e por isso não gostam de utiliza-lo, mas o nível de organização e facilidade para entendermos do que se trata é outro, principalmente quando trabalhamos em equipe. Por hoje e só galera, continuando nossa serie o próximo post sera sobre ITCSS =).