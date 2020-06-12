export const menuItems = [
  { label: "Dashboard", value: "dashboard", icon: "dashboard" },
  {label: "Order Modification", value: "orderModification", icon: "dashboard"}
  // { label: "Retailer Summary", value: "retailer-summary", icon: "overview" },
  // { label: "Ongoing Slots", value: "ongoing-slots", icon: "overview" },
  // { label: "Upcoming Slots", value: "upcoming-slots", icon: "overview" },
  // { label: "All Orders", value: "orders", icon: "overview" },
]

export const menuItemsMap = menuItems.reduce((menuItemsMap, item) => {
  menuItemsMap[item.value] = item.label
  return menuItemsMap
}, {})