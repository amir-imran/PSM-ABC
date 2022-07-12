import React from "react"
import PropTypes from "prop-types"
import Icon from "../Icon"
export default function CardStats({
  subTitle,
  title,
  iconName = "fa-money-check",
  statIconColor,
}) {
  return (
    <>
      <div className="relative break-words bg-primary text-noir rounded border-2 flex justify-center items-center border-black xl:mb-0 shadow-lg">
        <div className=" px-2 py-2">
          <div className="flex gap-2 justify-between items-center">
            <div className="relative  flex-initial">
              <div
                className={
                  "text-black p-2 text-center inline-flex items-center justify-center shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <Icon name={iconName} size="xl" />
              </div>
            </div>
            <div className="relative w-full pr-4  flex-grow flex-1">
              <h5 className="uppercase font-bold text-xs">{subTitle}</h5>
              <span className="font-semibold text-xl text-blueGray-700 truncate">
                {title}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}

CardStats.defaultProps = {
  subTitle: "Earnings",
  title: "RM682.00",

  iconName: "fa-users",
  statIconColor: "bg-black",
}

CardStats.propTypes = {
  subTitle: PropTypes.string,
  statTitle: PropTypes.string,
  iconName: PropTypes.string,
  statIconColor: PropTypes.string,
}
