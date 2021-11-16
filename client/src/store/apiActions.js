import { createAction } from "@reduxjs/toolkit";

export const callRequest = createAction("api/callRequest");
export const callSuccess = createAction("api/callSuccess");
export const callFailed = createAction("api/callFail");
