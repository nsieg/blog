import markdownStyles from "./markdown-styles.module.css";

type Props = {
  content: string;
};

const PostBody = ({ content }: Props) => {
  return (
    <div className="max-w-3xl md:border-2 md:px-8 md:py-2 rounded-xl">
      <div
        className={markdownStyles["markdown"]}
        dangerouslySetInnerHTML={{ __html: content }}
        id="postcontent"
      />
    </div>
  );
};

export default PostBody;
