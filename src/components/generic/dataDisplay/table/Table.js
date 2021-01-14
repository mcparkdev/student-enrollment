import React from 'react'
import "./table.scss"
// import Button from '@material-ui/core/Button'
import Tabs from "../../navigation/tabs/Tabs"
import { NavLink } from 'react-router-dom'

const Table = (props) => {
  const {tabProps, table, handleTableRowKey} = props
  const {className, header, body, links} = table
  // console.log(table)
  // console.log(body)
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
          const to = !!links ? links[index] : props.router.location.pathname
          
          const params = !!table.params ? table.params : {}
          return (
            <React.Fragment key={`table-row ${index}-${Math.round(Math.random()*100000)}`} >
            {!!links 
            ?
              <NavLink to={to} params={params} className={rowClass} onClick={()=>handleTableRowKey(index)}>
                {row.map((cell, cellIndex)=>{
                  const double = Array.isArray(cell)
                  return(
                  <div className={`table-cell ${className[cellIndex]}`} key={`table-cell-${index}-${cellIndex}-${double ? cell[0] : cell}`} >
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
              </NavLink>
              :
              <div className={rowClass} onClick={()=>handleTableRowKey(index)}>
                {row.map((cell, cellIndex)=>{
                  const double = Array.isArray(cell)
                  return(
                  <div className={`table-cell ${className[cellIndex]}`} key={`table-cell-${index}-${cellIndex}-${double ? cell[0] : cell}`} >
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
            }
            </React.Fragment>
          )
        })}
      </div>
    </div>
  )
}

export default Table
