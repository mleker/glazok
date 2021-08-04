import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { replaceSpacesWithUnderscore } from '../../utils/UtilFuncs';
import { createAboutUrl, createHomeUrl } from '../../utils/AppUrlCreators';

const createHeaderScrollStyles = createUseStyles(() => ({

  headerWrapper: {
    position: 'relative',
    zIndex: 2,
  },

  header: ({ background }) => ({
    zIndex: 3,
    fontSize: 57,
    paddingTop: 20,
    paddingBottom: 10,
    flexShrink: 0,
    textTransform: 'uppercase',
    whiteSpace: 'nowrap',
    overflowX: 'scroll',
    '-webkit-overflow-scrolling': 'touch',
    '-ms-overflow-style': '-ms-autohiding-scrollbar',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
    backgroundColor: background,
  }),

  div1: ({ menuLeftIndent }) => ({
    width: menuLeftIndent,
    display: 'inline-block',
  }),

  div2: ({ menuRightIndent }) => ({
    width: menuRightIndent,
    display: 'inline-block',
  }),

  cursor: ({ background }) => ({
    zIndex: 1,
    position: 'absolute',
    display: 'flex',
    justifyContent: 'center',
    top: 25,
    bottom: 0,
    left: '50%',
    transform: 'translateX(-50%)',
    backgroundColor: background,
  }),

  bracket: {
    fontSize: 50,
  },

  item: {
    marginRight: 30,
    cursor: 'pointer',
    '&:hover': {
      opacity: 0.5,
    }
  },

  blinkers: {
    animationName: '$blinker',
    animationDuration: '1s',
    animationIterationCount: 'infinite',
    animationTimingFunction: 'steps(2, start)',
  },

  '@keyframes blinker': {
    to: { visibility: 'hidden' },
  },

  [`@media (max-height: ${global.maxHeight}px)`]: {

    header: () => ({
      fontSize: 33,
      paddingTop: 10,
      paddingBottom: 5,
    }),

    cursor: () => ({
      top: 13,
    }),

    bracket: {
      fontSize: 30,
    },
  },

  [`@media (max-height: ${global.height2}px)`]: {
    item: {
      '&:hover': {
        opacity: 1,
      }
    },
  }
}));

const scrollHorizontally = (e, itemsWrapper) => {
  if (e.wheelDeltaY > 6 || e.wheelDeltaY < -6) {
    const delta = Math.max(-1, Math.min(1, e.wheelDeltaY));
    itemsWrapper.scrollLeft -= delta * 5;
  }
}

const getCurrentItem = (items, winCenter) => {
  for (let i = 0; i < Object.keys(items).length; i++) {
    const rect = items[i].getBoundingClientRect();
    if (rect.x <= winCenter + 15 && rect.x >= winCenter - rect.width - 15) {
      return i;
    }
  }
}

const getTouches = (evt) => evt.touches;

