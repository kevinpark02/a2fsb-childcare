//! DECLARING CONSTANTS - START
    // Router object is returned using express
        const express = require("express");
        const router = express.Router();
//! DECLARING CONSTANTS - END

//! ADD ROUTES - START
    // Test route
        router.get("/test", (req, res) => {
            res.json({ msg: "This is the children route" });
        });
//! ADD ROUTES - END

module.exports = router;
