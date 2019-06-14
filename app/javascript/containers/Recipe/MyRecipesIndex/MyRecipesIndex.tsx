import * as React from 'react';
import { Query } from 'react-apollo';
import gql from 'graphql-tag';
import { Link } from 'react-router-dom';

import {
    WithStyles,
    createStyles,
    withStyles,
    Theme,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableRow,
    TableHead,
} from '@material-ui/core';

const styles = (theme: Theme) => createStyles({
});
interface MyRecipesIndexProps extends WithStyles<typeof styles> {

}
const GET_RECIPES = gql`
  {
    recipes{
      title
      calories
      description
      cookTime
      id
      numberOfServings
      user{
        name
      }
    }
  }
`;

const MyRecipesIndex = withStyles(styles)(
    class extends React.Component<MyRecipesIndexProps, {}> {
      recipeLink(recipe) {
        return `/recipes/${recipe.id}`;
      }
      render() {
        return (
                <Query query={GET_RECIPES}>
                    {({ data, loading }) => {
                      if (loading || !data) {
                        return null;
                      }
                      const { recipes } = data;
                      return <Paper>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Title</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {recipes.map((recipe) => {
                                      return <TableRow key={recipe.id}>
                                            <TableCell key={'title'}>
                                                <Link to={this.recipeLink(recipe)}>
                                                    {recipe.title}
                                                </Link>
                                            </TableCell>
                                        </TableRow>;
                                    })}
                                </TableBody>
                            </Table>
                        </Paper>;
                    }}
                </Query>
        );
      }
    },
);

export default MyRecipesIndex;
