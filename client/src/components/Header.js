import React,{Fragment} from "react";
import logo from "../../src/assets/logo_digital_new_250x.png"
import icons from '../ultils/icon'
import {Link} from 'react-router-dom'
import path from '../ultils/path'
import { useSelector } from 'react-redux'

const {FaPhoneAlt, MdEmail, FaUser, FaShoppingBag} = icons
const Header = () => {
    const {current} = useSelector(state => state.user)
    return (
        <div className="flex justify-between w-main h-[110px] py-[35px]">
            <Link to={`/${path.HOME}`}>
                <img src={logo} alt="logo" className="w-[234px] object-contain" ></img>
            </Link>
            <div className="flex text-[13px]">
                <div className="flex flex-col items-center px-6 border-r">
                    <span className="flex gap-4 items-center">
                        <FaPhoneAlt color='red' />
                        <span className="font-semibold">(+1800) 000 8808</span>
                    </span>
                    <span>Mon-Sat 9:00AM - 8:00PM</span>
                </div>
                <div className="flex flex-col items-center px-6 border-r">
                    <span className="flex gap-4 items-center">
                        <MdEmail color='red' />
                        <span className="font-semibold">SUPPORT@TADATHEMES.COM</span>
                    </span>
                    <span>Online Support 24/7</span>
                </div>
                {current &&
                <Fragment>
                <div className="cursor-pointer flex items-center justify-center gap-2 px-6 border-r">
                    <FaShoppingBag color='red' />
                    <span>0 item(s)</span>
                </div>

                <Link
                 to = {+current?.role === 1411 ? `/${path.ADMIN}/${path.DASHBOARD}` : `/${path.USER}/${path.PERSONAL}`}
                 className="cursor-pointer flex items-center justify-center px-6 gap-2">
                    <FaUser color='red' />
                    <span>Profile</span>
                </Link>
                </Fragment>
                }
            </div>
        </div>
    )
}

export default Header