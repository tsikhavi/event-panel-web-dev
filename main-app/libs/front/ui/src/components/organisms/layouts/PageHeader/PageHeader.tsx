import React, { FC } from 'react';

import Grid from '../../../atoms/Grid/Grid';
import Typography from '../../../atoms/Typography/Typography';

export type PageHeaderProps = {
  header: string;
  Actions: React.ReactNode;
} & Partial<{
  Search: React.ReactNode;
  Filters: React.ReactNode;
}>;

const PageHeader: FC<PageHeaderProps> = ({ header, Actions, Search, Filters }) => {
  return (
    <Grid container direction="column" gap={5}>
      <Grid item>
        <Grid container gap={10}>
          <Grid item>
            <Typography variant="h2">{header}</Typography>
          </Grid>
          <Grid item>{Actions}</Grid>
        </Grid>
      </Grid>

      <Grid item>
        <Grid container gap={4}>
          <Grid item size={1}>
            {Search}
          </Grid>
          <Grid item size={3}>
            {Filters}
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
};

export default PageHeader;
