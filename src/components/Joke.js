const Joke = ({ onClick, joke }) => {

  return (
        <div onClick={ onClick }>{ joke }</div>
    )
  }

export default Joke