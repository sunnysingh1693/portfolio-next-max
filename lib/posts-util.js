import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDir = path.join(process.cwd(), 'posts');

function getPostData(fileName) {
  const filePath = path.join(postsDir, fileName);
  const fileData = fs.readFileSync(filePath, 'utf-8');
  const { data, content } = matter(fileData);
  const postSlug = fileName.replace(/\.md$/, '');
  const postData = {
    slug: postSlug,
    ...data,
    content
  }
  return postData;
}

export function getPostFiles(directory) {
  const allFilesInDir = fs.readdirSync(directory);
  const allPostFiles = allFilesInDir.filter(postFile => postFile.includes('.md'))
  return allPostFiles;
}

export function getAllPosts() {
  const postFiles = getPostFiles(postsDir);

  const allPosts = postFiles.map(postFile => {
    return getPostData(postFile);
  });

  const sortedPosts = allPosts.sort((postA, postB) => postA.date > postB.date ? -1 : 1);

  return sortedPosts;
}

export function getFeaturedPosts() {
  const allPosts = getAllPosts();
  const featuredPosts = allPosts.filter(post => post.isFeatured);

  return featuredPosts;
}

export function getSinglePost(slug) {
  if (!slug.includes('.md')) slug = slug.concat('.md')
  const postFiles = getPostFiles(postsDir);
  const singlePostFile = postFiles.find(postFile => postFile === slug)
  const postData = getPostData(singlePostFile);
  return postData;
}