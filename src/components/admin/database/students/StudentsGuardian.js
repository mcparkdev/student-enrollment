import React, {useState} from 'react'
import ItemContainer from '../../../generic/dataDisplay/item/ItemContainer'
import Paper, {PaperTitle, PaperSubTitle} from "../../../generic/paper/Paper"
// import Tooltip from "../../../generic/dataDisplay/tooltip/Tooltip"
// import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button'

const showMoreInitialState = {
  guardianInformation: false,
}
const sectionNames = ["guardianInformation"]
const sectionTitles = ["보호자"]
const sectionSubtitles = ["학생이 미성년자일 경우 보호자 정보를 확인 할 수 있습니다."]
const sectionItems = [
  {
    main:{
      items:[
        {name: "이름", label: "Valentina Sofía"},
        {name: "성", label: "Casadiego Reyes"},
        {name: "연락처", label: "+57 300 123 4567"},
        {name: "관계", label: "모"},
      ]
    },
  },
]

const StudentsGuardian = (props) => {
  const [showMore, setShowMore] = useState(showMoreInitialState)
  const handleShowMore = (information) => {
    setShowMore({...showMore,...information})
  }
  // const resetShowMore = () => setShowMore(showMoreInitialState)  
  const studentsGuardianInformationItemProps = sectionNames.map((name,index)=>{
    const title = sectionTitles[index]
    const subtitle = sectionSubtitles[index]
    const items = sectionItems[index]
    return {title, subtitle, ...items}
  })
  // console.log(studentsGeneralInformationItemProps)
  return (
    <>
    {studentsGuardianInformationItemProps.map((info, index)=>{
      const {title, subtitle, main, more} = info
      const section = sectionNames[index]
      return(
        <Paper opacity={0.95} marginBottom={20} key={`paper-student-guardian-information-${index}`}>
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

export default StudentsGuardian
