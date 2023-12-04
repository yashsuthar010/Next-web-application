import { conn } from "../../../database/connection";
import { getTask, updateTask, deleteTask } from "../../../controller/tasks";

export default function handler(req, res) {
  conn();
  const { method } = req;

  switch (method) {
    case "GET":
      getTask(req, res);
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
