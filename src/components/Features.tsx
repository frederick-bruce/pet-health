import { LucideIcon } from "lucide-react";

interface FeatureProps {
  icon: LucideIcon;
  title: string;
  description: string;
}

interface FeaturesProps {
  features: FeatureProps[];
}

const Feature = ({ icon: Icon, title, description }: FeatureProps) => (
  <div className="flex flex-col items-center text-center p-4">
    <div className="bg-primary rounded-full p-3 mb-4">
      <Icon className="w-6 h-6 text-primary-foreground" />
    </div>
    <h3 className="text-lg font-semibold mb-2">{title}</h3>
    <p className="text-muted-foreground">{description}</p>
  </div>
);

export default function Features({ features }: FeaturesProps) {
  return (
    <section className="py-12 md:py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          Features
        </h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <Feature key={index} {...feature} />
          ))}
        </div>
      </div>
    </section>
  );
}
