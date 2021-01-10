import React from 'react'
import { NavLink } from 'react-router-dom'

const TabContainer = (props) => {
  const name="data"
  return (
    <ul className="body-subcontent-tab-container">
      <li className={`body-subcontent-tab`}>
        <NavLink to={`/${name}/data/personal`} 
        // onClick={() => handleSubItemKey(subKey)} 
        >
          <span className="body-subcontent-tab-label">
            Personales
          </span>
        </NavLink>
      </li>
      <li className={`body-subcontent-tab`}>
        <NavLink to={`/${name}/data/responsible`} 
        // onClick={() => handleSubItemKey(subKey)} 
        >
          <span className="body-subcontent-tab-label">
            Responsable
          </span>
        </NavLink>
      </li>
      <li className={`body-subcontent-tab`}>
        <NavLink to={`/${name}/data/residential`} 
        // onClick={() => handleSubItemKey(subKey)} 
        >
          <span className="body-subcontent-tab-label">
            Residenciales
          </span>
        </NavLink>
      </li>
      <li className={`body-subcontent-tab`}>
        <NavLink to={`/${name}/data/adeveco`} 
        // onClick={() => handleSubItemKey(subKey)} 
        >
          <span className="body-subcontent-tab-label">
            ADEVECO
          </span>
        </NavLink>
      </li>
    </ul>
  )
}

export default TabContainer
