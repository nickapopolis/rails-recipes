import * as React from 'react';
import Icon from '@material-ui/core/Icon';
import { Theme, Typography } from '@material-ui/core';
import classNames from 'classnames';
import { Mutation } from 'react-apollo';
import Dropzone from 'react-dropzone';
import gql from 'graphql-tag';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import { FormDetails } from '@shopify/react-form-state';
import { RecipeForm } from '../forms/RecipeForm';
import * as _  from 'lodash';

const useStyles = makeStyles((theme: Theme) => createStyles({
  recipeImageContainer: {
  },
  uploader: {
    border: '0.15rem dashed',
    color: 'grey',
    width: '100%',
    height: '100%',
    display: 'flex',
    alignItems: 'center',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: '0.4rem',
  },
  photoIcon: {
    fontSize: '4em',
  },
}));

const CREATE_RECIPE = gql`
  mutation CreateRecipe($input: RecipeCreateInput!) {
    recipeCreate(input: $input) {
      recipe{
        images
      }
      errors
    }
  }
`;

interface RecipeImagesProps{
  formDetails: FormDetails<RecipeForm>;
}
export default function RecipeImages(props:RecipeImagesProps) {
  const classes = useStyles({});
  const { formDetails } = props;
  const { fields } = formDetails;
  const { images } = fields;
  return (
    <Dropzone
      multiple={true} // Only upload 1 file
      onDrop={acceptedFiles => {
        console.log(acceptedFiles);
        images.onChange(acceptedFiles as any);
      }}
    >
      {({ getRootProps, getInputProps }) => (
        <section>
          <div {...getRootProps()}>
            <input {...getInputProps()} />
            <Icon className={classNames(classes.photoIcon, 'fa fa-cloud-upload-alt')}/>
             <Typography>Drop files to upload.</Typography>
          </div>
        </section>
      )}
    </Dropzone>
  );
}
