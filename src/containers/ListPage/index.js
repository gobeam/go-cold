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
import { loadBlockedListAction } from 'containers/ListPage/actions';

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    maxWidth: 752,
  },
  demo: {
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    margin: theme.spacing(4, 0, 2),
  },
}));

const stateSelector = createStructuredSelector({
  blockedList: makeBlockedListSelector(),
});


const key = 'listPage';
export default function ListPage() {
  const dispatch = useDispatch();
  const classes = useStyles();
  
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  
  useEffect(() => {
    dispatch(loadBlockedListAction());
  }, []);
  
  const { blockedList } = useSelector(
    stateSelector,
  );
  
  
  return (
    <div className={classes.root}>
      <Grid item xs={12} md={6}>
        <Typography variant="h6" className={classes.title}>
          Avatar with text and icon
        </Typography>
        <div className={classes.demo}>
          <List dense={false}>
            
            {blockedList.map((domain, i) => {
              return <ListItem key={i}>
                <ListItemText
                  primary={domain.url}
                  secondary={'Secondary text'}
                />
                <ListItemSecondaryAction>
                  <IconButton edge="end" aria-label="delete">
                    <DeleteIcon/>
                  </IconButton>
                </ListItemSecondaryAction>
              </ListItem>;
            })}
          
          
          </List>
        </div>
      </Grid>
    </div>
  );
}
