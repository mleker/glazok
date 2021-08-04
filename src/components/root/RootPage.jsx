import React from 'react';
import { createUseStyles } from 'react-jss';
import { HeaderScroll } from '../header/HeaderScroll';
import { HeaderSlide } from '../header/HeaderSlide';
import { Footer } from '../footer/Footer';
import { Switch, Route, useLocation, useRouteMatch, Redirect } from 'react-router-dom';
import { ThemeContext, themes } from '../../App';
import { Category } from '../category/Category';
import { createAboutUrl, createHomeUrl } from '../../utils/AppUrlCreators';
import { AboutPage } from '../about/AboutPage';
import { apiUrl } from '../../utils/Api';

const createRootPageStyles = createUseStyles(() => ({

    rootPage: ({ background, color }) => ({
        width: '100%',
        height: '100vh',
        display: 'flex',
        flexDirection: 'column',
        color: color,
        backgroundColor: background,
        position: 'relative',
        minWidth: global.minWidth,
        minHeight: global.minHeight,
        overflow: 'hidden',
    }),

    coverImage: {
        position: 'absolute',
        top: 0,
        bottom: 0,
        left: 0,
        right: 0,
        objectFit: 'cover',
        width: '100%',
        height: '100%',
    },

    [`@media (max-width: ${global.widthSe}px)`]: {
        rootPage: () => ({
            overflow: 'auto',
        }),
    },
}));

export const RootPage = ({ categories, posts }) => {
    const { theme } = React.useContext(ThemeContext);
    let location = useLocation();
    let { path } = useRouteMatch();
    const [winWidth, setWinWidth] = React.useState(window.innerWidth);
    const [winHeight, setWinHeight] = React.useState(window.innerHeight);
    const [readMode, setReadMode] = React.useState(false);

    React.useEffect(() => {
        const handleResize = () => {
            setWinWidth(window.innerWidth);
            setWinHeight(window.innerHeight);
        };

        window.addEventListener('resize', handleResize);

        return () => {
            window.removeEventListener('resize', handleResize);
        }
    })

    React.useEffect(() => {
        posts.forEach((post) => {
            post.image = new Image();
            post.image.src = apiUrl + post.cover;
        });
    }, [posts]);

    const classes = createRootPageStyles({ background: theme.background, color: theme.color });

    return (
        <ThemeContext.Consumer>
            {({ setTheme }) => (
                <div className={classes.rootPage}>

                    { winWidth <= global.width3 && winHeight >= global.height2
                        ? (
                            <HeaderSlide
                                categories={categories}
                                withCategories={location.pathname !== createAboutUrl()}
                            />
                        ) : (
                            location.pathname !== createAboutUrl() && (
                                <HeaderScroll categories={categories} />
                            )
                        )}

                    <Switch location={location}>
                        <Route path={createAboutUrl()} component={AboutPage} />
                        {categories.map((category, i) =>
                            <Route path={path + category.custom_url} key={i} >
                                <Category
                                    category={category}
                                    post={posts.find(post => post.id === category.featuring_post_id)}
                                    readMode={readMode}
                                    onSetPlayMode={() => {
                                        setReadMode(false);
                                        setTheme(themes.black);
                                    }}
                                    onSetReadMode={() => {
                                        setReadMode(true);
                                        setTheme(themes.white);
                                    }}
                                />
                            </Route>
                        )}
                        <Redirect from={createHomeUrl()} to={categories[0].custom_url} />
                    </Switch>

                    {!(winWidth <= global.width3 && winHeight >= global.height2) && (
                        <Footer positionStatic={winHeight <= global.maxHeight && location.pathname !== createAboutUrl()} />
                    )}
                </div>
            )}
        </ThemeContext.Consumer>
    );
};
