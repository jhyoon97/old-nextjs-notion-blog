import dayjs from "dayjs";
import { isFullPage, isFullBlock } from "@notionhq/client";

// utils
import notionUtils from "utils/notion";

// services
import notionServices from "services/notion";

// types
import type { APIPostResponse } from "types/api-route";

import client from "./client";

export default async (pageId: string): Promise<APIPostResponse> => {
  try {
    const pageResponse = await client.pages.retrieve({
      page_id: pageId,
    });
    const contentBlocks = await notionServices.getChildren(pageId);

    if (isFullPage(pageResponse)) {
      if (
        process.env.NODE_ENV === "production" &&
        pageResponse.properties.isPublic.type === "checkbox"
      ) {
        if (!pageResponse.properties.isPublic.checkbox) {
          throw new Error("getPage: 공개되지 않은 페이지입니다.");
        }
      }

      const pageData = {
        title: notionUtils.getPageTitle(pageResponse),
        createdAt: dayjs(pageResponse.created_time).format("YYYY-MM-DD"),
        hasTableOfContents: !!contentBlocks.find(
          (block) => isFullBlock(block) && block.type === "table_of_contents"
        ),
        blocks: await notionUtils.deepFetchAllChildren(
          contentBlocks.filter((block) => isFullBlock(block))
        ),
      };

      return pageData;
    }

    throw new Error("getPage: no PartialPageResponse");
  } catch (err) {
    return Promise.reject(err);
  }
};
