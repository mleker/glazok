import React from 'react';
import { createUseStyles } from 'react-jss';
import { createHomeUrl, createAboutUrl } from '../../utils/AppUrlCreators';
import { useHistory } from 'react-router-dom';
import { ThemeContext, mailchimpUrl } from '../../App';
import { BurgerIcon } from './images/BurgerIcon';
import { CrossIcon } from './images/CrossIcon';
import classNames from 'classnames';
import MailchimpSubscribe from 'react-mailchimp-subscribe';

const createHeaderSlideStyles = createUseStyles(() => ({

    header: {
        zIndex: 2,
        fontSize: 40,
        position: 'relative',
        flexShrink: 0,
        textTransform: 'uppercase',
        whiteSpace: 'nowrap',
        overflowX: 'auto',
        '-webkit-overflow-scrolling': 'touch',
        '-ms-overflow-style': '-ms-autohiding-scrollbar',
        '&::-webkit-scrollbar': {
            display: 'none',
        },
    },

    title: {
        textAlign: 'center',
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

    headerWithMenu: ({ background }) => ({
        backgroundColor: background,
        height: '100%',
    }),

    arrow: {
        paddingLeft: 20,
        paddingRight: 20,
    },

    cursor: {
        position: 'relative',
        textAlign: 'center',
        fontSize: 50,
        padding: 20,
    },

    bracket: {
        fontSize: 50,
    },

    menuItem: {
        textAlign: 'center',
    },

    menuHandler: ({ color }) => ({
        position: 'absolute',
        top: '50%',
        right: 20,
        transform: 'translateY(-50%)',
        stroke: color,
        marginTop: -3,
    }),

    burgerMenu: ({ background }) => ({
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        backgroundColor: background,
        textAlign: 'center',
        textTransform: 'uppercase',
    }),

    item: {
        display: 'block',
        paddingBottom: 20,
        position: 'relative',
    },

    socialLinks: {
        display: 'flex',
        justifyContent: 'space-around',
    },

    inputWrapper: {
        display: 'flex',
        paddingBottom: 20,
        justifyContent: 'center',
        position: 'relative',
    },

    inputCloseButton: ({ color }) => ({
        right: 20,
        bottom: 35,
        position: 'absolute',
        fontSize: 55,
        stroke: color,
    }),

    input: {
        position: 'relative',
    },

    inputReal: ({ color }) => ({
        borderBottom: `2px solid ${color}`,
        width: 220,
        color: color,
    }),

    submitButton: ({ color }) => ({
        right: 20,
        bottom: 10,
        position: 'absolute',
        fontSize: 55,
        stroke: color,
    }),

    disabledButton: {
        opacity: 0.5,
    },

    activeButton: {
        cursor: 'pointer',
    },

    inputMsg: {
        bottom: -30,
        left: 0,
        position: 'absolute',
        fontSize: 12,
        textTransform: 'none',
    },

    errorMsg: {
        extend: 'inputMsg',
        color: '#ff0000',
    },

    loadingMsg: ({ color }) => ({
        extend: 'inputMsg',
        color: color,
    }),

    successMsg: {
        extend: 'inputMsg',
        color: 'green',
    },
}));

const getTouches = (evt) => evt.touches;

export const HeaderSlide = ({ withCategories = true, categories }) => {
    const history = useHistory();
    const pathname = location.pathname.replace(/\//, '');
    const { theme } = React.useContext(ThemeContext);
    const [menuOpened, setMenuOpened] = React.useState(false);
    const [inputVisible, setInputVisible] = React.useState(false);
    const [inputValue, setInputValue] = React.useState('');
    const [currentItem, setCurrentItem] = React.useState(0);
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
    const [winHeight, setWinHeight] = React.useState(window.innerHeight);
    const classes = createHeaderSlideStyles({ background: theme.background, color: theme.color });
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

    const clearAllHandlers = () => {
        setMenuOpened(false);
        setInputValue('');
        setInputVisible(false);
    }

    const onLeftClick = () => {
        if (currentItem === 0) {
            handleMenuClick(categories.length - 1);
        } else {
            const newCurrentItem = currentItem - 1;
            handleMenuClick(newCurrentItem);
        }
    }

    const onRightClick = () => {
        if (currentItem === categories.length - 1) {
            handleMenuClick(0);
        } else {
            const newCurrentItem = currentItem + 1;
            handleMenuClick(newCurrentItem);
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
                    setCurrentItem(0);
                    history.push(categories[0].custom_url);
                } else {
                    setCurrentItem(currentItem + 1);
                    history.push(categories[currentItem + 1].custom_url);
                }
            } else {
                if (currentItem === 0) {
                    setCurrentItem(categories.length - 1);
                    history.push(categories[categories.length - 1].custom_url);
                } else {
                    setCurrentItem(currentItem - 1);
                    history.push(categories[currentItem - 1].custom_url);
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

        if (winWidth <= global.width3 || winHeight <= global.height2) {
            window.addEventListener('touchstart', handleTouchStart, false);
            window.addEventListener('touchmove', handleTouchMove, false);
        }

        return () => {
            window.removeEventListener('resize', handleResize);
            window.removeEventListener('touchstart', handleTouchStart);
            window.removeEventListener('touchmove', handleTouchMove);
        }
    })

    const handleChangeInputValue = (event) => setInputValue(event.target.value);

    return (
        <div className={classNames(classes.header, menuOpened && classes.headerWithMenu)}>
            <div className={classes.cursor}>
                {!menuOpened && withCategories && categories.length > 1 && (
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
                {withCategories && categories.length > 1 && (
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

            {location.pathname !== createAboutUrl() && (
                <div className={classes.title}>
                    {categories[currentItem].name}
                </div>
            )}

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
    );
};
