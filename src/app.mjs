import express from "express";
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use((req, res, next) => {
    res.status(404).json({
        success: false,
        message: "API endpoint doesn't exist",
        erroeMessages: [
            {
                path: "",
                message: "API endpoint doesn't exist",
            },
        ],
    });
});

export default app;
