import React from "react"
import Dialog from "@material-ui/core/Dialog"
import DialogActions from "@material-ui/core/DialogActions"
import DialogContent from "@material-ui/core/DialogContent"
import DialogContentText from "@material-ui/core/DialogContentText"
import DialogTitle from "@material-ui/core/DialogTitle"
import { makeStyles } from "@material-ui/core/styles"
import PropTypes from "prop-types"

const useStyles = makeStyles(theme => ({
  dialogBody: {
    padding: 36,
    fontWeight: "normal",
    fontSize: "16px",
    lineHeight: "19px",
    margin: "0"
  },
  dialogTitle: {
    padding: "36px 36px 0 36px",
    fontWeight: "600",
    '& h2': {
      fontSize: 22,
      color: "#212121",
      fontWeight: 600
    }
  },
  dialogContent: {
    padding: 0,
    width: "100%"
  },
  dialogFooter: {
    padding: "0 24px 24px 24px"
  },
}))

function dialog(props) {
  const classes = useStyles()
  return (
    <Dialog
      open={true}
      key={0}
      // onClose={handleClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <div style={{ width: "492px" }}>
        <DialogTitle id="alert-dialog-title" className={classes.dialogTitle}>{props.title}</DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {/* <DialogContentText id="alert-dialog-description" className={classes.dialogBody}>
            {props.subtitle}
          </DialogContentText> */}
          {props.children}
        </DialogContent>
        <DialogActions className={classes.dialogFooter}>
          {props.actions.map(item => item)}
        </DialogActions>
      </div>
    </Dialog>
  )
}

dialog.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  actions: PropTypes.array
}

export default dialog