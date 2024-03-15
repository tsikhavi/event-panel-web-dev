import { makeStyles } from '../../../theme/makeStyles';

export const useStyles = makeStyles({ name: 'Icon' })(() => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    border: 'none',

    '& svg path': {
      stroke: 'currentColor',
    },
  },

  sm: {
    width: '16px',
    height: '16px',
    '& svg': {
      width: '16px',
      height: '16px',
    },
  },

  md: {
    width: '20px',
    height: '20px',
    '& svg': {
      width: '20px',
      height: '20px',
    },
  },

  lg: {
    width: '24px',
    height: '24px',
    '& svg': {
      width: '24px',
      height: '24px',
    },
  },

  xl: {
    width: '32px',
    height: '32px',
    '& svg': {
      width: '32px',
      height: '32px',
    },
  },
}));
