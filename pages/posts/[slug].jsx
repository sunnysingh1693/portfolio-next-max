import Head from "next/head";
import path from "path";
import { Fragment } from "react";
import PostContent from "../../components/posts/post-detail/post-content";
import { getPostFiles, getSinglePost } from "../../lib/posts-util";

export default function PostDetailPage(props) {
  return <Fragment>
    <Head>
      <title>{props.post.title}</title>
      <meta name='description' content={props.post.excerpt} />
    </Head>
    <PostContent post={props.post} />;
  </Fragment>
}

export function getStaticProps(context) {
  const slug = context.params.slug;
  const singlePost = getSinglePost(slug);

  return {
    props: {
      post: singlePost,
    },
    revalidate: 600
  };
}

export function getStaticPaths() {
  const postsDir = path.join(process.cwd(), "posts");
  const postFiles = getPostFiles(postsDir);

  const paramsWithPath = postFiles.map((postfile) => ({
    params: { slug: postfile.replace(/\.md$/, "") },
  }));

  return {
    paths: paramsWithPath,
    fallback: false,
  };
}
