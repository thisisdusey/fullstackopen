const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      },
      {
        name: 'Redux',
        exercises: 11
      }
    ]
  }
  


const Header = (props) =>{
  return(
    <div>
      <h1>{props.course} </h1>
    </div>
  )
}
const Content = (props) =>{
  return(
    <div>
<Part part = {course.parts[0].name} exercises={course.parts[0].exercises}/> 
<Part part = {course.parts[1].name} exercises={course.parts[1].exercises}/> 
<Part part = {course.parts[2].name} exercises={course.parts[2].exercises}/> 
<Part part = {course.parts[3].name} exercises={course.parts[3].exercises}/> 



</div>
  )
}
const Part = (props) =>{
  return(
    <div>
      <p>{props.part} with {props.exercises} excercises</p>
    </div>
  )
}
const Total = (props) =>{
return(
  <div>
    <p><b>Number of exercises: {props.parts}</b></p>
  </div>
)
}

const Course = ({course}) =>{
  return(
    <div>
    <Header course={course.name} />
    <Content parts={course.parts} />
    <Total parts={total} />
    </div>
  )
}

const total = course.parts.reduce((accumulator, part) => {return accumulator +part.exercises},0);

return <Course course={course} />
}

export default App