import React from 'react'
import { Outlet } from 'react-router-dom'
import PortalNavbar from './PortalNavbar'

const Portal = () => {
    return (
        <div>
            <div className="d-flex align-self-stretch px-0">
                <div className="portal-left-container h-100">
                    <PortalNavbar />
                </div>
                <div className="portal-right-container">
                    <Outlet />
                    {/* <div className="footer p-3">
                        A product of Elscript Technology | All Rights Reserved
                    </div> */}
                </div>
            </div>
        </div>
    )
}

export default Portal