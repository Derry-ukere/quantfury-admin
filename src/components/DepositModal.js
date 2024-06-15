import * as React from 'react';
import PropTypes from 'prop-types';
import Box from '@mui/material/Box';
import { Stack, Typography, styled, Paper,Button } from '@mui/material';
import TextField from '@mui/material/TextField';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Dialog from '@mui/material/Dialog';
import RadioGroup from '@mui/material/RadioGroup';
import Radio from '@mui/material/Radio';
import FormControlLabel from '@mui/material/FormControlLabel';
import LoadingButton from '@mui/lab/LoadingButton';

import Image from './Image';
// @
import { useDispatch, useSelector } from '../redux/store';
import {setDepositStatus} from '../redux/slices/deposits/update-deposit-status';

const options = [
  'Filled position already', 
  "Didn't receive enough applications",
  "Didn't fill position,but we're pausing hiring.",
  "Didn't fill position,but we're no longer hiring.",
  'Applications were of poor quality',
  'Other',
];


export default function ConfirmationDialogRaw(props) {
  const dispatch = useDispatch();
  const { success,isLoading,error } = useSelector((state) => state.updateDepositStaus);

  const { open, handleClose, type, id, actionType, ...other } = props;
  const [value, setValue] = React.useState('');
  const [personalValue, setPersonalValue] = React.useState('');

  const radioGroupRef = React.useRef(null);


  const handleEntering = () => {
    if (radioGroupRef.current != null) {
      radioGroupRef.current.focus();
    }
  };

  const submit = () => {
    if (personalValue !== '') {
      console.log({
        personalValue,
        id,
      });
    } else {
      console.log({
        value,
        id,
      });
    }
  };

  const updateDepositStatusFunc = async() => {
  const options = {id, actionType}
    dispatch(setDepositStatus(options))
  }

  const handleChange = (event) => {
    if (personalValue) {
      setPersonalValue('');
    }
    setValue(event.target.value);
  };

  const TitleStyle = styled(Typography)(({ theme }) => ({
    padding: theme.spacing(2),
    lineHeight: 1.2,
    color: theme.palette.text.primary,
    fontSize: 16,
  }));

  const JobTitleStyle = styled('span')(({ theme }) => ({
    color: theme.palette.primary.main,
    fontSize: 24,
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  }));

  const DialogTitleTitleStyle = styled('span')(({ theme }) => ({
    color: theme.palette.text.main,
    fontSize: 24,
    [theme.breakpoints.down('md')]: {
      fontSize: 12,
    },
  }));

  const otherValue = value === 'Other';

  if (type === 'delete') {
    return (
      <Dialog
        sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
        maxWidth="xs"
        TransitionProps={{ onEntering: handleEntering }}
        open={open}
        {...other}
      >
        <DialogContent dividers>
          <Paper elevation={0}>
            <Stack spacing={3} direction="column" alignItems="center" justifyContent="center">
            {error   && <div style={{color : 'red'}}>{error }</div>}
            {success.approved   && <div style={{color : 'green'}}> deposit approved</div>}
            {success.declined   && <div style={{color : 'green'}}> deposit declined</div>}
              <Image alt="country" src={'/assets/images/site/ServiceVector2.png'} sx={{ width: 200 }} />
              <Typography>  <DialogTitleTitleStyle>yo !!</DialogTitleTitleStyle> <JobTitleStyle>“Are you sure”?</JobTitleStyle></Typography>
            </Stack>
          </Paper>
        </DialogContent>
        <DialogActions>
          <Box sx={{ width: '100%' }}>
            <Stack direction={'row'} sx={{ width: '100%' }} spacing={2}>
              <Button variant="contained "  onClick={handleClose}>
                Close
              </Button>
              <LoadingButton loading = {isLoading} variant="contained" onClick={updateDepositStatusFunc}>
                proceed
              </LoadingButton>
            </Stack>
          </Box>
        </DialogActions>
      </Dialog>
    );
  }

  return (
    <Dialog
      sx={{ '& .MuiDialog-paper': { width: '80%', maxHeight: 435 } }}
      maxWidth="xs"
      TransitionProps={{ onEntering: handleEntering }}
      open={open}
      {...other}
    >
      <DialogTitle>
        <DialogTitleTitleStyle>Close</DialogTitleTitleStyle> <JobTitleStyle>“Software Tester”?</JobTitleStyle>{' '}
      </DialogTitle>
      <TitleStyle>We're sad to see that you're Deleting your job. Can you tell us why?</TitleStyle>
      <DialogContent dividers>
        <RadioGroup ref={radioGroupRef} aria-label="ringtone" name="ringtone" value={value} onChange={handleChange}>
          {options.map((option) => (
            <FormControlLabel value={option} key={option} control={<Radio />} label={option} />
          ))}
        </RadioGroup>
        {otherValue && (
          <TextField
            name="email"
            multiline
            rows={5}
            fullWidth
            sx={{ borderRadius: 0 }}
            placeholder="Please Describe"
            value={personalValue}
            onChange={(e) => setPersonalValue(e.target.value)}
          />
        )}
      </DialogContent>
      <DialogActions>
        <Box sx={{ width: '100%' }}>
          <Stack direction={'row'} sx={{ width: '100%' }} spacing={2} alignItems="center" justifyContent = "space-between">
            <Button variant="contained " sx={{ paddingX: 10 }} onClick={handleClose}>
              Close
            </Button>
            <Button variant="contained" sx={{ paddingX: 7 }} onClick={submit}>
              Close Job
            </Button>
          </Stack>
        </Box>
      </DialogActions>
    </Dialog>
  );
}

ConfirmationDialogRaw.propTypes = {
  open: PropTypes.bool.isRequired,
  value: PropTypes.string,
  action : PropTypes.string,
  id : PropTypes.string,
  actionType : PropTypes.string,
  handleClose:PropTypes.func,
  type : PropTypes.string,
};

