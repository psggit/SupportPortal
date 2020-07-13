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
import OrderModification from "Container/orderModification"
import ResolveIssue from "Container/resolveIssue"
import { markActivity } from "Container/api"

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

const menuListItems = [
  { label: "Resolve Issue", value: "resolveIssue", icon: "dashboard" }
]

function App() {
  const classes = useStyles()

  const [currentRoute, setCurrentRoute] = useState(location.pathname.split("/")[2] || "")
  const [key, setKey] = useState(0)
  const [menuList, setMenuList] = useState(menuListItems)
  const [timeInterval, setTimeInterval] = useState(5000)
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

  const markLastActivity = () => {
    markActivity()
      .then((response) => {
        localStorage.setItem('issues_to_resolve_count',response.count)
        setTimeInterval(parseInt(response.interval) * 1000)
        console.log(response.count)
      })
      .catch((err) => {
        console.log("Error in fetching Delivery Agent list", err)
      })
  }

  useEffect(() => {
    document.title = `${document.title.split("(")[0]} ${localStorage.getItem("issues_to_resolve_count") > 0 ? `(${localStorage.getItem("issues_to_resolve_count")})` : ``}`
    const modifiedMenuList = [
      { label: `Resolve Issue ${localStorage.getItem("issues_to_resolve_count") > 0 ? `(${localStorage.getItem("issues_to_resolve_count")})` : ``}`, value: "resolveIssue", icon: "dashboard" }
    ]
    setMenuList(modifiedMenuList)
    const interval = setInterval(() => {
      pollRequest()
    }, timeInterval);
    return () => clearInterval(interval);
  }, [timeInterval]);

  function pollRequest() {
    if (!document.hidden && isLoggedIn) {
      markLastActivity()
    }
  }

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
              timer={timeInterval}
              history={history}
              menuItems={menuItems}
              menuItemsMap={menuItemsMap}
              currentRoute={currentRoute}
              issueItems={menuList}

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

                <Route
                  exact
                  path="/home/orderModification"
                  render={
                    props => (
                      <OrderModification {...props} />
                    )
                  }
                />

                <Route
                  exact
                  path="/home/resolveIssue"
                  render={
                    props => (
                      <ResolveIssue {...props} />
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