export const HeaderScroll = ({ categories }) => {
  const { theme } = React.useContext(ThemeContext);
  const history = useHistory();
  const pathname = location.pathname.replace(/\//, '');
  const [menuLeftIndent, setMenuLeftIndent] = React.useState(0);
  const [menuRightIndent, setMenuRightIndent] = React.useState(0);
  const [currentItem, setCurrentItem] = React.useState(0);
  const menuHtmlEls = React.useRef({});
  const menuWrapperHtmlEl = React.useRef();
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [winHeight, setWinHeight] = React.useState(window.innerHeight);
  let xDown = null;
  let yDown = null;

  React.useEffect(() => {
    categories && categories.map((item, i) => {
      if (item.custom_url === pathname) {
        setCurrentItem(i)
      }
    });
  }, [categories]);

  React.useEffect(() => {
    if (location.pathname !== createAboutUrl() && location.pathname !== createHomeUrl() && pathname !== categories[currentItem].custom_url) {
      categories && categories.map((item, i) => {
        if (item.custom_url === pathname) {
          setCurrentItem(i)
        }
      });
    }
  }, [location]);

  const handleMenuClick = (i) => {
    setCurrentItem(i);
    history.push(categories[i].custom_url);
  }

  const handleSetScroll = (i) => {
    menuWrapperHtmlEl.current.scrollLeft = menuHtmlEls.current[i].offsetLeft + menuHtmlEls.current[i].offsetWidth / 2 - winWidth / 2;
  }

  const handleScroll = (e) => {
    scrollHorizontally(e, menuWrapperHtmlEl.current);
    const newCurrentItem = getCurrentItem(menuHtmlEls.current, winWidth / 2);
    if (currentItem !== newCurrentItem) {
      handleMenuClick(newCurrentItem)
    }
  }

  const handleTouchStart = (evt) => {
    const firstTouch = getTouches(evt)[0];
    xDown = firstTouch.clientX;
    yDown = firstTouch.clientY;
  };

  const handleTouchMove = (evt) => {
    if (!xDown || !yDown) {
      return;
    }

    var xUp = evt.touches[0].clientX;
    var yUp = evt.touches[0].clientY;

    var xDiff = xDown - xUp;
    var yDiff = yDown - yUp;

    if (Math.abs(xDiff) > Math.abs(yDiff)) {
      if (xDiff > 0) {
        if (currentItem === categories.length - 1) {
          handleMenuClick(0);
        } else {
          handleMenuClick(currentItem + 1);
        }
      } else {
        if (currentItem === 0) {
          handleMenuClick(categories.length - 1);
        } else {
          handleMenuClick(currentItem - 1);
        }
      }
    }

    xDown = null;
    yDown = null;
  };

  React.useEffect(() => {

    const handleResize = () => {
      setWinWidth(window.innerWidth);
      setWinHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    window.addEventListener('mousewheel', handleScroll, false);

    if (winWidth <= global.width3 || winHeight <= global.height2) {
      window.addEventListener('touchstart', handleTouchStart, false);
      window.addEventListener('touchmove', handleTouchMove, false);
    }

    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousewheel', handleScroll, false);
      if (winWidth <= global.width3 || winHeight <= global.height2) {
        window.removeEventListener('touchstart', handleTouchStart, false);
        window.removeEventListener('touchmove', handleTouchMove, false);
      }
    }
  })

  React.useEffect(() => {
    setMenuLeftIndent(winWidth / 2 - menuHtmlEls.current[0].offsetWidth / 2);
    setMenuRightIndent(winWidth / 2 - menuHtmlEls.current[Object.keys(menuHtmlEls.current).length - 1].offsetWidth / 2 - 30);
    handleSetScroll(currentItem);
  }, [winWidth, winHeight])

  React.useEffect(() => {
    if (winWidth <= global.width3 || winHeight <= global.height2) {
      handleSetScroll(currentItem);
    }
  }, [currentItem])

  const classes = createHeaderScrollStyles({ menuLeftIndent, menuRightIndent, background: theme.background, color: theme.color });
  const items = categories && categories.map(obj => obj['name']);

  return (
    <div className={classes.headerWrapper}>
      <div
        ref={menuWrapperHtmlEl}
        className={classes.header}
      >
        <div className={classes.items}>
          <div className={classes.div1} />
          {items && items.map((item, i) => (
            <span
              key={i}
              ref={(el) => menuHtmlEls.current[i] = el}
              onClick={() => {
                handleMenuClick(i);
                handleSetScroll(i);
              }}
              className={classes.item}
            >
              {replaceSpacesWithUnderscore(item)}
            </span>
          ))}
          <div className={classes.div2} />
          <div className={classes.cursor}>
            <span className={classes.bracket}>{"("}</span>
            <span className={classes.blinkers}>{'\u0F17'}</span>
            <span className={classes.bracket}>{")"}</span>
          </div>
        </div>
      </div>
    </div>
  );
};
