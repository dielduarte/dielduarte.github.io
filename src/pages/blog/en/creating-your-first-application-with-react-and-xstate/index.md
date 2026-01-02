---
layout: '../../../../layouts/Post.astro'
title: Creating your first application using React and Xstate
date: "2020-11-24"
pubDate: "2020-11-24"
description: Building your first application with React and Xstate...
languageKey: en
languageLink: /pt-br/criando-sua-primeira-aplicacao-com-react-e-xstate
socialImage: images/en-creating-your-first-application-with-react-and-xstate.png
slug: en/creating-your-first-application-with-react-and-xstate
---

Today we're going to create our first application using the model from the previous post that you can read [here](/en/modeling-your-first-application-using-statecharts-and-xstate/). We'll use Snowpack, React, and Xstate.

Installing dependencies

We'll use Snowpack as our build system, and why? A brief explanation since this could be a separate post: Snowpack is a build system that uses the power of ESmodules in development. The idea is that with ESmodules we don't need a builder in development time since modern browsers can import esmodules, this makes your development tool constant O(1) to start your dev server and also to do reloads regardless of your project size. As I said, this could be a separate post that we'll have soon here on the blog!

Installing using create-snowpack-app:

```js
npx create-snowpack-app cats-app --template @snowpack/app-template-react --use-yarn
```


This command will create a folder called `cats-app` with all the initial boilerplate to start a Snowpack and React project. You'll notice when opening the project that the structure is very similar to the initial create-react-app structure, so if you've used create-react-app before you'll be quite familiar.

As I said, the project is very simple and the idea here is not to worry too much about UX. I'll use some Tailwind in the examples just to make it a little prettier, but honestly it wasn't even necessary. Basically our project will contain a button to fetch a new image, loading message or when some error happens, and an image that will be rendered when we fetch a new kitten photo.

Starting the project, enter the `cats-app` folder and run:

```js
yarn start
```

Let's go into our app.js and remove everything, leaving the file like this:

```js
import React from 'react';

function App() {
  return null;
}

export default App;
```


We'll also go to `public/index.html` and import Tailwind. Remember that this is not the best way to use it because this way we're importing the entire code and we'll use not even 10% of the available classes. But the purpose here is not to think about a performant application, so it works very well for examples:

```js
<link href="https://unpkg.com/tailwindcss@^1.0/dist/tailwind.min.css" rel="stylesheet">
```

### Using our machine from the previous example:

First we need to install xstate and @xstate/react

```js
  yarn add xstate @xstate/react
```
Now let's create a file src/app-machine.js, which will contain our machine that we created in the previous post.

```js
import { Machine, assign } from 'xstate';

export const AppMachine = Machine({
  id: 'catsApp',
  initial: 'idle',
  context: {
    currentImageUrl: '',
    retryTimes: 0
  },
  states: {
    idle: {
      on: {
        LOAD_NEW_PICTURE: 'loading'
      }
    },
    loading: {
      invoke: {
        src: 'fetchNewPicture',
        onDone: {
          target: 'success',
          actions: ['setCurrentImageUrl', 'resetRetryTimes']
        },
        onError: 'error'
      }
    },
    success: {
      on: {
        LOAD_NEW_PICTURE: 'loading'
      }
    },
    error: {
      on: {
       RETRY: [
        {
          target: 'loading',
          actions: ['incrementRetryTimes'],
          cond: 'canRetry'
        }, 
        {
          target: 'cant_retry'
        }
       ]
      }
    },
    cant_retry: {
      type: 'final'
    }
  }
}, {
 services: {
   fetchNewPicture: () => fetch('https://api.thecatapi.com/v1/images/search', {
     headers: {
       'x-api-key': 'your-api-key'
     }
   }).then(response => response.json())
 },
 actions: {
   setCurrentImageUrl: assign({
      currentImageUrl: (context, event) => event.data[0].url
   }),
   resetRetryTimes: assign({ retryTimes: 0 }),
   incrementRetryTimes: assign({
     retryTimes:  (context) =>  context.retryTimes + 1
   })
 },
 guards: {
   canRetry: (context) => context.retryTimes < 2
 }
});
```


You'll also need to go to the [thecatapi.com](https://thecatapi.com) website and generate an API key. You should replace `your-api-key` with the actual value on line 51.

If you're confused about how the machine works or haven't read the entire series, go back to the modeling your first application post where we built this state machine from scratch.

Now let's go back to our app.js and import the useMachine hook and our machine so we can use it in our app:

