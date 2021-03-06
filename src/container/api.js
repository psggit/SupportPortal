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
    api: `/deliveryman/api/1/support/deliveryagent/list/${payload.retailer_id}/${payload.order_id}`,
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

export function fetchIssue(payload) {
  return POST({
    api: `/deliveryman/api/1/support/issue/fetch`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function resolveIssue(payload) {
  return GET({
    api: `/deliveryman/api/1/support/issue/markresolved/${payload.order_id}`,
    apiBase: "api",
    handleError: true,
  })
}

export function fetchSupportPersonList() {
  return GET({
    api: `/deliveryman/api/1/support/list/supportperson`,
    apiBase: "api",
    handleError: true,
  })
}

export function assignTo(payload) {
  return GET({
    api: `/deliveryman/api/1/support/issue/assignmanual/${payload.order_id}/${payload.issue_id}/${payload.agent_id}`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function restockOrder(payload) {
  return GET({
    api: `/deliveryman/api/1/support/manualprocess/restock/${payload.order_id}`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function pushOrder(payload) {
  return GET({
    api: `/deliveryman/api/1/support/manualprocess/push_order/${payload.order_id}`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
} 

export function getOtpForRestockOrder(payload) {
  return GET({
    api: `/deliveryman/api/1/support/manualprocess/get_restock_otp/${payload.order_id}`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function cancelServiceProviderOrder(payload) {
  return GET({
    api: `/deliveryman/api/1/support/manualprocess/cancelorder_at_sp/${payload.order_id}`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function markResolve(payload) {
  return GET({
    api: `/deliveryman/api/1/support/issue/markissueresolved/${payload.issue_id}`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function markActivity(payload) {
  return POST({
    api: `/deliveryman/api/1/support/markactivity/mark`,
    apiBase: "api",
    handleError: true,
    data: payload
  })
}

export function fetchDeliveryOrderStatus() {
  return POST({
    api: `/deliveryman/api/1/deliverystatus/list`,
    apiBase: "api",
    handleError: true,
    //data: payload
  })
}