import React, { useState, useEffect } from "react"
import ReactDOM from "react-dom"
import { Router } from "react-router"
import { createSession } from "./utils/session"
import { Route, Switch } from "react-router-dom"
import { createBrowserHistory as createHistory } from "history"
import "./sass/app.scss"
import { createMuiTheme, ThemeProvider } from "@material-ui/core/styles"
import { makeStyles } from "@material-ui/core/styles"
import Login from "./container/login/index"
import { authUrl } from "./utils/config"

const history = createHistory()
const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#6676c1",
      main: "#4054B2",
      dark: "#2c3a7c",
      contrastText: "#fff",
    },
    secondary: {
      light: "#ed9638",
      main: "#E97C07",
      dark: "#a35604",
      contrastText: "#000",
    },
  },
  typography: {
    fontFamily: [
      "Cabin",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
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

  useEffect(() => {
    const fetchOptions = {
      method: 'get',
      credentials: 'include',
      mode: 'cors',
      //'x-hasura-role': 'account_manager'
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
            location.href = '/home/orders'
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
    // if (!localStorage.getItem("hasura-id") && !location.pathname.includes("login")) {
    //   window.location.href = "/login"
    // } else if (localStorage.getItem("hasura-id") && !location.pathname.includes("/home")) {
    //   window.location.href = "/home/overview"
    // }
    console.log("key", key)
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
      </Router>
    </ThemeProvider>
  )
}

ReactDOM.render(<App />, document.getElementById("app"))

export default App