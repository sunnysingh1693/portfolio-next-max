import Head from "next/head";
import { Fragment } from "react";
import AllPosts from "../../components/posts/all-posts";
import { getAllPosts } from "../../lib/posts-util";

export default function AllPostsPage(props) {
  return <Fragment>
    <Head>
      <title>All Posts</title>
      <meta name='description' content='This page lists all my blogs.' />
    </Head>
    <AllPosts posts={props.posts} />;
  </Fragment>
}

export function getStaticProps() {
  const allPosts = getAllPosts();

  return {
    props: {
      posts: allPosts
    },
    revalidate: 10
  }
}
