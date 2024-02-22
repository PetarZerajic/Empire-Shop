export const emptyShippingFields = (props: object) => {
  return Object.values(props).every((field) => field === "");
};
