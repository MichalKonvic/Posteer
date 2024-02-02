"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const dotenv_1 = __importDefault(require("dotenv"));
const faker_1 = require("@faker-js/faker");
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const port = process.env.PORT || 3000;
const postCount = Number(process.env.POST_COUNT) || 100;
const posts = Array.from({ length: postCount }, () => {
    return {
        id: faker_1.faker.string.uuid(),
        user: {
            id: faker_1.faker.string.uuid(),
            displayName: faker_1.faker.person.fullName(),
            username: faker_1.faker.internet.userName(),
            avatar: faker_1.faker.image.avatar(),
        },
        title: faker_1.faker.lorem.sentence(),
        content: faker_1.faker.lorem.paragraphs(),
        createdAt: faker_1.faker.date.past(),
        updatedAt: faker_1.faker.date.recent(),
    };
});
app.use((0, cors_1.default)());
app.get("/", (req, res) => {
    res.send("OK");
});
app.get("/posts", (req, res) => {
    let { limit, offset } = req.query;
    if (offset && isNaN(+offset)) {
        res.status(400).send("Offset must be a number");
        return;
    }
    if (limit && isNaN(+limit)) {
        res.status(400).send("Limit must be a number");
        return;
    }
    if (offset) {
        let slicedPosts = posts.slice(+offset);
        if (limit) {
            slicedPosts = slicedPosts.slice(0, +limit);
        }
        res.status(200).json(slicedPosts);
        return;
    }
    if (limit) {
        res.status(200).json(posts.slice(0, +limit));
        return;
    }
    res.status(200).json(posts);
});
app.get("/posts/count", (req, res) => {
    res.status(200).json({ count: posts.length });
});
app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});
