import type { Metadata } from 'next';
import Image from 'next/image';
import Link from 'next/link';
import JsonLd from '@/components/JsonLd';
import PageHero from '@/components/PageHero';
import RevealSetup from '@/components/RevealSetup';
import SiteFooter from '@/components/SiteFooter';
import SiteHeader from '@/components/SiteHeader';
import { siteConfig } from '@/lib/site';
import { breadcrumbSchema, imageObjectSchema, webPageSchema } from '@/lib/schema';

export const metadata: Metadata = {
  title: { absolute: 'Brat Examples & Templates | Free Brat Design Ideas' },
  description: 'Browse original Brat-style examples for green, black, white, pink, blue and other looks, then open the generator with the text and style preselected.',
  alternates: { canonical: '/brat-examples/' },
  openGraph: { url:'/brat-examples/', title:'Brat Examples & Templates', description:'Original Brat-style design ideas you can open directly in the generator.', images:[{url:'/images/examples/classic-green.webp',width:900,height:600,alt:'Classic green Brat-style example'}] },
  twitter: { card:'summary_large_image', title:'Brat Examples & Templates', description:'Original Brat-style design ideas you can open directly in the generator.', images:['/images/examples/classic-green.webp'] },
};

const examples = [
  { slug: 'classic-green', title: 'Brat', text: 'brat', bg: '#8ace00', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/classic-green.webp' },
  { slug: 'pink-mood', title: 'Mood', text: 'mood', bg: '#ff69b4', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/pink-mood.webp' },
  { slug: 'black-vibes', title: 'Vibes', text: 'vibes', bg: '#111111', fg: '#ffffff', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/black-vibes.webp' },
  { slug: 'blue-anomaly', title: 'Anomaly', text: 'anomaly', bg: '#18b9dd', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/blue-anomaly.webp' },
  { slug: 'white-clean', title: 'Clean', text: 'clean', bg: '#f7f6f0', fg: '#111111', blur: 0.8, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/white-clean.webp' },
  { slug: 'purple-after', title: 'After', text: 'after', bg: '#c966ff', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/purple-after.webp' },
  { slug: 'orange-chaos', title: 'Chaos', text: 'chaos', bg: '#ff6b2c', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/orange-chaos.webp' },
  { slug: 'yellow-weekend', title: 'Weekend', text: 'weekend', bg: '#ffd542', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/yellow-weekend.webp' },
  { slug: 'green-pov', title: 'Pov:', text: 'pov:', bg: '#8ace00', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/green-pov.webp' },
  { slug: 'pink-girly', title: 'Girly', text: 'girly', bg: '#ff2a83', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/pink-girly.webp' },
  { slug: 'black-late', title: 'Late Night', text: 'late night', bg: '#111111', fg: '#ffffff', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/black-late.webp' },
  { slug: 'blue-summer', title: 'Summer', text: 'summer', bg: '#2bb8ea', fg: '#111111', blur: 1.5, spacing: 0, canvas: '1000x1000', align: 'center', image: '/images/examples/blue-summer.webp' }
] as const;

export default function Page() {
  const canonical=`${siteConfig.url}/brat-examples/`;
  const breadcrumb=breadcrumbSchema([{name:'Home',url:`${siteConfig.url}/`},{name:'Brat Examples',url:canonical}]);
  const page=webPageSchema({type:'CollectionPage',url:canonical,name:'Brat Examples & Templates',description:metadata.description,dateModified:'2026-10-04'});
  const itemList={'@context':'https://schema.org','@type':'ItemList','@id':`${canonical}#examples`,name:'Brat design examples',numberOfItems:examples.length,itemListElement:examples.map((item,index)=>({'@type':'ListItem',position:index+1,name:item.title,url:`${canonical}#${item.slug}`}))};
  const images=examples.map((item,index)=>imageObjectSchema({pageUrl:canonical,idSuffix:`example-${index+1}`,url:item.image,caption:`${item.title} Brat-style example`,description:`Original ${item.title.toLowerCase()} example that can be opened in the Brat Generator.`,width:900,height:600}));
  return <>
    <JsonLd data={[breadcrumb,page,itemList,...images]} />
    <RevealSetup/><SiteHeader/>
    <main id="main-content" className="examples-page">
      <PageHero breadcrumbs={[{label:'Home',href:'/'},{label:'Brat Examples'}]} eyebrow="Ideas & Templates" title="Brat Examples" accent="You Can Use" description="Browse original starting points, see the settings behind each look, then open the same setup in the main generator." />
      <section className="section"><div className="container container-wide">
        <div className="examples-grid">
          {examples.map((item)=> <article className="example-card glass reveal" id={item.slug} key={item.slug}>
            <Image src={item.image} alt={`${item.title} Brat-style design example`} width={900} height={600} sizes="(max-width:760px) 92vw, (max-width:1100px) 46vw, 30vw" />
            <div className="example-card-copy"><h2>{item.title}</h2>
            <dl className="example-settings">
              <div><dt>Background</dt><dd>{item.bg}</dd></div>
              <div><dt>Text</dt><dd>{item.fg}</dd></div>
              <div><dt>Blur</dt><dd>{item.blur}px</dd></div>
              <div><dt>Canvas</dt><dd>{item.canvas.replace('x','×')}</dd></div>
              <div><dt>Spacing</dt><dd>{item.spacing}px</dd></div>
              <div><dt>Alignment</dt><dd>Center</dd></div>
            </dl>
            <Link className="pill-link" href={`/?text=${encodeURIComponent(item.text)}&bg=${encodeURIComponent(item.bg)}&fg=${encodeURIComponent(item.fg)}&blur=${item.blur}&ls=${item.spacing}&size=${item.canvas}&align=${item.align}&font=${encodeURIComponent('Arial Narrow')}&fs=80&fit=1&wrap=0#generator`}>Use this look <span>→</span></Link></div>
          </article>)}
        </div>
      </div></section>
      <section className="section section-card"><div className="container container-wide"><div className="section-heading"><p className="eyebrow">Explore More</p><h2>Turn an Idea Into a <span className="text-brat">Finished Design</span></h2><p>Need motion instead of a still image? Open the <Link className="inline-source-link" href="/video-generator/">Brat Video Generator</Link> and reuse the same short, text-led idea as an animation.</p></div></div></section>
    </main><SiteFooter/>
  </>;
}
