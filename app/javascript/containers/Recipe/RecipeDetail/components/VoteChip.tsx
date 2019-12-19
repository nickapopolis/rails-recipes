import * as React from 'react';
import {
  Chip,
  IconButton,
  Icon,
} from '@material-ui/core';
import {
  makeStyles,
  createStyles,
} from '@material-ui/styles';
import * as _ from 'lodash';

interface VoteChipProps {
  upvotes: number;
  downvotes: number;
}

export default function VoteChip({ upvotes, downvotes }: VoteChipProps) {
  function hasVotes() {
    return upvotes + downvotes > 0;
  }
  function percentageLikes() {
    return upvotes / (upvotes + downvotes);
  }
  function formatPercentage(percent: number) {
    return `${Math.floor(percent * 100)}%`;
  }
  function percentageLikesText() {
    if (hasVotes) {
      return formatPercentage(percentageLikes());
    }
    return '-';
  }

  return (
    <Chip
      icon={<Icon className="fa fa-thumbs-down"/>}
      deleteIcon={<Icon className="fa fa-thumbs-up"/>}
      label={percentageLikesText()}
      clickable
      onDelete={() => {}}
    />
  );
}
