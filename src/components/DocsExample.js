import PropTypes from 'prop-types'
import React from 'react'
import { CNav, CNavItem, CNavLink, CTabContent, CTabPane } from '@coreui/react'
import CIcon from '@coreui/icons-react'
import { cilMediaPlay } from '@coreui/icons'

const DocsExample = (props) => {
  const { children } = props

  // const _href = `https://coreui.io/react/docs/${href}`

  return (
    <div className="example">
      <CNav variant="tabs">
        <CNavItem>
          <CNavLink active>
            <CIcon icon={cilMediaPlay} className="me-2" />
            Publish
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active>
            <CIcon icon={cilMediaPlay} className="me-2" />
            Thrash
          </CNavLink>
        </CNavItem>
        <CNavItem>
          <CNavLink active>
            <CIcon icon={cilMediaPlay} className="me-2" />
            Thrash
          </CNavLink>
        </CNavItem>
      </CNav>
      <CTabContent className="rounded-bottom">
        <CTabPane className="p-3 preview" visible>
          {children}
        </CTabPane>
      </CTabContent>
    </div>
  )
}

DocsExample.propTypes = {
  children: PropTypes.node,
  href: PropTypes.string,
}

export default React.memo(DocsExample)
