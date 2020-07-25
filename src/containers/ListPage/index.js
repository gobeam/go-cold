/**
 *
 * ListPage
 *
 */
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectSaga } from 'utils/injectSaga';
// Import Actions
import saga from './saga';
import { makeStyles } from '@material-ui/core/styles';
import { createStructuredSelector } from 'reselect';
import { makeBlockedListSelector } from 'containers/ListPage/selectors';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/ListPage/reducer';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';
import IconButton from '@material-ui/core/IconButton';
import DeleteIcon from '@material-ui/icons/Delete';
import { assignDeleteIndexAction, loadBlockedListAction, processUnblockAction } from 'containers/ListPage/actions';
import CardContent from '@material-ui/core/CardContent';
import Card from '@material-ui/core/Card/Card';
import Button from '@material-ui/core/Button';
import Icon from '@material-ui/core/Icon';
import history from 'utils/history';
import ButtonGroup from '@material-ui/core/ButtonGroup';
import Divider from '@material-ui/core/Divider';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';

const useStyles = makeStyles((theme) => ({
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  // title: {
  //   margin: theme.spacing(4, 0, 2),
  // },
  root: {
    minWidth: 275,
  },
}));

const stateSelector = createStructuredSelector({
  blockedList: makeBlockedListSelector(),
});


const key = 'listPage';
export default function ListPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  const fetchBlockedUrlList = () => dispatch(loadBlockedListAction());
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  
  const unblockDomain = (index) => {
    dispatch(assignDeleteIndexAction(index));
    dispatch(processUnblockAction());
  };
  
  useEffect(() => {
    fetchBlockedUrlList();
  }, []);
  
  const { blockedList } = useSelector(
    stateSelector,
  );
  
  
  return (
    <Grid container spacing={3}>
      <Grid item xs={12}>
        <Card className={classes.root} variant="outlined">
          <CardContent>
            <Typography variant="h6">
              Blocked List
            </Typography>
            <Divider/>
            <List dense={false}>
              
              {blockedList.length > 0 ? blockedList.map((domain, i) => {
                return <ListItem key={i}>
                  <ListItemAvatar>
                    <Avatar alt={domain.url} src={`https://www.google.com/s2/favicons?domain=${domain.url}`} />
                  </ListItemAvatar>
                  <ListItemText
                    primary={domain.url}
                    secondary={domain.blockedAlways ? 'Always block activated' : `${parseInt(Math.abs(domain.expireTime - Date.now()) / (1000 * 60) % 60)} min remaining to be unblocked`}
                  />
                  <ListItemSecondaryAction>
                    <IconButton edge="end" aria-label="delete" onClick={() => unblockDomain(i)}>
                      <DeleteIcon/>
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>;
              }) : 'List Empty'}
            
            </List>
          </CardContent>
        </Card>
      </Grid>
      <Grid item xs={12}>
        <ButtonGroup>
          <Button color="primary"
                  startIcon={<Icon>dashboard</Icon>}
                  onClick={() => history.push('/index.html')}
          >Dashboard</Button>
        </ButtonGroup>
      </Grid>
    </Grid>
  );
}
