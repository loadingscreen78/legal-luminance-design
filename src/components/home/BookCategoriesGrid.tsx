
import { Card, CardContent } from '@/components/ui/card';
import { Link } from 'react-router-dom';

const categories = [
  {
    title: "Criminal Law",
    icon: "⚖️",
    description: "IPC, CrPC, Evidence Act",
    color: "from-red-500/10 to-red-600/10",
    borderColor: "border-red-200"
  },
  {
    title: "Civil Law",
    icon: "🏛️",
    description: "CPC, Contract Act, Torts",
    color: "from-blue-500/10 to-blue-600/10",
    borderColor: "border-blue-200"
  },
  {
    title: "Bare Acts",
    icon: "📜",
    description: "Latest amendments & updates",
    color: "from-green-500/10 to-green-600/10",
    borderColor: "border-green-200"
  },
  {
    title: "Odisha Laws",
    icon: "🏴",
    description: "State-specific legal acts",
    color: "from-purple-500/10 to-purple-600/10",
    borderColor: "border-purple-200"
  },
  {
    title: "Legal Manuals",
    icon: "📖",
    description: "Practice guides & procedures",
    color: "from-orange-500/10 to-orange-600/10",
    borderColor: "border-orange-200"
  }
];

export const BookCategoriesGrid = () => {
  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-serif font-bold text-[#222222] mb-4">
            Explore Our Categories
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Comprehensive legal literature across all areas of law
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {categories.map((category, index) => (
            <Link key={index} to="/books">
              <Card className={`group cursor-pointer transition-all duration-300 hover:shadow-xl hover:-translate-y-2 border-2 ${category.borderColor} hover:border-[#3454D1]/30`}>
                <CardContent className={`p-6 text-center bg-gradient-to-br ${category.color} hover:from-[#3454D1]/10 hover:to-[#F9A826]/10 transition-all duration-300`}>
                  <div className="text-4xl mb-4 group-hover:scale-110 transition-transform duration-300">
                    {category.icon}
                  </div>
                  <h3 className="font-serif font-bold text-lg text-[#222222] mb-2">
                    {category.title}
                  </h3>
                  <p className="text-sm text-gray-600">
                    {category.description}
                  </p>
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};
