import { Transformer } from "unified";
import { map } from "unist-util-map";

type Node = import("unist").Node;

interface ImageNode extends Node {
  url: string;
  tagName: string;
}

export default function plugin(): Transformer {
  return (tree: Node) => {
    return map(tree, (node) => {
      if (node.type === "image") {
        let imageNode = <ImageNode>node;
        if (imageNode.url.endsWith(".mp4")) {
          imageNode.tagName = "video";
          imageNode.data = {
            hName: "video",
            hProperties: {
              muted: true,
              controls: true,
              src: imageNode.url,
            },
          };
        }
      }
      return node;
    });
  };
}
