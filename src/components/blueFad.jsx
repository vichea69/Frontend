import BlurFade from "@/components/ui/blur-fade";

const images = Array.from({ length: 9 }, (_, i) => {
  const isLandscape = i % 2 !== 0;
  const width = isLandscape ? 400 : 300;
  const height = isLandscape ? 300 : 400;
  return `https://picsum.photos/seed/${i + 1}/${width}/${height}`;
});

export function BlurFadeDemo() {
  return (
    <section id="photos" className="flex justify-center items-center py-8 min-h-screen">
      <div className="container mx-auto px-8 lg:px-52">
        <div className="columns-2 gap-4 sm:columns-2 lg:columns-3">
          {images.map((imageUrl, idx) => (
            <BlurFade key={imageUrl} delay={0.25 + idx * 0.05} inView>
              <img
                className="mb-4 rounded-lg object-cover w-full h-auto"
                src={imageUrl}
                alt={`Random stock image ${idx + 1}`}
              />
            </BlurFade>
          ))}
        </div>
      </div>
    </section>
  );
}