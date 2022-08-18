import * as Sentry from "@sentry/browser";
import { ThunkResult } from "src/apps/main/redux";
import { LandingPageState } from "src/apps/main/redux/reducers/landing-page";
import { fetchV2 } from "src/common/utils/fetch";

export const fetchDzCodeMilestones = (): ThunkResult<LandingPageState> => async (dispatch) => {
  try {
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { milestones: null },
    });
    const { milestones } = await fetchV2("api:MileStones/dzcode", {});

    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { milestones },
    });
  } catch (error) {
    dispatch({
      type: "UPDATE_LANDING_PAGE",
      payload: { milestones: "ERROR" },
    });
    Sentry.captureException(error, { tags: { type: "WEB_FETCH" } });
  }
};
