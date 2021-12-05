import Avatar from './avatar'
import DateFormatter from './date-formatter'
import CoverImage from './cover-image'
import PostTitle from './post-title'
import Author from '../types/author'

type Props = {
  title: string
  coverImage: string
  date: string
  author: Author
  tags: string
}

const PostHeader = ({ title, coverImage, date, author, tags }: Props) => {
  return (
    <>
      <PostTitle>{title}</PostTitle>
      <div className="hidden md:mb-12">
        <Avatar name={author.name} picture={author.picture} />
      </div>
      <div className="mb-8 md:mb-8 sm:mx-0">
        <CoverImage title={title} src={coverImage} />
      </div>
      <div className="max-w-3xl mx-auto">
        <div className="hidden mb-6">
          <Avatar name={author.name} picture={author.picture} />
        </div>
        <div className="mb-6 text-lg">          
          <span className="mr-2 italic">
            Posted:&nbsp;
            <DateFormatter dateString={date} />
          </span>
          {tags.split(",").map((x) => <span className="ml-1 italic" key={"tag-"+x}>#{x}</span>)}
        </div>
      </div>
    </>
  )
}

export default PostHeader