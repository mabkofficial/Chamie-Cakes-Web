import fs from "fs";
import path from "path";
import matter from "gray-matter";

const contentDirectory = path.join(process.cwd(), "src/content");

export interface CakeContent {
  id: string;
  title: string;
  category: string;
  image: string;
  description: string;
}

export interface PageContent {
  title: string;
  [key: string]: any;
  body: string;
}

export function getContent(filePath: string): PageContent {
  const fullPath = path.join(contentDirectory, filePath);
  
  if (!fs.existsSync(fullPath)) {
    console.warn(`Content file not found: ${fullPath}`);
    return { title: "Not Found", body: "Content missing." };
  }

  const fileContents = fs.readFileSync(fullPath, "utf8");
  
  if (filePath.endsWith(".json")) {
    const data = JSON.parse(fileContents);
    return { ...data, body: "" };
  }
  
  const { data, content } = matter(fileContents);
  return { 
    title: (data.title as string) || "Untitled",
    ...data, 
    body: content 
  };
}

export function getAllCakes(): CakeContent[] {
  const cakesDirectory = path.join(contentDirectory, "cakes");
  
  if (!fs.existsSync(cakesDirectory)) {
    console.warn(`Cakes directory not found: ${cakesDirectory}`);
    return [];
  }
  
  try {
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
        };
      });

    return allCakesData;
  } catch (error) {
    console.error("Error reading cakes directory:", error);
    return [];
  }
}
