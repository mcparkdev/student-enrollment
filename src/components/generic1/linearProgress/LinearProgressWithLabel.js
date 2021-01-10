import React from "react"

import LinearProgress from '@material-ui/core/LinearProgress';
import Box from '@material-ui/core/Box';
import Tooltip from '@material-ui/core/Tooltip'
import { withStyles } from '@material-ui/core/styles';

const LinearProgressTooltip = withStyles((theme) => ({
  tooltip: {
    // backgroundColor: '#fff',
    // color: 'rgba(0, 0, 0, 0.87)',
    maxWidth: 300,
    fontSize: theme.typography.pxToRem(14),
    // border: '1px solid #dadde9',
  },
}))(Tooltip);


export default function LinearProgressWithLabel(props) {
  const {total, completed, progress} = props
  const percentage = total !== 0 ? completed / total * 100 : 0
  const buffer = total !== 0 ? (completed + progress) / total * 100 : 0
  return (
    
      <Box display="flex" alignItems="center" style={{flex: 1}} className="linear-progress-with-label">
        <Box width="100%" mr={1} >
          <LinearProgress variant="buffer" value={percentage} valueBuffer={buffer} />
        </Box>
        <LinearProgressTooltip placement="top" arrow title={
          <div className="linear-progress-tooltip">
            <div className="linear-progress-tooltip-title"></div>
            <ul className="linear-progress-tooltip-item-container">
              <li className="linear-progress-tooltip-item">승인됨 : {completed} / {total} </li>
              <li className="linear-progress-tooltip-item">미확인 : {progress} / {total} </li>
              <li className="linear-progress-tooltip-item">미납부 : {total - completed - progress} / {total} </li>
            </ul>
          </div>
        }>
          <Box minWidth={35}>
            {completed}/{total}
          {/* {`${Math.round(
            value,
          )}%`} */}
          </Box>
        </LinearProgressTooltip>
      </Box>
  );
}