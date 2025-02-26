import React from 'react'
import { MdSort } from 'react-icons/md'
import { BsEmojiGrin } from "react-icons/bs";
import { BiDislike, BiLike } from 'react-icons/bi';
import { HiOutlineDotsVertical } from 'react-icons/hi';
const Comments_Page = () => {
  return (
    <div className="app_container2">
      <div className="component_container">
        <div className="comment_container">
            <div className="first_raw">
                <span>{`${'526'}`} Comments</span>
                <span>
                <MdSort /> Sort by
                </span>
            </div>
            <div className="second_raw">
                <span>user profile icon</span>
                <input type="text" />
                <div className="btns">
                    <span><BsEmojiGrin /></span>
                    <div className="right">
                        <button>Cancel</button>
                        <button>Comments</button>
                    </div>
                </div>
            </div>
            <div className="third_raw">
            <span>user profile icon</span>
            <div>
                <div>
                    <span>user id</span><span>{`${'9'} ${'hours'} ago`}</span>
                </div>
                <div className="">comment body fhdskjfhdskfhskhfksdfhdksfhkdsfhdslfh</div>
                <div className=""><BiLike /> <BiDislike />  <button>Reply</button></div>
            </div>
            <HiOutlineDotsVertical />
            </div>
        </div>

      </div>
      </div>
  )
}

export default Comments_Page
