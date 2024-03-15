import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'Menu' })((theme) => ({
  root: {
    margin: 0,
    padding: `${theme.spacing(1)} ${theme.spacing(0)}`,

    userSelect: 'none',
    listStyleType: 'none',
  },

  listItem: {
    ...theme.typography['body/xs'],
    padding: `${theme.spacing(3)} ${theme.spacing(4)}`,

    display: 'flex',
    flexWrap: 'nowrap',
    alignItems: 'center',
    flexDirection: 'row',
    gap: theme.spacing(2),

    '&:hover': {
      cursor: 'pointer',
      backgroundColor: theme.colors['bg/grey/2'],
    },
  },

  label: {
    overflow: 'hidden',
    whiteSpace: 'nowrap',
    textOverflow: 'ellipsis',
  },

  subLabel: {
    color: theme.colors['text/placeholder'],

    paddingLeft: theme.spacing(1),
  },

  selected: {
    color: theme.colors['button/default'],
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
}));

export default useStyles;
