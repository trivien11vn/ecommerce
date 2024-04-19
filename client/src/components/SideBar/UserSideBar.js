import React, { memo, Fragment, useState} from 'react'
import logo from 'assets/logo_digital_new_250x.png'
import { adminSidebar } from 'ultils/constant'
import { NavLink, Link} from 'react-router-dom'
import clsx from 'clsx'
import icons from 'ultils/icon'
import { useSelector } from 'react-redux'

const activeStyle = 'px-4 py-2 flex items-center gap-2 text-gray-100 bg-blue-500'
const notActiveStyle = 'px-4 py-2 flex items-center gap-2 hover:bg-blue-100'

const {FaCaretDown, FaCaretRight} = icons
const UserSideBar = () => {
  const [active, setActive] = useState([])
  const current = useSelector(state => state.user)
  const handleShowTab = (tabId) =>{
    if(active.some(el=>el === tabId)){
      setActive(prev => prev.filter(el=>el !== tabId))
    }
    else{
      setActive(prev => [...prev, tabId])
    }
  }
  console.log(current)
  return (
    <div className='bg-white h-full py-4'>
        <div className='w-full flex items-center justify-center py-4'>
            {/* <img src={logo} alt='logo' className='w-[200px] object-contain'></img> */}
            <span>Admin Workspace</span>
        </div>

        <div>
          {adminSidebar.map(el =>(
            <Fragment key={el?.id}>
              {el?.type === 'single' && 
              <NavLink 
                to={el?.path}
                className={({isActive})=> clsx(isActive && activeStyle, !isActive&& notActiveStyle)}>
                <span>{el?.icon}</span>
                <span>{el?.text}</span>
              </NavLink>}
              {el?.type === 'parent' &&
              <div onClick={() => handleShowTab(+el.id)} className='flex flex-col'>
                <div className='px-4 py-2 flex items-center justify-between hover:bg-blue-100 cursor-pointer'> 
                  <div className='flex items-center gap-2'>
                  <span>{el?.icon}</span>
                  <span>{el?.text}</span>
                  </div>

                  {active.some(id => +id === +el.id) ? <FaCaretRight />: <FaCaretDown />}
                </div>

                {active.some(id => +id === +el.id) &&
                  <div className='flex flex-col'>
                  {el?.submenu?.map(item => (
                    <NavLink 
                      key={item?.text} 
                      to={item?.path} 
                      onClick={e=>e.stopPropagation()}
                      className={({isActive})=> clsx(isActive && activeStyle, !isActive&& notActiveStyle, 'pl-10')}>
                      {item?.text}
                    </NavLink>
                  ))}
                </div>
                }
              </div>
              }
            </Fragment>
          ))}
        </div>
    </div>
  )
}

export default memo(UserSideBar)