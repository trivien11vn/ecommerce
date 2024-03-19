import React, { memo } from 'react'
import icons from '../ultils/icon'
const {FaCaretDown} = icons
const SearchItem = ({name, activeClick, changeActiveFilter}) => {
  return (
    <div 
    onClick={()=>changeActiveFilter(name)}
    className='text-gray-500  p-3 text-xs relative border border-gray-800 flex gap-6 justify-between items-center'>
        <span className='caption-top'>{name}</span>
        <FaCaretDown />
        {activeClick === name && <div className='absolute top-full left-0 w-fit p-4 bg-red-500'>
            content
        </div>}
    </div>
  )
}

export default memo(SearchItem)