export const status = [
  {
    label: "New",
    value: "new",
  },
  {
    label: "Open",
    value: "open",
  },
  {
    label: "In Progress",
    value: "in progress",
  },
  {
    label: "Awaiting User Response",
    value: "awaiting user response",
  },
  {
    label: "Resolved",
    value: "resolved",
  },
  {
    label: "Closed",
    value: "closed",
  },
  {
    label: "Reopened",
    value: "reopened",
  },
];

export const priority = [
  {
    label: "Low",
    value: "low",
  },
  {
    label: "Medium",
    value: "medium",
  },
  {
    label: "High",
    value: "high",
  },
  {
    label: "Critical",
    value: "critical",
  },
];

export const category = [
  {
    label: "Registration",
    value: "registration",
  },
  {
    label: "Support",
    value: "support",
  },
];

export function formDateDDMMYYYY(date) {
  date = new Date(date);
  const yyyy = date.getFullYear();
  let mm = date.getMonth() + 1;
  let dd = date.getDate();
  if (dd < 10) dd = "0" + dd;
  if (mm < 10) mm = "0" + mm;
  return dd + "-" + mm + "-" + yyyy;
}
