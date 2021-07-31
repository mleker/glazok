import React from 'react';
import { createUseStyles } from 'react-jss';
import { useHistory } from 'react-router-dom';
import { ThemeContext } from '../../App';
import { replaceSpacesWithUnderscore } from '../../utils/UtilFuncs';

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

export const HeaderScroll = ({ categories, initialCurrentItem, scroll = true }) => {
  const { theme } = React.useContext(ThemeContext);
  const history = useHistory();
  const [menuLeftIndent, setMenuLeftIndent] = React.useState(0);
  const [menuRightIndent, setMenuRightIndent] = React.useState(0);
  const [currentItem, setCurrentItem] = React.useState(initialCurrentItem);
  const menuHtmlEls = React.useRef({});
  const menuWrapperHtmlEl = React.useRef();
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  let xDown = null;
  let yDown = null;

  const handleScroll = (e) => {
    scrollHorizontally(e, menuWrapperHtmlEl.current);
    const newCurrentItem = getCurrentItem(menuHtmlEls.current, winWidth / 2);
    if (currentItem !== newCurrentItem) {
      setCurrentItem(newCurrentItem);
      history.push(categories[newCurrentItem].custom_url);
    }
  }

  React.useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
    }

    window.addEventListener('resize', handleResize);
    window.addEventListener('touchmove', handleScroll, false);
    window.addEventListener('mousewheel', handleScroll, false);
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('touchmove', handleScroll);
      window.removeEventListener('mousewheel', handleScroll);
    }
  })

  React.useEffect(() => {
    setMenuLeftIndent(winWidth / 2 - menuHtmlEls.current[0].offsetWidth / 2);
    setMenuRightIndent(winWidth / 2 - menuHtmlEls.current[Object.keys(menuHtmlEls.current).length - 1].offsetWidth / 2 - 30);
    menuWrapperHtmlEl.current.scrollLeft = menuHtmlEls.current[initialCurrentItem].offsetLeft + menuHtmlEls.current[initialCurrentItem].offsetWidth / 2 - winWidth / 2;
  }, [winWidth])

  const classes = createHeaderScrollStyles({ menuLeftIndent, menuRightIndent, background: theme.background, color: theme.color });
  const items = categories && categories.map(obj => obj['name']);

  return (
    scroll
      ? (
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
                    setCurrentItem(i);
                    history.push(categories[i].custom_url);
                    menuWrapperHtmlEl.current.scrollLeft = menuHtmlEls.current[i].offsetLeft + menuHtmlEls.current[i].offsetWidth / 2 - winWidth / 2;
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
      )
      : (
        <div className={classNames(classes.header, menuOpened && classes.headerWithMenu)}>
          <div className={classes.cursor}>
            {!menuOpened && withCategories && (
              <span
                className={classes.arrow}
                onClick={onLeftClick}
              >
                {"<"}
              </span>
            )}
            <span className={classes.bracket}>{"("}</span>
            <span className={classes.blinkers}>{"༗"}</span>
            <span className={classes.bracket}>{")"}</span>
            {withCategories && (
              <span
                className={classes.arrow}
                onClick={onRightClick}
              >
                {">"}
              </span>
            )}
            <BurgerIcon
              className={classes.menuHandler}
              onClick={setMenuOpened}
            />
          </div>

          {menuOpened && (
            <div className={classes.burgerMenu}>
              <div className={classes.cursor}>
                <span className={classes.bracket}>{"("}</span>
                <span className={classes.blinkers}>{"༗"}</span>
                <span className={classes.bracket}>{")"}</span>
                <CrossIcon
                  className={classes.menuHandler}
                  onClick={clearAllHandlers}
                />
              </div>
              {location.pathname === createAboutUrl()
                ? (
                  <div
                    className={classes.item}
                    onClick={() => {
                      history.push(createHomeUrl());
                      clearAllHandlers();
                    }}
                  >
                    {'Main'}
                  </div>
                )
                : (
                  <div
                    className={classes.item}
                    onClick={() => {
                      history.push(createAboutUrl());
                      clearAllHandlers();
                    }}
                  >
                    {'About'}
                  </div>
                )
              }
              <a
                className={classes.item}
                href="https://www.buymeacoffee.com/glazok"
                target="blanc"
              >
                {'Donate'}
              </a>
              <div
                className={classes.item}
                onClick={() => setInputVisible(!inputVisible)}
              >
                <>
                  {'Subscribe'}
                  {inputVisible && (
                    <CrossIcon
                      className={classes.inputCloseButton}
                      onClick={() => setInputVisible(!inputVisible)}
                    />
                  )}
                </>
              </div>

              {inputVisible && (
                <MailchimpSubscribe
                  url={mailchimpUrl}
                  render={({ subscribe, status, message }) => (
                    <div className={classes.inputWrapper}>
                      <div className={classes.input}>
                        <input
                          maxLength="40"
                          placeholder={'Your@e.mail'}
                          className={classes.inputReal}
                          type="text"
                          value={inputValue}
                          onChange={handleChangeInputValue}
                        />
                        {status === "sending" && <div className={classes.loadingMsg}>{'Sending...'}</div>}
                        {status === "error" && (
                          message.includes("already subscribed")
                            ? <div className={classes.errorMsg}>{'You are already subscribed!'}</div>
                            : <div className={classes.errorMsg}>{'Error'}</div>
                        )}
                        {status === "success" && <div className={classes.successMsg}>{'You’ve been sent a confirmation letter'}</div>}
                      </div>
                      <div
                        className={classNames(classes.submitButton, !inputValue || inputValue.indexOf("@") === -1 ? classes.disabledButton : classes.activeButton)}
                        onClick={() => {
                          inputValue && inputValue.indexOf("@") !== -1 && subscribe({ EMAIL: inputValue })
                        }}
                      >
                        {'>'}
                      </div>
                    </div>
                  )}
                />
              )}

              {!inputVisible && (
                <div className={classes.socialLinks}>
                  <a
                    className={classes.item}
                    href="https://www.facebook.com/glazok.tv"
                    target="blanc"
                  >
                    {'Fb'}
                  </a>
                  <a
                    className={classes.item}
                    href="https://www.instagram.com/glazok.tv"
                    target="blanc">
                    {'In'}
                  </a>
                  <a
                    className={classes.item}
                    href="https://www.youtube.com/channel/UClbQ_fo9S2UrHKkGuqpShBw"
                    target="blanc"
                  >
                    {'Yt'}
                  </a>
                </div>
              )}
            </div>
          )}
        </div>
      )
  );
};
