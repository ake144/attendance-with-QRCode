import churchBackground from "@/assets/church-background.jpg";
import { PrayerRequestForm } from "@/components/prayer-form";

const Index = () => {

    const images = "https://images.unsplash.com/photo-1556703588-6eae2585e025?q=80&w=880&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
  return (
    <div className="min-h-screen relative">
      {/* Background Image with Overlay */}
      <div
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{ backgroundImage: `url(${images})` }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-background/40 via-background/60 to-background/80"></div>
      </div>

      {/* Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 md:py-16">
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-bold text-foreground mb-4 tracking-tight">
            Prayer Requests
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            "Again, truly I tell you that if two of you on earth agree about anything they ask for, 
            it will be done for them by my Father in heaven." - Matthew 18:19
          </p>
        </div>

        <PrayerRequestForm />

        <div className="text-center mt-12 text-muted-foreground">
          <p className="text-sm">
            All prayer requests are handled with confidentiality and compassion by our prayer team.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Index;