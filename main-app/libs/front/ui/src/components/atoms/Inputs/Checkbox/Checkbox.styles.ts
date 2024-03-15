import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Checkbox' })((theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-start',
    gap: theme.spacing(3),

    cursor: 'pointer',
    userSelect: 'none',
  },

  checkbox: {
    display: 'none',
  },

  checkboxOn: {
    '& svg path': {
      stroke: theme.colors['bg/light'],
      fill: theme.colors['button/default'],
    },
  },

  checkboxOff: {
    '& svg path': {
      stroke: theme.colors['button/default'],
    },
  },

  label: {
    ...theme.typography['body/xs'],
  },
}));

export default useStyles;
