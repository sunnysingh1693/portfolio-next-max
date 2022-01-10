import Image from "next/image";
import classes from "./hero.module.css";

export default function Hero(prams) {
  const WH = 300;
  return (
    <section className={classes.hero}>
      <div className={classes.image}>
        <Image
          src="/images/site/pexels-vojtech-okenka-399772.jpg"
          alt="profile-pic"
          width={WH}
          height={WH}
        />
      </div>
      <h1>Hi, I am Sunny!</h1>
      <p>
        I blog about web development -- especially about frontend framework like
        Angular and React.
      </p>
    </section>
  );
}
