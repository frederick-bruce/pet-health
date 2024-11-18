import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  avatarSrc: string;
}

interface TestimonialsProps {
  testimonials: TestimonialItem[];
}

const Testimonial = ({ quote, author, role, avatarSrc }: TestimonialItem) => (
  <div className="bg-card text-card-foreground rounded-lg p-6 shadow-md">
    <p className="italic mb-4">&ldquo;{quote}&rdquo;</p>
    <div className="flex items-center">
      <Avatar className="mr-3">
        <AvatarImage src={avatarSrc} alt={author} />
        <AvatarFallback>{author[0]}</AvatarFallback>
      </Avatar>
      <div>
        <p className="font-semibold">{author}</p>
        <p className="text-sm text-muted-foreground">{role}</p>
      </div>
    </div>
  </div>
);

export default function Testimonials({ testimonials }: TestimonialsProps) {
  return (
    <section className="py-12 md:py-20 bg-muted">
      <div className="container mx-auto px-4">
        <h2 className="text-2xl md:text-3xl font-bold text-center mb-12">
          What Our Users Say
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Testimonial key={index} {...testimonial} />
          ))}
        </div>
      </div>
    </section>
  );
}
