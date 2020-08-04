export const createFragment = data => {
  const tableData = Object.keys(data).reduce(
    (list, k) => (list.push({ key: k, val: data[k] }), list),
    []
  );
  const trs = tableData
    .map(({ key, val }) => {
      return `
        <div class="row">
          <span>${key}</span>
          <span>${val}</span>
        </div>
      `;
    })
    .join("");

  return `
    <section class="v-track-table">
      <div class="header">
        <strong>key</strong>
        <strong>value</strong>
      </div>
      ${trs}
    </section>
  `;
};
