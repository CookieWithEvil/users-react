import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import PropTypes from 'prop-types'
import { Paper, Avatar, Grid, Typography } from '@material-ui/core'

const useStyles = makeStyles((theme) => ({
  root: {
    marginTop: theme.spacing(10)
  },
  grid: {
    margin: `0 ${theme.spacing(1)} ${theme.spacing(1)}`
  },
  avatar: {
    width: theme.spacing(12),
    height: theme.spacing(12),
    marginLeft: theme.spacing(2)
  }
}));

export default function Profile(props){
  const user = props.user;
  const classes = useStyles()
  const convertDate = () => {
    const date = new Date(props.user.created_at);
    return `${date.getDate()}/${date.getMonth()}/${date.getFullYear()}`;
  }

    return user ? (
      <Paper elevation={0} className={classes.root}>
      <Grid
        container
        direction="row"
        justify="center"
        alignItems="center"
        spacing={3}
        className={classes.rid}
        >
        <Grid item xs={3}>

          <Avatar src={user.avatar_url} alt="avatar" className={classes.avatar}/>
        </Grid>

        <Grid item xs={9}>
          <Typography variant="h5" gutterBottom>
            {user.name}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            {user.company} {user.location}
          </Typography>
          <Typography variant="subtitle2" color="textSecondary" gutterBottom>
            From {convertDate()}
          </Typography>
        </Grid>

      </Grid>
      </Paper>
    ) : null
}

Profile.propTypes = {
  user: PropTypes.object
}
