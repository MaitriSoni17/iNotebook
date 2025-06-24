import React, { useContext, useEffect } from 'react'
import noteContext from '../context/notes/noteContext'
export const About = () => {
  const a = useContext(noteContext)
  useEffect(() => {
    a.update();
    // eslint-disable-next-line
  }, [])
  
  return (
    <div>
        This is About Page {a.state.name}
    </div>
  )
}
export default About