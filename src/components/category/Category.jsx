import React from 'react';
import { createUseStyles } from 'react-jss';
import { ThemeContext, themes } from '../../App';
import { apiUrl } from '../../utils/Api';
import classNames from 'classnames';
import { Error } from '../error/Error';

const createCategoryStyles = createUseStyles(() => ({

  '@keyframes fadeIn': {
    from: { opacity: 0 },
    to: { opacity: 1 },
  },

  title: {
    textAlign: 'center',
    zIndex: 1,
    fontSize: 40,
    textTransform: 'uppercase',
  },

  playModeBlock: ({ background }) => ({
    backgroundColor: background,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  }),

  readModeBlock: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    flexGrow: 1,
  },

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

  twoColumns: ({ background }) => ({
    position: 'fixed',
    top: 98,
    left: 0,
    bottom: 0,
    right: 0,
    minWidth: 1200,
    height: '100%',
    display: 'flex',
    fontSize: 45,
    justifyContent: 'center',
    backgroundColor: background,
  }),

  frameWrapper: {
    width: 750,
    margin: '0 auto',
    position: 'relative',
    minWidth: global.minWidth,
    marginBottom: 90,
  },

  textFrameWrapper: {
    width: 750,
    margin: '0 auto',
    position: 'relative',
    minWidth: global.minWidth,
    marginBottom: 90,
  },

  frame: {
    position: 'relative',
    height: 0,
    // overflow: 'hidden',
    paddingBottom: '56%',
    backgroundColor: 'black',
    border: 'solid 2px white',
  },

  frameNoEmbed: {
    position: 'relative',
  },

  embed: {
    position: 'absolute',
    width: '100%',
    height: '100%',
  },

  rightButton: ({ background, color }) => ({
    fontSize: 57,
    backgroundColor: background,
    color: color,
    padding: '15px 15px 8px 15px',
    border: `2px solid ${color}`,
    right: 0,
    transform: 'translateX(calc(100% - 2px))',
    top: 0,
    position: 'absolute',
    cursor: 'pointer',
    width: 154,
    textAlign: 'center',
  }),

  frameCenterLink: ({ color }) => ({
    fontSize: 57,
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translateY(-50%) translate(-50%)',
    color: color,
    '&:hover': {
      opacity: 0.5,
    },
    cursor: 'pointer',
  }),

  firstColumn: {
    width: '50%',
    padding: 80,
    paddingTop: 50,
    paddingRight: 135,
    wordWrap: 'break-word',
  },

  postTitle: {
    textTransform: 'uppercase',
    paddingBottom: 5,
  },

  secondColumn: {
    width: '50%',
    padding: 80,
    paddingTop: 50,
    paddingLeft: 135,
    wordWrap: 'break-word',
  },

  textFrame: {
    position: 'relative',
    display: 'flex',
    height: 0,
    overflow: 'hidden',
    paddingBottom: '56%',
    backgroundColor: 'white',
    border: 'solid 2px black',
  },

  textFrameTitle: {
    textTransform: 'uppercase',
    paddingBottom: 5,
  },

  textFrameFirstColumn: {
    width: '50%',
    fontSize: 20,
    padding: '20px 70px 20px 20px',
    wordWrap: 'break-word',
  },

  textFrameSecondColumn: {
    width: '50%',
    fontSize: 20,
    padding: '20px 20px 20px 70px',
    wordWrap: 'break-word',
  },

  loading: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%)',
  },

  playButton: {
    '&:hover': {
      color: 'rgba(0,0,0,0.5)',
    },
    cursor: 'pointer',
  },

  readButton: {
    '&:hover': {
      color: 'rgba(255,255,255,0.5)',
    },
    cursor: 'pointer',
  },

  [`@media (max-height: ${global.maxHeight}px)`]: {

    frameWrapper: {
      width: 540,
      marginBottom: 0,
    },

    textFrameWrapper: {
      width: 540,
      marginBottom: 0,
    },

    textFrameFirstColumn: {
      padding: '10px 40px 10px 15px',
      fontSize: 12,
    },

    textFrameSecondColumn: {
      padding: '10px 10px 10px 40px',
      fontSize: 12,
    },

    frameCenterLink: () => ({
      fontSize: 33,
    }),

    rightButton: () => ({
      fontSize: 33,
      width: 100,
    }),

    twoColumns: () => ({
      fontSize: 33,
      top: 54,
    }),

    firstColumn: {
      paddingTop: 20,
      paddingLeft: 40,
    },

    secondColumn: {
      paddingTop: 20,
      paddingRight: 20,
    },

  },

  [`@media (max-width: ${global.maxWidth}px)`]: {

    frameWrapper: {
      width: '60%',
    },

    textFrameWrapper: {
      width: '60%',
    },
  },

  [`@media (max-width: ${global.width2}px)`]: {
    frameWrapper: {
      width: '60%',
    },

    textFrameWrapper: {
      width: '60%',
    },

    textFrameFirstColumn: {
      padding: '10px 40px 10px 15px',
      fontSize: 16,
    },

    textFrameSecondColumn: {
      padding: '10px 10px 10px 40px',
      fontSize: 16,
    },

    rightButton: () => ({
      transform: 'translateY(calc(100% - 2px))',
      bottom: 0,
      top: 'auto',
    }),
  },

  [`@media (max-width: ${global.width2}px) and (max-height: ${global.height2}px)`]: {

    frameWrapper: {
      width: '60%',
    },

    textFrameWrapper: {
      width: '60%',
    },

    textFrameFirstColumn: {
      padding: '10px 40px 10px 15px',
      fontSize: 16,
    },

    textFrameSecondColumn: {
      padding: '10px 10px 10px 40px',
      fontSize: 16,
    },

    frameCenterLink: () => ({
      fontSize: 33,
    }),

    rightButton: () => ({
      fontSize: 33,
      width: 100,
    }),
  },

  [`@media (max-width: ${global.width3}px) and (min-height: ${global.height2 - 1}px)`]: {

    twoColumns: () => ({
      top: 140,
    }),

    frameCenterLink: () => ({
      fontSize: 40,
      '&:hover': {
        opacity: 1,
      },
    }),

    rightButton: () => ({
      fontSize: 40,
      transform: 'translateY(calc(100% - 2px))',
      bottom: 0,
      top: 'auto',
      padding: '20px 25px 15px 25px',
      width: 138,
    }),

    playButton: {
      '&:hover': {
        color: 'inherit',
      },
    },

    readButton: {
      '&:hover': {
        color: 'inherit',
      },
    },

    firstColumn: {
      padding: 40,
      paddingTop: 20,
    },

    secondColumn: {
      padding: 40,
      paddingTop: 20,
    },

    frameWrapper: {
      width: '100%',
      transform: 'translateY(-50px)',
    },

    textFrameWrapper: {
      width: '100%',
      transform: 'translateY(-50px)',
    },

    textFrameFirstColumn: {
      padding: '10px 40px 10px 15px',
      fontSize: 12,
    },

    textFrameSecondColumn: {
      padding: '10px 10px 10px 40px',
      fontSize: 12,
    },
  },

  [`@media (max-height: ${global.height2}px)`]: {
    frameWrapper: {
      width: 300,
    },

    textFrameWrapper: {
      width: 300,
    },

    textFrameFirstColumn: {
      padding: '10px 30px 10px 15px',
      fontSize: 12,
    },

    textFrameSecondColumn: {
      padding: '10px 10px 10px 30px',
      fontSize: 12,
    },

    rightButton: () => ({
      right: -0.5,
      transform: 'translateX(calc(100% - 2px))',
      top: 0,
      bottom: 'unset',
      fontSize: 33,
      width: 100,
      padding: '15px 15px 8px 15px',
    }),

    frameCenterLink: () => ({
      fontSize: 33,
    }),

    playButton: {
      '&:hover': {
        color: 'inherit',
      },
    },

    readButton: {
      '&:hover': {
        color: 'inherit',
      },
    },

  },

}));

