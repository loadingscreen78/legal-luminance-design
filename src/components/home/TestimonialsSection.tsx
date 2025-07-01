
import { Card, CardContent } from '@/components/ui/card';

const testimonials = [
  {
    name: "Advocate Priya Sharma",
    designation: "Senior Advocate, High Court",
    quote: "Legal Associates has been my go-to source for reliable legal publications. Their quality and accuracy are unmatched.",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Justice Ramesh Kumar",
    designation: "Retired District Judge",
    quote: "The comprehensive collection and timely updates make Legal Associates indispensable for legal professionals.",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=100&h=100&fit=crop&crop=face"
  },
  {
    name: "Anjali Patel",
    designation: "Law Student, NLU Cuttack",
    quote: "As a law student, I rely on Legal Associates for authentic and updated legal content. Highly recommended!",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=100&h=100&fit=crop&crop=face"
  }
];

export const TestimonialsSection = () => {
  return (
    <section className="py-20 bg-gradient-to-br from-[#3454D1]/5 to-[#F9A826]/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#222222] mb-4">
            Trusted by Legal Professionals Nationwide
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            See what our customers have to say about our publications and service
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-none shadow-lg bg-white">
              <CardContent className="p-8 text-center">
                <div className="mb-6">
                  <div className="text-4xl text-[#F9A826] mb-4">"</div>
                  <p className="text-gray-700 leading-relaxed italic">
                    {testimonial.quote}
                  </p>
                </div>
                
                <div className="flex items-center justify-center space-x-4">
                  <img 
                    src={testimonial.avatar}
                    alt={testimonial.name}
                    className="w-12 h-12 rounded-full object-cover border-2 border-[#3454D1]/20"
                  />
                  <div className="text-left">
                    <h4 className="font-semibold text-[#222222]">
                      {testimonial.name}
                    </h4>
                    <p className="text-sm text-gray-600">
                      {testimonial.designation}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};
