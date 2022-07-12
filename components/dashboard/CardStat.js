import React from "react";
import PropTypes from "prop-types";
import Icon from "../Icon";
export default function CardStats({
  statSubtitle,
  statTitle,
  statArrow,
  statPercent,
  statPercentColor,
  statDescripiron,
  iconName = "fa-users",
  statIconColor,
}) {
  return (
    <>
      <div className="relative break-words bg-white text-black rounded  xl:mb-0 shadow-lg">
        <div className="flex-auto p-4">
          <div className="flex gap-2 justify-between">
            <div className="relative w-auto pl-4 flex-initial">
              <div
                className={
                  "text-black p-3 text-center inline-flex items-center justify-center w-12 h-12 shadow-lg rounded-full " +
                  statIconColor
                }
              >
                <Icon name={iconName} size="xl" />
              </div>
            </div>
            <div className="relative w-full pr-4  flex-grow flex-1">
              <h5 className="uppercase font-bold text-xs">{statSubtitle}</h5>
              <span className="font-semibold text-xl text-blueGray-700 truncate">
                {statTitle}
              </span>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

CardStats.defaultProps = {
  statSubtitle: "Classes",
  statTitle: "35",
  statArrow: "up",
  statPercent: "3.48",
  statPercentColor: "text-emerald-500",
  statDescripiron: "Since last month",
  iconName: "fa-users",
  statIconColor: "bg-black",
};

CardStats.propTypes = {
  statSubtitle: PropTypes.string,
  statTitle: PropTypes.string,
  statArrow: PropTypes.oneOf(["up", "down"]),
  statPercent: PropTypes.string,
  // can be any of the text color utilities
  // from tailwindcss
  statPercentColor: PropTypes.string,
  statDescripiron: PropTypes.string,
  iconName: PropTypes.string,
  // can be any of the background color utilities
  // from tailwindcss
  statIconColor: PropTypes.string,
};
