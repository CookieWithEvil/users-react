import React, { useState, useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'

import { makeStyles } from '@material-ui/core/styles';
import List from '@material-ui/core/List';
import Button from '@material-ui/core/Button';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import { NavLink } from 'react-router-dom'
import Pagination from '@material-ui/lab/Pagination';
import { Paper, Divider, Grid, Avatar, ListItemText, ListItemSecondaryAction } from '@material-ui/core';


const useStyles = makeStyles((theme) => ({
  large: {
    width: theme.spacing(7),
    height: theme.spacing(7)
  },
  marginAuto: {
    margin: theme.spacing(5),
    justifyContent: 'center',
    display: 'flex'
  },
  marginAvatar: {
    margin: theme.spacing(3)
  },
  color: {
    color: '#000',
    textDecoration: 'none'
  },
  customButton: {
    borderRadius: '34px'
  }
}));

export default function Users(props){
  const [page, setPage] = useState(1)
  const [currentUsers, setUsers] = useState([])

  const sliceUsers = () => {
    const {users} = props;
    let currentUsers = users.slice((page - 1) * 10, page * 10);
    setUsers(currentUsers)
  }

  const classes = useStyles();

  useEffect(() => {
    sliceUsers();
  }, [page]);

  const handleChange = (event, value) => {
    setPage(value);
  };

    return (
      <Grid xs={12} item>
          <Grid xs={12} item>
            <Paper elevation={0}>
              <List>
                {currentUsers.map((post, i) => (
                  <Fragment key={i}>
                    <ListItem>
                      <NavLink to={`/${post.login}`} className={classes.aligh}>
                          <ListItemAvatar className={classes.marginAvatar}>
                            <Avatar src={post.avatar_url} alt="avatal" className={classes.large} />
                          </ListItemAvatar>
                      </NavLink>
                      <NavLink to={`/${post.login}`} className={classes.color}>
                          <ListItemText
                            primary={post.login}
                          />
                      </NavLink>
                        <ListItemSecondaryAction>
                        <Button className={classes.customButton} variant="outlined" href={post.html_url} target="_blank">PROFILE</Button>
                      </ListItemSecondaryAction>
                    </ListItem>

                    {i < currentUsers.length - 1 && <Divider />}
                  </Fragment>
                  )
                )}
                </List>
              </Paper>
            </Grid>

              <Pagination className={classes.marginAuto} size="large" count={props.pages} variant="outlined" page={page} onChange={handleChange} />
            </Grid>
    )
}

Users.propTypes = {
  users: PropTypes.array.isRequired
}
