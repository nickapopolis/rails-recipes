import * as React from 'react';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import {
  Theme,
} from '@material-ui/core/styles';
import * as _ from 'lodash';

import DeleteUser from './components/DeleteUser';
import EditAccountInformation from './components/EditAccountInformation';
import ChangePassword from './components/ChangePassword';
import { UserContext } from '../../../containers/components/UserContext';

const useStyles = makeStyles((theme: Theme) => createStyles({
  container: {
    display: 'flex',
    flexDirection: 'column',
    marginLeft: theme.spacing(1),
  },
  card: {
    marginBottom: theme.spacing(4),
  },
}));

// tslint:disable-next-line: function-name
export default function UserEdit() {
  const classes = useStyles({});

  const {
    user,
  } = React.useContext(UserContext);

  return  (
    <div className={classes.container}>
      <div className={classes.card}>
        <EditAccountInformation user={user}></EditAccountInformation>
      </div>
      <div className={classes.card}><ChangePassword></ChangePassword></div>
      <div className={classes.card}><DeleteUser></DeleteUser></div>
    </div>
  );
}
