import React, { useState, useEffect } from "react"
import Table from "Components/table"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableLoadingShell from "Components/tableLoadingShell"
import Notification from "Components/notification"
import Paper from "@material-ui/core/Paper"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Pagination from "Components/pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import Moment from "moment"
import { fetchIssue,fetchSupportPersonList, assignTo, markResolve } from "../api"
import Button from "@material-ui/core/Button"
import Dialog from "./../../components/dialog/index"
import Select from '@material-ui/core/Select'


const tableHeaders = [
  { label: "Order ID", value: "order_id" },
  { label: "Reason", value: "reason" },
  { label: "Is Resolved", value: "is_resolved" },
  { label: "Issue Raised Time", value: "issue_raised_time" },
  { label: "Assigned To", value: "assigned_to" },
  { label: "Assigned To Name", value: "assigned_to_name" },
  { label: "Assigned Time", value: "assigned_time" },
  { label: "Resolved By", value: "resolved_by" },
  { label: "Resolved By Name", value: "resolved_by_name"},
  { label: "Issue Resolved Time", value: "resolved_time" },
  { label: "", value: "" },
  { label: "", value: "" },
]

function resolveIssue() {
  const pageLimit = 10
  const activePage = getQueryParamByName("activePage") || 1

  const [issueList, setIssueList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(activePage)
  const [count, setCount] = useState(0)
  const [message, setMessage] = useState("")
  const [showMessage, setShowMessage] = useState(false)
  const [showMountModal, setShowUnmountModal] = useState(false)
  const [supportPersonList, setSupportPersonList] = useState([])
  const [supportPersonIdx, setSupportPersonIdx] = useState(0)
  const [showAssign,setShowAssign] = useState(false)
  //const [issueDetails, setIssueDetails] = useState([])
  //const [showResolve, setShowResolve] = useState(false)

  const classes = useStyles()

  useEffect(() => {
    fetchIssueList()
  }, [pageNo])

  const handleRowClick = (data) => {
    location.href = `/home/order-details/${data.order_id}`
  }

  const fetchIssueList = () => { 
    const payload = {
      pagination: {
        limit: pageLimit,
        offset: ((pageNo - 1) * parseInt(pageLimit)),
      }
    }

    setLoading(true)
    fetchIssue(payload)
      .then((response) => {
        setLoading(false)
        setIssueList(response.issues)
        setShowAssign(response.to_show_assign)
        setCount(response.count)
        //setShowResolve(response.issues.map((item) => item.to_show_resolve))
        // setResolveIdx(response.issues.map((item) => item.id))
      })
      .catch((error) => {
        error.json().then((json) => {
          setLoading(false)
          setShowMessage(true)
          setMessage(json.message)
        })
      })
  }

  const handlePageChange = (pageObj) => {
    setPageNo(pageObj.activePage)
    const queryParamsObj = {
      activePage: pageObj.activePage,
    }
    history.pushState(queryParamsObj, "issue listing", `/home/resolveIssue${getQueryUri(queryParamsObj)}`)
  }

  const fetchSupportPerson = () => {
    fetchSupportPersonList()
      .then((response) => {
        setSupportPersonList(response.support_person)
      })
      .catch((err) => {
        console.log("Error in fetching support person list", err)
      })
  }

  const handleConfirm = () => {
    console.log("handle-confirm", issueDetails)
    unmountModal()
    const payload = {
      order_id: issueDetails.order_id,
      issue_id: issueDetails.id,
      agent_id: supportPersonList[supportPersonIdx].id
    }
    assignTo(payload)
      .then((response) => {
        setShowMessage(true)
        setMessage(response.message)
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
        })
      })
  }

  const handleResolve = (resolveDetails) => {
    console.log("handle-resolve", resolveDetails)
    const payload = {
      issue_id: resolveDetails.id
    }
    markResolve(payload)
      .then((response) => {
        setShowMessage(true)
        setMessage(response.message)
        setTimeout(() => {
          location.reload()
        }, 300)
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
        })
      })
  }

  const handleChange = (e) => {
    setSupportPersonIdx(e.target.value)
  }

  const handleAssignTo = (issueDetails) => {
    fetchSupportPerson()
    setIssueDetails(issueDetails)
    mountModal()
  }

  const handleClose = () => {
    setShowMessage(false)
  }

  const mountModal = () => {
    setShowUnmountModal(true)
  }

  const unmountModal = () => {
    setShowUnmountModal(false)
  }

  return (
    <div id="Issues">
      <Paper className={classes.paper}>
        <Table tableHeaders={tableHeaders}>
          {
            !isLoading
              ? (
                issueList && issueList.map((data, index) => {
                  return (
                    <TableRow className={classes.tableRow} key={index}>
                      <TableCell component="th" scope="row" align="left" onClick={() => handleRowClick(data)}>
                        <u>{data.order_id}</u>
                      </TableCell>
                      <TableCell align="left">{data.reason}</TableCell>
                      <TableCell align="left">{data.is_resolved ? "Yes" : "No"}</TableCell>
                      {/* <TableCell align="left">{Moment(data.issue_raised_time).format("DD/MM/YYYY h:mm A")}</TableCell> */}
                      <TableCell align="left">{data.issue_raised_time ? Moment(data.issue_raised_time).format("DD/MM/YYYY h:mm A") : "-" }</TableCell>
                      <TableCell align="left">{data.assigned_to}</TableCell>
                      <TableCell align="left">{data.assigned_to_name}</TableCell>
                      <TableCell align="left">{data.assigned_time ? Moment(data.assigned_time).format("DD/MM/YYYY h:mm A") : "-"}</TableCell>
                      <TableCell align="left">{data.resolved_by}</TableCell>
                      <TableCell align="left">{data.resolved_by_name}</TableCell>
                      <TableCell align="left">{data.resolved_time ? Moment(data.resolved_time).format("DD/MM/YYYY h:mm A") : "-"}</TableCell>
                      <TableCell>
                        {
                          showAssign &&
                          <div>
                            <Button
                              className={classes.assignButton}
                              variant="contained"
                              color="secondary"
                              onClick={() => handleAssignTo(data)}
                            >
                              Assign To
                            </Button>
                            {
                              showMountModal && (
                                <Dialog
                                  title="Reassign Retailer"
                                  actions={[
                                    <Button
                                      className={classes.button}
                                      variant="contained"
                                      color="secondary"
                                      onClick={handleConfirm}
                                    >
                                      Confirm
                                    </Button>,
                                    <Button
                                      className={classes.button}
                                      variant="contained"
                                      color="secondary"
                                      onClick={unmountModal}
                                    >
                                      Close
                                </Button>,
                                  ]}
                                >
                                  <form>
                                    <div className={classes.formRoot}>
                                      <label>Support Person List</label>
                                      <Select
                                        native
                                        className={classes.formControl}
                                        onChange={handleChange}
                                      >
                                        {
                                          supportPersonList.map((item, index) => {
                                            return <option key={index} value={index}>{item.username} - {item.id}</option>
                                          })
                                        }
                                      </Select>
                                    </div>
                                  </form>
                                </Dialog>
                              )
                            }
                          </div>
                        }
                      </TableCell>
                      <TableCell>
                        {
                          data.to_show_resolve &&
                          <div>
                            <Button
                              className={classes.assignButton}
                              variant="contained"
                              color="secondary"
                              onClick={() => handleResolve(data)}
                            >
                              Resolve
                          </Button>
                          </div>
                        }
                      </TableCell>
                    </TableRow>
                  )
                }))
              : (
                [1, 2, 3, 4, 5].map((item, i) => (
                  <TableLoadingShell key={i} />
                ))
              )
          }
          {
            !isLoading && issueList.length === 0 &&
            <tr>
              <td style={{ textAlign: "center", padding: "10px 0" }} colSpan='6'>
                <p style={{ fontWeight: "16px" }}>No records found</p>
              </td>
            </tr>
          }
        </Table>
        {
          issueList.length > 0 && !isLoading &&
          <Pagination
            activePage={parseInt(pageNo)}
            itemsCountPerPage={parseInt(pageLimit)}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            setPage={handlePageChange}
          />
        }
        {
          showMessage &&
          <Notification
            message={message}
            messageType="info"
            open={showMessage}
            handleClose={handleClose}
          />
        }
      </Paper>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  paper: {
    padding: 24,
  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px 0px",
    justifyContent: "space-between"
  },
  tableRow: {
    cursor: "pointer"
  },
  formRoot: {
    padding: 36
  },
  formControl: {
    width: "100%",
    marginBottom: 24
  },
  buttonPrimary: {
    background: "#000000",
    color: "#FFFFFF"
  },
  assignButton: {
    marginLeft: "10px",
    cursor: "pointer",
    marginTop: "10px",
    width:"105px",
    height:"35px"
  }
}))

export default resolveIssue