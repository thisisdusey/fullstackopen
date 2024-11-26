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

  const Total = ({parts}) =>{
    const total = parts.reduce((accumulator, part) => accumulator + part.exercises, 0);
  return(
    <div>
      <p><b>Number of exercises: {total}</b></p>
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

  const Header = ({course}) =>{
    return(
      <div>
        <h1>{course} </h1>
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

  export default Course