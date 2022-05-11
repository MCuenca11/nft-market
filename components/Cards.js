import React, { useState, useContext, useEffect } from 'react'
import Card from './Card'
import { MarketContext } from '../context/MarketContext'

const Cards = () => {
  const styles = {
    container: `h-full w-full flex flex-col ml-[20px] -mt-[50px]`,
    title: `text-xl font-bolder mb-[20px] mt-[30px]  ml-[30px]`,
    cards: `flex items-center  flex-wrap gap-[80px]`,
  }
  const { assets } = useContext(MarketContext)

  return (
    <div className={styles.container}>
      <div className={styles.title}>New Release</div>
      <div className={styles.cards}>
        <div className={styles.cards}>
        {/* for each asset, make a card component */}
          {assets.map(item => {
            let asset = item.attributes

            return <Card key={item.id} item={item.attributes} />
          })}
        </div>
      </div>
    </div>
  )
}

export default Cards