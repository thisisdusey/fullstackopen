const Notification = ({ message, type }) => {
let messageStyle = {
    update:{
    color: 'green',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  delete:{
    color: 'red',
    background: 'lightgrey',
    fontSize: 20,
    borderStyle: 'solid',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  }}
    if (message === null) {
      return null
    }

    return (
      <div style={type === "update" 
        ? messageStyle.update 
        : type ==="delete" 
        ? messageStyle.delete
        : type ==="error" 
        ? messageStyle.delete : null }>
        {message}
      </div>
    )
  }
  
  export default Notification