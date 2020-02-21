import React, { useState } from "react"
import { connect } from "react-redux"
import { addPost } from "../../actions/post"

const PostForm = ({ addPost }) => {
  const [text, setText] = useState("")

  const submitHandler = async event => {
    event.preventDefault()
    addPost({ text })
    console.log(text)
    setText("")
  }

  return (
    <div>
      <div>
        <h3 className='text-secondary my-3'>Say something</h3>
      </div>
      <form className='form my-2' onSubmit={event => submitHandler(event)}>
        <div className='form-group'>
          <textarea
            name='text'
            col='30'
            rows='5'
            className='form-control'
            value={text}
            onChange={e => setText(e.target.value)}
            placeholder='Create a post'
          />
        </div>
        <button type='submit' className='btn btn-primary'>
          Submit
        </button>
      </form>
    </div>
  )
}

export default connect(null, { addPost })(PostForm)
