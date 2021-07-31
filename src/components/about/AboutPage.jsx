import React from 'react';
import { createUseStyles } from 'react-jss';
import { ThemeContext } from '../../App';
import { themes } from '../../App';
import classNames from 'classnames';

const createAboutPageStyles = createUseStyles(() => ({

  aboutPage: ({ background, color }) => ({
    width: '100%',
    height: '100vh',
    color: color,
    backgroundColor: background,
    maxWidth: 1000,
    display: 'flex',
    margin: '0 auto',
    fontSize: 14,
    overflow: 'scroll',
    paddingBottom: 100,
    display: 'inline',
    '&::-webkit-scrollbar': {
      display: 'none',
    },
  }),

  title: {
    textAlign: 'center',
    zIndex: 1,
    fontSize: 40,
    textTransform: 'uppercase',
    paddingBottom: 10,
  },

  langSwitcher: {
    padding: [0, 10, 15, 10],
    margin: '0 auto',
    cursor: 'pointer',
    textAlign: 'center',
  },

  logoWrapper: {
    display: 'flex',
    alignItems: 'start',
  },

  logo: {
    objectFit: 'contain',
    width: 50,
    height: 50,
    marginRight: 20,
    flexShrink: 0,
  },

  content: {
    width: '100%',
    display: 'flex',
  },

  column: {
    width: '50%',
    padding: 40,
  },

  link: {
    cursor: 'pointer',
    textDecoration: 'underline',
  },

  [`@media (max-height: ${global.maxHeight}px)`]: {
    aboutPage: () => ({
      paddingBottom: 50,
    }),
  },

  [`@media (max-width: ${global.width3}px) and (min-height: ${global.height2}px)`]: {
    aboutPage: () => ({
      flexDirection: 'column',
      paddingBottom: 0,
    }),

    content: {
      flexDirection: 'column',
    },

    column: {
      width: '100%',
      paddingTop: 0,
    },
  },
}));