export const Category = ({ category, post, readMode, onSetReadMode, onSetPlayMode }) => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [winHeight, setWinHeight] = React.useState(window.innerHeight);
  const [embedShowed, setEmbedShowed] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
      setWinHeight(window.innerHeight);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  })

  React.useEffect(() => {
    if (readMode) {
      setTheme(themes.white);
    } else {
      setTheme(themes.black);
    }
  }, [])

  const coverImage = post && post.cover;
  // const title = post && post.title;
  // const description = post && post.about;
  // const shareImage = post && apiUrl + post.about_cover;
  const classes = createCategoryStyles({ background: theme.background, color: theme.color });
  const embed_url = post && post.embed_url;
  const external_url = post && post.external_url;

  if (!post) {
    return <Error />
  }

  return (
    <>
      {readMode
        ? (
          <div className={classes.readModeBlock}>
            <div className={classes.twoColumns}>
              <div className={classes.firstColumn}>
                {!(winWidth <= global.maxWidth || winHeight <= global.height2) && (
                  <div className={classes.postTitle}>
                    {post.title}
                  </div>
                )}
                {winWidth > global.maxWidth
                  ? post.description
                  : post.short_description
                }
              </div>
              <div className={classes.secondColumn}>
                {!(winWidth <= global.maxWidth || winHeight <= global.height2) && (
                  <div className={classes.postTitle}>
                    {post.title_en}
                  </div>
                )}
                {winWidth > global.maxWidth
                  ? post.description_en
                  : post.short_description_en
                }
              </div>
            </div>
            <div className={classes.textFrameWrapper}>
              <div className={classes.textFrame}>
                <div className={classes.textFrameFirstColumn}>
                  {!(winWidth <= global.maxWidth || winHeight <= global.height2) && (
                    <div className={classes.textFrameTitle}>
                      {post.title}
                    </div>
                  )}
                  {winWidth <= global.maxWidth || winHeight <= global.height2
                    ? post.short_description
                    : post.description
                  }
                </div>
                <div className={classes.textFrameSecondColumn}>
                  {!(winWidth <= global.maxWidth || winHeight <= global.height2) && (
                    <div className={classes.textFrameTitle}>
                      {post.title_en}
                    </div>
                  )}
                  {winWidth <= global.maxWidth || winHeight <= global.height2
                    ? post.short_description_en
                    : post.description_en
                  }
                </div>
                {external_url && (
                  <a
                    className={classes.frameCenterLink}
                    href={external_url}
                    target='blanc'
                  >
                    {'READ'}
                  </a>
                )}
              </div>
              <div
                className={classNames(classes.rightButton, classes.playButton)}
                onClick={onSetPlayMode}
              >
                {'PLAY'}
              </div>
            </div>
          </div>
        ) : (
          <div className={classes.playModeBlock}>
            <img
              className={classes.coverImage}
              src={apiUrl + coverImage}
            />
            <div className={classes.frameWrapper}>
              <div className={classNames(classes.frame, !embedShowed && classes.frameNoEmbed)}>
                {embed_url.includes('youtube.com/embed') || embed_url.includes('player.vimeo.com')
                  ? (
                    <>
                      {embedShowed
                        ? (
                          <iframe
                            className={classes.embed}
                            src={`${post.embed_url}?autoplay=1`}
                            frameBorder='0'
                            allow={embed_url.includes('player.vimeo.com')
                              ? "autoplay; fullscreen; picture-in-picture"
                              : "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                            }
                            allowFullScreen='1'
                            webkitallowfullscreen='1'
                            mozallowfullscreen='1'
                          />
                        )
                        : (
                          <>
                            <img
                              className={classes.coverImage}
                              src={apiUrl + coverImage}
                            />
                            <div
                              className={classes.frameCenterLink}
                              onClick={setEmbedShowed}
                            >
                              {'PLAY'}
                            </div>
                          </>
                        )
                      }
                    </>
                  )
                  : (
                    <a
                      className={classes.frameCenterLink}
                      href={post.embed_url}
                      target={'blanc'}
                    >
                      {'PLAY'}
                    </a>
                  )
                }
              </div>
              <div
                className={classNames(classes.rightButton, classes.readButton)}
                onClick={onSetReadMode}
              >
                {'READ'}
              </div>
            </div>
          </div>
        )
      }
    </>
  )
};
