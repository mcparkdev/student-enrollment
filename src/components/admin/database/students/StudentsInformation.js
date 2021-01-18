import React, {useState} from 'react'
import ItemContainer from '../../../generic/dataDisplay/item/ItemContainer'
import Paper, {PaperTitle, PaperSubTitle} from "../../../generic/paper/Paper"
import Tooltip from "../../../generic/dataDisplay/tooltip/Tooltip"
import HelpOutlineIcon from '@material-ui/icons/HelpOutline';
import Button from '@material-ui/core/Button'

const showMoreInitialState = {
  personalInformation: false,
  guardianInformation: false,
  residentialInformation: false,
}
const sectionNames = ["generalInformation", "documentInformation", "residentialInformation"]
const sectionTitles = ["개인정보", "신분증정보", "주거정보"]
const sectionSubtitles = ["학생의 개인정보를 확인 할 수 있습니다.", "학생의 신분증정보를 확인 할 수 있습니다.", "학생의 주거 정보를 확인 할 수 있습니다."]
const sectionItems = [
  {
    main:{
      items:[
        {name: "이름", label: "Valentina Sofía"},
        {name: "성", label: "Casadiego Reyes"},
        {name: "생년월일", label: "2003년 8월 19일"},
      ]
    },
    more:{
      items: [
        {name: "이름", label: "Valentina Sofía"},
        {name: "성", label: "Casadiego Reyes"},
        {name: "생년월일", label: "2003년 8월 19일"},
        {name: "성별", label: "여자"},
        {name: "국적", label: "콜롬비아"},
        {name: "이메일", label: "vs.casadiego@gmail.com"},
      ]
    }
  },
  {
    main:{
      items:[
        {name: "유형", label: <>C.C. <Tooltip tooltipProps={{title:"Cédula de ciudadanía"}} isIcon={true}><HelpOutlineIcon aria-label="help-icon" fontSize="small"/></Tooltip></>},
        {name: "번호", label: "1.020.832.746"},
      ]
    },
    more:{
      items: [
        {name: "유형", label: <>C.C. <Tooltip tooltipProps={{title:"Cédula de ciudadanía"}} isIcon={true}><HelpOutlineIcon aria-label="help-icon" fontSize="small"/></Tooltip></>},
        {name: "번호", label: "1.020.832.746"},
        {name: "발급 주", label: "Bogotá D.C."},
        {name: "발급 도시", label: "Bogotá D.C."},
      ]
    }
  },
  {
    main:{
      items:[
        {name: "폰번호", label: "+57 300 123 4567"},
        {name: "주", label: "Bogotá D.C."},
        {name: "도시", label: "Bogotá D.C."},
        {name: "주소", label: "Carrera 00b # 01 - 02 Apartamento 001"},
      ]
    },
  }
]

const StudentsInformation = (props) => {
  const [showMore, setShowMore] = useState(showMoreInitialState)
  const handleShowMore = (information) => {
    setShowMore({...showMore,...information})
  }
  // const resetShowMore = () => setShowMore(showMoreInitialState)  
  const studentsGeneralInformationItemProps = sectionNames.map((name,index)=>{
    const title = sectionTitles[index]
    const subtitle = sectionSubtitles[index]
    const items = sectionItems[index]
    return {title, subtitle, ...items}
  })
  console.log(studentsGeneralInformationItemProps)
  return (
    <>
    {studentsGeneralInformationItemProps.map((info, index)=>{
      const {title, subtitle, main, more} = info
      const section = sectionNames[index]
      return(
        <Paper opacity={0.95} marginBottom={20} key={`paper-student-general-information-${index}`}>
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
    {/* <Paper opacity={0.95} marginBottom={20}>
      <PaperTitle>개인 정보</PaperTitle>
      <PaperSubTitle>학생의 개인 정보를 확인 할 수 있습니다..</PaperSubTitle>
      <ItemContainer {...studentsGeneralInformationItemProps[0]}/>
    </Paper>
    <Paper opacity={0.95}>
      <PaperTitle>주거 정보</PaperTitle>
      <PaperSubTitle>2부 수업 기본정를 확인 및 수정 할 수 있습니다.</PaperSubTitle>
      <ItemContainer {...studentsGeneralInformationItemProps[1]}/>
    </Paper> */}
    </>
  )
}

export default StudentsInformation
