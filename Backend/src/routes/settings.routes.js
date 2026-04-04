const { Router } = require("express");
const { authUser } = require("../middlewares/auth.middleware");
const settingsController = require("../controllers/settings.controller");
const upload = require("../middlewares/upload.middleware");

const settingsRouter = Router();

/**
 * @route GET /api/settings
 * @description Get current user's settings and profile information.
 * @access Private
 */
settingsRouter.get("/", authUser, settingsController.getSettingsController);

/**
 * @route PATCH /api/settings/account
 * @description Update account information (name, email, profile picture).
 * @access Private
 */
settingsRouter.patch("/account", authUser, settingsController.updateAccountSettingsController);

/**
 * @route PATCH /api/settings/appearance
 * @description Update appearance settings (theme).
 * @access Private
 */
settingsRouter.patch("/appearance", authUser, settingsController.updateAppearanceSettingsController);

/**
 * @route PATCH /api/settings/notifications
 * @description Update notification preferences.
 * @access Private
 */
settingsRouter.patch("/notifications", authUser, settingsController.updateNotificationSettingsController);

/**
 * @route GET /api/settings/sessions
 * @description Get a list of active sessions for the user.
 * @access Private
 */
settingsRouter.get("/sessions", authUser, settingsController.getActiveSessionsController);

/**
 * @route DELETE /api/settings/account
 * @description Permanently delete the current user's account and related data.
 * @access Private
 */
settingsRouter.delete("/account", authUser, settingsController.deleteAccountController);


settingsRouter.post(
    "/upload-avatar",
    authUser,
    upload.single("avatar"),
    settingsController.uploadProfilePictureController
);

module.exports = settingsRouter;