```js
import React from 'react';
import { useMachine } from '@xstate/react';
import { AppMachine } from './app-machine'

function App() {
  const [current, send] = useMachine(AppMachine);  
  return null;
}

export default App;
```


You can see that the useMachine hook returns an array with two items. The first is everything related to our current state + some useful functions we can use during development. The second is the method we call send, which is used to send events to the machine, very similar to a Redux dispatch.

Now let's build our render. Initially we need a simple button that sends the `LOAD_NEW_PICTURE` event to our machine. The code would look like this:

```js
import React from 'react';
import { useMachine } from '@xstate/react';
import { AppMachine } from './app-machine'

function App() {
  const [current, send] = useMachine(AppMachine);

  return (
    <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        onClick={() => send({ type: 'LOAD_NEW_PICTURE' })}
    >
      get new picture
    </button>
  );
}

export default App;
```


Now we need to handle in our UI the four possible states that our machine can have which are loading, success, error, cant_retry. For didactic purposes we'll put everything in the App.js render. We could improve this code using pattern matching and separating each variation into a different component, but the purpose here is to be simple.

```js
import React from 'react';
import { useMachine } from '@xstate/react';
import { AppMachine } from './app-machine'

function App() {
  const [current, send] = useMachine(AppMachine);

  return (
    <>
      <button 
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded" 
        onClick={() => send({ type: 'LOAD_NEW_PICTURE' })}
      >
      get a new photo
      </button>

      {current.matches('loading') && (
        <h3 className="text-xl text-purple-700 pt-4">loading...</h3>
      )}
      
      {current.matches('success') && (
        <img className="pt-4 pr-4 object-cover w-full h-auto" src={current.context.currentImageUrl} />
      )}

      {current.matches('error') && (
        <>
          <p className="text-lg text-red-700 mb-2 mt-2">Oops! something went wrong</p>
          <button 
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"  
            onClick={() => send({ type: 'RETRY' })}
          >
            try again
          </button>
        </>
      )}

      {current.matches('cant_retry') && (
        <p>Cannot try again</p>
      )}
    </>
  );
}

export default App;
```


Wow that's a lot of IFs Diel, what's happening? Hahaha the coolest thing about Xstate and State Machines in general is that we're sure the application will never be in more than 1 state at the same time. We're using `current.matches` which is basically a function that returns true if the state passed as a parameter matches the current state of the machine.

Our application is practically ready, and now comes the icing on the cake. Have you ever thought about being able to visualize your code and your application in general in real-time, being able to be sure of what's happening in your application at that moment? And more, being able to control your application through this visual representation of it?

A few weeks ago the Xstate team launched xstate/inspect, which basically opens a debugger of your application representing the machine in real-time and totally dynamic, meaning you can control your application through this debugger. Let's see how it works:

First let's install inspect:

```js
yarn add @xstate/inspect
```

In our app.js let's import and start the initial config:

```js
import { inspect } from "@xstate/inspect";

inspect({
  url: "https://statecharts.io/inspect",
  iframe: false
});
```

And in our useMachine hook, let's put a second parameter `{ devTools: true }`

```js
const [current, send] = useMachine(AppMachine, { devTools: true });
```

Now we go back to our application and you'll see that when rendering it again the xstate/inspect will open a new tab rendering your machine in real-time and you can both use your application and see the results of that in the inspect tab, or the opposite, you can send events from the inspect to your application.

<video controls="true" allowfullscreen="true">
    <source src="/images/creating-your-first-application-with-react-and-xstate/video-1.mp4" type="video/mp4">
  </video>

### Simulating API returning error.

To simulate our API returning an error, let's replace our `fetchNewPicture` service with the code below, which is a rejected promise:

```js
fetchNewPicture: () => new Promise((resolve, reject) => reject())
```

Now when clicking on get a new photo, we'll automatically be redirected to the error state. The coolest thing about State Machines and the Xstate lib for having implemented this is that if an event is not handled in the current state, even if the user sends that event, nothing happens.

On purpose I left the get a new photo button always available. Try clicking on it 10 thousand times and you'll see that nothing happens because the LOAD_NEW_PICTURE event doesn't exist in the error state.

We can also see that our retry times logic worked. The user can try again up to 3 times. If the API didn't return successfully after 3 times, the user is sent to the cant_retry state which is the final state of our machine.


<video controls="true" allowfullscreen="true">
    <source src="/images/creating-your-first-application-with-react-and-xstate/video-2.mp4" type="video/mp4">
  </video>

That's all for today folks!
