import { Request, Response, NextFunction } from "express";
import z from "zod";

// TODO: this needs to validate the whole Request not just the body.
export const EmptyObjectSchema = z.record(z.never());

const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
      console.log("request")
      console.log(req.body);
      schema.parse(req);
      next();
    } catch (error) {
      if (error instanceof z.ZodError) {
        res.status(400).json({
          errors: error.errors.map((e) => ({
            path: e.path.join("."),
            message: e.message,
          })),
        });
      } else {
        next(error);
      }
    }
  };
};

export const createOrganizationRequestSchema = z
  .object({
    headers: z.object({}).passthrough(),
    method: z.literal("POST"),
    url: z.literal("/organization"),
    body: z.object({
      user: z.object({
        email: z.string().min(1).max(255),
        username: z.string().min(1).max(255),
        name: z.string().min(1).max(25),
        lastname: z.string().min(1).max(25),
        password: z.string(),
        confirmPassword: z.string(),
      }),
      organization: z.object({
        organizationId: z.string().min(1).max(40),
        name: z.string().min(3).max(70),
        location: z.object({
          type: z.literal("Point"),
          coordinates: z
            .array(z.number())
            .length(2, "expecting coordinates are exactly 2 numbers"),
        }),
        locationDelta: z.object({
          type: z.literal("Point"),
          coordinates: z
            .array(z.number())
            .length(2, "expecting coordinates are exactly 2 numbers"),
        }),
      }),
    }),
    params: EmptyObjectSchema,
  })
  .refine(
    (data) => data.body.user.password === data.body.user.confirmPassword,
    {
      message: "Passwords do not match",
      path: ["confirmPassword"],
    }
  );

export { validateRequest };
