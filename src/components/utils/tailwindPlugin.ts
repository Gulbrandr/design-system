import plugin from 'tailwindcss/plugin';

const fenrir = plugin(function ({
  addUtilities,
  addComponents,
  e,
  addBase,
  theme,
  config,
}) {
  const typography = {
    '.header-1': {
      fontSize: '20rem',
      fontWeight: '800',
      lineHeight: '4.5rem',
      fontFamily: 'work-sans',
    },
    '.header-2': {
      fontSize: '2.5rem',
      fontWeight: '800',
      lineHeight: '3.5rem',
    },
    '.header-3': {
      fontSize: '2rem',
      fontWeight: '800',
      lineHeight: '2.5rem',
    },
    '.header-4': {
      fontSize: '1.5rem',
      fontWeight: '700',
      lineHeight: '2rem',
    },
    '.body-1': {
      fontSize: '1.25rem',
      fontWeight: '800',
      lineHeight: '1.75rem',
      fontFamily: 'Inter',
    },
  };

  addComponents(typography);
});

export default fenrir;
