import * as ReactDOM from 'react-dom';
import React, { useState } from 'react';
import { NonIdealState } from '@blueprintjs/core';

import { LangConfigContext } from 'sse/localizer/renderer';
import { DataSynchronizer } from 'sse/storage/renderer/data-synchronizer';

import { Home } from './home';
import { Concept } from './concept';
import { Welcome } from './welcome';

import '!style-loader!css-loader!@blueprintjs/core/lib/css/blueprint.css';
import '!style-loader!css-loader!./normalize.css';
import styles from './styles.scss';


/* TODO: Register pluggable things */


// Electron Webpack skeleton guarantees that #app exists in index.html
const appRoot = document.getElementById('app') as HTMLElement;

appRoot.classList.add(styles.app);

const searchParams = new URLSearchParams(window.location.search);

const App: React.FC<{}> = function () {
  let component: JSX.Element;

  const selectedLang = searchParams.get('lang') || undefined;

  if (searchParams.get('c') === 'home') { 
    component = <Home />;

  } else if (searchParams.get('c') === 'concept') {
    component = <Concept id={searchParams.get('id') || ''} />;

  } else if (searchParams.get('c') === 'dataSynchronizer') {
    component = <DataSynchronizer />;

  } else if (searchParams.get('c') === 'welcome') {
    component = <Welcome defaultRepoUrl={searchParams.get('defaultRepoUrl') || ''} />;

  } else {
    component = <NonIdealState
      icon="error"
      title="Unknown component requested" />;
  }

  const [langConfig, setLangConfig] = useState({
    available: { eng: 'English', zho: 'Chinese', rus: 'Russian' },
    default: 'eng',
    selected: selectedLang || 'eng',
    select: (langId: string) => {
      setLangConfig(langConfig => Object.assign({}, langConfig, { selected: langId }));
    },
  });

  return (
    <LangConfigContext.Provider value={langConfig}>
      {component}
    </LangConfigContext.Provider>
  );
};


ReactDOM.render(<App />, appRoot);
