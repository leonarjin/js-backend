import { Router, request, response, Request, Response } from "express";

import { deleteTask, finishedTask, getTask, getTasks, saveTasks, updateTask } from "./controller/TaskControler";

const routes = Router();

routes.get('/home',(request: Request, response: Response) => {
    return response.json({message: "Hello mikinha"})
});

routes.get("/tasks", getTasks);
routes.post("/tasks", saveTasks)
routes.get('/tasks/:id', getTask)
routes.put('/tasks/:id', updateTask)
routes.delete('/tasks/:id', deleteTask)
routes.patch('/tasks/:id', finishedTask)


export default routes;