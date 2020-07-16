
const otpRegex = /^\d{6}$/ 
const mobileNoRegex = /^[6789]\d{9}$/
//const emailRegex = /^(a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/
export const emailRegex = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/


export function validateNumberField({ fieldName, fieldValue }) {
  if (fieldValue && fieldValue.trim().length === 0) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (fieldName === "Mobile Number" && (isNaN(parseInt(fieldValue)) || !mobileNoRegex.test(fieldValue))) {
    return {
      status: true,
      value: `Enter a valid 10 digit ${fieldName}`
    }
  } else if (fieldName === "OTP" && (isNaN(parseInt(fieldValue)) || !otpRegex.test(fieldValue))) {
    return {
      status: true,
      value: `Enter a valid ${fieldName}`
    }
  }

  return {
    status: false,
    value: ""
  }
}

export function validateEmail(fieldName, fieldValue) {
  if (fieldValue && fieldValue.trim().length === 0) {
    return {
      status: true,
      value: `${fieldName} is required`
    }
  } else if (fieldName === "Email" && !emailRegex.test(fieldValue)) {
    return {
      status: true,
      value: `${fieldName} is invalid`
    }
  }
  return {
    status: false,
    value: ''
  }
}

