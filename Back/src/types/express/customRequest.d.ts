import { Request } from "express";
import Usuario from "../models/Usuario";

export interface CustomRequest extends Request {
  user?: Usuario;
}
