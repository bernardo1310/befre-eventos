import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import showcaseDj from "@/assets/showcase-dj.png";

const ShowcaseSection = () => {
  return (
    <section className="flex flex-col overflow-hidden">
      <ContainerScroll
        titleComponent={
          <div className="flex flex-col items-center">
            <h2 className="text-2xl md:text-4xl font-semibold text-foreground font-display">
              Transformamos seu evento em uma
            </h2>
            <h2 className="text-4xl md:text-[6rem] font-bold mt-2 leading-none font-display">
              <span className="text-gradient-gold">Experiência Única</span>
            </h2>
          </div>
        }
      >
        <img
          src={showcaseDj}
          alt="DJ profissional BeFre com mesa de mixagem e iluminação"
          className="mx-auto h-full w-full object-cover object-center"
          draggable={false}
        />
      </ContainerScroll>
    </section>
  );
};

export default ShowcaseSection;
