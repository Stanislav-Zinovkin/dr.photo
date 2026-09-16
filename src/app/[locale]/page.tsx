import { getDictionary } from "@/lib/dictionary";
import { HeroSection } from "@/components/home/hero-section";

interface PageProps {
  params: Promise<{locale: string}>;
}

export default async function HomePage({ params }: PageProps) {
  const {locale} = await params;
  const dict = await getDictionary(locale);

  return (
    <>
    <HeroSection heroDict={dict.Hero}/>
    
    </>
  )
}