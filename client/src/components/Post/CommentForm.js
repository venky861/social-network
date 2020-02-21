import React, { useState } from "react"
import { connect } from "react-redux"
import { addComment } from "../../actions/post"

const CommentForm = ({ addComment, postId }) => {
  const [text, setText] = useState("")

  const submitHandler = async event => {
    event.preventDefault()
    addComment(postId, { text })
    console.log(text)
    setText("")
  }
  return (
    <div>
      <div>
        <h3 className='text-secondary my-2 '>Leave a Comment</h3>
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

export default connect(null, { addComment })(CommentForm)
