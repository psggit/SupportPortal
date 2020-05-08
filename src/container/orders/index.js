import React, { useState, useEffect } from "react"
import Table from "./../../components/table"
import TableRow from "@material-ui/core/TableRow"
import TableCell from "@material-ui/core/TableCell"
import InputBase from "@material-ui/core/InputBase"
import SearchIcon from "@material-ui/icons/Search"
import CrossIcon from "@material-ui/icons/HighlightOff"
import TextField from "@material-ui/core/TextField"
import Autocomplete from "@material-ui/lab/Autocomplete"
import TableLoadingShell from "./../../components/tableLoadingShell"
import Tabs from "@material-ui/core/Tabs"
import Tab from "@material-ui/core/Tab"
import Paper from "@material-ui/core/Paper"
import { makeStyles, withStyles } from "@material-ui/core/styles"
import Orders from "./../mock-data"
import custom from "./../mock-data2"
import Pagination from "./../../components/pagination"
import { NavLink } from 'react-router-dom'
import { getOffsetUsingPageNo, getQueryParamByName, getQueryUri } from "./../../utils/helpers"
//import Moment from "moment"


const tableHeaders = [
  { label: "Order ID", value: "order_id" },
  { label: "Date & Time", value: "date_and_time" },
  { label: "Order Status", value: "cust_status" },
  { label: "Consumer ID", value: "customer_id" },
  { label: "Consumer Name", value: "cust_name" },
  { label: "Consumer Mobile", value: "cust_status" },
  { label: "Retailer ID", value: "retailer_id" },
  { label: "Retailer Name", value: "retailer_name" },
  { label: "Delivery Agent", value: "delivery_agent_id" },
  { label: "City", value: "city" },
  { label: "Assigned To", value: "assigned_to" }
]

console.log("check-data11", Orders.data, "count", Orders.count, "custom", custom.data, "data", Orders)

