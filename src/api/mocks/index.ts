import { CourseList } from "../types"

export const getCourses = (): CourseList["courses"] => {
    const coursesData: CourseList = require("../data/course.json")
    return coursesData.courses
}
