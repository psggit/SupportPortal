import { POST, GET } from "../utils/fetch"

export function fetchCompleteOrderDetails (payload) {
  return GET({
    api: `/deliveryman/api/1/support/complete_order_details/${payload.order_id}`,
    apiBase: "api",
    handleError: true
  })
}

export function fetchOrderDetails (payload) {
  return POST({
    api: `/deliveryman/api/1/fetch-order-details`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function cancelOrder (payload) {
  return POST({
    api: `/deliveryman/api/1/support/cancel-order`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function completeOrder (payload) {
  return POST({
    api: `/orderman/api/2/agent/lot/order/deliver`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function submitNotes (payload) {
  return POST({
    api: `/deliveryman/api/1/support/order-notes`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function fetchCancellationReasons (payload) {
  return POST({
    api: `/deliveryman/api/1/support/cancel-reason`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function fetchKycDocumentList (payload) {
  return GET({
    api: `/deliveryman/api/1/agent/kyc-list`,
    apiBase: "api",
    handleError: true
  })
}

export function fetchNotes (payload) {
  return GET({
    api: `/deliveryman/api/1/support/fetch_notes/${payload.order_id}`,
    apiBase: "api",
    handleError: true,
  })
}

export function fetchPreponeOrderDelivery(payload) {
  return POST({
    api: `/deliveryman/api/1/support/assign-warehouse`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function fetchDissolveLot(payload) {
  return POST({
    api: `/deliveryman/api/1/support/dissolve-lot`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function reassignRetailer(payload) {
  return POST({
    api: `/deliveryman/api/1/support/retailer/reassign`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function fetchRetailerList(payload) {
  return GET({
    api: `/deliveryman/api/1/support/retailer/list/${payload.retailer_id}`,
    apiBase: "api",
    handleError: true,
  })
}

export function fetchDeliveryAgentList(payload) {
  return GET({
    api: `/deliveryman/api/1/support/deliveryagent/list/${payload.retailer_id}`,
    apiBase: "api",
    handleError: true,
  })
}

export function reserveOrders(payload) {
  return POST({
    api: `/deliveryman/api/1/support/deliveryagent/reserveorder`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function unassignDeliveryAgent(payload) {
  return GET({
    api: `/deliveryman/api/1/support/deliveryagent/unassign/${payload.order_id}`,
    apiBase: "api",
    handleError: true,
  })
}

export function fetchGenreList(payload) {
  return POST({
    api: `/Api/stockandprice/listing/genres`,
    apiBase: "retailer",
    handleError: true,
    data: payload
  })
}

export function fetchBrandList(payload) {
  return POST({
    api: `/Api/stockandprice/listing/brands`,
    apiBase: "retailer",
    handleError: true,
    data: payload
  })
}

export function modifyConfirm(payload) {
  return POST({
    api: `/support/order/modify/confirm`,
    apiBase: "orderman",
    handleError: true,
    data: payload
  })
}

export function modifySummary(payload) {
  return POST({
    api: `/support/order/modify/summary`,
    apiBase: "orderman",
    handleError: true,
    data: payload
  })
}