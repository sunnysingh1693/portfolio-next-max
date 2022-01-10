import Head from "next/head";
import { Fragment } from "react";
import FeaturedPosts from "../components/home-page/featured-posts";
import Hero from "../components/home-page/hero";
import { getFeaturedPosts } from '../lib/posts-util'

export default function HomePage(props) {
  const featuredPosts = props.posts;
  return <Fragment>
    <Head>
      <title>Sunny&apos;s Blog</title>
      <meta name='description' content='I post about programming and web development.' />
    </Head>
    <Hero />
    <FeaturedPosts posts={featuredPosts} />
  </Fragment>
}

export function getStaticProps() {
  const featuredPosts = getFeaturedPosts();

  return {
    props: { posts: featuredPosts }
  }
}