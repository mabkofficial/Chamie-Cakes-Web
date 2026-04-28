import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export function getContent(filePath: string) {
  const fullPath = path.join(contentDirectory, filePath);
  const fileContents = fs.readFileSync(fullPath, "utf8");
  
  if (filePath.endsWith(".json")) {
    return JSON.parse(fileContents);
  }
  
  const { data, content } = matter(fileContents);
  return { ...data, body: content };
}

export function getAllCakes() {
  const cakesDirectory = path.join(contentDirectory, "cakes");
  if (!fs.existsSync(cakesDirectory)) return [];
  
  const fileNames = fs.readdirSync(cakesDirectory);
  const allCakesData = fileNames
    .filter(fileName => fileName.endsWith(".md"))
    .map((fileName) => {
      const fullPath = path.join(cakesDirectory, fileName);
      const fileContents = fs.readFileSync(fullPath, "utf8");
      const { data, content } = matter(fileContents);

      return {
        id: fileName.replace(/\.md$/, ""),
        title: (data.title as string) || "Untitled Cake",
        category: (data.category as string) || "Other",
        image: (data.image as string) || "/images/placeholder.png",
        description: content,
      } as any; // Cast as any to avoid strict type mismatch during build
    });

  return allCakesData;
}
