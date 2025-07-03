
import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Navigation } from '@/components/Navigation';
import { Footer } from '@/components/Footer';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { useCart } from '@/contexts/CartContext';
import { useToast } from '@/hooks/use-toast';
import { Minus, Plus, ShoppingCart } from 'lucide-react';

const journalData = {
  1: {
    id: "1",
    title: "Orissa High Court Digest",
    image: "/lovable-uploads/bd9562f0-5286-4441-82a0-f16eac646a5f.png",
    description: "Comprehensive digest of Orissa High Court judgments",
    year: "2024",
    price: 1299,
    category: "Legal Digest",
    story: "The Orissa High Court Digest has been the cornerstone of legal research in Eastern India for over five decades. First published in 1970, this comprehensive digest has guided countless legal professionals through the intricate landscape of Orissa's jurisprudence. Its meticulous compilation of landmark judgments has made it an indispensable resource for advocates, judges, and legal scholars alike.",
    legacy: "This digest represents more than just a collection of court decisions—it embodies the evolution of legal thought in one of India's most historically significant states. Each volume captures the essence of judicial wisdom that has shaped regional legal practice.",
    importance: "Essential for understanding the nuances of Orissa state law, this digest provides crucial insights into local legal precedents and their application in contemporary practice.",
    credits: {
      editor: "Justice Rajesh Kumar Sharma (Retd.)",
      authors: ["Advocate Priya Patel", "Dr. Anand Mishra", "Advocate Suresh Nayak"],
      contributors: ["Legal Research Team - Orissa Bar Association", "High Court Registry"],
      publisher: "Eastern Law Publications"
    }
  },
  2: {
    id: "2",
    title: "Criminal Major Acts",
    image: "/lovable-uploads/bd9562f0-5286-4441-82a0-f16eac646a5f.png",
    description: "Complete compilation of criminal law statutes",
    year: "2024",
    price: 899,
    category: "Criminal Law",
    story: "The Criminal Major Acts compilation has been the definitive guide to India's criminal law framework since 1985. This authoritative collection brings together all major criminal statutes, amendments, and procedural codes in one comprehensive volume. Trusted by criminal lawyers, public prosecutors, and law enforcement officers across the nation.",
    legacy: "For nearly four decades, this publication has been the go-to reference for criminal law practitioners, earning recognition from the Supreme Court of India and various High Courts for its accuracy and completeness.",
    importance: "In an era of rapidly evolving criminal law, this compilation ensures that legal professionals stay current with the latest amendments and judicial interpretations.",
    credits: {
      editor: "Justice M.R. Calla (Retd.)",
      authors: ["Advocate Vikram Singh", "Dr. Meera Joshi", "Advocate Rajesh Gupta"],
      contributors: ["National Criminal Law Society", "Bar Council of India"],
      publisher: "All India Legal Publications"
    }
  },
  3: {
    id: "3",
    title: "Civil Procedure Code Commentary",
    image: "/lovable-uploads/20716325-0e93-4a46-bfec-60bd22b17411.png",
    description: "In-depth analysis of Civil Procedure Code",
    year: "2023",
    price: 1599,
    category: "Civil Law",
    story: "The Civil Procedure Code Commentary stands as the most comprehensive analysis of India's civil procedure law. First published in 1978, this scholarly work has guided generations of civil lawyers through the complexities of procedural law. Its detailed section-by-section commentary includes the latest Supreme Court and High Court judgments.",
    legacy: "This commentary has been cited in over 10,000 court cases across India and is considered the authoritative interpretation of civil procedure. It has shaped the understanding of procedural law for over 45 years.",
    importance: "Essential for civil litigation practitioners, this commentary provides deep insights into procedural nuances that can make or break a case in court.",
    credits: {
      editor: "Justice Arun Kumar Mishra (Retd.)",
      authors: ["Senior Advocate Indira Jaising", "Professor Dr. Upendra Baxi", "Advocate Harish Salve"],
      contributors: ["Civil Law Research Foundation", "Supreme Court Advocates Association"],
      publisher: "Universal Law Publishing"
    }
  },
  4: {
    id: "4",
    title: "Bare Acts Collection",
    image: "/lovable-uploads/cef2bd9f-6509-4ace-be37-df626c82073e.png",
    description: "Essential legal acts and amendments",
    year: "2024",
    price: 799,
    category: "Legal Reference",
    story: "The Bare Acts Collection represents the most comprehensive compilation of India's legislative framework. Updated annually since 1950, this collection has been the trusted companion of legal professionals for over seven decades. It contains all major acts, rules, and amendments in their original form.",
    legacy: "This collection has been the foundation of legal education in India, used by every law school and legal professional. Its accuracy and completeness have made it the standard reference for statutory law.",
    importance: "No legal library is complete without this essential collection. It provides the raw material from which all legal arguments are constructed.",
    credits: {
      editor: "Justice R.V. Raveendran (Retd.)",
      authors: ["Legislative Drafting Committee", "Ministry of Law & Justice"],
      contributors: ["Parliament of India", "State Legislative Assemblies"],
      publisher: "Government Publications Division"
    }
  }
};

const JournalDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { toast } = useToast();
  const [quantity, setQuantity] = useState(1);

  const journal = journalData[id as keyof typeof journalData];

  if (!journal) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <div className="container mx-auto px-4 pt-24 text-center">
          <h1 className="text-2xl font-bold text-foreground mb-4">Journal Not Found</h1>
          <Button onClick={() => navigate('/journals')}>Back to Journals</Button>
        </div>
        <Footer />
      </div>
    );
  }

  const handleAddToCart = () => {
    for (let i = 0; i < quantity; i++) {
      addToCart({
        id: journal.id,
        title: journal.title,
        price: journal.price,
        image: journal.image,
        category: journal.category,
      });
    }
    toast({
      title: "Added to Cart",
      description: `${quantity} x ${journal.title} added to your cart.`,
    });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="pt-24 pb-12">
        <div className="container mx-auto px-4">
          {/* Breadcrumb */}
          <div className="mb-8">
            <nav className="text-sm text-muted-foreground">
              <button onClick={() => navigate('/')} className="hover:text-primary">Home</button>
              <span className="mx-2">/</span>
              <button onClick={() => navigate('/journals')} className="hover:text-primary">Journals</button>
              <span className="mx-2">/</span>
              <span className="text-foreground">{journal.title}</span>
            </nav>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-12">
            {/* Image Section */}
            <div className="animate-fade-in">
              <img
                src={journal.image}
                alt={journal.title}
                className="w-full max-w-md mx-auto rounded-lg shadow-lg"
              />
            </div>

            {/* Details Section */}
            <div className="animate-fade-in" style={{ animationDelay: '0.2s' }}>
              <h1 className="text-4xl font-serif font-bold text-foreground mb-4">
                {journal.title}
              </h1>
              <p className="text-lg text-muted-foreground mb-4">
                {journal.description}
              </p>
              <div className="flex items-center gap-4 mb-6">
                <span className="bg-primary text-primary-foreground px-3 py-1 rounded-full text-sm font-semibold">
                  {journal.year}
                </span>
                <span className="bg-muted text-muted-foreground px-3 py-1 rounded-full text-sm">
                  {journal.category}
                </span>
              </div>
              
              <div className="text-3xl font-bold text-primary mb-6">
                ₹{journal.price}
              </div>

              {/* Quantity Selector */}
              <div className="flex items-center gap-4 mb-6">
                <span className="text-sm font-medium">Quantity:</span>
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  >
                    <Minus size={16} />
                  </Button>
                  <span className="w-12 text-center font-semibold">{quantity}</span>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setQuantity(quantity + 1)}
                  >
                    <Plus size={16} />
                  </Button>
                </div>
              </div>

              <Button
                onClick={handleAddToCart}
                size="lg"
                className="w-full mb-4"
              >
                <ShoppingCart className="mr-2" size={20} />
                Add to Cart - ₹{(journal.price * quantity).toLocaleString()}
              </Button>
            </div>
          </div>

          {/* Story Section */}
          <Card className="mb-8 animate-fade-in" style={{ animationDelay: '0.4s' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                📖 The Story Behind This Journal
              </h2>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                {journal.story}
              </p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">🏛️ Legacy</h3>
                  <p className="text-sm text-muted-foreground">
                    {journal.legacy}
                  </p>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">⚖️ Importance</h3>
                  <p className="text-sm text-muted-foreground">
                    {journal.importance}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Credits Section */}
          <Card className="animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <CardContent className="p-8">
              <h2 className="text-2xl font-serif font-bold text-foreground mb-6">
                👥 Editorial Team & Credits
              </h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Chief Editor</h3>
                  <p className="text-muted-foreground mb-4">{journal.credits.editor}</p>
                  
                  <h3 className="font-semibold text-foreground mb-2">Authors</h3>
                  <ul className="text-muted-foreground space-y-1 mb-4">
                    {journal.credits.authors.map((author, index) => (
                      <li key={index}>• {author}</li>
                    ))}
                  </ul>
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Contributors</h3>
                  <ul className="text-muted-foreground space-y-1 mb-4">
                    {journal.credits.contributors.map((contributor, index) => (
                      <li key={index}>• {contributor}</li>
                    ))}
                  </ul>
                  
                  <h3 className="font-semibold text-foreground mb-2">Publisher</h3>
                  <p className="text-muted-foreground">{journal.credits.publisher}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default JournalDetails;
