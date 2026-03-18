import React from 'react';
import { Button } from './button';
import { InfiniteSlider } from './infinite-slider';
import { ProgressiveBlur } from './progressive-blur';
import { cn } from '../../lib/utils';
import { Menu, X, ChevronRight, Shield, Zap, Activity, Droplets, Brain, Heart, Crosshair } from 'lucide-react';
import { useScroll, motion } from 'motion/react';

export function HeroSection() {
    return (
        <>
            <HeroHeader />
            <main className="overflow-x-hidden bg-void relative">
                {/* Liquid Glass Background Effects */}
                <div className="absolute inset-0 liquid-gradient animate-morph opacity-40 mix-blend-lighten pointer-events-none" />
                <div className="scanline pointer-events-none" />
                
                <section>
                    <div className="py-24 md:pb-32 lg:pb-36 lg:pt-64">
                        <div className="relative z-10 mx-auto flex max-w-[1400px] flex-col px-6 lg:block lg:px-12">
                            <div className="mx-auto max-w-lg text-center lg:ml-0 lg:max-w-2xl lg:text-left">
                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.2 }}
                                    className="mb-8"
                                >
                                    <div className="flex items-center justify-center lg:justify-start gap-4">
                                        <div className="w-12 h-[1px] bg-gold/50" />
                                        <span className="font-mono text-[10px] text-gold tracking-[0.4em] uppercase font-bold">System Initialization</span>
                                    </div>
                                </motion.div>
                            
                                <motion.h1 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.4 }}
                                    className="max-w-3xl text-balance text-[56px] leading-[0.9] md:text-[84px] font-display text-white tracking-tight"
                                >
                                    The Pursuit of <span className="italic text-gold">Excellence.</span>
                                </motion.h1>
                                <motion.p 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.6 }}
                                    className="mt-8 max-w-xl text-balance text-lg text-sub font-light border-l border-white/10 pl-6 lg:mx-0 mx-auto text-left"
                                >
                                    Clinical-grade optimization. The men's grooming industry is flooded with weak, outdated, and hormone-disrupting products. ZADDY is the counter-measure.
                                </motion.p>

                                <motion.div 
                                    initial={{ opacity: 0, y: 30 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    transition={{ duration: 1, delay: 0.8 }}
                                    className="mt-12 flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start"
                                >
                                    <Button
                                        asChild
                                        size="lg"
                                        className="h-14 rounded-full pl-8 pr-6 text-[13px] font-bold tracking-[0.2em] uppercase shadow-[0_0_20px_rgba(200,168,75,0.3)] hover:shadow-[0_0_30px_rgba(200,168,75,0.6)] transition-all duration-500">
                                        <a href="#shop">
                                            <span className="text-nowrap font-mono">Initialize System</span>
                                            <ChevronRight className="ml-2 w-4 h-4" />
                                        </a>
                                    </Button>
                                    <Button
                                        key={2}
                                        asChild
                                        size="lg"
                                        variant="ghost"
                                        className="h-14 rounded-full px-8 text-[13px] font-bold tracking-[0.2em] uppercase text-white hover:bg-white/5 border border-transparent hover:border-gold/20 transition-all duration-500">
                                        <a href="#about">
                                            <span className="text-nowrap font-mono">Read Manifesto</span>
                                        </a>
                                    </Button>
                                </motion.div>
                            </div>
                        </div>
                        
                        <motion.div 
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ duration: 1.5, delay: 0.5, ease: [0.16, 1, 0.3, 1] }}
                            className="aspect-[4/5] md:aspect-[21/9] absolute inset-2 md:inset-4 overflow-hidden rounded-[2rem] md:rounded-[3rem] border border-white/10 z-0 bg-black mt-24 md:mt-0"
                        >
                            <video
                                autoPlay
                                loop
                                playsInline
                                muted
                                className="size-full object-cover opacity-30 grayscale blur-[2px] mix-blend-luminosity"
                                src="https://storage.googleapis.com/aistudio-build-assets/zaddy-brand-film.mp4"></video>
                            <div className="absolute inset-0 bg-gradient-to-r from-void via-void/50 to-transparent" />
                            <div className="absolute inset-0 bg-gradient-to-t from-void via-transparent to-transparent" />
                        </motion.div>
                    </div>
                </section>
                
                {/* Tech Slider Section */}
                <section className="bg-void pb-12 pt-8 relative z-10 border-t border-border mt-32 md:mt-0">
                    <div className="group relative m-auto max-w-7xl px-6">
                        <div className="flex flex-col items-center md:flex-row">
                            <div className="md:max-w-48 md:border-r border-white/10 md:pr-8 mb-8 md:mb-0">
                                <p className="text-center md:text-end font-mono text-[10px] tracking-[0.3em] uppercase text-gold/60">System Architecture</p>
                            </div>
                            <div className="relative py-6 md:w-[calc(100%-12rem)] md:pl-8">
                                <InfiniteSlider
                                    durationOnHover={20}
                                    duration={40}
                                    gap={80}>
                                    <div className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors duration-500">
                                        <Shield size={20} />
                                        <span className="font-mono text-[11px] uppercase tracking-widest font-medium">Hormone-Protective</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors duration-500">
                                        <Zap size={20} />
                                        <span className="font-mono text-[11px] uppercase tracking-widest font-medium">Clinical-Grade</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors duration-500">
                                        <Droplets size={20} />
                                        <span className="font-mono text-[11px] uppercase tracking-widest font-medium">Deep Hydration</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors duration-500">
                                        <Activity size={20} />
                                        <span className="font-mono text-[11px] uppercase tracking-widest font-medium">Cellular Repair</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors duration-500">
                                        <Brain size={20} />
                                        <span className="font-mono text-[11px] uppercase tracking-widest font-medium">Nootropic Infused</span>
                                    </div>
                                    <div className="flex items-center gap-3 text-white/40 hover:text-gold transition-colors duration-500">
                                        <Crosshair size={20} />
                                        <span className="font-mono text-[11px] uppercase tracking-widest font-medium">Precision Recovery</span>
                                    </div>
                                </InfiniteSlider>

                                <div className="bg-gradient-to-r from-void absolute inset-y-0 left-0 w-24"></div>
                                <div className="bg-gradient-to-l from-void absolute inset-y-0 right-0 w-24"></div>
                                {/* Removed progressive blur for absolute dark mode compatibility */}
                            </div>
                        </div>
                    </div>
                </section>
            </main>
        </>
    )
}

