import { conn } from "../../../database/connection";
import {
  CreateTask,
  deleteTask,
  getTasks,
  updateTask,
} from "../../../controller/tasks";

export default function handler(req, res) {
  conn();
  const { method } = req;

  switch (method) {
    case "GET":
      getTasks(req, res);
      break;
    case "POST":
      CreateTask(req, res);
      break;
    case "PUT":
      updateTask(req, res);
      break;
    case "DELETE":
      deleteTask(req, res);
      break;
    default:
      req.setHeader("Allow", ["GET", "POST", "PUT", "DELETE"]);
      res.status(405).end(`METHOD ${method} NOTE ALLOWED`);
      break;
  }
}
