import React from 'react'
import "./table.scss"
// import Button from '@material-ui/core/Button'
import Tabs from "../../navigation/tabs/Tabs"

const Table = (props) => {
  const {tabProps, table, setTableRowKey} = props
  const {className, header, body} = table
  console.log(body)
  return (
    <div className="table">
      <Tabs {...tabProps} />
      <div className="table-header">
        <div className="table-row">
          {header.map((label, index)=>(
            <div key={`table-header ${label}-${index}`} className={`table-cell ${className[index]}`}>{label}</div>
          ))}
        </div>
      </div>
      <div className="table-body">
        {body.map((row, index)=>{
          const rowClass = index%2 === 0 ? 'table-row odd' : 'table-row'
          return (
            <div className={rowClass} key={`table-row ${index}`} onClick={()=>setTableRowKey(index)}>
              {row.map((cell, cellIndex)=>{
                const double = Array.isArray(cell)
                return(
                <div className={`table-cell ${className[cellIndex]}`}>
                  {double
                  ? (
                    <>
                      <div className="primary">{cell[0]}</div>
                      <div className="secondary">{cell[1]}</div>
                    </>
                  )
                  : <>{cell} </>
                  }
                </div>
              )})}
            </div>
          )
        })}
        {/* <div className="table-row">
          <div className="table-cell center fixed">1</div>
          <div className="table-cell flex start double">
            <div className="primary">초급 1-1</div>
            <div className="secondary">박민창</div>
          </div>
          <div className="table-cell end">88.89%</div>
          <div className="table-cell end">9 명</div>
        </div>
        <div className="table-row">
          <div className="table-cell center fixed">1</div>
          <div className="table-cell flex start double">
            <div className="primary">초급 1-1</div>
            <div className="secondary">박민창</div>
          </div>
          <div className="table-cell end">88.89%</div>
          <div className="table-cell end">9 명</div>
        </div> */}
      </div>
    </div>
  )
}

export default Table
