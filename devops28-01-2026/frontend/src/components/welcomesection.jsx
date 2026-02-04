import CourseCard from "./coursecard"
import courses from "../data/courses"

function CoursesSection() {
  return (
    <section className="courses">
      <h2>Available Courses</h2>
      <div className="courses-grid">
        {courses.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </section>
  )
}

export default CoursesSection
