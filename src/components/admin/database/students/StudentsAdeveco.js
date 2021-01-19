import React, {useState} from 'react'
import ItemContainer from '../../../generic/dataDisplay/item/ItemContainer'
import Paper, {PaperTitle, PaperSubTitle} from "../../../generic/paper/Paper"
// import Tooltip from "../../../generic/dataDisplay/tooltip/Tooltip"
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button'

const showMoreInitialState = {
  adevecoInformation: false,
}
const sectionNames = ["adevecoInformation"]
const sectionTitles = ["참전용사 후손"]
const sectionSubtitles = ["학생이 참전용사 후손일 경우 ADEVECO 증명서를 확인 할 수 있습니다."]
const sectionItems = [
  {
    main:{
      items:[
        {name: "서류", label: <Button onClick={()=>alert("clicked")} color="primary">서류 보기</Button>},
        {name: "인증 날짜", label: "2021년 1월 20일 오후 3:15"},
      ]
    },
  },
]

const StudentsAdeveco = (props) => {
  const [showMore, setShowMore] = useState(showMoreInitialState)
  const handleShowMore = (information) => {
    setShowMore({...showMore,...information})
  }
  // const resetShowMore = () => setShowMore(showMoreInitialState)  
  const studentsAdevecoInformationItemProps = sectionNames.map((name,index)=>{
    const title = sectionTitles[index]
    const subtitle = sectionSubtitles[index]
    const items = sectionItems[index]
    return {title, subtitle, ...items}
  })
  // console.log(studentsGeneralInformationItemProps)
  return (
    <>
    {studentsAdevecoInformationItemProps.map((info, index)=>{
      const {title, subtitle, main, more} = info
      const section = sectionNames[index]
      return(
        <Paper opacity={0.95} marginBottom={20} key={`paper-student-adeveco-information-${index}`}>
          <PaperTitle>{title}</PaperTitle>
          <PaperSubTitle>{subtitle}</PaperSubTitle>
          {!!more 
          ? (
            <>
              {showMore[section]
              ? <ItemContainer {...more}/>
              : <ItemContainer {...main}/>
              }
            </>
          ) 
          : <ItemContainer {...main}/>
          }
          {/* <ItemContainer {...main}/>
          {!!more && showMore[section] &&
            <ItemContainer {...more}/>
          } */}
          {!!more && 
          <div className="paper-expand">
            <Button color="primary" onClick={()=>handleShowMore({[section]:!showMore[section]})}>
              {showMore[section] ? "간략히 보기" : "자세히 보기"}
            </Button>
          </div>
          }
        </Paper>    
      )
    })}
    </>
  )
}

export default StudentsAdeveco
