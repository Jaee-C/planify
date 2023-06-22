import 'react';
import {Grid, GridProps, styled, Typography} from '@mui/material';
import React from 'react';

const FormEntry = styled(Grid)<GridProps>(() => ({
  '&.MuiGrid-container': {
    alignItems: 'center',
  },
  '&.MuiGrid-item': {
    fontWeight: 500,
  },
}));

interface TextLabelFieldProps {
  textLabel: string;
  children: React.ReactNode;
}

export default function TextFieldLabel(props: TextLabelFieldProps) {
  const {textLabel} = props;

  return (
    <FormEntry container spacing={2}>
      <Grid item xs={12} sm={4}>
        <Typography variant="subtitle1" className="font-medium text-sm">
          {textLabel}
        </Typography>
      </Grid>
      <Grid item xs={12} sm={8}>
        {props.children}
      </Grid>
    </FormEntry>
  );
}
