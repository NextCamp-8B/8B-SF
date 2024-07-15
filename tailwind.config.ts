import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    colors: {
      primary: {
        50: '#E6E9EF',
        100: '#C0C8D9',
        200: '#98A5BF',
        300: '#7282A5',
        400: '#546894',
        500: '#364F84',
        600: '#30487C',
        700: '#283E70',
        800: '#213564',
        900: '#18254C',
      },
      secondary: {
        50: '#E1F5FD',
        100: '#B2E6FA',
        200: '#80D5F7',
        300: '#4CC5F4',
        400: '#1CB8F3',
        500: '#00ACF2',
        600: '#009EE3',
        700: '#008BD0',
        800: '#0079BC',
        900: '#005A9B',
      },
      grayscale: {
        0: '#FFFFFF',
        100: '#F5F5F5',
        200: '#E9E9E9',
        300: '#C5C5C5',
        400: '#9F9F9F',
        500: '#7D7D7D',
        600: '#575757',
        700: '#454545',
        800: '#282828',
        900: '#121212',
      },
      background: {
        100: '#F1F3F8',
      },
      warning: {
        100: '#FF294F',
      },
      success: {
        100: '#1FCE65',
      },
      icon: {
        closing: '#989898',
      },
      modal: {
        dim: 'rgba(76, 76, 76, 0.53)',
      },
    },
    extend: {
      boxShadow: {
        'custom-xxs':
          '0 0.5px 1px rgba(0, 0, 0, 0.25), 0 0 2px rgba(0, 0, 0, 0.25), 0 0 2px rgba(0, 0, 0, 0.15)',
        'custom-xs':
          '0 1px 2px rgba(0, 0, 0, 0.25), 0 0 3px rgba(0, 0, 0, 0.25), 0 0 3px rgba(0, 0, 0, 0.15)',
        'custom-sm':
          '0 2px 4px rgba(0, 0, 0, 0.25), 0 0 5px rgba(0, 0, 0, 0.25), 0 0 5px rgba(0, 0, 0, 0.15)',
        'custom-md':
          '0 3px 6px rgba(0, 0, 0, 0.25), 0 0 7px rgba(0, 0, 0, 0.25), 0 0 7px rgba(0, 0, 0, 0.15)',
        'custom-lg':
          '0 4px 8px rgba(0, 0, 0, 0.25), 0 0 10px rgba(0, 0, 0, 0.25), 0 0 10px rgba(0, 0, 0, 0.15)',
      },
      animation: {
        'move-skeleton': 'move 2s linear infinite',
      },
      keyframes: {
        move: {
          '0%': {
            transform: 'translateX(-150%)',
          },
          '100%': {
            transform: 'translateX(300%)',
          },
        },
      },
    },
  },
  plugins: [
    function ({
      addUtilities,
      theme,
    }: {
      addUtilities: any;
      theme: any;
    }) {
      const newUtilities = {
        '.btn-primary': {
          backgroundColor: theme('colors.primary.900'),
          color: theme('colors.grayscale.0'),
        },
        '.btn-primary:hover': {
          backgroundColor: theme('colors.primary.700'),
        },
        '.btn-light': {
          backgroundColor: theme('colors.grayscale.0'),
          color: theme('colors.primary.900'),
          border: `1px solid ${theme('colors.primary.900')}`,
        },
        '.btn-light:hover': {
          color: theme('colors.primary.200'),
          borderColor: theme('colors.primary.200'),
        },
        '.btn-danger': {
          backgroundColor: theme('colors.warning.100'),
          color: theme('colors.grayscale.0'),
        },
        '.btn-danger:hover': {
          backgroundColor: theme('colors.warning.50'),
        },
        '.btn-success': {
          backgroundColor: theme('colors.success.100'),
          color: theme('colors.grayscale.0'),
        },
        '.btn-success:hover': {
          backgroundColor: theme('colors.success.50'),
        },
        '.btn-blue': {
          backgroundColor: theme('colors.secondary.500'),
          color: theme('colors.grayscale.0'),
        },
        '.btn-blue:hover': {
          backgroundColor: theme('colors.secondary.300'),
        },
        '.btn-gray': {
          backgroundColor: theme('colors.grayscale.200'),
          color: theme('colors.grayscale.600'),
        },
        '.btn-gray:hover': {
          color: theme('colors.grayscale.500'),
        },
        '.btn-disabled': {
          backgroundColor: theme('colors.grayscale.200'),
          color: theme('colors.grayscale.400'),
          cursor: 'not-allowed',
          border: 'none',
        },
        '.btn-disabled:hover': {
          border: 'none',
        },
        '.h1': {
          fontSize: '60px',
          lineHeight: '72px',
          letterSpacing: '-1%',
        },
        '.h2': {
          fontSize: '48px',
          lineHeight: '140%',
          letterSpacing: '0%',
        },
        '.h3': {
          fontSize: '36px',
          lineHeight: '40px',
          letterSpacing: '0%',
        },
        '.h4': {
          fontSize: '30px',
          lineHeight: '36px',
          letterSpacing: '0%',
        },

        '.b1': {
          fontSize: '24px',
          lineHeight: '32px',
          letterSpacing: '0%',
        },
        '.b2': {
          fontSize: '20px',
          lineHeight: '28px',
          letterSpacing: '0%',
        },
        '.b3': {
          fontSize: '18px',
          lineHeight: '28px',
          letterSpacing: '0%',
        },
        '.b4': {
          fontSize: '16px',
          lineHeight: '24px',
          letterSpacing: '0%',
        },
        '.b5': {
          fontSize: '14px',
          lineHeight: '20px',
          letterSpacing: '0%',
        },
        '.caption': {
          fontSize: '12px',
          lineHeight: '16px',
          letterSpacing: '0%',
        },
        '.text-overflow-1': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-word',
          display: '-webkit-box',
          '-webkit-line-clamp': '1',
          '-webkit-box-orient': 'vertical',
        },
        '.text-overflow-2': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-word',
          display: '-webkit-box',
          '-webkit-line-clamp': '2',
          '-webkit-box-orient': 'vertical',
        },
        '.text-overflow-3': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-word',
          display: '-webkit-box',
          '-webkit-line-clamp': '3',
          '-webkit-box-orient': 'vertical',
        },
        '.text-overflow-4': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-word',
          display: '-webkit-box',
          '-webkit-line-clamp': '4',
          '-webkit-box-orient': 'vertical',
        },
        '.text-overflow-5': {
          textOverflow: 'ellipsis',
          overflow: 'hidden',
          wordBreak: 'break-word',
          display: '-webkit-box',
          '-webkit-line-clamp': '5',
          '-webkit-box-orient': 'vertical',
        },
        '.no-scrollbar': {
          'scrollbar-width': 'none',
          '&::-webkit-scollbar': {
            display: 'none',
          },
        },
      };

      addUtilities(newUtilities);
    },
  ],
};
export default config;
