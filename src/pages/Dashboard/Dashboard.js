import React, { useEffect, useState } from 'react'
import Select from "react-select";
import axios from 'axios';
import './Dashboard.css'
import { useAuth } from '../../authentication/auth';
import { Table } from './Table/Table';
const Dashboard = () => {
    const [options, setOptions] = useState({});
    const auth = useAuth()
    const token = sessionStorage.getItem('access_token')
    const [booking, setBooking] = useState([]);
    const [load, setLoad] = useState(false)
    const [confirmation, setConfirmation] = useState(false)

    const loadData = async () => {
        try {
            const response = await axios.get(`${auth.baseURL}/api/get-all-booking`,
                {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `Bearer ${token}`
                    }
                }
            )
            setBooking(response.data.data)
            setLoad(true)
        } catch (err) {
            setLoad(true)
            console.log(err)
        }
    }

    useEffect(() => {
        loadData()
    }, [])
    const truncate = (str, max, suffix) => str.length < max ? str : `${str.substr(0, str.substr(0, max - suffix.length).lastIndexOf(' '))}${suffix}`;
    return (
        <div>
            <h2 className='page-heading p-4'>Dashboard</h2>
            {confirmation && <>Hello</>}
            <div className="dashboard-main-container d-flex mt-4">
                <div className="dashboard-child-container me-3">
                    <div className=" d-flex align-items-center justify-content-between">
                        <h5>
                            Total Messages
                        </h5>
                        <p className='sub-text my-auto'>THIS WEEK</p>
                    </div>
                    <div className="number-text mt-4">10</div>
                </div>
                <div className="dashboard-child-container me-3">
                    <div className=" d-flex align-items-center justify-content-between">
                        <h5>
                            Pending Messages
                        </h5>
                        <p className='sub-text my-auto'></p>
                    </div>
                    <div className="number-text mt-4">10</div>
                </div>
                <div className="dashboard-child-container">
                    <div className=" d-flex align-items-center justify-content-between">
                        <h5>
                            All Messages
                        </h5>
                        <p className='sub-text my-auto'></p>
                    </div>
                    <div className="number-text mt-4">10</div>
                </div>
            </div>
            <div className="booking-interaction mt-4">
                {load &&
                    <Table data={booking} />
                }
            </div>
        </div>
    )
}

export default Dashboard