import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
const Icon = ({
  name,
  fa = "fa-solid",
  size = "1x",
  color = "#fff",
  ...otherProps
}) => {
  return (
    <FontAwesomeIcon
      color={color}
      icon={`${fa} ${name}`}
      size={size}
      spin={false}
      {...otherProps}
    />
  )
}

export default Icon
