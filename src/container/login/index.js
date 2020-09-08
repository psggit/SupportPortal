import React, { useState } from "react"
import "./login.scss"
import Icon from "Components/icon"
import TextField from "@material-ui/core/TextField"
import { makeStyles } from "@material-ui/core/styles"
import Button from "@material-ui/core/Button"
import clsx from "clsx"
import FormControl from "@material-ui/core/FormControl"
import { apiUrl } from "Utils/config"
import { validateEmail } from "Utils/validators"


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
  const initialState = {text: "", showText: false}
  const [errorFlag, setErrorFlag] = useState(false)
  const [email, setEmail] = useState("")
  const [emailErr, setEmailErr] = useState({ status: false, value: ""})
  const [message, setMessage] = useState(initialState)

  const handleEmailChange = (e) => {
    setEmailErr({ ...emailErr, status: false})
    setMessage(initialState)
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
      handleSendEmailClick(e)
  }

  const getRedirectUrl = () => {
    console.log("env", process.env.NODE_ENV)
    let redirectUrl = "";
    switch(process.env.NODE_ENV) {
      case 'local':
        redirectUrl = 'http://support-local.hipbar-dev.com:8001/home/dashboard'
      break;
      case 'development':
        redirectUrl = 'https://ts-support.hipbar-dev.com/home/dashboard'
      break;
      case 'production':
        redirectUrl = "https://support.hipbar.com/home/dashboard"
      break;
      default:
        console.log("Invalid env")
      break;
    }
    return redirectUrl;
  }

  const handleSendEmailClick = (e) => {
    e.preventDefault()
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
        // credentials: "include",
        body: JSON.stringify(payload)
      }
      fetch(`https://${apiUrl}/deliveryman/api/1/support/send-login-email`, fetchOptions)
        .then((response) => {
          if (response.status === 200) {
            response.json().then(json => {
              setMessage({
                ...message,
                text: json.message,
                showText: true
              })
            })
          } else {
            response.json().then(json => {
              setEmailErr({
                status: true,
                value: json.message
              })
            })
          }
          return
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
            //onKeyDown={handleKeyPress}
            onBlur={handleEmailBlur}
          />
          {
            message.showText &&
              <p style={{ color: "#00CC66", fontSize: "12px"}}>{message.text}</p>
          }
          </FormControl>

          <div className="submit">
            <Button
              variant="contained"
              color="primary"
              size="large"
              className={classes.buttonPrimary}
              disabled={email.trim().length === 0}
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