import {remark} from 'remark'
import remarkPrism from 'remark-prism'
import remarkRehype from 'remark-rehype'
import rehypeStringify from 'rehype-stringify'
import rehypeFormat from 'rehype-format'

export default async function markdownToHtml(markdown: string) {

 const res = await remark()
    // @ts-expect-error: No overload matches this call
    .use(remarkPrism)
    .use(remarkRehype)
    .use(rehypeFormat)
    .use(rehypeStringify)
    .process(markdown)
    
  return res.toString()

}
