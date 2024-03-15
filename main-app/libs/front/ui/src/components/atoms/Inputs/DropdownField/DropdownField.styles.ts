import { makeStyles } from '../../../../theme/makeStyles';

const useStyles = makeStyles<{ isActive: boolean; isIconStart: boolean; isIconEnd: boolean }>({
  name: 'DropdownField',
})((theme, { isActive, isIconStart, isIconEnd }) => ({
  root: {
    position: 'relative',
  },

  input: {
    padding: `${theme.spacing(3)} 0`,
    paddingLeft: isIconStart
      ? `calc(${theme.spacing(4)} + ${theme.spacing(5)} + ${theme.spacing(2)})`
      : theme.spacing(4),
    paddingRight: isIconEnd
      ? `calc(${theme.spacing(4)} + ${theme.spacing(6)} + ${theme.spacing(2)})`
      : theme.spacing(4),
    outlineColor: isActive ? theme.colors['field/focused'] : theme.colors['field/default'],
  },

  icon: {
    color: isActive ? theme.colors['field/focused'] : theme.colors['icon/inactive'],
    position: 'absolute',
    top: '50%',
    transform: 'translateY(-50%)',
  },

  iconStart: {
    left: theme.spacing(4),
  },

  iconEnd: {
    right: theme.spacing(4),
  },
}));

export default useStyles;
