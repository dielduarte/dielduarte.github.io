---
layout: '../../../../layouts/Post.astro'
title: How to describe your really good pull request
date: "2023-09-07"
description: Sharing my vision on pull requests and best practices 
languageKey: en
languageLink: /pt-br/como-descrever-o-seu-pull-request-perfeito
socialImage: images/en-how-to-describe-your-really-good-pull-request.png
slug: en/how-to-describe-your-really-good-pull-request
---

Throughout my whole career I've been receiving some really good feedbacks on how I described and organize my pull requests from colleagues and managers. I'm not especial or better than anyone, in fact, most of the teams I had the opportunity to work had a well established step by step guide on how to write descriptions. So why so many good feedbacks? what do I do different? A couple of weeks ago I started thinking about it, and I decided to write this post with a few points on how I see PRs as part of my job.

<h2 class="subtitle--separator">Treat PRs description as documentation</h2>

Imagine your team received a bug notification, a PR that was merged 6 months ago is causing the issue. Your first reaction is to open the PR for more context, the code changed was 1 line changed with no tests and the description looks close to something like that:
 
 - fix the bug #12123 <- link to the ticket.

At this point you wanna cry, I know! I would too. <img src="/images/how-to-describe-your-really-good-pr/hide-the-pain.jpeg" alt="hide the paing meme" style="display: inline-block; width: 25px;" />

I faced this situation so many times during my career regardless if it was a bug or a feature, that I just started seeing my PRs descriptions as documentation and time saver. As a really good documentation my expectation is that it answers as many questions as I can have at any point, such as:

 - What was the scenario/environment at that time 
 - Strategies considered but not chosen and the why
 - Strategy used and why
 - How to review the code
 - How to make sure what you did works / how to test it
 - Any expected side effects
 - As many links to external resources as possible to add up context such as slack threads, APIs documentation, stack overflow links and internal tickets.

When I think about good documentation, the best docs I read put me in the right context by telling me the `why` and `how`, assuming I'm a stranger and not the creator of the creature. Always assume whoever is reading don't know as much as you do.

<h2>Engage your readers</h2>

This point requires time to understand your audience/team, but as soon as you know what engage more, go for it! With time and feedback you start to understand your team's preferences and improve on top of it, does my audience prefer long texts vs videos? or maybe they will like some charts explaining flows. Whatever it is, do it! 

Engaging documentations are well organized, won't require hours of uninterrupted attention, shows its value at the beginning and make people want to finish because it is easy to follow. Recently I received a very cool feedback, and it wasn't even related to my PRs but the way I communicate, it feels relevant to share though: 

"I checked that support link you posted. Always love reading your solutions and the questions/answers format, it's like a conversation making it easy to understand." - from an amazing person I have the pleasure to work with. ❤️

<h2>Be your worst reviewer - in the good way.</h2>

Always review your PRs before sharing with your team and be critical, at the end of the day you are the best person that knows your limits and how good you can delivery something. Always question your decisions, does this code really makes sense? what could I do better here? what would I suggest if this wasn't my own code and if I would suggest it, why I haven't done it already?

Add comments to lines/functions/files you think your team will have questions. Use this strategy to guide the reviewers to the points in the code you might not be sure about and want feedback, be ahead of them and respect your colleagues time by using their time wisely.

Let's be honest <b>everyone is busy</b>, and quite often code review time is not considered when discussing the team's capability of committing to delivering a feature or fixing a bug. Avoiding back and forth and being as clear as possible is a way to show you respect your reviewers and you are trying to do your best work.

Hope I gave you some insights on how to improve your daily work with PRs 👋