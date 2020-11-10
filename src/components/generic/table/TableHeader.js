import React from 'react'
import Checkbox from '@material-ui/core/Checkbox'

const TableHeader = (props) => {
  const {allChecked, handleAllChecked, header, viewport} = props
  return (
    <thead className="table-header">
      <tr className="table-header-row">
        <th className="table-header-row-cell checkbox">
          <Checkbox 
            key={`allchecked ${header[0].label}`}
            checked={allChecked.checked}
            indeterminate={allChecked.indeterminate}
            onChange={handleAllChecked}
            color="primary"
          />
          </th>
        <th className="table-header-row-cell name">{header[0].label}</th>
        {!viewport.xs &&
          <>
            <th className="table-header-row-cell modified">{header[1].label}</th>
            <th className="table-header-row-cell current-status-actions">{header[2].label}</th>
          </>
        }
      </tr>
    </thead>
  )
}

export default TableHeader
