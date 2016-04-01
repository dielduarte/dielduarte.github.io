title: Angular component
date: 2016-04-01 15:31:40
tags:
---

Mesmo nos ultimos tempos todos os olhos se voltando para o react e o angular 2, não podemos esquecer do angular na sua versão 1 que ainda é amplamente utilizada por diversos projetos, empresas e segue em constantes atualizações. Sua última grande atualizaçāo na versão 1.5 foi o angular component.

<h3> Mas o que é  o angular component ? </h3>

Component é um tipo especial de directiva, sua configuração/criação é mais simples que uma directiva normal e é adequada para utilizar em um aplicativo baseado em componentes. Component veio para facilitar a vida de quem pretende atualizar seu app para angular 2 ao sair sua versão estável, seu uso se assemelha bastante também ao uso de web componentes.

<h3>E qual a vantagem do component em relação a uma directiva normal?</h3>

- Como dito no parágrafo acima, é mais fácil de configurar/criar um component.
- Foi criado e é otimizado para uma arquitetura baseada em componentes.
- Atualizar o seu app para a versão 2 do angular será muito mais fácil.

<h3> Quando não usar componentes e optar por directivas ? </h3>

- Quando precisamos fazer manipulação de DOM,  pois funções existentes em directivas como link e compile não estão disponíveis.
- Quando precisamos criar uma directiva mais avançada.
- Quando precisamos usar uma directiva como atributo ou classe css.

<h3>Um Exemplo básico de como escrever um component</h3>

Vamos criar um component chamado card-user, nosso componente vai receber apenas o nome do usuário pois se trata de um exemplo.

* Criamos um modulo para nosso app:

```
    angular.module('app', []);
```

* Agora crie um controller principal

```
angular
    .module('app')
    .controller('appController', appController);
    
     function appController() {
        var vm = this;
        vm.user = {
            name: 'Diel Duarte'
        };
     };   
       
```

* Nosso component user-card

```
angular
    .module('app')
    .component('userCard', {
            template: '<h1>{{ $ctrl.user.name }}</h1>',
            bindings: {
                user: '=',
            }
     });
     
```

__obs:__ Por default dentro de um component o controller as syntax é definido como `$ctrl`.

* E por último mas não menos importante, nosso index.html

```
<!DOCTYPE html>
<html ng-app="app">
    <head>
        <meta charset="UTF-8">
        <title>Angualar component</title>
    </head>
    <body ng-controller="appController as vm">
        <user-card user="vm.user"></user-card>
        
        <script src="app.js">
    </body>
</html>

```

__Pronto!__ veja funcionando [aqui](https://embed.plnkr.co/WsYdTHl4KzIx0sLDdodq/).

Se você gostou e deseja se aprofundar ainda mais em component nada melhor que propria doc do angular, [veja aqui](https://docs.angularjs.org/guide/component). No próximo post falaremos sobre aquitetura baseada em components , ate lá =)  
