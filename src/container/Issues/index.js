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
import { fetchOrderDetails } from "../api"

const tableHeaders = [
  { label: "Order ID", value: "order_id" },
  { label: "Reason", value: "date_and_time" },
  { label: "Is Resolved", value: "order_status" },
  { label: "Assigned To", value: "consumer_id" },
  { label: "Assigned Time", value: "consumer_name" },
  { label: "Issue Resolved Time", value: "consumer_name" },
  { label: "Issue Raised Time", value: "consumer_name" },
  { label: "Resolved By", value: "consumer_name" },
]

function Issues(props) {
  const pageLimit = 10
  const activePage = getQueryParamByName("activePage") || 1

  const [orderDetailsList, setOrderDetailsList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(activePage)
  const [count, setCount] = useState(0)
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState([""])

  const classes = useStyles()

  useEffect(() => {
    fetchOrderDetailsList()
  }, [pageNo])

  const handleRowClick = (data) => {
    location.href = `/home/order-details/${data.order_id}`
  }


   const fetchOrderDetailsList = () => {
    const payload = {
      pagination: {
        limit: pageLimit,
        offset: ((pageNo - 1) * parseInt(pageLimit)),
      },
      filter:{
        consumer_contact_number: "9566258767",
      }
    }

    setLoading(true)
    fetchOrderDetails(payload)
      .then((response) => {
        console.log("response from then", response.message)
        setLoading(false)
        setOrderDetailsList(response.order_details)
        setCount(response.count)
      })
      .catch((error) => {
        error.json().then((json) => {
          setLoading(false)
          setError(true)
          setErrorMessage(json.message)
        })
      })
  }

  const handlePageChange = (pageObj) => {
    setPageNo(pageObj.activePage)
    const queryParamsObj = {
      activePage: pageObj.activePage,
    }
    history.pushState(queryParamsObj, "issue listing", `/home/issue${getQueryUri(queryParamsObj)}`)
  }

  const handleClose = () => {
    setError(false)
  }

  return (
    <div id="Issues">
      <Paper className={classes.paper}>
        <Table tableHeaders={tableHeaders}>
          {
            !isLoading
              ? (
                orderDetailsList && orderDetailsList.map((data, index) => {
                  return (
                    <TableRow className={classes.tableRow} key={index} onClick={() => handleRowClick(data)}>
                      <TableCell component="th" scope="row" align="left">
                        <u>{data.order_id}</u>
                      </TableCell>
                      <TableCell align="left">{data.order_status}</TableCell>
                      <TableCell align="left">{data.consumer_id}</TableCell>
                      <TableCell align="left">{data.consumer_name}</TableCell>
                      <TableCell align="left">{Moment(data.date_and_time).format("DD/MM/YYYY h:mm A")}</TableCell>
                      <TableCell align="left">{Moment(data.date_and_time).format("DD/MM/YYYY h:mm A")}</TableCell>
                      <TableCell align="left">{Moment(data.date_and_time).format("DD/MM/YYYY h:mm A")}</TableCell>
                      <TableCell align="left">{data.consumer_name}</TableCell>
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
            !isLoading && orderDetailsList.length === 0 &&
            <tr>
              <td style={{ textAlign: "center", padding: "10px 0" }} colSpan='6'>
                <p style={{ fontWeight: "16px" }}>No records found</p>
              </td>
            </tr>
          }
        </Table>
        {
          orderDetailsList.length > 0 && !isLoading &&
          <Pagination
            activePage={parseInt(pageNo)}
            itemsCountPerPage={parseInt(pageLimit)}
            totalItemsCount={count}
            pageRangeDisplayed={5}
            setPage={handlePageChange}
          />
        }
        {
          isError &&
          <Notification
            message={errorMessage}
            messageType="error"
            open={isError}
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
  }
}))

export default Issues