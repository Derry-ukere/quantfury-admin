import TableHead from '@mui/material/TableHead';
// @mui
import { styled, TableRow, TextField, Typography } from '@mui/material';
import Label from '../Label';

export const StyleTextField = styled(TextField)`
  fieldset {
    border-radius: 0px;
  }
`;

export const TableRowStyle = styled(TableRow)(({ theme }) => ({
  background: theme.palette.background.paper,
}));

export const TableHeadStyle = styled(TableHead)(({ theme }) => ({
  background: theme.palette.background.paper,
}));

export const JobTitleStyle = styled(Typography)(({ theme }) => ({
  paddingLeft: theme.spacing(2),
}));

export const LabelStyle = styled(Label)(({ theme }) => ({
  background: theme.palette.background.paper,
  border: 0,
  fontSize: 11,
  fontWeight: theme.typography.fontWeightLight,
}));
export const LabelPointerStyle = styled(Label)(({ theme }) => ({
  background: theme.palette.background.paper,
  border: 0,
  fontSize: 11,
  fontWeight: theme.typography.fontWeightLight,
   cursor : "pointer"
}));

export const PendingLabelStyle = styled(Label)(({ theme }) => ({
  border: 0,
  fontSize: 12,
  fontWeight: theme.typography.fontWeightLight,
}));

export const ActiveLabelStyle = styled(Label)(({ theme }) => ({
  background: '#DFF5E9',
  color: '#1DB05F',
  border: 0,
  fontSize: 12,
  fontWeight: theme.typography.fontWeightLight,
}));

export const buttonStyle = {
  color: '#7E858E',
  fontSize: '12px',
  fontWeight: '100px',
  border : 0
};

