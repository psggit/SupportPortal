import React from "react"
import Drawer from "@material-ui/core/Drawer"
import Divider from "@material-ui/core/Divider"
import List from "@material-ui/core/List"
import ListItem from "@material-ui/core/ListItem"
import ListItemIcon from "@material-ui/core/ListItemIcon"
import Icon from "./../icon"
import PropTypes from "prop-types"
import { fade, makeStyles } from "@material-ui/core/styles"
import Badge from '@material-ui/core/Badge';

const drawerWidth = 245

const defaultProps = {
  color: 'secondary',
};

const useStyles = makeStyles(theme => ({
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    zIndex: 0,
    top: "105px"
  },
  list: {
    paddingTop: "32px",
    lineHeight:"19px"
  },
  activeItem: {
    padding: "8px 24px",
    borderRadius:"20px",
    width:"224px",
    height:"46px",
    alignSelf:"center",
    border: "1px solid",
    marginBottom: "25px",
    marginLeft:"8px",
    // "&:hover": {
    //   backgroundColor:"#E0E0E0",
    //   border:"1px solid #E0E0E0"
    // },
    "&.active": {
      backgroundColor: "#E0E0E0",
      border: "1px solid #E0E0E0"
    }
  },
  drawerPaper: {
    width: drawerWidth,
    zIndex: 0,
    top: "105px"
  },
  label: {
    margin: "4px 0",
    fontSize: "15px",
    lineHeight: "19px"
  },
  footer: {
    position: "fixed",
    bottom: "0",
    padding: "0 24px",
    paddingBottom: "32px",
    "@media (max-height: 589px)": {
      display: "none"
    },
    "& p": {
      fontSize: "22px",
      margin: "0px",
      lineHeight: "27px",
      fontWeight: "600",
      textTransform: "uppercase",
      color: theme.palette.primary.main
    },
    "& p.version": {
      fontSize: "12px",
      lineHeight: "15px",
      textTransform: "lowercase",
      color: "rgba(0, 0, 0, 0.5)",
      fontStyle: "normal"
    }
  },
}))

function sidemenu({ menuItems,issueItems, currentRoute, history }) {
  console.log("menu", menuItems)
  const classes = useStyles()

  const checkActiveClass = (selectedRoute) => {
    if (currentRoute === selectedRoute) {
      return "active"
    }
    return undefined
  }

  const handleChangeRoute = (e, selectedRoute) => {
    e.preventDefault()
    console.log("route", selectedRoute)
    history.push(`/home/${selectedRoute}`)
  }

  return (
    <Drawer
      className={classes.drawer}
      variant="permanent"
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <List className={classes.list}>
        {menuItems.map((item, index) => (
          <ListItem
            button
            key={item.label}
            className={`${classes.activeItem} ${checkActiveClass(item.value)} `}
            onClick={(e) => { handleChangeRoute(e, item.value) }}
          >
            <ListItemIcon>
              <Icon name={`${item.icon}`} />
            </ListItemIcon>
            <span className={classes.label}>{item.label}</span>
          </ListItem>
        ))}
      </List>
      <Divider />
      <List>
        {issueItems.map((item, index) => (
          // <Badge badgeContent={99} {...defaultProps}>
          <ListItem
            button
            key={item.label}
            className={`${classes.activeItem} ${checkActiveClass(item.value)} `}
            onClick={(e) => { handleChangeRoute(e, item.value) }}
          >
            <ListItemIcon>
              <Icon name={`${item.icon}`} />
            </ListItemIcon>
            <span className={classes.label}>{item.label}</span>
          </ListItem>
          // </Badge>
        ))}
      </List>
      <div className={classes.footer}>
        <p>Hipbar</p>
        <p>Support</p>
        <p>Portal</p>
        <p className="version">version 1.0</p>
      </div>
    </Drawer>
  )
}

sidemenu.propTypes = {
  currentRoute: PropTypes.string,
  menuItems: PropTypes.array,
  supportMenuItems: PropTypes.array,
  menuItemsMap: PropTypes.object,
  history: PropTypes.object
}

export default sidemenu