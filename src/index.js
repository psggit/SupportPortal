import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router"
import { createSession } from "Utils/session"
import { Route, Switch } from "react-router-dom"
import { createBrowserHistory as createHistory } from "history"
import "Sass/app.scss"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import Login from "Container/login/index"
import { authUrl } from "Utils/config"
import Orders from "Container/orders"
import CssBaseline from "@material-ui/core/CssBaseline"
import Header from "Components/header"
import Sidemenu from "Components/sidemenu"
import { menuItemsMap, menuItems } from "Components/constant/navbar-items"
import OrderDetail from "Container/orderDetail"
import Dashboard from "Container/dashboard"
import OrderList from "Container/order-list"

const history = createHistory()
const theme = createMuiTheme({
  palette: {
    primary: {
      //light: "#6676c1",
      main: "#424242",
      dark: "#2c3a7c",
      contrastText: "#fff",
    },
    secondary: {
      //light: "#ed9638",
      main: "#212121",
      dark: "#212121",
      contrastText: "#fff",
    },
  },
  typography: {
    fontFamily: [
      "Mali"
      // "Cabin",
      // "BlinkMacSystemFont",
      // '"Segoe UI"',
      // '"Helvetica Neue"',
      // "Arial",
      // "sans-serif",
      // '"Apple Color Emoji"',
      // '"Segoe UI Emoji"',
      // '"Segoe UI Symbol"',
    ].join(","),
  },
})

const useStyles = makeStyles(theme => ({
  content: {
    position: "relative",
    top: "105px",
    padding: "50px 64px",
    marginLeft: "245px",
    backgroundColor: "#EEEEEE",
    height: "calc(100vh - 105px)",
    overflow: "auto"
  },
}))

function App() {
  const classes = useStyles()

  const [currentRoute, setCurrentRoute] = useState(location.pathname.split("/")[2] || "")
  const [key, setKey] = useState(0)
  const [isLoggedIn, setIsLoggedIn] = useState(localStorage.getItem("hasura-id") ? true : false)
  // const [isLoggedIn, setIsLoggedIn] = useState(true)

  useEffect(() => {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      // 'x-hasura-role': 'support_person'
    }
    fetch(`https://${authUrl}/user/account/info`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          if (location.pathname !== '/login') {
            location.href = '/login'
          }
          return
        }
        response.json().then((data) => {
          createSession(data)
          setIsLoggedIn(true)
          if (!location.pathname.includes('home')) {
            location.href = '/home/dashboard'
          }
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        if (location.pathname !== '/login') {
          location.href = '/login'
        }
      })
  }, [])

  useEffect(() => {
    history.listen((location) => {
      const newRoute = location.pathname.split("/")[2]
      setKey(key + 1)
      setCurrentRoute(newRoute)
    })
  }, [])

  return (
    <ThemeProvider theme={theme}>
      <Router history={history} >
        <Route exact path="/login" component={Login} />
        {
          isLoggedIn && location.pathname.includes("home") &&

          <div>
            <CssBaseline />
            <Header
              isLoggedIn={isLoggedIn}
              history={history}
            />
            <Sidemenu
              history={history}
              menuItems={menuItems}
              menuItemsMap={menuItemsMap}
              currentRoute={currentRoute}
            />
            <Switch>
              <div className={classes.content}>
                <Route
                  exact
                  path="/home/orders"
                  render={
                    props => (
                      <Orders {...props} />
                    )
                  }
                />
                <Route
                  exact
                  path="/home/order-details/:orderId"
                  render={
                    props => (
                      <OrderDetail {...props} />
                    )
                  }
                />
                <Route
                  exact
                  path="/home/dashboard"
                  render={
                    props => (
                      <Dashboard {...props} />
                    )
                  }
                />
                <Route
                  exact
                  path="/home/order-list"
                  render={
                    props => (
                      <OrderList {...props} />
                    )
                  }
                />
              </div>
            </Switch>
          </div>
        }
      </Router>
    </ThemeProvider>

  )
}

ReactDOM.render(<App />, document.getElementById("app"))

export default App