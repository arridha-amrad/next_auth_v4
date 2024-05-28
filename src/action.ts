"use server";

import { hash } from "argon2";
import db from "./drizzle/db";
import { UsersTable } from "./drizzle/schema";
import { eq } from "drizzle-orm";

type TRegister = {
  name: string;
  email: string;
  password: string;
  image: string;
};

export const updateUserAction = async (data: FormData) => {
  const [updateResult] = await db
    .update(UsersTable)
    .set({
      name: data.get("name") as string,
    })
    .where(eq(UsersTable.email, data.get("email") as string))
    .returning({
      id: UsersTable.id,
      email: UsersTable.email,
      name: UsersTable.name,
      image: UsersTable.imgUrl,
    });

  return updateResult;
};

export const registerAction = async (prevState: any, data: FormData) => {
  const { email, name, password, image } = Object.fromEntries(
    data.entries()
  ) as TRegister;

  const [user] = await db
    .select()
    .from(UsersTable)
    .where(eq(UsersTable.email, email));

  if (user) {
    return {
      message: "email has been registered",
      type: "error",
    };
  }

  const hashedPassword = await hash(password);
  await db.insert(UsersTable).values({
    email,
    imgUrl: image,
    name,
    password: hashedPassword,
    provider: "credentials",
  });

  return {
    message: "Registration successfull",
    type: "success",
  };
};
