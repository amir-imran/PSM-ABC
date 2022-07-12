import db from "../../../utils/db"
import nc from "next-connect"
import Student from "../../../models/Student"
import student from "../../../data/user"

const handler = nc().get(async (req, res) => {
  await db.connect()
  await Student.deleteMany({})
  await Student.insertMany(student.students)
  await db.disconnect()
  res.send({ message: "Students seeded successfully" })
})

export default handler
