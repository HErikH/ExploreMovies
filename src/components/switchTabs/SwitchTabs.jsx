import { useState } from 'react'
import './style.scss'

function SwitchTabs({ data, onChangeTab }) {
  const [selectedTab, setSelectedTab] = useState(0)
  const [left, setLeft] = useState(0)
 
  function activeTab(tab, index) {
    setLeft(index * 100)
    setTimeout(() => {
        setSelectedTab(index)
    }, 300)
    onChangeTab(tab, index)
  }

  return (
    <div className='switchingTabs'>
        <div className="tab-items">
            {data.map((tab, index) => {
                return (
                <span 
                key={index} 
                className={`tab-items__item ${selectedTab == index ? 'active' : ''}`}
                onClick={() => activeTab(tab, index)}
                >
                    {tab}
                </span>
                )
            })}
            <span className='movingBg' style={{ left }} />
        </div>
    </div>
  )
}

export default SwitchTabs