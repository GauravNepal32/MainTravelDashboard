import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


const PortalNavbar = () => {
    const location = useLocation().pathname;
    const [activePortal, setActivePortal] = useState("Dashboard");
    const [uniDrop, setUniDrop] = useState(false)
    useEffect(() => {
        if (location == "/courses") {
            setActivePortal("Courses");
        } else if (location === "/dashboard") {
            setActivePortal("Dashboard");
        }
        else if (location === "/faqs") {
            setActivePortal("FAQs");
        }
        else if (location === "/location") {
            setActivePortal("Location");
        }
        else if (location === "/package") {
            setActivePortal("Package");
        }
    });
    return (
        <div>
            <div className="navbar portal-nav">
                <ul className='list-unstyled'>
                    <div className="company-name text-center fw-bold mt-2">ELSCRIPT</div>
                    <div className="mt-5">

                        <li>
                            <Link className={activePortal === "Dashboard" ? 'd-flex justify-content-evenly active-nav' : 'd-flex justify-content-evenly'} to="/dashboard">
                                <span class="material-symbols-outlined">
                                    dashboard
                                </span>
                                <div className="">
                                    Dashboard
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className={activePortal === "Courses" ? 'd-flex justify-content-evenly active-nav' : 'd-flex justify-content-evenly'} to="/courses">
                                <span class="material-symbols-outlined">
                                    chat
                                </span>
                                <div className="">
                                    Courses
                                </div>

                            </Link>
                        </li>
                        <li>
                            <Link className={activePortal === "Location" ? 'd-flex justify-content-evenly active-nav' : 'd-flex justify-content-evenly'} to="/location">
                                <span class="material-symbols-outlined">
                                    chat
                                </span>
                                <div className="">
                                    Location
                                </div>

                            </Link>
                        </li>
                        <li>
                            <Link className={activePortal === "Package" ? "d-flex justify-content-evenly active-nav" : "d-flex justify-content-evenly"} to="/package">
                                <span class="material-symbols-outlined">
                                    help
                                </span>
                                <div className="">
                                    Package
                                </div>
                            </Link>
                        </li>
                        <li>
                            <Link className={activePortal === "FAQs" ? "d-flex justify-content-evenly active-nav" : "d-flex justify-content-evenly"} to="/faqs">
                                <span class="material-symbols-outlined">
                                    help
                                </span>
                                <div className="">
                                    FAQ
                                </div>
                            </Link>
                        </li>

                    </div>
                </ul>
            </div>
        </div>
    )
}

export default PortalNavbar