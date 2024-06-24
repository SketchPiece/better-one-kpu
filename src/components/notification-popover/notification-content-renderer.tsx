import { Child, ContentStructure, Element } from "@/lib/kpu-api/types";
import { Fragment } from "react/jsx-runtime";

interface NotificationContentRendererProps {
  content: ContentStructure;
  showMore?: boolean;
}

const renderNode = (node: Child | Element): React.ReactNode => {
  const type = node.type.toLowerCase();
  if (type === "text") {
    return (node as Child)?.value;
  }

  if (type === "br") {
    return <br />;
  }

  if (type === "p") {
    return (
      <p className="my-2 text-sm">
        {node.children && node.children?.map((child) => renderNode(child))}
      </p>
    );
  }

  const Tag = type as keyof JSX.IntrinsicElements;

  return (
    <Tag>
      {node.children &&
        node.children.map((child, index) => (
          <Fragment key={index}>{renderNode(child)}</Fragment>
        ))}
    </Tag>
  );
};

export default function NotificationContentRenderer({
  content,
  showMore = false,
}: NotificationContentRendererProps) {
  if (showMore) {
    return (
      <div>
        {content.map((node, index) => (
          <Fragment key={index}>{renderNode(node)}</Fragment>
        ))}
      </div>
    );
  }
  const node = content[0];
  return renderNode(node);
}
