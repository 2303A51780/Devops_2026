import Navbar from "./components/navbar"
import WelcomeSection from "./components/welcomesection"
import CoursesSection from "./components/coursesectio"
import Footer from "./components/Footer"
import "./index.css"

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <WelcomeSection />
        <CoursesSection />
      </main>
      <Footer />
    </>
  )
}

export default App 