export const AboutPage = () => {
  const { theme, setTheme } = React.useContext(ThemeContext);
  const [winWidth, setWinWidth] = React.useState(window.innerWidth);
  const [winHeight, setWinHeight] = React.useState(window.innerHeight);
  const [ruLang, setRuLang] = React.useState(false);

  React.useEffect(() => {
    const handleResize = () => {
      setWinWidth(window.innerWidth);
      setWinHeight(window.innerHeight);
    }
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [])

  React.useEffect(() => {
    setTheme(themes.black);
  }, [])

  const classes = createAboutPageStyles({ background: theme.background, color: theme.color });

  return (
    <div className={classes.aboutPage}>
      {winWidth <= global.width3 && winHeight >= global.height2 ? (
        <>
          <div className={classes.title}>
            {'About'}
          </div>
          <div
            className={classes.langSwitcher}
            onClick={() => setRuLang(!ruLang)}
          >
            {ruLang ? 'ENG' : 'RU'}
          </div>
          <div className={classes.content}>
            {ruLang ? (
              <div className={classNames(classes.column, classes.columnLeft)}>
                {'ГЛАЗОК (༗) —  это нестабильная видеоплатформа, медиа-мираж, эффект преломления визуальных потоков в пространстве институциональных и технологических связей разной плотности. Мы показываем фильмы, лекции, стримы и все, что посчитаем любопытным.'}
                <br />
                <br />
                {'Мы полностью независимы и вкладываем в развитие платформы свое время и ресурсы. Поддержать нас можно с помощью '}
                <a
                  className={classes.link}
                  href='https://www.buymeacoffee.com/glazok'
                  target='blanc'
                >
                  {'Buy Me a Coffee'}
                </a>
                {'.'}
                <br />
                <br />
                {'По всем остальным вопросам и с предложениями сотрудничества пишите на '}
                <a
                  className={classes.link}
                  href="mailto:hi@glazok.tv">
                  {'почту'}
                </a>
                {'.'}
                <br />
                <br />
                {'Кураторы: Рита Соколовская, Кирилл Роженцов'}
                <br />
                {'Дизайн: Даша Браженко, Вася Кондрашов'}
                <br />
                {'Разработка: Настя Млеко, Илья Осипов'}
                <br />
                {'Спасибо: Женя Л Збань, Анна Зыкина, Евгений Уваровский'}
                <br />
                <br />
                <br />
                <div className={classes.logoWrapper}>
                  <img
                    className={classes.logo}
                    src={require('./images/C-01.png')}
                    alt="logo"
                  />
                  <div className={classes.logoText}>
                    {'При поддержке Фонда Владимира Смирнова и Константина Сорокина'}
                  </div>
                </div>
                <br />
                <br />
                {'На компьютерах лучше всего глазок работает в браузерах Safari и Google Chrome, на мобильных устройствах — в Safari.'}
                <br />
                <br />
                {'На сайте могут быть материалы, не предназначенные для лиц младше 18 лет.'}
              </div>
            ) : (
              <div className={classNames(classes.column, classes.columnRight)}>
                {'GLAZOK (༗) is an unstable video platform, a media-mirage, a deflection effect, produced by visual streams running through space with varying densities of institutional and technological relations. We screen films, lectures, live-feeds, and everything that we find curious.'}
                <br />
                <br />
                {'We are completely independent and invest our own funds and energy into the platform. You can support us and donate via '}
                <a
                  className={classes.link}
                  href='https://www.buymeacoffee.com/glazok'
                  target='blanc'
                >
                  {'Buy Me a Coffee'}
                </a>
                {'.'}
                <br />
                <br />
                {'If you have any questions or want to collaborate, send us a '}
                <a
                  className={classes.link}
                  href="mailto:hi@glazok.tv">
                  {'letter'}
                </a>
                {'.'}
                <br />
                <br />
                {'Curating: Rita Sokolovskaya, Kirill Rozhentsov'}
                <br />
                {'Design: Dasha Brazhenko, Vasya Kondrashov'}
                <br />
                {'Code: Nastya Mleko, Ilya Osipov'}
                <br />
                {'Thanks: Zhenya L Zban, Anna Zykina, Evgeniy Uvarovskiy'}
                <br />
                <br />
                <br />
                <div className={classes.logoWrapper}>
                  <img
                    className={classes.logo}
                    src={require('./images/C-01.png')}
                    alt="logo"
                  />
                  <div className={classes.logoText}>
                    {'With the support of the Vladimir Smirnov and Konstantin Sorokin Foundation'}
                  </div>
                </div>
                <br />
                <br />
                {'It is best to use Safari and Google Chrome browsers for watching glazok on computers. Safari is best suited for mobile devices.'}
                <br />
                <br />
                {'The site may feature сontent that is not suitable for anyone under the age of 18.'}
              </div>
            )}
          </div>
        </>
      ) : (
        <div className={classes.content}>
          <div className={classNames(classes.column, classes.columnLeft)}>
            {'ГЛАЗОК (༗) —  это нестабильная видеоплатформа, медиа-мираж, эффект преломления визуальных потоков в пространстве институциональных и технологических связей разной плотности. Мы показываем фильмы, лекции, стримы и все, что посчитаем любопытным.'}
            <br />
            <br />
            {'Мы полностью независимы и вкладываем в развитие платформы свое время и ресурсы. Поддержать нас можно с помощью '}
            <a
              className={classes.link}
              href='https://www.buymeacoffee.com/glazok'
              target='blanc'
            >
              {'Buy Me a Coffee'}
            </a>
            {'.'}
            <br />
            <br />
            {'По всем остальным вопросам и с предложениями сотрудничества пишите на '}
            <a
              className={classes.link}
              href="mailto:hi@glazok.tv">
              {'почту'}
            </a>
            {'.'}
            <br />
            <br />
            {'Кураторы: Рита Соколовская, Кирилл Роженцов'}
            <br />
            {'Дизайн: Даша Браженко, Вася Кондрашов'}
            <br />
            {'Разработка: Настя Млеко, Илья Осипов'}
            <br />
            {'Спасибо: Женя Л Збань, Анна Зыкина, Евгений Уваровский'}
            <br />
            <br />
            <br />
            <div className={classes.logoWrapper}>
              <img
                className={classes.logo}
                src={require('./images/C-01.png')}
                alt="logo"
              />
              <div className={classes.logoText}>
                {'При поддержке Фонда Владимира Смирнова и Константина Сорокина'}
              </div>
            </div>
            <br />
            <br />
            {'На компьютерах лучше всего глазок работает в браузерах Safari и Google Chrome, на мобильных устройствах — в Safari.'}
            <br />
            <br />
            {'На сайте могут быть материалы, не предназначенные для лиц младше 18 лет.'}
          </div>

          <div className={classNames(classes.column, classes.columnRight)}>
            {'GLAZOK (༗) is an unstable video platform, a media-mirage, a deflection effect, produced by visual streams running through space with varying densities of institutional and technological relations. We screen films, lectures, live-feeds, and everything that we find curious.'}
            <br />
            <br />
            {'We are completely independent and invest our own funds and energy into the platform. You can support us and donate via '}
            <a
              className={classes.link}
              href='https://www.buymeacoffee.com/glazok'
              target='blanc'
            >
              {'Buy Me a Coffee'}
            </a>
            {'.'}
            <br />
            <br />
            {'If you have any questions or want to collaborate, send us a '}
            <a
              className={classes.link}
              href="mailto:hi@glazok.tv">
              {'letter'}
            </a>
            {'.'}
            <br />
            <br />
            {'Curating: Rita Sokolovskaya, Kirill Rozhentsov'}
            <br />
            {'Design: Dasha Brazhenko, Vasya Kondrashov'}
            <br />
            {'Code: Nastya Mleko, Ilya Osipov'}
            <br />
            {'Thanks: Zhenya L Zban, Anna Zykina, Evgeniy Uvarovskiy'}
            <br />
            <br />
            <br />
            <div className={classes.logoWrapper}>
              <img
                className={classes.logo}
                src={require('./images/C-01.png')}
                alt="logo"
              />
              <div className={classes.logoText}>
                {'With the support of the Vladimir Smirnov and Konstantin Sorokin Foundation'}
              </div>
            </div>
            <br />
            <br />
            {'It is best to use Safari and Google Chrome browsers for watching glazok on computers. Safari is best suited for mobile devices.'}
            <br />
            <br />
            {'The site may feature сontent that is not suitable for anyone under the age of 18.'}
          </div>
        </div>
      )}

    </div>
  );
};
