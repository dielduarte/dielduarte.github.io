layout: environment
title: environment com gulp-ng-config
date: 2015-09-03 01:03:59
tags:
---

#Environment com gulp-ng-config
Hoje vou falar sobre uma ideia de ambientação em um app angular utilizando um plugin muito bacana e facil de usar chamado gulp-ng-config.

supondo que voce ja tenha gulp instalado em seu projeto, vamos instalar o plugin gulp-ng-config com:

```
npm i gulp-ng-config — save
```
Agora vamos escrever a task do gulp :

```
var gulp   = require('gulp'),
		gulpNgConfig =  require('gulp-ng-config');
		
gulp.task('env-local', function () {
  gulp.src('env-local.json')
  .pipe(gulpNgConfig('constants'))
  .pipe(gulp.dest('./app/config/'))
});
```

##Mas como esse tal gulp-ng-config funciona?  

E muito simples, primeiramente ele le seu arquivo json aonde setamos nossas variaveis de ambiente e seus respectivos valores e cria um modulo angular com constants relativas as nossas variaveis, ou seja. se eu declaro um json:

```
{

	API_URL: “https//:www..api.meusite.com”

}
```

quando rodarmos a task a mesma criara um modulo angular que ficara assim:

```
angular.module('nomedomeumodulo', [])
	.constant('API_URL', 'https//:www..api.meusite.com')
```

##E pronto!
Agora voce ja pode chamar suas constantes em qualquer lugar do codigo! simples nao?

=)