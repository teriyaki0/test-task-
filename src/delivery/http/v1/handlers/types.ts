import Express from 'express'

export interface IHandler {
  registerRoutes: (root: Express.Router) => void
}

export interface AuthRequest extends Express.Request {
  user: {
    id: string;
  };
}

export interface FeedbackRequest extends Express.Request {
  feedback: {
    id: string;
    title: string;
    description: string;
    category: string;
    status: string;
    authorId: string;
  };
}