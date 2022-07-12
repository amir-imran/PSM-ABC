import db from "../../../utils/db"
import nc from "next-connect"
import User from "../../../models/User"
import user from "../../../data/user"

const handler = nc().get(async (req, res) => {
  await db.connect()
  await User.deleteMany({})
  await User.insertMany(user.users)
  await db.disconnect()
  res.send({ message: "Users seeded successfully" })
})

export default handler
