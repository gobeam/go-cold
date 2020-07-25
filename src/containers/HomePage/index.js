/**
 *
 * HomePage
 *
 */
import React, { Fragment, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
// Import Actions
import { changeField, onFormValidation } from './actions';
import saga from './saga';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { createStructuredSelector } from 'reselect';
import {
  makeAddedUrlDetailSelector,
  makeBlockAlwaysSelector,
  makeBlockIntervalSelector,
  makeCurrentBaseUrlSelector,
  makeCurrentUrlAddedSelector,
  makeErrorSelector,
  makeIsLoadingSelector,
  makeManualAddSelector,
  makeUrlSelector,
} from 'containers/HomePage/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/HomePage/reducer';
import CheckIcon from '@material-ui/icons/Check';
import AddIcon from '@material-ui/icons/Add';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import ListItemText from '@material-ui/core/ListItemText';
import Avatar from '@material-ui/core/Avatar';
import { green } from '@material-ui/core/colors';
import ArrowForwardIosIcon from '@material-ui/icons/ArrowForwardIos';
import Fab from '@material-ui/core/Fab';
import CircularProgress from '@material-ui/core/CircularProgress';
import clsx from 'clsx';
import {
  addBlockedUrlAction,
  currentUrlAlreadyAddedAction,
  getCurrentTabBaseUrlAction,
  toggleManualAddAction,
} from 'containers/HomePage/actions';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Tooltip from '@material-ui/core/Tooltip';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import FormGroup from '@material-ui/core/FormGroup';
import Icon from '@material-ui/core/Icon';
import { enqueueSnackbarAction } from 'containers/SnackBar/actions';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent';
import history from 'utils/history';


const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 275,
  },
  small: {
    width: theme.spacing(3),
    height: theme.spacing(3),
  },
  wrapper: {
    margin: theme.spacing(-2),
    position: 'relative',
  },
  buttonSuccess: {
    backgroundColor: green[500],
    '&:hover': {
      backgroundColor: green[700],
    },
  },
  fabProgress: {
    color: green[500],
    position: 'absolute',
    top: -4,
    left: -4,
    zIndex: 1,
  },
}));

const stateSelector = createStructuredSelector({
  url: makeUrlSelector(),
  errors: makeErrorSelector(),
  isLoading: makeIsLoadingSelector(),
  currentBaseUrl: makeCurrentBaseUrlSelector(),
  alreadyAdded: makeCurrentUrlAddedSelector(),
  blockAlways: makeBlockAlwaysSelector(),
  blockInterval: makeBlockIntervalSelector(),
  manualAdd: makeManualAddSelector(),
  addedUrlDetail: makeAddedUrlDetailSelector(),
});

function ValueLabelComponent(props) {
  const { children, open, value } = props;
  
  return (
    <Tooltip open={open} enterTouchDelay={0} placement="top" title={value + ' min'}>
      {children}
    </Tooltip>
  );
}


