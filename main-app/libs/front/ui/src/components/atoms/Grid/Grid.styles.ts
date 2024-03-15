import { makeStyles } from '../../../theme/makeStyles';

type Props = Partial<{
  gap: number;
  size: number;
  direction: 'row' | 'column';
  justify: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  align: 'flex-start' | 'flex-end' | 'center' | 'baseline' | 'stretch';
}>;

const useStyles = makeStyles<Props>({ name: 'Grid' })(
  (theme, { gap = 0, size = 0, direction = 'row', justify = 'flex-start', align = 'stretch' }) => ({
    container: {
      width: '100%',
      height: '100%',

      flex: 1,
      display: 'flex',
      flexDirection: direction,
      justifyContent: justify,
      alignItems: align,
      gap: theme.spacing(gap),
    },

    item: {
      ...(size && { flex: size }),

      display: 'flex',
      flexDirection: 'column',
      alignItems: 'stretch',
    },
  })
);

export default useStyles;
