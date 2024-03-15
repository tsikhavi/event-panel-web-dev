import { makeStyles } from '../../../theme/makeStyles';

const useStyles = makeStyles({ name: 'ContextMenu' })((theme) => ({
  dropdown: {
    display: 'flex',
    flexDirection: 'column',

    borderRadius: theme.spacing(2),
    border: `1px solid ${theme.colors['field/focused']}`,
    backgroundColor: theme.colors['bg/light'],
    boxShadow: theme.shadows['shadow/2'],

    overflow: 'hidden',
    '&:empty': {
      display: 'none',
    },
  },

  icon: {
    color: theme.colors['icon/inactive'],
    svg: {
      fill: theme.colors['icon/inactive'],
    },
    ':hover': {
      color: theme.colors['icon/active'],
      svg: {
        fill: theme.colors['icon/active'],
      },
    },
  },

  iconActive: {
    color: theme.colors['icon/active'],
    svg: {
      fill: theme.colors['icon/active'],
    },
  },
}));

export default useStyles;
