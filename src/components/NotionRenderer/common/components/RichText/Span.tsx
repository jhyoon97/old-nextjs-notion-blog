import { css, useTheme } from "@emotion/react";

// types
import type { RichTextItemResponse } from "@notionhq/client/build/src/api-endpoints";
import type { Theme } from "@emotion/react";

interface Props {
  richTextItem: RichTextItemResponse;
}

const spanText = (theme: Theme, richTextItem: RichTextItemResponse) => css`
  font-style: ${richTextItem.annotations.italic ? "italic" : "inherit"};
  font-weight: ${richTextItem.annotations.bold ? "bold" : "inherit"};
  text-decoration: ${(() => {
    const decorations = [];

    if (richTextItem.annotations.underline) {
      decorations.push("underline");
    }
    if (richTextItem.annotations.strikethrough) {
      decorations.push("line-through");
    }
    return decorations.join(" ") || "unset";
  })()};
  color: ${(() => {
    if (richTextItem.annotations.color === "default") {
      return "inherit";
    }

    if (!richTextItem.annotations.color.endsWith("background")) {
      return theme.notion[richTextItem.annotations.color];
    }

    return "inherit";
  })()};
  background: ${(() => {
    if (richTextItem.annotations.color === "default") {
      return "unset";
    }

    if (richTextItem.annotations.color.endsWith("background")) {
      return theme.notion[richTextItem.annotations.color];
    }

    return "unset";
  })()};
`;

const Span = ({ richTextItem }: Props) => {
  const theme = useTheme();

  if (
    richTextItem.annotations.bold ||
    richTextItem.annotations.italic ||
    richTextItem.annotations.strikethrough ||
    richTextItem.annotations.underline ||
    richTextItem.annotations.color !== "default"
  ) {
    return (
      <span css={() => spanText(theme, richTextItem)}>
        {richTextItem.plain_text}
      </span>
    );
  }

  return <>{richTextItem.plain_text}</>;
};

export default Span;
