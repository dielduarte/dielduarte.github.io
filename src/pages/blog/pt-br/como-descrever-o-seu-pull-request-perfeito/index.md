---
layout: '../../../../layouts/Post.astro'
title: Como descrever o seu pull request perfeito
date: "2023-09-07"
pubDate: "2023-09-07"
description: Compartilhando minhas experiências com pull requests
languageKey: pt-br
languageLink: en/how-to-describe-your-really-good-pull-request
socialImage: images/pt-br-como-descrever-o-seu-pull-request-perfeito.png
slug: pt-br/como-descrever-o-seu-pull-request-perfeito
---

Ao longo de toda a minha carreira, tenho recebido feedbacks muito positivos sobre como descrevo e organizo meus pull requests de colegas e gestores. Não sou especial ou melhor do que ninguém, na verdade, a maioria das equipes com as quais tive a oportunidade de trabalhar tinha um guia passo a passo bem estabelecido sobre como escrever descrições. Então, por que tantos feedbacks positivos? O que faço de diferente? Há algumas semanas, comecei a pensar sobre isso e decidi escrever este post com alguns pontos sobre como vejo os PRs como parte do meu trabalho.

<h2 class="subtitle--separator">Trate PRs como documentação</h2>

Imagine que sua equipe recebeu uma notificação de bug, e uma pull request que foi mergeada há 6 meses está causando o problema. Sua primeira reação é abrir a pull request para obter mais contexto. O código foi alterado em apenas 1 linha, sem testes, e a descrição parece algo próximo disso:

- Corrige o bug #12123 <- link para o ticket.

Neste ponto, você quer chorar, eu sei! Eu também iria. <img src="/images/how-to-describe-your-really-good-pr/hide-the-pain.jpeg" alt="meme do escondendo a dor" style="display: inline-block; width: 25px;" />

Enfrentei essa situação muitas vezes ao longo da minha carreira, seja um bug ou uma funcionalidade, e comecei a ver as descrições das minhas pull requests como documentação e economia de tempo. Em uma documentação realmente boa, minha expectativa é que ela responda o máximo de perguntas possível em qualquer momento, tais como:

- Qual era o cenário/ambiente naquele momento
- Estratégias consideradas, mas não escolhidas, e o porquê
- Estratégia usada e porquê
- Como revisar o código
- Como garantir que o que você fez funcione / como testá-lo
- Efeitos colaterais esperados
- O máximo de links externos possível para acrescentar contexto, como threads no Slack, documentação de APIs, links do Stack Overflow e tickets internos.

Quando penso em uma boa documentação, as melhores que li me colocaram no contexto certo ao me contar o "porquê" e o "como", assumindo que sou um estranho e não o criador da criatura. Sempre assuma que quem está lendo não sabe tanto quanto você.

<h2>Engaje seus leitores</h2>

Este ponto requer tempo para compreender sua audiência/equipe, mas assim que souber o que envolve mais, vá em frente! Com o tempo e feedback, você começa a entender as preferências da sua equipe e melhora com base nelas. Será que minha audiência prefere textos longos ou vídeos? Ou talvez eles gostem de gráficos explicando fluxos. Seja o que for, faça!

Documentações envolventes são bem organizadas, não exigem horas de atenção ininterrupta, mostram seu valor desde o início e fazem com que as pessoas queiram terminar porque são fáceis de seguir. Recentemente, recebi um feedback muito legal, e nem foi relacionado às minhas pull requests, mas à forma como me comunico. Acho relevante compartilhar:

"Verifiquei aquele link de suporte que você postou. Sempre adoro ler suas soluções e o formato de perguntas/respostas, é como uma conversa lol" - de uma pessoa incrível com quem tenho o prazer de trabalhar. ❤️

<h2>Seja o seu pior revisor - do jeito bom.</h2>

Sempre revise suas pull requests antes de compartilhá-las com sua equipe e seja crítico; afinal, no final do dia, você é a pessoa que melhor conhece seus limites e quão bem pode entregar algo. Sempre questione suas decisões: este código realmente faz sentido? O que eu poderia fazer melhor aqui? O que eu sugeriria se este código não fosse meu, e se eu sugeriria, por que ainda não fiz?

Adicione comentários nas linhas/funções/arquivos nos quais você acha que sua equipe terá perguntas. Use essa estratégia para orientar os revisores aos pontos do código sobre os quais você pode não ter certeza e deseja feedback. Esteja à frente deles e respeite o tempo de seus colegas, usando-o sabiamente.

Sejamos honestos, <b>todos estão ocupados</b>, e muitas vezes o tempo de revisão de código não é considerado ao discutir a capacidade da equipe de se comprometer a entregar uma funcionalidade ou corrigir um bug. Evitar idas e vindas e ser o mais claro possível é uma maneira de mostrar que você respeita seus revisores e está tentando fazer o melhor trabalho possível.

Espero que eu tenha lhe dado algumas ideias para melhorar seu trabalho diário com as pull requests. 👋