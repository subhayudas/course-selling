
import { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useToast } from "@/components/ui/use-toast";

export function NewsletterSignup() {
  const [email, setEmail] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const { toast } = useToast();
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Successfully subscribed!",
        description: "Thank you for subscribing to our newsletter.",
      });
      setEmail('');
      setIsLoading(false);
    }, 1000);
  };
  
  return (
    <div className="py-12 px-4 sm:px-8 md:px-12 glass-card">
      <h2 className="text-2xl sm:text-3xl font-bold font-heading text-center mb-4">
        Get Learning Tips & Updates
      </h2>
      <p className="text-center text-muted-foreground mb-6 max-w-md mx-auto">
        Subscribe to our newsletter and receive the latest updates, course releases, and learning tips.
      </p>
      
      <form onSubmit={handleSubmit} className="max-w-md mx-auto">
        <div className="flex flex-col sm:flex-row gap-3">
          <Input
            type="email"
            placeholder="Enter your email"
            className="glass-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Button 
            type="submit" 
            className="bg-gradient-to-r from-purple-600 to-purple-400 hover:opacity-90"
            disabled={isLoading}
          >
            {isLoading ? "Subscribing..." : "Subscribe"}
          </Button>
        </div>
        <p className="text-center text-xs text-muted-foreground mt-3">
          We respect your privacy. Unsubscribe at any time.
        </p>
      </form>
    </div>
  );
}
