import * as React from 'react';
import { Field, reduxForm, InjectedFormProps } from 'redux-form';
import Icon from '@material-ui/core/Icon';
import { WithStyles, createStyles, withStyles, Theme } from '@material-ui/core';
import classNames from 'classnames';

const styles = (theme: Theme) => createStyles({
  searchInput: {
    border: 'none',
    backgroundColor: 'transparent',
    fontSize: '1.25em',
    fontWeight: 300,
    width: '100%',
    outline: 'none',
  },
  searchContainer: {
    backgroundColor: '#ffffff80',
    borderRadius: '0.3em',
    width: '100%',
    display: 'flex',
  },
  searchIcon: {
    margin: '0.5em',
  },
});
interface SearchBoxProps extends WithStyles<typeof styles>, InjectedFormProps{

}
const SearchBox = withStyles(styles)(
  class extends React.Component<SearchBoxProps, {}> {
    render() {
      const { handleSubmit, classes } = this.props;
      return (
        <form onSubmit={handleSubmit}className={classes.searchContainer}>
            <Icon className={classNames(classes.searchIcon, 'fa fa-search')}/>
            <Field
                name="search"
                component="input"
                type="text"
                placeholder="Search for recipes"
                className={classes.searchInput}
              />
        </form>
      );
    }
  },
);

export default reduxForm({
  form: 'search',
})(SearchBox);
