import './styles/comicbubbles.css';
import './styles/globals.css';
import './styles/scenes/intro.css';
import './styles/scenes/experiencies.css';
import './styles/scenes/education.css';
import './styles/scenes/skills.css';
import './styles/scenes/contact.css';
import './styles/scenes/showMenu.css';
import './styles/components/loading.css';
import './styles/components/buttons.css';
import './styles/components/avatar.css';

import { Elm } from './Main.elm';
import registerServiceWorker from './registerServiceWorker';

Elm.Main.init({
  node: document.getElementById('root')
});

registerServiceWorker();
