import { map } from "unist-util-map";
import { Transformer } from "unified";
import admon from "./admonitionCode";

type Node = import("unist").Node;
type Parent = import("unist").Parent;
type Literal = import("unist").Literal;

const getAdmonType = (node: Node) => {
  if (node.type !== "paragraph") return "none";
  const parentNode = <Parent>node;
  if (parentNode.children === undefined) return "none";
  const firstChild = parentNode.children[0];
  if (firstChild.type !== "text") return "none";
  const firstChildLiteralValue = <string>(<Literal>firstChild).value;
  const matches = firstChildLiteralValue.match(":::.*\\n");
  return matches ? matches[0].slice(3, -1) : "none";
};

const replaceValue = (literalNode: Literal, oldV: string, newV: string) => {
  return {
    ...literalNode,
    value: (<string>literalNode.value).replace(oldV, newV),
  };
};

const handleFormat = (node: Node) => {
  const tags: { [key: string]: string } = {
    strong: "strong",
    emphasis: "em",
  };

  if (!Object.keys(tags).includes(node.type)) return node;
  const parentNode = <Parent>node;

  return {
    type: "element",
    tagName: tags[parentNode.type],
    data: {
      hName: tags[parentNode.type],
      hChildren: parentNode.children,
    },
    children: parentNode.children,
  };
};

const admonTypes = ["note", "important", "tip", "caution", "warning"];

const transform = (node: Parent, admonType: string) => {
  let children = node.children.map((el, idx) => {
    let newEl = el;
    if (idx === 0)
      newEl = replaceValue(<Literal>newEl, ":::" + admonType + "\n", "");
    if (idx === node.children.length - 1)
      newEl = replaceValue(<Literal>newEl, "\n:::", "");
    newEl = handleFormat(newEl);
    return newEl;
  });

  return admon(children, admonType);
};

export default function retextSentenceSpacing(): Transformer {
  return (tree: Node) => {
    return map(tree, (node) => {
      if (admonTypes.includes(getAdmonType(node))) {
        return transform(<Parent>node, getAdmonType(node));
      }
      return node;
    });
  };
}
