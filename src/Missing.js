import { Link } from "react-router-dom"

const Missing = () => {
  return (
    <>
      <h2>Post Not Found</h2>
      <p>
        <Link to="/">Visit Our Homepage</Link>
      </p>
    </>
  )
}

export default Missing