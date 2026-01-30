import express from "express";

export interface Route {
  path?: string;
  router: express.Router;
}

export type IRoutes = Route[];