const key = 'homePage';
export default function HomePage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const timer = useRef();
  const fetchCurrentTabUrlAction = () => dispatch(getCurrentTabBaseUrlAction());
  
  const { url, errors, currentBaseUrl, alreadyAdded, blockAlways, blockInterval, manualAdd } = useSelector(
    stateSelector,
  );
  const buttonClassname = clsx({
    [classes.buttonSuccess]: success,
  });
  
  const submitForm = (e) => {
    e.preventDefault();
    dispatch(onFormValidation());
  };
  const onChangeField = (e) => {
    dispatch(changeField(e.target.name, e.target.value));
  };
  
  const onChangeSlider = (e, newValue) => {
    dispatch(changeField('blockInterval', newValue));
  };
  
  const onChangeSwitch = (e) => {
    dispatch(changeField(e.target.name, !blockAlways));
  };
  
  const toggleAddManually = () => {
    dispatch(toggleManualAddAction(!manualAdd));
  };
  
  useEffect(() => {
    fetchCurrentTabUrlAction();
    return () => {
      clearTimeout(timer.current);
    };
  }, []);
  
  const handleButtonClick = () => {
    if (!loading && (blockAlways || blockInterval > 0)) {
      setSuccess(false);
      setLoading(true);
      timer.current = setTimeout(() => {
        setSuccess(true);
        setLoading(false);
        dispatch(changeField('url', currentBaseUrl));
        dispatch(addBlockedUrlAction());
        dispatch(currentUrlAlreadyAddedAction());
      }, 500);
    } else {
      dispatch(enqueueSnackbarAction({
        message: 'You must add block interval or select to block always.',
        type: 'warning',
      }));
    }
  };
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            
            {!alreadyAdded && currentBaseUrl && currentBaseUrl.length > 0 ?
              <List dense={false}>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar className={classes.small}>
                      <ArrowForwardIosIcon style={{ fontSize: 10 }}/>
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={currentBaseUrl}
                    secondary={blockAlways ? 'Block always is on' : `Block for ${blockInterval} ${blockInterval > 1 ? 'mins' : 'min'}`}
                  />
                  <ListItemSecondaryAction>
                    <div className={classes.wrapper}>
                      <Fab
                        size="small"
                        aria-label="save"
                        color="primary"
                        className={buttonClassname}
                        onClick={handleButtonClick}
                      >
                        {success ? <CheckIcon/> : <AddIcon/>}
                      </Fab>
                      {loading && <CircularProgress size={48} className={classes.fabProgress}/>}
                    </div>
                  </ListItemSecondaryAction>
                </ListItem>
              </List> : 'Nothing to Add'}
            
            <form className={classes.root} onSubmit={submitForm} noValidate autoComplete="off">
              {manualAdd ? <FormGroup row>
                <TextField
                  name="url"
                  onChange={onChangeField}
                  error={!!errors.url}
                  id="outlined-error-helper-text"
                  label="Add Url"
                  value={url}
                  helperText={errors.url}
                  variant="outlined"
                />
              </FormGroup> : ''}
              
              {manualAdd || (!alreadyAdded && currentBaseUrl && currentBaseUrl.length > 0) ?
                <Fragment><FormGroup row>
                  <FormControlLabel
                    control={<Switch checked={blockAlways} onChange={onChangeSwitch} name="blockAlways"
                                     color="primary"/>}
                    label="Block Always"
                  />
                </FormGroup>
                  
                  {/*<Box display="flex">*/}
                  {/*  <Box m="auto">*/}
                  {/*    {!blockAlways ? 'or' : ''}*/}
                  {/*  </Box>*/}
                  {/*</Box>*/}
                  {!blockAlways ? <Typography variant="caption" display="block" gutterBottom>
                    or
                  </Typography> : ''}
                </Fragment> : ''}
              
              {!blockAlways && (manualAdd || (!alreadyAdded && currentBaseUrl && currentBaseUrl.length > 0)) ?
                <FormGroup row>
                  <Typography
                    gutterBottom>{`Block Interval (${blockInterval} ${blockInterval > 1 ? ' mins' : ' min'})`}</Typography>
                  <Slider
                    onChange={onChangeSlider}
                    ValueLabelComponent={ValueLabelComponent}
                    aria-label={`Block Interval (${blockInterval} min)`}
                    value={blockInterval}
                    max={60}
                  />
                </FormGroup> : ''}
              
              {manualAdd ? <Button type="submit" variant="contained" color="primary">
                Add
              </Button> : ''}
            </form>
          </CardContent>
        </Card>
      
      </Grid>
      
      <Grid item xs={12}>
        <ButtonGroup size="small" aria-label="small outlined button group">
          {!manualAdd ? <Button
            color="primary"
            className={classes.button}
            onClick={toggleAddManually}
            startIcon={<Icon>add_circle_outline</Icon>}>
            Add Manually
          </Button> : ''}
          <Button color="primary"
                  startIcon={<Icon>list</Icon>}
                  onClick={() => history.push('/list.html')}
          >View Blocked List</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
