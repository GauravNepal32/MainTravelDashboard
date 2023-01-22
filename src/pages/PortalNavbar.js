import React, { useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'


const PortalNavbar = () => {
    const location = useLocation().pathname;
    const [activePortal, setActivePortal] = useState("Dashboard");
    const [uniDrop, setUniDrop] = useState(false)
    useEffect(() => {


        if (location === "/dashboard") {
            setActivePortal("Dashboard");
        }
        else if (location === "/Categorys") {
            setActivePortal("Categorys");
        }
        else if (location === "/location") {
            setActivePortal("Location");
        }
        else if (location === "/package") {
            setActivePortal("Package");
        }
        else if (location === "/change-password") {
            setActivePortal("ChangePassword");
        }
    });
    return (
        <div className='h-100'>
            <div className="navbar portal-nav h-100">
                <ul className='list-unstyled h-100'>
                    <div className="company-name text-center fw-bold mt-2">ELSCRIPT</div>
                    <div className="mt-5 h-100">

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
                            <Link className={activePortal === "Categorys" ? "d-flex justify-content-evenly active-nav" : "d-flex justify-content-evenly"} to="/Categorys">
                                <span class="material-symbols-outlined">
                                    help
                                </span>
                                <div className="">
                                    Category
                                </div>
                            </Link>
                        </li>
                        <li className='mt-auto change-pass mb-0 position-absolute'>
                            <Link className={activePortal === "ChangePassword" ? "d-flex justify-content-evenly active-nav" : "d-flex justify-content-evenly"} to="/change-password">
                                <span class="material-symbols-outlined">
                                    key
                                </span>
                                <div className="">
                                    Change Password
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