import React, { useEffect } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux'
import { fetchUsersList } from '../store/actions'
import Users from '../components/Users'
import Profile from '../components/Profile'
import { Switch, Route } from "react-router-dom";
import { Container, Grid, CircularProgress } from '@material-ui/core'
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    position: 'absolute',
    top: '47%'
  }
}));

function App(props) {
  const classes = useStyles(),
        { users, pages, user, isFetching } = props

  useEffect(() => {
    const { dispatch } = props,
          userName = props.history.location.pathname.slice(1)
    dispatch(fetchUsersList(userName))
  }, [props.location])

  return (
      <Container maxWidth="md">
      {isFetching && (!users && !user) &&
        <Grid
        container
        justify="center"
        alignItems="center"
        className={classes.root}>
          <CircularProgress />
        </Grid>}

      {(users && users.length > 0 || user) &&
          <Switch>
            <Route path="/:login" >
              <Profile user={user} />
            </Route>
            <Route path="/" >
              <Users users={users} pages={pages} />
            </Route>
          </Switch>
      }
      </Container>
    )
  }

  App.propTypes = {
    isFetching: PropTypes.bool.isRequired,
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.array,
    pages: PropTypes.number,
    user: PropTypes.object
  }

  function mapStateToProps(state) {
    const {pages, user, isFetching, users} = state.reducer.users ||
                                             state.reducer.user ||
              { pages: 1, user: null, isFetching: true, users: [] }

    return { pages, user, isFetching, users }
  }

  export default connect(mapStateToProps)(App)
