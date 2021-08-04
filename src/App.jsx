import React from 'react';
import 'normalize.css';
import { jss } from 'react-jss';
import { RootPage } from './components/root/RootPage';
import { getCategories, getPosts } from './utils/Api';
import { createHomeUrl } from './utils/AppUrlCreators';
import PanamaOtf from './fonts/panama.otf';
import PanamaEot from './fonts/panama.eot';
import PanamaWoff from './fonts/panama.woff';
import PanamaWoff2 from './fonts/panama.woff2';
import PanamaTtf from './fonts/panama.ttf';
require('./assets/android-chrome-192x192.png');
require('./assets/android-chrome-256x256.png');
require('./assets/apple-touch-icon.png');
require('./assets/browserconfig.xml');
require('./assets/favicon.ico');
require('./assets/favicon-16x16.png');
require('./assets/favicon-32x32.png');
require('./assets/mstile-150x150.png');
require('./assets/safari-pinned-tab.svg');
require('./assets/share-fb.jpg');
import { Route, Switch } from 'react-router-dom';
import { Loading } from './components/loading/Loading';
import { Error } from './components/error/Error';

global.maxWidth = 1055;
global.width1 = 812;
global.width2 = 760;
global.width3 = 500;
global.minWidth = 250;
global.widthSe = 570;

global.maxHeight = 640;
global.height1 = 550;
global.height2 = 400;
global.minHeight = 250;

jss.createStyleSheet({
  '@font-face': {
    fontFamily: 'Panama',
    fontWeight: 'normal',
    fontStyle: 'normal',
    src: `url(${PanamaWoff}) format("woff")`,
    fallbacks: [
      { src: `url(${PanamaOtf}) format("otf")` },
      { src: `url(${PanamaTtf}) format("truetype")` },
      { src: `url(${PanamaWoff2}) format("woff2")` },
      { src: `url(${PanamaEot}) format("embedded-opentype")` },
    ],
  },
}).attach();

jss.createStyleSheet({
  '@global': {
    html: {
      height: '100vh',
      minWidth: global.minWidth,
      minHeight: global.minHeight,
    },

    body: {
      overflow: 'hidden',
      fontFamily: 'Panama, Times New Roman, serif',
      fontSize: 16,
      lineHeight: 1.2,
      width: '100%',
      height: '100vh',
      margin: 0,
      padding: 0,
      minWidth: global.minWidth,
      minHeight: global.minHeight,
    },

    a: {
      all: 'unset',
      color: 'inherit',
      '&:visited': {
        color: 'inherit',
      }
    },

    input: {
      all: 'unset',
      '-webkit-appearance': 'none',
      margin: 0,
      outline: 0,
      verticalAlign: 'middle',
      overflow: 'visible',
    },

    '*': {
      boxSizing: 'border-box',
    },

    [`@media (max-width: ${global.widthSe}px)`]: {
      body: {
        overflow: 'auto',
      },
    }
  },
}).attach();

export const themes = {
  white: {
    color: "#000000",
    background: "#ffffff"
  },
  black: {
    color: "#ffffff",
    background: "#000000"
  }
};

export const ThemeContext = React.createContext(themes.black);

export const mailchimpUrl = '//gmail.us10.list-manage.com/subscribe/post?u=d85f58b233c0f486796471e30&id=6066ed83ae';

export const App = () => {
  const [theme, setTheme] = React.useState(themes.black);
  const [categories, setCategories] = React.useState(null);
  const [posts, setPosts] = React.useState(null);
  const [error, setError] = React.useState();

  let nulls = [];
  let sortedCategories = categories && categories.slice();
  sortedCategories && sortedCategories.map(
    (a, i) => {
      if (a['priority'] === null) {
        nulls.push(sortedCategories.splice(i, 1)[0]);
      }
    }
  );

  sortedCategories && sortedCategories.sort((a, b) => a['priority'] > b['priority'] ? 1 : -1);
  sortedCategories = sortedCategories && nulls && sortedCategories.concat(nulls);

  React.useEffect(() => {
    getCategories()
      .then((data) => {
        setCategories(data);
      })
      .catch(setError);
  }, []);

  React.useEffect(() => {
    getPosts()
      .then((data) => setPosts(data))
      .catch(setError);
  }, []);

  if (error) {
    return (
      <ThemeContext.Provider value={{ theme, setTheme }}>
        <Error />
      </ThemeContext.Provider >
    )
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {sortedCategories && posts
        ? (
          <Switch>
            <Route path={createHomeUrl()}>
              <RootPage categories={sortedCategories} posts={posts} />
            </Route>
            <Route component={Error} />
          </Switch>
        ) : (
          <Loading />
        )
      }
    </ThemeContext.Provider>
  );
};
