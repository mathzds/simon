export const extractDataFromHtml = (html) => {
  return html
    .split("__NEXT_DATA__")[1]
    .split('type="application/json">')[1]
    .split("</script>")[0];
};
