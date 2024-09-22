import Arrow from "../assets/svg/Arrow";
import ClipPath from "../assets/svg/ClipPath";
import { benefits } from "../constants";
import { GradientLight } from "./design/Benefits";
import Heading from "./Heading";
import Section from "./Section";
import { curve } from "../assets";
import { NeonGradientCard } from "./neon-gradient-card";

const Benefits = () => {
  return (
    <Section id="features">
      <div className="container relative z-2">
        <Heading
          className="md:max-w-md lg:max-w-2xl"
          title={
            <>
              Work Smarter, Not Harder with{" "}
              <span className="inline-block relative font-semibold">
                Ocrify
                <img
                  src={curve}
                  className="absolute top-full left-0 w-full xl:-mt-2 pointer-events-none select-none"
                  width={624}
                  height={28}
                  alt="Curve"
                />
              </span>
            </>
          }
        />

        <div className="flex flex-wrap gap-10 mb-10">
          {benefits.map((benefit) => (
            <div
              className="block relative p-0.5 bg-no-repeat bg-[length:100%_100%] md:max-w-[24rem]"
              style={{
                backgroundImage: `url(${benefit.backgroundUrl})`,
              }}
              key={benefit.id}
            >
              <div className="relative z-2 flex flex-col h-10 min-h-[22rem] p-[2.4rem] pointer-events-none">
                <NeonGradientCard className="max-w-sm items-center justify-center text-center">
                  <h5 className="h5 mb-5">{benefit.title}</h5>
                  <p className="body-2 mb-6 text-n-3">{benefit.text}</p>
                  <div className="flex items-center mt-auto"></div>
                </NeonGradientCard>
              </div>
              {/* <NeonGradientCard className="max-w-sm items-center justify-center text-center">
                <span className="pointer-events-none z-10 h-full whitespace-pre-wrap bg-white bg-clip-text text-center text-6xl font-bold leading-none tracking-tighter text-transparent dark:drop-shadow-[0_5px_5px_rgba(0,0,0,0.8)]">
                  Neon Gradient Card
                </span>
              </NeonGradientCard> */}
              {benefit.light && <GradientLight />}

              {/* <div
                className="absolute inset-0.5 bg-n-8"
                style={{ clipPath: "url(#benefits)" }}
              >
                <div className="absolute inset-0 opacity-0 transition-opacity hover:opacity-10">
                  {benefit.imageUrl && (
                    <img
                      src={benefit.imageUrl}
                      width={380}
                      height={362}
                      alt={benefit.title}
                      className="w-full h-full object-cover"
                    />
                  )}
                </div>
              </div> */}

              <ClipPath />
            </div>
          ))}
        </div>
      </div>
    </Section>
  );
};

export default Benefits;