function orders() {
  const pageLimit = 3
  const activePage = getQueryParamByName("activePage") || 1
  const [selectedTab, setSelectedTab] = useState(activeTab === 0 ? custom.data : Orders.data)
  const [isLoading, setLoading] = useState(false)
  const [activeTab, setActiveTab] = useState(0)
  const [pageNo, setPageNo] = useState(activePage)
  const [count, setCount] = useState(activeTab === 0 ? custom.count : Orders.count)
  const [filterField, setFilterField] = useState("")
  const [filterValue, setFieldValue] = useState("")
  const [isError, setError] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")

  const classes = useStyles()

  const searchOptions = [
    { title: "Order ID", value: "order_id" },
    { title: "Customer ID", value: "customer_id" },
    { title: "Order Status", value: "order_status" },
  ]

  useEffect(() => {
    let timeFrame = ""

    switch (activeTab) {
      case 0:
        timeFrame = "today"
        break
      case 1:
        timeFrame = "custom_date"
        break
    }
  }, [activeTab])

  const fetchOrderList = () => {
    setData(Orders.data)
    //console.log("pageno", pageNo, ((pageNo - 1) * parseInt(pageLimit)).toString())
    // const payload = {
    //   limit: pageLimit.toString(),
    //   offset: ((pageNo - 1) * parseInt(pageLimit)).toString(),
    //   search_by: filterValue && filterValue.trim().length > 0 ? filterField : "",
    //   search_attribute: filterValue && filterValue.trim().length > 0 ? filterValue : ""
    // }
    // setLoading(true)
    // fetchOrderList(payload)
    //   .then((response) => {
    //     //console.log("response", response)
    //     //let selectedTab = getFormattedList({timeFrame: timeFrame, data: response.data})
    //     setLoading(false)
    //     setSelectedTab(response.data)
    //     setCount(response.count)
    //   })
    //   .catch((json) => {
    //     setLoading(false)
    //     setError(true)
    //     setErrorMessage("Error in fetching Orders list")
    //   })
  }

  const handleChange = (event, value) => {
    setActiveTab(value)
    resetValues()
    if(activeTab === 1) {
      setSelectedTab(Orders.data)
    } else {
      setSelectedTab(custom.data)
    }
   }

  const resetValues = () => {
    setPageNo(0)
    setCount(0)
    setSelectedTab([])
    setFilterField("")
    setFieldValue("")
  }

  const handleSearchChange = (event, option) => {
    console.log("select change", option)
    setFilterField(option.value)
    setFieldValue("")
  }

  const handleTextChange = (event) => {
    setFieldValue(event.target.value)
    console.log("text change", event.target.value)
  }

  // const resetFilterValue = (event) => {
  //   setFieldValue("")
  // } 

  const handlePageChange = (pageObj) => {
    console.log("offset", pageObj.offset, "activepage", pageObj.activePage, "pagelimit", ((pageNo - 1) * parseInt(pageLimit)).toString())
    setPageNo(pageObj.activePage)
    const queryParamsObj = {
      activePage: pageObj.activePage
    }
    history.pushState(queryParamsObj, "order listing", `/home/orders${getQueryUri(queryParamsObj)}`)
  }
   
  const handlePress = (event) => {
    if (event.keyCode === 13) {
      const queryParamsObj = {
        activePage: 0
      }
      setPageNo(0)
      history.pushState(queryParamsObj, "order listing", `/home/orders${getQueryUri(queryParamsObj)}`)
      //fetchOrderList()
    }
  }

  const handleClose = () => {
    setError(false)
  }

  return (
    <div id="Orders">
      <Paper className={classes.paper}>
        <div className={classes.header}>
          <Tabs
            value={activeTab}
            indicatorColor="secondary"
            onChange={handleChange}
            aria-label="disabled tabs example"
          >
            <AntTab label="Today" />
            <AntTab label="Custom Date" />
          </Tabs>
          <div className={classes.searchbox}>
            <Autocomplete
              id="combo-box-demo"
              options={searchOptions}
              className={classes.autocomplete}
              onChange={handleSearchChange}
              getOptionLabel={option => option.title}
              style={{ width: 200 }}
              renderInput={params => (
                <TextField {...params} label="Search By" variant="outlined" fullWidth />
              )}
            />
            {
              filterField.length > 0 &&
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search Entry"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  value={filterValue}
                  onChange={handleTextChange}
                  onKeyDown={handlePress}
                  inputProps={{ "aria-label": "search" }}
                />
                {
                  filterValue.length > 0 &&
                  <div className={classes.crossIcon} onClick={resetValues}>
                    <CrossIcon />
                  </div>
                }
              </div>
            }
          </div>
        </div>
        {
          activeTab === 0 && 
          <Table tableHeaders={tableHeaders}>
            {
              !isLoading
                ? (
                  selectedTab && selectedTab.map((data, index) => {
                    return (
                      <TableRow className={classes.tableRow} key={index}>
                        <TableCell component="th" scope="row" align="left">
                          {<NavLink to={`/home/order-detail`}>{data.order_id}</NavLink>}
                        </TableCell>
                        {/* <TableCell align="left">{Moment(data.date_and_time).format("DD/MM/YYYY h:mm A")}</TableCell> */}
                        <TableCell align="left">{data.cust_status}</TableCell>
                        <TableCell align="left">{data.customer_id}</TableCell>
                        <TableCell align="left">{data.cust_name}</TableCell>
                        <TableCell align="left">{data.delivery_agent_id}</TableCell>
                        <TableCell align="left">{data.retailer_id}</TableCell>
                        <TableCell align="left">{data.retailer_name}</TableCell>
                        <TableCell align="left">{data.paid_amount}</TableCell>
                        <TableCell align="left">{data.city}</TableCell>
                        <TableCell align="left">{data.assigned_to}</TableCell>
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
              !isLoading && selectedTab.length === 0 &&
              <tr>
                <td style={{ textAlign: "center", padding: "10px 0" }} colSpan='6'>
                  <p style={{ fontWeight: "16px" }}>No records found</p>
                </td>
              </tr>
            }
          </Table>
        }
        {
          activeTab === 1 &&
          <Table tableHeaders={tableHeaders}>
            {
              !isLoading
                ? (
                  selectedTab && selectedTab.map((data, index) => {
                    return (
                      <TableRow className={classes.tableRow} key={index}>
                        <TableCell component="th" scope="row" align="left">
                          {<NavLink to={`/home/order-detail`}>{data.order_id}</NavLink>}
                        </TableCell>
                        <TableCell align="left">{data.cust_name}</TableCell>
                        <TableCell align="left">{data.customer_id}</TableCell>
                        <TableCell align="left">{data.cust_status}</TableCell>
                        <TableCell align="left">{data.city}</TableCell>
                        <TableCell align="left">{data.delivery_agent_id}</TableCell>
                        <TableCell align="left">{data.DA_vehical_no}</TableCell>
                        <TableCell align="left">{data.retailer_id}</TableCell>
                        <TableCell align="left">{data.paid_amount}</TableCell>
                        <TableCell align="left">{data.assigned_to}</TableCell>
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
              !isLoading && selectedTab.length === 0 &&
              <tr>
                <td style={{ textAlign: "center", padding: "10px 0" }} colSpan='6'>
                  <p style={{ fontWeight: "16px" }}>No records  found</p>
                </td>
              </tr>
            }
          </Table>
        }
        {
          //Orders.data.length > 0 && !isLoading &&
          selectedTab.length > 0  && !isLoading &&
            <Pagination
              activePage={parseInt(pageNo)}
              itemsCountPerPage={parseInt(pageLimit)}
              totalItemsCount={Orders.count}
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
    padding: "24px 0px 36px 0px"

  },
  header: {
    display: "flex",
    alignItems: "center",
    padding: "20px 0px",
    justifyContent: "space-between"
  },
  autocomplete: {
    marginRight: "20px"
  },
  searchbox: {
    display: "flex"

  },
  search: {
    width: "200px",
    backgroundColor: "#fafafa",
    //position: "relative",
    borderRadius: theme.shape.borderRadius,
    border: `2px solid ${theme.palette.primary.main}`,
    marginInlineEnd: "20px",
    position: "absolute",
    right: "275px"
  },
  searchIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  crossIcon: {
    width: theme.spacing(7),
    height: "100%",
    position: "absolute",
    top: 0,
    right: 0,
    cursor: "pointer",
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
  },
  inputRoot: {
    color: "inherit",
  },
  inputInput: {
    height: "34px",
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create("width")
  }
}))

const AntTab = withStyles(theme => ({
  root: {
    textTransform: "none",
    fontWeight: theme.typography.fontWeightRegular,
    fontSize: "22px",
    borderBottom: '1px solid #e8e8e8',
    "&$selected": {
      color: "#000",
      fontWeight: 600,
    }
  },
  selected: {},
}))(props => <Tab disableRipple {...props} />)

export default orders