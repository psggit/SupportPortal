import React, { useState, useEffect, useRef } from "react"
import "./login.scss"
import Icon from "Components/icon"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import IconButton from "@material-ui/core/IconButton"
import clsx from "clsx"
import OutlinedInput from "@material-ui/core/OutlinedInput"
import InputLabel from "@material-ui/core/InputLabel"
import InputAdornment from "@material-ui/core/InputAdornment"
import FormHelperText from "@material-ui/core/FormHelperText"
import FormControl from "@material-ui/core/FormControl"
import Visibility from "@material-ui/icons/Visibility"
import VisibilityOff from "@material-ui/icons/VisibilityOff"
import { validateNumberField } from "Utils/validators"
import { apiUrl } from "Utils/config"
import { validateEmail } from "../../utils/validators"



const useStyles = makeStyles(theme => ({
  form: {
    "& > .input-field": {
      marginBottom: "40px",
      fontSize: "16"
    },
    "& > .input-field input": {
      padding: "18.5px 50px"
    },
    "& > .input-field label.MuiInputLabel-shrink": {
      paddingLeft: "0px",
      paddingRight: "0px"
    },
    "& > .input-field .Mui-focused fieldset legend": {
      width: "86px !important"
    },

  },
  textField: {
    marginBottom: "40px"
  },
  buttonPrimary: {
    background: "#000000",
    color: "#FFFFFF",
    '&:hover': {
      background: "#000000"
    }
  },
  note: {
    margin: 0
  }
}))

function login() {
  const classes = useStyles()
  const [errorFlag, setErrorFlag] = useState(false)
  const [email,setEmail] = useState("")
  const [emailErr, setEmailErr] = useState({ status: false, value: ""})
  //const [enableLogin, setEnableLogin] = useState(false)
  // const [isError, setError] = useState(false)
  // const [errorMessage, setErrorMessage] = useState([""])


  const handleEmailChange = (e) => {
    setEmailErr({ ...emailErr, status: false})
    setErrorFlag(false)
    setEmail(e.target.value)
    
  }

  const inputNameMap = {
   email: "Email"
  }

  const validateFormField = (item) => {
    const errorObj = validateEmail({
      fieldName: item.name,
      fieldValue: item.value
    })
    return errorObj
  }

  const getInputTags = (fieldName) => {
    const formEl = document.getElementById("login")
    const inputCollection = formEl.getElementsByTagName("input")
    const inputsArr = Array.prototype.slice.call(inputCollection)
    const textInputs = inputsArr.filter(item => item.name == fieldName)
    textInputs.forEach(item => {
      console.log("errobj", errorObject)
      let errorObject = validateFormField({
        name: inputNameMap[item.name],
        value: item.value
      })
      if (errorObject.status) {
        setErrorFlag(true)
      }
      if (item.name === "email") {
        setEmailErr({
          ...emailErr, status: errorObject.status, value: errorObject.value
        })
      }
    })
  }

  const handleEmailBlur = () => {
    getInputTags("email")
     
  }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13)
      handleSendEmailClick()
  }

  const getRedirectUrl = () => {
    console.log("env", process.env.NODE_ENV)
    let redirectUrl = "";
    switch(process.env.NODE_ENV) {
      case 'local':
        redirectUrl = 'http://support-local.hipbar-dev.com:8001/home'
      break;
      case 'development':
        redirectUrl = 'https://ts-support.hipbar-dev.com/home'
      break;
      case 'production':
        redirectUrl = "https://ts-support.hipbar.com/home"
      break;
      default:
        console.log("Invalid env")
      break;
    }
    return redirectUrl;
  }

  const handleSendEmailClick = () => {
     //e.preventDefault()
    if (!errorFlag) {
      const payload = {
        email_id: email,
        redirect_url: getRedirectUrl()
      }
      const fetchOptions = {
        method: "post",
        headers: {
          "Accept": "application/json",
          "Content-Type": "application/json"
        },
        credentials: "include",
        body: JSON.stringify(payload)
      }
      fetch(`https://${apiUrl}/deliveryman/api/1/support/send-login-email`, fetchOptions)
        .then((response) => {
          if (response.status !== 200 || response.status === 200) {
            response.json().then(json => {
              setEmailErr({
                status: true,
                value: json.message
              })
            })
            return
          }
        })
        .catch((error) => {
          error.json().then((json) => {
            setEmailErr({
              status: true,
              value: error.message
            })
          })
          
          console.log("Error in logging in", error, error.message)
        })
    }
  }

  return (
    <div id="login">
      <div className="logo">
        <Icon name="hipbarLogo" />
      </div>
      <h2>Support Portal</h2>
      <div className="form-container">
        <form className={classes.form}>
          <FormControl className={clsx(classes.textField)} variant="outlined">
          <TextField
            id="outlined-required"
            className="input-field"
            autoComplete="off"
            label="Email"
            name="email"
            value={email}
            helperText={emailErr.status ? emailErr.value : ""}
            error={emailErr.status}
            variant="outlined"
            onChange={(e) => handleEmailChange(e)}
            onKeyDown={handleKeyPress}
            onBlur={handleEmailBlur}
          />
          </FormControl>

          <div className="submit">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonPrimary}
             // disabled={!enableLogin}
              onClick={(e) => handleSendEmailClick(e)}
            >
              Send Login Email
            </Button>
          </div>          
        </form>
      </div>
      <p className={classes.note}>Having trouble? Contact Support at <a href="mailto:support@hipbar.com">support@hipbar.com</a></p>
    </div>
    
  )
}

export default login