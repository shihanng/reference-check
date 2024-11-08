import clsx from "clsx";
import styles from "./styles.module.css";
import ScreenshotUrl from "@site/static/img/screenshot.png";

type FeatureItem = {
  ImgUrl: string;
  description: JSX.Element;
};

const FeatureList: FeatureItem[] = [
  {
    ImgUrl: ScreenshotUrl,
    description: (
      <>
        <p>Shows the cells referenced by the selected cell.</p>
        <p>Shows the cells that are referencing the selected cell.</p>
        <p>Navigate between the selected, precedent, and dependent cells.</p>
      </>
    ),
  },
];

function Feature({ ImgUrl, description }: FeatureItem) {
  return (
    <div className={clsx("col")}>
      <div className="text--center">
        <img src={ImgUrl} alt="Description of the image" />
      </div>
      <div className="text--center padding-horiz--md">
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures(): JSX.Element {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
