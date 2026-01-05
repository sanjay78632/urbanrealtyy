import { ListingsContainer } from "@/components/listings-container";
import { Hero } from "@/components/hero";

export default function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Hero />

      <main className="container mx-auto px-4 py-12">
        <div className="mb-12">
          <h2 className="text-4xl font-bold mb-2 text-balance">
            Find Your Perfect Property
          </h2>
          <p className="text-lg text-muted-foreground">
            Browse our extensive collection of premium properties
          </p>
        </div>

        <ListingsContainer />
      </main>
    </div>
  );
}
