title: Conhecendo o vue.js
date: 2016-02-06 10:52:33
tags:
---

Vue.js é uma simples mas poderosa biblioteca para construção de interfaces web modernas e interativas com o poder do data  - __lindo__ -  binding :P e focado em componentização da interface. 

Em meu entendimento - que não é  verdade absoluta -  o Vue consegue juntar o melhor do mundo angular com a ideia de componentização muito parecida com algumas libs como react e riot. É claro que sem a utilização do virtual DOM, ao invés disso Vue usa DOM real pois é importante frisar que ele tem o propósito de resolver uma solução progmática para a web, enquanto outros frameworks, por exemplo o react, tenta solucionar para várias plataformas. Se você quer saber mais sobre as principais diferenças entre Vue e outros frameworks veja esse [link](http://vuejs.org/guide/comparison.html).

É possível perceber grande influência do angular em como tratar o data binding, funções como v-for e v-if iguais há ng-repeat e ng-if, entre outros. Sua  api é muito simples e rápida para pegar, principalmente para quem ja estuda/trabalha com outros frameworks javascript aprender Vue não será um problema.

<h2>E Como posso usar Vue.js na minha aplicação?</h2>

Podemos startar uma aplicação com Vue de diversas formas, de uma forma rápida como no exemplo que vamos fazer hoje importando o arquivo js instalado a partir do _npm_ ou _bower_. Também existe a opção de usar o vue-cli um generator oficial com um scaffolding para projetos usando o _Vue + WebPack_ ou _Vue + browserify_ ou até mesmo chamando o arquivo do Vue através de uma cdn.

Saiba mais nesse [link](http://vuejs.org/guide/installation.html).

<h2>Criando um simples hello world com Vue.js</h2>

* Crie uma pasta para seu projeto 
* Inicie a configuraçao do bower com ``bower init``
* Instale o Vue.js com ``bower install vue --save``

Crie um arquivo ``index.html`` com o básico de uma estrutura html, como no exemplo abaixo:

```
<!DOCTYPE html>
<html lang="en">
	<head>
   		<meta charset="UTF-8">
   	 	<title>hello world vue.js</title>
	</head>
	<body>
	</body>
</html>

```

* importe o Vue.js

```
<script src="bower_components/vue/dist/vue.min.js"></script>

```

* Crie um componente html com id ``#hello`` e imprima o model chamado message:

```
<div id="hello">
    {{ message }}
</div>

```

* No mesmo arquivo vamos criar um script criando uma instância do Vue:

```
<script>
 new Vue({
    el: '#hello',
    data: {
        message: 'hello world! =)'
    }
  });
</script>
```

Para criar uma nova instância do Vue como fizemos no exemplo acima basta digitarmos ``new Vue(options);`` aonde __options__ é um objeto de configurações.

Na chave ``el`` do nosso objeto passamos como valor o id do nosso componente, no caso ``#hello``. A chave ``data`` é um objeto aonde setamos nossos models. Models são públicos ao nosso componente e controlados atraves do data - __lindo__ - binding :P. Criamos um model ```message``` que nada mais é que uma string com uma messagem de olá mundo que será exibida no nosso componente.

Pronto! abra o seu arquivo index.html e veja a mensagem de olá mundo.

Esse exemplo é muito básico mas o propósito desse post é ser uma introdução sobre o Vue.js, no próximo post vamos fazer uma todo list o que dará uma visão bem mais ampla do poder dessa lib e poderemos aprender mais sobre o Vue.


