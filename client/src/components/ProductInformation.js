import React, { memo,useState } from 'react'
import {tabs} from '../ultils/constant'

const ProductInformation = () => {
    const [activeTab, setActiveTab] = useState(1)
  return (
    <div>
        <div className='flex items-center gap-2 relative bottom-[-1px]'>
            {tabs.map(el=>(
                <span 
                    onClick={()=>{setActiveTab(el.id)}}
                    className={`p-2 px-4 cursor-pointer ${activeTab===el.id ? 'bg-white border border-b-0': 'bg-gray-200'}`} key={el.id}>
                    {el.name}
                </span>
            ))}
        </div>
        <div className='w-full border p-4'>
            {tabs.some(el => el.id === activeTab) && tabs[activeTab-1]?.content}
        </div>
        
    </div>
  )
}

export default memo(ProductInformation)