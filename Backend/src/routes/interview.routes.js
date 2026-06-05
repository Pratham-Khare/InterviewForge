import express from "express";

import { authUser } from "../middlewares/auth.middleware.js";
import {
    generateInterViewReportController,
    getInterviewReportByIdController,
    getAllInterviewReportsController,
    generateResumePdfController
} from "../controllers/interview.controller.js";

import upload from "../middlewares/file.middleware.js";

import { checkUserTokens } from "../middlewares/token.middleware.js";

const interviewRouter = express.Router();

/**
 * @route POST /api/interview/
 * @description generate new interview report on the basis of user self description,resume pdf and job description.
 * @access private
 */
interviewRouter.post(
    "/",
    authUser,
    checkUserTokens,
    upload.single("resume"),
    generateInterViewReportController
);

/**
 * @route GET /api/interview/report/:interviewId
 * @description get interview report by interviewId.
 * @access private
 */
interviewRouter.get(
    "/report/:interviewId",
    authUser,
    getInterviewReportByIdController
);

/**
 * @route GET /api/interview/
 * @description get all interview reports of logged in user.
 * @access private
 */
interviewRouter.get(
    "/",
    authUser,
    getAllInterviewReportsController
);

/**
 * @route POST /api/interview/resume/pdf/:interviewReportId
 * @description generate resume pdf on the basis of user self description, resume content and job description.
 * @access private
 */
interviewRouter.post(
    "/resume/pdf/:interviewReportId",
    authUser,
    checkUserTokens,
    generateResumePdfController
);

export default interviewRouter;