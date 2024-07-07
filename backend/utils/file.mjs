import { mkdir, rm, unlink, writeFile } from "fs/promises";
import { dirname, join } from "path";

export const saveFile = async (file) => {
  const bytes = await file.arrayBuffer();
  const buffer = Buffer.from(bytes);
  const folderName = crypto.randomUUID();
  const fileName = file.name;
  await mkdir(join("public", "uploads", folderName), { recursive: true });

  const path = join("public", "uploads", folderName, fileName);
  console.log("Path: ", path);
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
