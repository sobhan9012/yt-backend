import { Router } from "express";
import { loginUser,
         logoutUser, 
         registerUser, 
         refreshAccessToken, 
         changeCurrentUserPassword, 
         getCurrentUser,
         updateAccountDetails,
         updateUserAvatar,
         updateUserCoverImage, 
        } from "../controllers/user.controllers.js";
import { upload } from "../middlewares/multer.middleware.js"
import { verifyJwt } from "../middlewares/auth.middleware.js";

const router = Router();

router.route('/register').post(upload.fields([
    {
        name : "avatar",
        maxCount : 1
    },
    {
        name : "coverImage",
        maxCount : 1
    }
]),registerUser)

router.route('/login').post(loginUser)

//secured routes
router.route('/logout').post(verifyJwt, logoutUser)
router.route('/refresh-token').post(refreshAccessToken)
router.route("/change-password").post(verifyJwt, changeCurrentUserPassword)
router.route("/current-user").get(verifyJwt, getCurrentUser)
router.route("/update-account").patch(verifyJwt, updateAccountDetails)

router.route("/update-avatar").patch(verifyJwt, upload.single("avatar"), updateUserAvatar)
router.route("/update-cover-image").patch(verifyJwt, upload.single("coverImage"), updateUserCoverImage)

export default router;