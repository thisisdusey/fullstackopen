const App = () => {
  const courses = [
    {
      name: 'Half Stack application development',
      id: 1,
      parts: [
        {
          name: 'Fundamentals of React',
          exercises: 10,
          id: 1
        },
        {
          name: 'Using props to pass data',
          exercises: 7,
          id: 2
        },
        {
          name: 'State of a component',
          exercises: 14,
          id: 3
        },
        {
          name: 'Redux',
          exercises: 11,
          id: 4
        }
      ]
    }, 
    {
      name: 'Node.js',
      id: 2,
      parts: [
        {
          name: 'Routing',
          exercises: 3,
          id: 1
        },
        {
          name: 'Middlewares',
          exercises: 7,
          id: 2
        }
      ]
    }
  ]
  


const Header = ({course}) =>{
  return(
    <div>
      <h1>{course} </h1>
    </div>
  )
}
const Content = ({parts}) =>{
  return(
    <div>
      {parts.map((part) => (
        <Part key={part.id} part={part.name} exercises={part.exercises} />
      ))}
    </div>
  )
}
const Part = ({ part, exercises }) =>{
  return(
    <div>
      <p>{part} with {exercises} excercises</p>
    </div>
  )
}
const Total = ({parts}) =>{
  const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
return(
  <div>
    <p><b>Number of exercises: {total}</b></p>
  </div>
)
}

const Course = ({curriculum}) =>{
  return (
    <div>
      {curriculum.map((course)=>(
        <div key={course.id}>
      <Header course={course.name} />
      <Content parts={course.parts} />
      <Total parts={course.parts} />
      </div>
      ))}
    </div>
  );
};
console.log(Course)

return <Course curriculum={courses} />
}

export default App