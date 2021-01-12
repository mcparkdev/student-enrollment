import React from 'react'

import Sider from "../../generic/layout/sider/Sider"
import AutoComplete from "../../generic/input/autoComplete/AutoComplete"
import Tabs from '../../generic/navigation/tabs/Tabs'
import PaperTable from '../../generic/dataDisplay/table/PaperTable'

const DatabaseSider = (props) => {
  const {searchProps, siderTabProps, siderPaperTableProps} = props
  return (
    <Sider className="database">
      <div className="sider-header">
        <div className="last-update">
          마지막 접속 : 2021년 1월 10일 오후 3:20
        </div>
        <AutoComplete {...searchProps} />
      </div>
      <div className="sider-content">
        <Tabs {...siderTabProps} />
        <PaperTable {...siderPaperTableProps}/>
      </div>
      <div className="sider-footer">
        <div className="primary">재콜롬비아한국학교</div>
        <div className="secondary">@2016-2021 Colegio Colombo Coreano</div>
      </div>
    </Sider>
  )
}

export default DatabaseSider
