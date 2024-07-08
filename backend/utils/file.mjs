import { mkdir, rm, unlink, writeFile } from "fs/promises";
import { dirname, join } from "path";
import crypto from "crypto";

export const saveFile = async (file) => {
  const buffer = file.buffer;
  const folderName = crypto.randomUUID();
  const fileName = file.originalname;

  await mkdir(join("public", "uploads", folderName), { recursive: true });

  const path = join("public", "uploads", folderName, fileName);
  await writeFile(path, buffer);

  return `${folderName}/${fileName}`;
};

export const removeFile = (path) => {
  return unlink(join("public", "uploads", path));
};

export const removeDirFromFile = (path) => {
  const dir = join("public", "uploads", dirname(path));

  return rm(dir, { recursive: true, force: true });
};
