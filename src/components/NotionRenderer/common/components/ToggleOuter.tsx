import { css } from "@emotion/react";
import React, { useState } from "react";
import { BiCaretRight } from "react-icons/bi";

// components
import NotionRenderer from "components/NotionRenderer";

// types
import type { HasChildrenBlockObject } from "types/notion";
import type { Theme } from "@emotion/react";

import { LINE_HEIGHT } from "../constants";

interface Props {
  childrenBlocks?: Array<HasChildrenBlockObject>;
  isToggleable?: boolean;
  depth: number;
  children: React.ReactNode;
}

const box = css`
  display: flex;
  flex-direction: column;
  width: 100%;
`;

const titleRow = css`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
`;

const toggleButtonBox = css`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 1.5rem;
  height: ${LINE_HEIGHT}em;
`;

const toggleButton = (theme: Theme) => css`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  margin-right: 0.5rem;
  width: 100%;
  height: 1.5rem;
  border-radius: 3px;

  & > svg {
    transition: transform 0.3s;
  }

  &:hover {
    background: ${theme.hoverBackground};
  }
`;

const childrenBox = css`
  margin-left: 1.5rem;
`;

const ToggleOuter = ({
  childrenBlocks,
  isToggleable,
  depth,
  children,
}: Props) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div css={box}>
      <div css={titleRow}>
        {isToggleable && (
          <div css={toggleButtonBox}>
            <button
              type="button"
              css={toggleButton}
              onClick={() => setIsOpen(!isOpen)}
            >
              <BiCaretRight
                size="20"
                style={{
                  transform: isOpen ? "rotate(90deg)" : "rotate(0deg)",
                }}
              />
            </button>
          </div>
        )}

        {children}
      </div>

      {childrenBlocks && isToggleable && isOpen && (
        <div css={childrenBox}>
          <NotionRenderer
            blocks={childrenBlocks}
            depth={depth}
            style={{ marginTop: "0.5rem" }}
          />
        </div>
      )}
    </div>
  );
};

export default ToggleOuter;
