import { Router } from "express";
import {
    registerUserController,
    loginUserController,
    logoutUserController,
    getMeController,
    googleOAuthRedirectController,
    googleOAuthCallbackController,
    githubOAuthRedirectController,
    githubOAuthCallbackController
} from "../controllers/auth.controller.js";

import { authUser } from "../middlewares/auth.middleware.js";

const authRouter = Router();

/**
 * @route POST /api/auth/register
 * @description Register a new user
 * @access Public
 */
authRouter.post("/register", registerUserController);

/**
 * @route POST /api/auth/login
 * @description Login user with email and password
 * @access Public
 */
authRouter.post("/login", loginUserController);

/**
 * @route GET /api/auth/logout
 * @description Clear token from user cookie and add the token in blacklist
 * @access Public
 */
authRouter.get("/logout", logoutUserController);

/**
 * @route GET /api/auth/get-me
 * @description Get the current logged in user details
 * @access Private
 */
authRouter.get("/get-me", authUser, getMeController);

/**
 * @route GET /api/auth/google
 * @description Start Google OAuth2 login
 * @access Public
 */
authRouter.get("/google", googleOAuthRedirectController);

/**
 * @route GET /api/auth/google/callback
 * @description Google OAuth2 callback
 * @access Public
 */
authRouter.get("/google/callback", googleOAuthCallbackController);

/**
 * @route GET /api/auth/github
 * @description Start GitHub OAuth2 login
 * @access Public
 */
authRouter.get("/github", githubOAuthRedirectController);

/**
 * @route GET /api/auth/github/callback
 * @description GitHub OAuth2 callback
 * @access Public
 */
authRouter.get("/github/callback", githubOAuthCallbackController);

export default authRouter;