import React, { useRef, useState, useEffect } from 'react'
import { throttle } from 'lodash'

// Used to calculate each heading's offset from the top of the page.
// This will be compared to window.scrollY to determine which heading
// is currently active.
const accumulateOffsetTop = (el: HTMLElement | null, totalOffset = 0) => {
  while (el) {
    totalOffset += el.offsetTop - el.scrollTop + el.clientTop
    el = el.offsetParent as HTMLElement
  }
  return totalOffset
}

type Title = {
    title: string,
    depth: number
}

type Headings = {
    titles: Title[],
    nodes: HTMLElement[],
    minDepth: number,
}


export default function Toc() {
  const throttleTime = 200, tocTitle = `Contents`
  const [headings, setHeadings] = useState<Headings>({
    titles: [],
    nodes: [],
    minDepth: 0,
  })  
  // Controls which heading is currently highlighted as active.
  const [active, setActive] = useState<number>()
  // Read heading titles, depths and nodes from the DOM.
  useEffect(() => {
    // Fallback to sensible defaults for headingSelector, getTitle and getDepth
    // inside useEffect rather than specifying them as Toc default props to avoid
    // the need for useMemo and useCallback, resp.
    // Otherwise, these would change on every render and since this effect calls
    // setHeadings which triggers a rerender, it would cause an infinite loop.
    // The default selector targets all headings (h1, h2, ..., h6) inside
    // a main element. You can pass in whatever string or array of strings
    // targets all the headings you want to appear in the ToC.

   // type HtmlTag = keyof HTMLElementTagNameMap
   // const selector = headingSelector as unknown as HtmlTag

  //  const selector: [keyof HTMLElementTagNameMap] =
  //</HtmlTagList>    headingSelector || 
  const selector = Array.from({ length: 3 }, (_, i) => `#postcontent > h` + (i + 1))
    const nodes = Array.from(document.querySelectorAll(selector as unknown as keyof HTMLElementTagNameMap))
    const titles = nodes.map(node => ({
  //    title: getTitle ? getTitle(node) : node.innerText,
  //    depth: getDepth ? getDepth(node) : Number(node.nodeName[1]),
        title: node.innerText,
        depth:  Number(node.nodeName[1]),
    }))
    // Compute the minimum heading depth. Will be subtracted from each heading's
    // depth to determine the indentation of that heading in the ToC.
    const minDepth = Math.min(...titles.map(h => h.depth))
  //  const stringNodes = nodes as unknown as string[]
    setHeadings({ titles, nodes,  minDepth })
  }, [tocTitle])
  // Add scroll event listener to update currently active heading.
  useEffect(() => {
    // Throttling the scrollHandler saves computation and hence battery life.
    const scrollHandler = throttle(() => {
      const { titles, nodes } = headings
      // Offsets need to be recomputed inside scrollHandler because
      // lazily-loaded content increases offsets as user scrolls down.
      const offsets = nodes.map(el => accumulateOffsetTop(el))
      const activeIndex = offsets.findIndex(
        offset => offset > window.scrollY + 0.8 * window.innerHeight
      )
      setActive(activeIndex === -1 ? titles.length - 1 : activeIndex - 1)
    }, throttleTime)
    window.addEventListener(`scroll`, scrollHandler)
    return () => window.removeEventListener(`scroll`, scrollHandler)
  }, [headings])
  return (
    <>
      <aside className="hidden md:block sticky top-6 max-w-sm max-h-36 z-30 mx-8 px-3 py-5">
        <h2 className="block border-l-4 pl-2 border-green-500 pb-2">
          {tocTitle || `Contents`}
        </h2>
        <nav className="">
          {headings.titles.map(({ title, depth }, index) => (
            <a
              className={linkClassName(active, index, depth)}
              key={title}
              onClick={event => {
                event.preventDefault()
                headings.nodes[index].scrollIntoView({
                  behavior: `smooth`,
                  block: `center`,
                })
              }}
            >
              {title}
            </a>
          ))}
        </nav>
      </aside>
    </>
  )
}

const linkClassName = (active:number | undefined, index: number, depth: number): string => {
    let res = `cursor-pointer hover:underline block border-l-4 pl-${(depth-1)*2}`
    if (active === index) res+= " font-bold" 
    if (active !== undefined && active >= index) res+= " border-green-500" 
    return res
}