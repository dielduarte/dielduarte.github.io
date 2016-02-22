title: Usando a tag picture
date: 2016-02-22 14:08:21
tags:
---

Hoje em um freela me deparei com um problema de imagens responsivas e lembro que recentemente li um post sobre o picture o qual falava que seu suporte já estava bem bacana pelo menos no chrome, firefox e edge. Resolvi dar uma estudada a fundo e criar esse post ao mesmo tempo pois, vou usa-lo no projeto em que estou trabalhando.


**OBS:** Estou tentando utilizar essa técnica de escrever um post ao estudar sobre determinado assunto e estou gostando muito do resultado. Tentem vocês também amiguinhos! as vezes temos medo de compartilhar um pouco do que sabemos por achar que é muito básico ou que vai ser ridicularizado por alguém, mas se você aprendeu com certeza outras pessoas também estão procurando sobre o mesmo assunto. _COMPARTILHE_!


## O que é ? e para que serve ?

A tag picture surgiu da necessidade de tratarmos imagens responsivas, ou seja, imagem certa para resolução certa. Ja imaginou seu usuário acessando seu site através de um 3g com limite de 10mb por dia, baixando uma imagem de 20mb? conseguiu visualizar o problema ?

Alem disso não há necessidade de baixarmos uma imagem de 1920x700 por exemplo, em um um smartphone com resolução maxima de 320px no caso de um iPhone 4.


## Como usar ?

Tag picture é muito simples, bem parecida por exemplo com a tag de audio, aonde colocamos na tag source vários arquivos de audios com extensões diferentes para determinados browsers. A diferença é que na tag source dentro da tag picture vamos configurar varias imagens diferentes para cada resolução. Vamos ver isso de uma forma mais prática, vejamos o código a baixo:

```

    <picture>
        <source srcset='imagem-grande.png' media='(min-width: 960px)'>
        <source srcset='imagem-pequena.png' media='(max-width: 480px)'>
        <img srcset='imagem-default.png'>
    </picture>

```
Os atributos da tag source como podemos ver acima são:

- **srcset** onde passamos o caminho da imagem
- **media** Configuramos as medias em que essa imagem será exibida.

Nesse exemplo estamos mostrando a nossa ```imagem-grande.png``` quando o tamanho da tela for maior ou igual a 960px simulando desktops, e quando o maximo for 480px simulando celulares vamos mostrar a ```imagem-pequena.png```. Quando nenhuma dessas regras forem atendidas mostramos a ```imagem-default.png```.

Ok Diel, mas qual a real vantagem da tag picture? A real vantagem de usarmos a tag picture é que ela só vai fazer o download da imagem correta para a media do cliente eliminando o nosso problema de baixar uma imagem gigante desnecessaria o que nos faz ganhar em performance de carregamento da nossa página.


## E suporte dos browsers ?

Podemos ver no [can i use ](http://caniuse.com/#search=picture) que o suporte já está bem bacana, chrome, firefox e edge já suportam sem grandes problemas.

Mas se você precisa dar um suporte maior ainda, podemos usar um polyfill chamado [picturefill](https://scottjehl.github.io/picturefill/).

Por hoje é só, valeu! =)
