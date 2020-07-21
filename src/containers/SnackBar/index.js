/**
 *
 * Notifier
 *
 */
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useInjectReducer } from 'utils/injectReducer';
import reducer from 'containers/SnackBar/reducer';
import { useInjectSaga } from 'utils/injectSaga';
import saga from 'containers/SnackBar/saga';
import { createStructuredSelector } from 'reselect';
import {
  makeSnackBarMessageSelector,
  makeSnackBarMessageShowSelector,
  makeSnackBarMessageTypeSelector,
} from 'containers/SnackBar/selectors';
import { clearSnackbarAction } from 'containers/SnackBar/actions';
import Snackbar from '@material-ui/core/Snackbar';
import MuiAlert from '@material-ui/lab/Alert';

const key = 'snackMessage';

const stateSelector = createStructuredSelector({
  message: makeSnackBarMessageSelector(),
  show: makeSnackBarMessageShowSelector(),
  type: makeSnackBarMessageTypeSelector(),
});

const Alert = (props) => {
  return <MuiAlert elevation={6} variant="filled" {...props} />;
};

export default function SnackBar() {
  const dispatch = useDispatch();
  useInjectReducer({ key, reducer });
  useInjectSaga({ key, saga });
  
  const { message, show, type } = useSelector(
    stateSelector,
  );
  
  const handleClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    dispatch(clearSnackbarAction());
  };
  
  return <Snackbar open={show} autoHideDuration={3000} onClose={handleClose}
                   anchorOrigin={{ vertical: 'top', horizontal: 'right' }}>
    <Alert onClose={handleClose} severity={type}>
      {message}
    </Alert>
  </Snackbar>;
}


// Notifier.propTypes = {
// 	snackbars: PropTypes.array,
// 	enqueueSnackbar: PropTypes.func,
// 	onRemoveSnackbar: PropTypes.func,
// };
