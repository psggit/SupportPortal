import React, { useState, useEffect } from "react"
import Table from "Components/table"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import TableLoadingShell from "Components/tableLoadingShell"
import Notification from "Components/notification"
import Paper from "@material-ui/core/Paper"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Orders from "../mock-data"
import Pagination from "Components/pagination"
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "Utils/helpers"
import Moment from "moment"
import {fetchOrderDetails} from "../api"

const tableHeaders = [
  { label: "Order ID", value: "order_id" },
  { label: "Date & Time", value: "date_and_time" },
  { label: "Order Status", value: "order_status" },
  { label: "Consumer ID", value: "consumer_id" },
  { label: "Consumer Name", value: "consumer_name" },
  { label: "Consumer Mobile", value: "consumer_contact_number" },
  { label: "Retailer ID", value: "retailer_id" },
  { label: "Retailer Name", value: "retailer_name" },
  { label: "Delivery Agent", value: "delivery_agent_name" },
  { label: "City", value: "city" },
  { label: "Assigned To", value: "support_assigned_to" }
]

function OrderList(props) {
  const pageLimit = 5
  const activePage = getQueryParamByName("activePage") || 1

  const [orderDetailsList, setOrderDetailsList] = useState([])
  const [isLoading, setLoading] = useState(false)
  const [pageNo, setPageNo] = useState(activePage)
  const [count, setCount] = useState(0)
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const [appliedFilters, setAppliedFilters] = useState(getQueryParamByName('filter') ? JSON.parse(decodeURI(getQueryParamByName('filter'))) : {})
 
  const classes = useStyles()

  useEffect(() => {
    fetchOrderDetailsList()
  }, [pageNo])

  const handleRowClick = (data) => {
    location.href = `/home/order-details/${data.order_id}`
  }

  const getFilterOptions = () => {
    const data = props.location.state
    let payload = {}

    switch(data.filter_by) {
      case 'consumer_details':
        payload = {
          consumer_contact_number: data.consumer_contact_number ? data.consumer_contact_number : "",
          consumer_id: data.consumer_id ? data.consumer_id : "",
          order_id: data.order_id ? data.order_id : ""
        }
      break;

      case 'delivery_agent_details':
        payload = {
          delivery_agent_contact_number: data.delivery_agent_contact_number ? data.delivery_agent_contact_number : "",
          delivery_agent_id: data.delivery_agent_id ? data.delivery_agent_id : ""
        }
      break;

      case 'retailer_details':
        payload = {
          retailer_contact_number: data.retailer_contact_number ? data.retailer_contact_number : "",
          retailer_id: data.retailer_id ? data.retailer_id : "",
          retailer_qr_code: data.retailer_qr_code ? data.retailer_qr_code : ""
        }
      break;
    }

    setAppliedFilters(payload)
    return payload
  }

  const fetchOrderDetailsList = () => {
    const payload = {
      pagination: {
        limit: pageLimit,
        offset: ((pageNo - 1) * parseInt(pageLimit)),
      },
      filter: window.location.search.length > 0 ? appliedFilters : getFilterOptions()
    }

    setLoading(true)
    fetchOrderDetails(payload)
      .then((response) => {
        console.log("response", response)
        setLoading(false)
        setOrderDetailsList(response.order_details)
        setCount(response.count)
      })
      .catch((json) => {
        setLoading(false)
        setError(true)
        setErrorMessage("Error in fetching Orders list")
      })
  }

  const handlePageChange = (pageObj) => {
    setPageNo(pageObj.activePage)
    const queryParamsObj = {
      activePage: pageObj.activePage,
      filter: JSON.stringify(appliedFilters)
    }
    history.pushState(queryParamsObj, "order listing", `/home/order-list${getQueryUri(queryParamsObj)}`)
  }

  const handleClose = () => {
    setError(false)
  }

  return (
    <div id="Orders">
      <Paper className={classes.paper}>
        <Table tableHeaders={tableHeaders}>
          {
              !isLoading
                ? (
                   orderDetailsList && orderDetailsList.map((data, index) => {
                    return (
                      <TableRow className={classes.tableRow} key={index} onClick={() => handleRowClick(data)}>
                        <TableCell component="th" scope="row" align="left">
                          {data.order_id}
                        </TableCell>
                        <TableCell align="left">{Moment(data.date_and_time).format("DD/MM/YYYY h:mm A")}</TableCell>
                        <TableCell align="left">{data.order_status}</TableCell>
                        <TableCell align="left">{data.consumer_id}</TableCell>
                        <TableCell align="left">{data.customer_name}</TableCell>
                        <TableCell align="left">{data.customer_contact_number}</TableCell>
                        <TableCell align="left">{data.retailer_id}</TableCell>
                        <TableCell align="left">{data.retailer_name}</TableCell>
                        <TableCell align="left">{data.delivery_agent_name}</TableCell>
                        <TableCell align="left">{data.city}</TableCell>
                        <TableCell align="left">{data.support_assigned_to}</TableCell>
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
}))

export default OrderList