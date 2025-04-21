export interface Course {
    id: number
    name: string
    description: string
    image: string
    lessons: number
}

export interface CourseList {
    courses: Course[]
}
