const TableHeader = (props) => {
  let orderData = props.orderData
  return (

    <thead>
      <tr>
        {orderData.map((column, index) => (
          orderData[index].columns.map((d, i) => {
            return (
              props.flag == index ? <th key={i} scope="col" className="c-pointer text-center text-nowrap" onClick={() => { d.sort == true ? props.setOrderData([...orderData.slice(0, index), { ...orderData[index], order: orderData[index].order === 0 ? 1 : 0, orderClm: i }, ...orderData.slice(index + 1)]) : "" }}>
                <div className="d-flex justify-content-center">
                  <div>{d.field}</div>
                  {d.sort == true ? <div className="sort-icons-position">
                    <i className={`fa fa-sort-down position-absolute ${orderData[index].order === 1 && orderData[index].orderClm == i ? `text-primary` : "text-muted"} `}></i>
                    <i className={`fa fa-sort-up position-absolute ${orderData[index].order === 0 && orderData[index].orderClm == i ? `text-primary` : "text-muted"} `}></i>
                  </div> : ""}
                </div>
              </th> : ""
            )
          })
        ))}
      </tr>
    </thead>
  )
}

export default TableHeader
