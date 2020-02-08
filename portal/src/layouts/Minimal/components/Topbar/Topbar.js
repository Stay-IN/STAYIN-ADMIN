import React from 'react';
import { Link as RouterLink } from 'react-router-dom';
import clsx from 'clsx';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/styles';
import { AppBar, Toolbar,Typography } from '@material-ui/core';

const useStyles = makeStyles(() => ({
  root: {
    boxShadow: 'none'
  }
}));

const Topbar = props => {
  const {title, className, ...rest } = props;

  const classes = useStyles();

  return (
    <AppBar
      {...rest}
      className={clsx(classes.root, className)}
      color="secondary"
      position="fixed"
    >
      <Toolbar>
        <RouterLink to="/" style={{textDecoration:"none",color:'white'}}>
        <Typography style={{color:'white'}} variant="h4">
            {title || 'STAYIN'}
          </Typography>
        </RouterLink>
      </Toolbar>
    </AppBar>
  );
};

Topbar.propTypes = {
  className: PropTypes.string
};

export default Topbar;
