import React from "react"

const Events = ({ subTitle, title }) => {
  return (
    <>
      <div className="border-l-4 pl-2 border-l-secondary">
        <h1 className=" font-semibold">{title}</h1>
        <p className="font-light text-sm">{subTitle}</p>
      </div>
    </>
  )
}

export default Events
