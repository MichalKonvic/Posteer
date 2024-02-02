import express, { Express, Request, Response } from "express";
import dotenv from "dotenv";
import { faker } from '@faker-js/faker';
import cors from "cors";
dotenv.config();

const app: Express = express();
const port = process.env.PORT || 3000;
const postCount = Number(process.env.POST_COUNT) || 100 as number;

const posts = Array.from({length: postCount}, () => {
  return {
    id: faker.string.uuid(),
    user: {
      id: faker.string.uuid(),
      displayName: faker.person.fullName(),
      username: faker.internet.userName(),
      avatar: faker.image.avatar(),
    },
    title: faker.lorem.sentence(),
    content: faker.lorem.paragraphs(),
    createdAt: faker.date.past(),
    updatedAt: faker.date.recent(),
  };
});


app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.send("OK");
});

app.get("/posts", (req: Request, res: Response) => {
  let {limit, offset} = req.query;
  if(offset && isNaN(+offset)){
    res.status(400).send("Offset must be a number");
    return;
  }
  if(limit && isNaN(+limit)){
    res.status(400).send("Limit must be a number");
    return;
  }
  if(offset){
    let slicedPosts = posts.slice(+offset);
    if(limit){
      slicedPosts = slicedPosts.slice(0, +limit);
    }
    res.status(200).json(slicedPosts);
    return;
  }
  if(limit){
    res.status(200).json(posts.slice(0, +limit));
    return;
  }
  res.status(200).json(posts);
});

app.get("/user", (req: Request, res: Response) => {
  let {id} = req.query;
  if(!id){
    res.status(400).send("ID is required");
    return;
  }
  let user = posts.find(post => post.user.id === id)?.user;
  if(!user){
    res.status(404).send("User not found");
    return;
  }
  res.status(200).json(user);
});

app.get("/posts/count", (req: Request, res: Response) => {
  res.status(200).json({count: posts.length});
});

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});