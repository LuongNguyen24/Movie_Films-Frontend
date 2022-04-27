import React, { Fragment } from 'react'
import { NavLink } from 'react-router-dom'
import { history } from '../../../../App'
import { useDispatch } from 'react-redux';
import { Menu, Dropdown } from 'antd';
import { DownOutlined } from '@ant-design/icons';
import './Header.css'

import _ from 'lodash';
import { SIGN_OUT } from '../../../../redux/Types/QuanLyNguoiDungType';
export default function Header(props) {
    const userLogin = JSON.parse(sessionStorage.getItem("USER_LOGIN"));
    const dispatch = useDispatch();
    const menu = (
        <Menu>
            <Menu.Item key="0">
                <NavLink to='/Profile'>Thông tin cá nhân</NavLink>
            </Menu.Item>
            <Menu.Item key='1'>
                <NavLink onClick={() => { dispatch({ type: SIGN_OUT }) }} to='/home'>Đăng xuất</NavLink>
            </Menu.Item>
        </Menu>
    );
    const handleLogin = () => {
        return <div className='h-full'>
            {_.isEmpty(userLogin) ? <div className="  h-full flex items-center flex-shrink-0  lg:flex">
                <button onClick={() => { history.push('/signIn') }} className="h-full space-x-3 resizeText self-center px-8 py-3 rounded hover:bg-violet-600 text-white">Đăng Nhập</button>
                <button onClick={() => { history.push('/signUp') }} className="resizeText  h-full   self-center px-8 py-3 font-semibold rounded hover:bg-violet-600 text-white">Đăng Kí</button>
            </div> : <div className="items-center justify-center flex-shrink-0 hidden lg:flex text-white">
                <Dropdown overlay={menu} trigger={['click']}>
                    <a className="ant-dropdown-link text-white" onClick={e => e.preventDefault()}>
                        <span className='mr-3'>{userLogin.userName}</span>    <DownOutlined />
                    </a>
                </Dropdown>

            </div>
            }
        </div>
    }
    return (
        <header className=" text-coolGray-800 fixed z-10 w-full bg-black bg-opacity-40 " >
            <div className="md:container flex justify-between h-16 mx-auto headerRes">
                <NavLink to='/home' aria-label="Back to homepage" className="flex items-center p-2" >
                    {/* <img style={{ width: '100%', height: '100%' }} src="https://movie.zalopay.vn/images/tix.svg" alt="logo" /> */}
                    <img style={{ width: '100%', height: '100%' }} src="./public/tix.png" alt="logo" />
                </NavLink>
                <ul className=" items-stretch  space-x-3 flex">
                    <li className=" flex ">
                        <NavLink to='/home' className=" resizeText  flex items-center px-4 -mb-1 border-b-2 border-transparent text-white" activeClassName='border-b-4 border-violet-600'>Trang Chủ</NavLink>
                    </li>
                    <li className="flex">
                        <NavLink to='/GroupCinema' className="resizeText  flex items-center text-white px-4 -mb-1 border-b-2 border-transparent" activeClassName='border-b-4 border-violet-600'>Cụm rạp</NavLink>
                    </li>
                </ul>
                <div className='my-1.5' >
                    {handleLogin()}
                </div>
            </div>
        </header>


    )
}
