function CourseCard({ course }) {
  return (
    <div className="course-card">
      <h3>{course.title}</h3>
      <p><strong>Duration:</strong> {course.duration}</p>
      <p><strong>Level:</strong> {course.level}</p>
      <button className="enroll-btn">Enroll Now</button>
    </div>
  )
}

export default CourseCard
