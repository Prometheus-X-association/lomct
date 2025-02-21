import { createRoot } from 'react-dom/client';
import '@src/globals.css';

import Popup from '@src/Popup';
import { HashRouter } from 'react-router-dom';

function init() {
  const appContainer = document.querySelector('#app-container');
  if (!appContainer) {
    throw new Error('Can not find #app-container');
  }
  const root = createRoot(appContainer);

  root.render(
    <HashRouter>
      <Popup />
    </HashRouter>,
  );
}

init();
