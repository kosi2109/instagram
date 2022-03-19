import React from 'react'
import PreviewCard from './PreviewCard'

function PreviewCardContainer({posts}) {
    console.log(posts);
  return (
    <div className='columns-3 gap-2 relative mt-2'>
        {posts?.map(post=>(
            <PreviewCard slug={post?._id} image={post.images[0]} likes={post?.likes.length} comments={post?.comment.length} />
        ))}
    </div>
  )
}

export default PreviewCardContainer