const menuItems = [
    { name: 'Skin', href: '#skin' },
    { name: 'Apparel', href: '#apparel' },
    { name: 'Health', href: '#health' },
    { name: 'About', href: '#about' },
]

const HeroHeader = () => {
    const [menuState, setMenuState] = React.useState(false)
    const [scrolled, setScrolled] = React.useState(false)
    const { scrollYProgress } = useScroll()

    React.useEffect(() => {
        const unsubscribe = scrollYProgress.on('change', (latest) => {
            setScrolled(latest > 0.05)
        })
        return () => unsubscribe()
    }, [scrollYProgress])

    return (
        <header>
            <nav
                data-state={menuState && 'active'}
                className="group fixed z-[100] w-full pt-4">
                <div className={cn('mx-auto max-w-[1400px] rounded-full px-6 transition-all duration-500 lg:px-10 border border-transparent', scrolled && 'bg-void/70 backdrop-blur-xl border-white/10 shadow-2xl py-2')}>
                    <motion.div
                        key={1}
                        className={cn('relative flex flex-wrap items-center justify-between gap-6 py-2 duration-200 lg:gap-0', scrolled && 'py-1')}>
                        <div className="flex w-full items-center justify-between gap-12 lg:w-auto">
                            <a
                                href="/"
                                aria-label="home"
                                className="flex items-center space-x-2">
                                <img 
                                  src="https://www.zaddyproducts.com/cdn/shop/files/Zaddy-Logo.png?v=1641479507&width=512" 
                                  alt="ZADDY" 
                                  className={cn("invert brightness-200 transition-all duration-300", scrolled ? "w-24" : "w-32")}
                                  referrerPolicy="no-referrer"
                                />
                            </a>

                            <button
                                onClick={() => setMenuState(!menuState)}
                                aria-label={menuState == true ? 'Close Menu' : 'Open Menu'}
                                className="relative z-20 -m-2.5 -mr-4 block cursor-pointer p-2.5 lg:hidden text-white">
                                <Menu className="group-data-[state=active]:rotate-180 group-data-[state=active]:scale-0 group-data-[state=active]:opacity-0 m-auto size-6 duration-200" />
                                <X className="group-data-[state=active]:rotate-0 group-data-[state=active]:scale-100 group-data-[state=active]:opacity-100 absolute inset-0 m-auto size-6 -rotate-180 scale-0 opacity-0 duration-200" />
                            </button>

                            <div className="hidden lg:block">
                                <ul className="flex gap-10 font-mono text-[11px] uppercase tracking-[0.2em] font-medium">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-white/60 hover:text-gold block duration-300 transition-colors">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </div>

                        <div className="bg-void group-data-[state=active]:block lg:group-data-[state=active]:flex mb-6 hidden w-full flex-wrap items-center justify-end space-y-8 rounded-3xl p-6 border border-white/10 lg:m-0 lg:flex lg:w-fit lg:gap-6 lg:space-y-0 lg:border-transparent lg:bg-transparent lg:p-0">
                            <div className="lg:hidden">
                                <ul className="space-y-6 font-mono text-[12px] uppercase tracking-[0.2em]">
                                    {menuItems.map((item, index) => (
                                        <li key={index}>
                                            <a
                                                href={item.href}
                                                className="text-white/60 hover:text-gold block duration-150">
                                                <span>{item.name}</span>
                                            </a>
                                        </li>
                                    ))}
                                </ul>
                            </div>
                            <div className="flex w-full flex-col space-y-3 sm:flex-row sm:gap-4 sm:space-y-0 md:w-fit">
                                <Button
                                    asChild
                                    variant="outline"
                                    className="bg-transparent border-white/20 text-white hover:bg-white/5 hover:border-gold/30 hover:text-gold rounded-full px-6 font-mono text-[10px] tracking-[0.2em] uppercase h-10">
                                    <a href="#system">
                                        <span>Log In</span>
                                    </a>
                                </Button>
                                <Button
                                    asChild
                                    className="rounded-full px-8 font-mono text-[10px] tracking-[0.2em] uppercase h-10 shadow-[0_0_15px_rgba(200,168,75,0.2)] hover:shadow-[0_0_20px_rgba(200,168,75,0.4)]">
                                    <a href="#shop">
                                        <span>Shop Now</span>
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </nav>
        </header>
    )
}
