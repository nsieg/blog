import remarkPrism from "remark-prism";
import remarkRehype from "remark-rehype";
import rehypeStringify from "rehype-stringify";
import rehypeFormat from "rehype-format";
import admonitions from "./plugin-admonitions";
import remarkParse from "remark-parse";
import remarkStringify from "remark-stringify/lib";
import { unified } from "unified";
import video from "./video";

export default async function markdownToHtml(markdown: string) {
  const res = await unified()
    .use(remarkParse)
    .use(remarkStringify)
    // @ts-expect-error: No overload matches this call
    .use(remarkPrism, {
      transformInlineCode: true,
      plugins: ["line-numbers"],
    })
    .use(admonitions)
    .use(video)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown);

  return res.toString();
}
