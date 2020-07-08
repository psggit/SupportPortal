import React, { useState, useEffect } from 'react'
import './order-detail.scss'
import Button from "@material-ui/core/Button"
import { makeStyles } from "@material-ui/core/styles"
import Dialog from "./../../components/dialog/index"
import Select from '@material-ui/core/Select'
// import TextField from '@material-ui/core/TextField';
import Notification from "Components/notification"
import {fetchGenreList, fetchBrandList, modifyConfirm,modifySummary} from "./../api"
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';

let initialState = []

function OrderSummary ({ orderTotal, cartTotal, cartItems, feeDetails, cgstPercentage, sgstPercentage, cgstAmount, sgstAmount, igstPercentage, igstAmount, additionalTotalCharges, retailerId , stateId, cityId, gps, orderId}) {
  
  const classes = useStyles()
  const [showMountModal, setShowMountModal] = useState(false)
  const [genreList,setGenreList] = useState([])
  const [genreId,setGenreId] = useState(0)
  const [brandList,setBrandList] = useState([])
  const [brandIdx,setBrandIdx] = useState(0)
  const [volumeIdx,setVolumeIdx] = useState(0)
  const [cartItemsCopy,setCartItemsCopy] = useState()
  const [showOrderSummary, setShowOrderSummary] = useState(false)
  const [showOrderSummaryConfirm, setShowOrderSummaryConfirm] = useState(false)
  const [hipbarWallet, setHipbarWallet] = useState([])
  const [giftWallet, setGiftWallet] = useState([])
  const [isHipbarWalletEnabled, setIsHipbarWalletEnabled] = useState(true)
  const [isGiftWalletEnabled, setIsGiftWalletEnabled] = useState(true)
  const [actionTitle, setActionTitle] = useState([])
  const [action, setAction] = useState([])
  const [enableConfirm, setEnableConfirm] = useState([])
  const [modifyCart,setModifyCart] = useState(false)
  const [volumeList,setVolumeList] = useState([])
  const [showMessage, setShowMessage] = useState(false)
  const [message, setMessage] = useState("")

  const [displayDetails, setDisplayDetails] = useState([])
 
  useEffect(() => {
    if(cartItems !== cartItemsCopy) {
      fetchGenre()
      initialState = JSON.parse(JSON.stringify(cartItems));
      const cartItemsData = [...cartItems]
      setCartItemsCopy(cartItemsData)
    }
  }, [cartItems])

  useEffect(() => {
    if(genreId) fetchBrand()
  }, [genreId])

  useEffect(() => {
    if(showOrderSummary)
    modifyCartItems()
  }, [isGiftWalletEnabled, isHipbarWalletEnabled])

  const unmountModal = () => {
    setShowMountModal(false)
  }

  const mountModal = () => {
    setShowMountModal(true)
    fetchBrand()
  }

  const fetchGenre = () => {
    const payload = {
      city_id: cityId,
      state_id: stateId,
      retailer_id: parseInt(retailerId),
      gps: gps
    }
    fetchGenreList(payload)
      .then((response) => {
        setGenreList(response.genres)
        setGenreId(response.genres[0].id)
      })
      .catch((err) => {
        console.log("Error in fetching Genre list", err)
      })
  }

  const fetchBrand = () => {
    const payload = {
      city_id: cityId,
      state_id: stateId,
      retailer_id: parseInt(retailerId),
      genre_id: parseInt(genreId),
      gps:gps,
      offset:0,
      limit:20,
    }
    fetchBrandList(payload)
      .then((response) => {
        setBrandList(response.brands)
      })
      .catch((err) => {
        console.log("Error in fetching Brand list", err)
      })
  }

  const handleConfirm = () => {
    //mountOrderSummary()
    modifyCartItems()
  }

  const modifyCartItems = () => {
    const cartItems = cartItemsCopy.map((product) => {
      return {
        sku_id: product.sku_id,
        count: product.deliverable_count
      }
    })
    const payload = {
      order_id: orderId,
      items: cartItems,
      is_hw_enabled: isHipbarWalletEnabled,
      is_gw_enabled: isGiftWalletEnabled,
    }
    modifySummary(payload)
      .then((response) => {
        setHipbarWallet(response.hipbar_wallet)
        setGiftWallet(response.gift_wallet)
        setIsGiftWalletEnabled(response.gift_wallet.is_wallet_enabled)
        setIsHipbarWalletEnabled(response.hipbar_wallet.is_wallet_enabled)
        setEnableConfirm(response.to_show_confirm)
        setDisplayDetails(response.display_details)
        setAction(response.action)
        setActionTitle(response.action_title)
        mountOrderSummary()
      })
      .catch((err) => {
        err.json().then((json) => {
          setShowMessage(true)
          setMessage(json.message)
          console.log("Error in modifying cart",json.message)
        })
      })
  }

  const confirmCartModification = () => {
    unmountOrderSummary(false)
    const cartItems = cartItemsCopy.map((product) => {
      return {
        sku_id: product.sku_id,
        count: product.deliverable_count
      }
    })
    const payload = {
      order_id: orderId,
      items: cartItems,
      is_hw_enabled: isHipbarWalletEnabled,
      is_gw_enabled: isGiftWalletEnabled,
    }
    modifyConfirm(payload)
      .then((response) => {
        //history.push(`home/order-details/${orderId}`)
        location.reload()
      })
      .catch((err) => {
        setShowMessage(true)
        setMessage(json.message)
        console.log("Error in confirming cart modifications", err)
      })
  }


  const handleIncrement = (index) => {
    const newItems = [...cartItemsCopy]
    newItems[index].deliverable_count = newItems[index].deliverable_count + 1 
    setCartItemsCopy(newItems)
  }

  const handleDecrement = (index) => {
    const newItems = [...cartItemsCopy]
    if (newItems[index].deliverable_count >= 1)
      newItems[index].deliverable_count = newItems[index].deliverable_count - 1 
    setCartItemsCopy(newItems)
  }

  const handleGenreChange = (e) => {
    setGenreId(e.target.value)
    setBrandList([])
  }

  const handleBrandChange = (e) => {
    setBrandIdx(e.target.value)
    console.log("brand", brandList[e.target.value])
    setVolumeList(brandList[e.target.value].sku)
  }

  const handleVolumeChange = (e) => {
    setVolumeIdx(e.target.value)
    console.log("handleVolumeChange", volumeList, volumeList[e.target.value].sku_id)
  }

  const handleAddItemConfirm = (e) => {
    console.log("add item", brandList[brandIdx], brandList[brandIdx].sku, volumeIdx, brandList[brandIdx].sku[volumeIdx])
    const obj = { 
      brand_name: brandList[brandIdx].brand_name, 
      volume: brandList[brandIdx].sku[volumeIdx].volume, 
      total_price: brandList[brandIdx].sku[volumeIdx].retailer_price, 
      deliverable_count: 1,
      sku_id: volumeList[volumeIdx].sku_id,
      deliverable_count: 1
    };
    setCartItemsCopy(cartItems => [...cartItems, obj]);
    setShowMountModal(false);
  }

  const handleReset = () => {
    setCartItemsCopy(initialState);
  };

  const hipbarWalletChange = (e) => {
    setIsHipbarWalletEnabled(e.target.checked);
    //modifyCartItems()
  };

  const giftWalletChange = (e) => {
    setIsGiftWalletEnabled(e.target.checked);
    //modifyCartItems()
  };

  const handleRefresh = () => {
    //mountOrderSummary()
    //unmountOrderSummary()
    modifyCartItems()
  };

  const mountOrderSummary = () => {
    setShowOrderSummary(true)
  }

  const unmountOrderSummary = () => {
    setShowOrderSummary(false)
  }

  const mountOrderSummaryConfirm = () => {
    setShowOrderSummaryConfirm(true)
  }

  const unmountOrderSummaryConfirm = () => {
    setShowOrderSummaryConfirm(false)
  }

  const handleClose = () => {
    setShowMessage(false)
  }

  const renderOrderSummary = () => {
    return (
      <Dialog
        title={`Order Summary - ${actionTitle}`}
        actions={[
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleRefresh}
          >
            Refresh
          </Button>,
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={mountOrderSummaryConfirm}
            disabled={!enableConfirm}
          >
            Confirm
          </Button>,
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={unmountOrderSummary}
          >
            Cancel
          </Button>
        ]}
      >
        {
          showOrderSummaryConfirm && (
            <Dialog
              title="Confirm Cart Modification"
              subtitle="Are you sure you want to confirm this cart modification ?"
              actions={[
                <Button
                  onClick={confirmCartModification}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  Yes
                  </Button>,
                <Button
                  onClick={unmountOrderSummaryConfirm}
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                >
                  No
                </Button>
              ]}
            />
          )}
        <div className={classes.formRoot}>
          {
            cartItemsCopy ?
              cartItemsCopy.map((item, index) => {
                return <div>
                  <div className="flex-item" key={index} style={{ marginBottom: '16px', display: "flex", justifyContent: "space-between" }}>
                    <span style={{ fontSize: '18px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{`${item.brand_name} - (${item.volume}ml)`} </span>
                    <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>{item.deliverable_count}</span>
                  </div>
                </div>
              }) : ""
          }
          {
            displayDetails && displayDetails.map((item,index) => {
              return <div>
                <div className="flex-item" key={index} style={{ marginBottom: '16px', display: "flex", justifyContent: "space-between" }}>
                  <span style={{ fontSize: '18px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{item.display_title} </span>
                  <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>{item.display_value}</span>
                </div>
              </div>
            })    
          }
          {
            action === "toLoad" &&
            <React.Fragment>
              <div className="flex-item" style={{ marginTop: '10px', display: "flex", justifyContent: "space-between" }}>
                <span>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isHipbarWalletEnabled}
                        onChange={hipbarWalletChange}
                        name="isHipbarWalletEnabled"
                        color="primary"
                      />
                    }
                    label="HipBar Wallet"
                  />
                </span>
                <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800', marginTop: '10px' }}>{hipbarWallet ? `${hipbarWallet.display_charged_credits}` : "-"}</span>
              </div>
              <div className="flex-item" style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ marginLeft: "28px", fontSize: '16px', lineHeight: '24px', fontWeight: '800'}}>
                    Current Balance
                </span>
                <span style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '800' }}>{hipbarWallet ? `${hipbarWallet.display_available_credits}` : "-"}</span>
              </div>
              {
                hipbarWallet && hipbarWallet.err_msg
                  ? <p style={{ marginLeft: "28px", color: "#f44336" }}>{hipbarWallet.err_msg}</p>
                  : ""
              }
            </React.Fragment>
          }
          {
            action === "toLoad" &&
            <React.Fragment>
              <div className="flex-item" style={{ marginTop: '5px', display: "flex", justifyContent: "space-between" }}>
                <span>
                  <FormControlLabel
                    control={
                      <Checkbox
                        checked={isGiftWalletEnabled}
                        onChange={giftWalletChange}
                        name="isGiftWalletEnabled"
                        color="primary"
                      />
                    }
                    label="Gift Wallet"
                  />
                </span>
                <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800', marginTop: '5px' }}>{hipbarWallet ? `${giftWallet.display_charged_credits}` : "-"}</span>
              </div>
              <div className="flex-item" style={{ display: "flex", justifyContent: "space-between" }}>
                <span style={{ marginLeft: "28px" ,fontSize: '16px', lineHeight: '24px', fontWeight: '800' }}>
                  Current Balance
                </span>
                <span style={{ fontSize: '16px', lineHeight: '24px', fontWeight: '800' }}>{giftWallet ? `${giftWallet.display_available_credits}` : "-"}</span>
              </div>
              {
                giftWallet && giftWallet.err_msg
                  ? <p style={{ marginLeft: "28px", color: "#f44336" }}>{giftWallet.err_msg}</p>
                  : ""
              }
            </React.Fragment>
          }
        </div>
      </Dialog>
    )
  }

  const renderAddProductForm = () => {
    return (
      <Dialog
        title="Add Item"
        actions={[
          <Button
            className={classes.button}
            variant="contained"
            color="secondary"
            onClick={handleAddItemConfirm}
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
          </Button>
        ]}
      >
        <form>
          <div className={classes.formRoot}>
            <label>Genre Name*</label>
            <Select
              native
              value={genreId}
              className={classes.formControl}
              onChange={handleGenreChange}
            >
              {
                genreList.map((item, index) => {
                  return <option key={index} value={item.id}>{item.name} -  {item.id}</option>
                })
              }
            </Select>
            <label>Brand Name*</label>
            <Select
              native
              value={brandIdx}
              className={classes.formControl}
              onChange={handleBrandChange}
            >
              {
                brandList.map((item, index) => {
                  return <option key={index} value={index}>{item.brand_name}  {item.brand_id}</option>
                })
              }
            </Select>
            <label>Volume in ml*</label>
            <Select
              native
              value={volumeIdx}
              className={classes.formControl}
              onChange={handleVolumeChange}
            >
              {
                volumeList.map((item, index) => {
                  return <option key={index} value={index}>{item.volume}</option>
                })
              }
            </Select>
          </div>
        </form>
      </Dialog>
    )
  }

  const handleModifyCart = () => {
    setModifyCart(true)
  }

  return (
    <div className="orders-detail-card">
      <div className="header">
        <h4>ORDER SUMMARY</h4>
      </div>
      <div className="content">

        <div className="flex-item" style={{ marginBottom: "8px" }}>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>Cart Total</span>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>{cartTotal ? `₹${cartTotal}` : "-"}</span>
        </div>
        <div className="flex-item" style={{ marginBottom: "8px" }}>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold', color:"#757575" }}>Ordered Cart Items</span>
          <div className="item">
              <Button
                className={classes.button}
                variant="contained"
                color="secondary"
                onClick={handleModifyCart}
              >
                Modify
              </Button>
              {
                modifyCart &&
                <Button
                  className={classes.button}
                  variant="contained"
                  color="secondary"
                  onClick={mountModal}
                >
                  Add
                </Button>
                }
              {
                showMountModal && renderAddProductForm()
              }
            </div>
        </div>
        {
          cartItemsCopy ?
          cartItemsCopy.map((item, index) => {
            return (
              <div>
                <div className="flex-item" key={index} style={{marginBottom:"-10px"}}>
                <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{`${item.brand_name}`} </p>
                  <div className="control">
                    {
                      modifyCart &&
                      <button className="bttn bttn-left" id="minus" onClick={()=>handleDecrement(index)}>
                        <span>-</span>
                      </button>
                    }
                    <p className="input"> {cartItemsCopy[index].deliverable_count}</p>
                    {
                      modifyCart &&
                      <button className="bttn bttn-right" id="plus" onClick={()=>handleIncrement(index)}>
                        <span>+</span>
                      </button>
                      }
                  </div>
                </div>
                <div className="flex-item" key={index} style={{ marginBottom: '28px' }}>
                  <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`${item.volume} ml | ₹${item.total_price}`}</p>
                </div>
              </div>
            )
          }) : ""
        }
        <div className="confirm-cart" style={{ marginBottom: "2px",textAlign:"right" }}>
          {
            modifyCart &&
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleReset}
            >
              Reset
            </Button>
          }
          {
            modifyCart &&
            <Button
              className={classes.button}
              variant="contained"
              color="secondary"
              onClick={handleConfirm}
            >
              Confirm
            </Button>
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
          {
            showOrderSummary && renderOrderSummary()
          }
        </div>

        <div className="flex-item" style={{ marginBottom: "8px",marginTop:"16px" }}>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold', color:"#757575"}}>Delivered/Deliverable Cart Items</span>
        </div>
        {
          cartItems ?
          cartItems.map((item, index) => {
            return <div className="flex-item" key={index} style={{ marginBottom: '16px' }}>
              <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{`${item.brand_name} (${item.volume})`} x {item.deliverable_count}</p>
              <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`₹${item.revised_total_price}`}</p>
                  </div>
          }) : ""
        }

        <div className="flex-item" style={{ marginBottom: "8px" }}>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold', color:"757575" }}>Additional Total Charges</span>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: 'bold' }}>{additionalTotalCharges ? `₹${additionalTotalCharges}` : "-"}</span>
        </div>
        {
          feeDetails ?
            feeDetails.map((item, index) => {
              return <div className="flex-item" key={index} style={{ marginBottom: '5px' }}>
                <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600', color: '#212121' }}>{item.fee_title}</p>
                <p style={{ fontSize: '15px', lineHeight: '20px' }}>{`₹${item.fee_value_without_taxes}`}</p>
              </div>
            }) : ""
        }

        <div className="flex-item" style={{ marginBottom: '6px' }}>
          <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"CGST" +"(" +cgstPercentage +"%)"}</p>
          <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹"+cgstAmount}</p>
        </div>

        <div className="flex-item" style={{ marginBottom: '6px' }}>
          <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"SGST" + "(" + sgstPercentage + "%)"}</p>
          <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹" +sgstAmount}</p>
        </div>

        <div className="flex-item" style={{ marginBottom: '6px' }}>
          <p style={{ fontSize: '15px', lineHeight: '20px', fontWeight: '600' }}>{"IGST" + "(" + igstPercentage + "%)"}</p>
          <p style={{ fontSize: '15px', lineHeight: '20px' }}>{"₹" + igstAmount}</p>
        </div>

        <div className="flex-item" style={{ marginTop: '10px' }}>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>Order Total</span>
          <span style={{ fontSize: '18px', lineHeight: '24px', fontWeight: '800' }}>{orderTotal ? `₹${orderTotal}` : "-"}</span>
        </div>
      </div>
    </div>
  )
}

const useStyles = makeStyles(theme => ({
  formRoot: {
    padding: 36
  },
  formControl: {
    width: "100%",
    marginBottom: 24
  },
  formControlTextarea: {
    width: "100%",
    marginBottom: 24,
    padding: 10
  },
  buttonPrimary: {
    background: "#000000",
    color: "#FFFFFF"
  },
  button: {
    marginLeft: "10px",
    cursor: "pointer",
    marginTop: "10px"
  }
}))

export default OrderSummary
