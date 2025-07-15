import { Request, Response, NextFunction } from "express";
import z from "zod";

const EmptyObjectSchema = z.record(z.never());

const AuthHeadersSchema = z.object({
  authorization: z
    .string()
    .regex(/^Bearer\s.+$/, "Authorization header must be a Bearer token"),
});

const OrganizationIdSchema = z.string().min(1).max(40);

export const ORGANIZATION_URL_REGEX = /^\/organization\/[\w-]{1,40}$/;

export const validateRequest = (schema: z.ZodSchema) => {
  return (req: Request, res: Response, next: NextFunction) => {
    try {
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


// #region endpoints schemas 

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
export const createDriverRequestSchema = z
  .object({
    headers: z.object({}).passthrough(),
    method: z.literal("POST"),
    url: z.literal("/driver"),
    body: z.object({
      user: z.object({
        email: z.string().min(1).max(255),
        username: z.string().min(1).max(255),
        name: z.string().min(1).max(25),
        lastname: z.string().min(1).max(25),
        password: z.string(),
        confirmPassword: z.string(),
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
export const loginRequestSchema = z.object({
  headers: z.object({}).passthrough(),
  method: z.literal("POST"),
  url: z.literal("/login"),
  body: z.object({
    email: z.string().min(1).max(255),
    password: z.string(),
    userType:z.enum(["user-driver","organization-user"])
  }),
  params: EmptyObjectSchema,
});
export const recoveryRequestSchema = z.object({
  headers: z.object({}).passthrough(),
  method: z.literal("POST"),
  url: z.literal("/recovery"),
  body: z.object({
    email: z.string().min(1).max(255),
  }),
  params: EmptyObjectSchema,
});
export const deleteOrganizationRequestSchema = z.object({
  headers: AuthHeadersSchema,
  method: z.literal("DELETE"),
  url: z.string().regex(ORGANIZATION_URL_REGEX, "Invalid URL format"),
  body: EmptyObjectSchema,
  params: z.object({
    id: OrganizationIdSchema,
  }),
});

export const createParkingLotRequestSchema = z.object({
  headers: AuthHeadersSchema,
  method: z.literal("POST"),
  url: z.literal("/parking-lot"),
  body: z.object({
    name: z.string().min(3).max(70),
    location: z.object({
      type: z.literal("Point"),
      coordinates: z
        .array(z.number())
        .length(2, "expecting coordinates are exactly 2 numbers"),
    }),
    description: z.string().min(1),
  }),
  params: EmptyObjectSchema,
});
