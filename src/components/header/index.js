import React, { useState } from "react"
import Icon from "../icon"
import { makeStyles } from "@material-ui/core/styles"
import AppBar from "@material-ui/core/AppBar"
import Toolbar from "@material-ui/core/Toolbar"
import Button from "@material-ui/core/Button"
import { NavLink } from 'react-router-dom'
import Dialog from "Components/dialog"
import { apiUrl } from "Utils/config"

const useStyles = makeStyles(theme => ({
  toolbar: {
    display: "flex",
    justifyContent: "space-between",
    padding: "15px 40px"
  },
  appBar: {
    zIndex: 1
  },
  text: {
    fontWeight: "500",
    fontSize: "18px",
    lineHeight: "22px",
    marginTop: "4px",
    color: "#fff"
  },
  logoutSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    cursor: "pointer"
  },
  buttonPrimary: {
    background: "#000000",
    color: "#FFFFFF",
    '&:hover': {
      background: "#000000"
    }
  },
  account:{
    display:"flex",
    alignItems: "center",
  },
  myaccount:{
    cursor: "pointer",
    marginRight: "50px"
  }
}))

function header() {
  const classes = useStyles()
  const [showLogoutModal, setShowLogoutModal] = useState(false)

  const logout = () => {

    const fetchOptions = {
      method: "get",
      credentials: "include",
      headers: {
        "x-hasura-role": `${localStorage.getItem("x-hasura-role")}`
      }
    }

    fetch(`https://${apiUrl}/deliveryman/api/1/support/logout`, fetchOptions)
      .then((response) => {
        if (response.status !== 200) {
          console.log(`Looks like there was a problem. Status Code: ${response.status}`)
          localStorage.clear()
          location.href = '/login'
          return
        }
        response.json().then((data) => {
          localStorage.clear()
          location.href = '/login'
        })
      })
      .catch((err) => {
        console.log('Fetch Error :-S', err)
        localStorage.clear()
        location.href = '/login'
      })
  }

  const unmountModal = () => {
    setShowLogoutModal(false)
  }

  const mountModal = () => {
    setShowLogoutModal(true)
  }

  return (
    <div>
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar className={classes.toolbar}>
          <div>
            <NavLink to={`/home/orders`}><Icon name="headerHipbarLogo" /></NavLink>
          </div>
          <div className={classes.account}>
            {/* <div className={classes.myaccount}>
              <Icon name="logout" />
              <p className={classes.text}>My Account</p>
            </div> */}
            <div className={classes.logoutSection} onClick={mountModal}>
              <Icon name="logout" />
              <p className={classes.text}>Logout</p>
            </div>
          </div>
        </Toolbar>
      </AppBar>
      {showLogoutModal && (
        <Dialog
          title="Confirm Logout"
          subtitle="Are you sure you want to log out?"
          actions={[
            <Button onClick={logout} className={classes.buttonPrimary} color="primary" key={1} autoFocus>
              Yes
            </Button>,
            <Button onClick={unmountModal} className={classes.buttonPrimary} key={2} color="primary">
              No
            </Button>
          ]}
        />
      )}
    </div>
  )
}

export default header