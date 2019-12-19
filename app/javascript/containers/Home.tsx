import * as React from "react";
import { Query, Mutation } from "react-apollo";
import gql from "graphql-tag";
import { Link } from "react-router-dom";
import classNames from "classnames";
import { ErrorContext } from "./components/ErrorContext";

import {
  Card,
  Typography,
  Theme,
  CardActionArea,
  IconButton,
  Icon
} from "@material-ui/core";

import { makeStyles, createStyles } from "@material-ui/styles";

import * as _ from "lodash";
import { ApolloError} from 'apollo-client';

const GET_RECIPES = gql`
  {
    recipeFeed {
      title
      id
      images
      createdAt
      upvotes
      upvoted
      downvoted
    }
  }
`;

const RECIPE_VOTE = gql`
  mutation RecipeVote($input: RecipeVoteInput!) {
    recipeVote(input: $input) {
      errors
    }
  }
`;

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    image: {
      objectFit: "cover",
      width: "75px",
      height: "75px"
    },
    link: {
      textDecoration: "none"
    },
    card: {
      margin: theme.spacing(1)
    },
    cardActionArea: {
      display: "flex",
      flexDirection: "row",
      justifyContent: "flex-start"
    },
    text: {
      padding: theme.spacing(1)
    },
    voteContainer: {
      minWidth: "40px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    },
    upvoteIcon: {},
    downvoteIcon: {},
    iconButton: {
      padding: 0
    },
    imageContainer: {
      minWidth: "75px",
      minHeight: "75px"
    },
    upvoted: {
      color: "green"
    },
    downvoted: {
      color: "red"
    }
  })
);

export default function Home() {
  const classes = useStyles({});
  const { push } = React.useContext(ErrorContext);
  function recipeLink(recipe) {
    return `/recipes/${recipe.id}`;
  }

  const [votes, setVotes] = React.useState({});

  function recipe_gid(recipe) {
    return `gid://recipes/Recipe/${recipe.id}`;
  }

  function handleUpvote(recipe, recipeVote, event) {
    event.preventDefault();
    setVotes({
      ...votes,
      [recipe.id]: true
    });
    recipeVote({
      variables: {
        input: {
          recipeId: recipe_gid(recipe),
          upvote: true
        }
      }
    });
  }
  function handleDownvote(recipe, recipeVote, event) {
    event.preventDefault();
    setVotes({
      ...votes,
      [recipe.id]: false
    });
    recipeVote({
      variables: {
        input: {
          recipeId: recipe_gid(recipe),
          upvote: false
        }
      }
    });
  }

  function upvoted(recipe): boolean {
    return (
      votes[recipe.id] === true ||
      (votes[recipe.id] !== false && recipe.upvoted)
    );
  }
  function downvoted(recipe): boolean {
    return (
      votes[recipe.id] === false ||
      (votes[recipe.id] !== true && recipe.downvoted)
    );
  }
  function handleError(error: ApolloError) {
    push(error.message);
  }
  return (
    <Mutation
      onError={handleError}
      context={{ hasUpload: true }}
      mutation={RECIPE_VOTE}
    >
      {(recipeVote, { data }) => {
        return (
          <Query query={GET_RECIPES}>
            {({ data, loading }) => {
              if (loading || !data) {
                return null;
              }
              const { recipeFeed } = data;
              {
                return recipeFeed.map(recipe => {
                  return (
                    <Link
                      className={classes.link}
                      key={recipe.id}
                      to={recipeLink(recipe)}
                    >
                      <Card className={classes.card}>
                        <CardActionArea className={classes.cardActionArea}>
                          <div className={classes.voteContainer}>
                            <IconButton
                              aria-label="Upvote"
                              onClick={handleUpvote.bind(
                                this,
                                recipe,
                                recipeVote
                              )}
                              className={classNames(classes.iconButton)}
                              disabled={upvoted(recipe)}
                            >
                              <Icon
                                className={classNames(
                                  classes.upvoteIcon,
                                  "fa fa-caret-up",
                                  upvoted(recipe) ? classes.upvoted : null
                                )}
                              />
                            </IconButton>
                            <Typography>{recipe.upvotes}</Typography>
                            <IconButton
                              aria-label="Downvote"
                              onClick={handleDownvote.bind(
                                this,
                                recipe,
                                recipeVote
                              )}
                              className={classNames(classes.iconButton)}
                              disabled={downvoted(recipe)}
                            >
                              <Icon
                                className={classNames(
                                  classes.downvoteIcon,
                                  "fa fa-caret-down",
                                  downvoted(recipe) ? classes.downvoted : null
                                )}
                              />
                            </IconButton>
                          </div>
                          <div className={classes.imageContainer}>
                            {recipe.images && !_.isEmpty(recipe.images) && (
                              <img
                                className={classes.image}
                                src={recipe.images[0]}
                              />
                            )}
                          </div>
                          <div className={classes.text}>
                            <Typography variant="subtitle1">
                              {recipe.createdAt}
                            </Typography>
                            <Typography>{recipe.title}</Typography>
                          </div>
                        </CardActionArea>
                      </Card>
                    </Link>
                  );
                });
              }
            }}
          </Query>
        );
      }}
    </Mutation>
  );
}
