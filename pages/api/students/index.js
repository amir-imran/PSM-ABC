import db from "../../../utils/db"
import nc from "next-connect"
import Student from "../../../models/Student"

const handler = nc().get(async (req, res) => {
  await db.connect()
  const students = await Student.find({})
  res.send(students)
  await db.disconnect()
})

export default handler
