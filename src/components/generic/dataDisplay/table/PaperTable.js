import React from 'react'
import Select from '../../input/select/Select'
import Paper from '../../paper/Paper'
import PaperSubTitle from '../../paper/PaperSubtitle'
import PaperTitle from '../../paper/PaperTitle'
import Table from './Table'



const PaperTable = (props) => {
  const {title, subtitle, footer, selectProps, tableProps} = props
  const opacity = props.opacity ? props.opacity : 0.95
  return (
    <Paper opacity={opacity}>
      <PaperTitle>{title}</PaperTitle>
      <PaperSubTitle>{subtitle}</PaperSubTitle>
      {props.children}
      <div className="filters">
        {selectProps.map((itemProps,index)=><Select key={`${Math.round(Math.random()*100000)}`} {...itemProps} />)}
      </div>
      <Table {...tableProps}/>
      {footer}
    </Paper>
  )
}

export default PaperTable
