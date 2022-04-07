import { useNavigate } from 'react-router-dom'

export const Pong = () => {
  const navigate = useNavigate()

  return (
    <>
      <div>
        Order confirmed!
        <button onClick={() => navigate(-1)}>Go back</button>
      </div>
    </>
  )
}