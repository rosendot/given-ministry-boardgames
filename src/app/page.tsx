'use client';

import { useState, useEffect } from 'react';
import Link from "next/link";
import {
  ArrowRight,
  Truck,
  Users,
  Award,
  Sparkles,
  Heart
} from 'lucide-react';
import { companyConfig } from '@/config/company';

export default function Home() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <div className="relative min-h-screen bg-gradient-to-br from-primary via-forest-prayer to-sanctuary-green text-warm-cream overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-4 -right-4 w-24 h-24 bg-mint-whisper/20 rounded-full animate-pulse"></div>
        <div className="absolute top-1/2 -left-8 w-16 h-16 bg-warm-cream/10 rounded-full animate-bounce"></div>
        <div className="absolute bottom-8 right-1/3 w-12 h-12 bg-olive-mist/30 rounded-full animate-pulse"></div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 py-20 lg:py-24">
        <div className="max-w-7xl mx-auto px-4">
          {/* Main Hero Content */}
          <div className="text-center mb-16">
            <div
              className="flex justify-center mb-8"
              style={{
                animation: mounted ? 'fadeInUp 0.4s ease-out 0s both' : 'none'
              }}
            >
              <div className="bg-gradient-to-br from-warm-cream/30 to-mint-whisper/20 p-5 rounded-full shadow-lg">
                <Sparkles className="w-16 h-16 text-mint-whisper animate-spin group-hover:rotate-12 transition-transform duration-300" />
              </div>
            </div>
            <h1
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight mb-6 relative"
              style={{
                animation: mounted ? 'fadeInUp 0.4s ease-out 0.1s both' : 'none'
              }}
            >
              <span className="relative inline-block text-warm-cream transform hover:scale-105 transition-all duration-300"
                style={{
                  textShadow: `
                    2px 2px 0px #7a8471,
                    4px 4px 0px #6b7562,
                    6px 6px 0px #5c6653,
                    8px 8px 0px #4d5744,
                    10px 10px 0px #3e4835,
                    12px 12px 0px #2f3926,
                    14px 14px 20px rgba(0,0,0,0.4)
                  `
                }}>
                Welcome to {companyConfig.name}
              </span>
            </h1>
            <p
              className="text-xl md:text-2xl font-light mb-10 text-warm-cream/90 max-w-3xl mx-auto leading-relaxed"
              style={{
                animation: mounted ? 'fadeInUp 0.4s ease-out 0.2s both' : 'none'
              }}
            >
              {companyConfig.tagline}
            </p>
            <div
              style={{
                animation: mounted ? 'fadeInUp 0.4s ease-out 0.3s both' : 'none'
              }}
            >
              <Link
                href="/games"
                className="inline-flex items-center gap-3 bg-warm-cream text-forest-prayer px-10 py-5 rounded-2xl text-lg font-bold tracking-tight hover:bg-mint-whisper transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 group"
              >
                <span>Shop Our Games</span>
                <ArrowRight className="w-6 h-6 group-hover:translate-x-1 transition-transform duration-300" />
              </Link>
            </div>
          </div>

          {/* Badges on sides with center content */}
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 xl:gap-12 items-start mt-20">
            {/* Left Badge */}
            <div
              className="lg:col-span-1 flex justify-center"
              style={{
                animation: mounted ? 'fadeInUp 0.4s ease-out 0.4s both' : 'none'
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-gray-100/20 text-center hover:bg-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-mint-whisper/30 to-sage-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-mint-whisper" />
                </div>
                <div className="text-2xl font-bold tracking-tight text-warm-cream mb-2">Family</div>
                <div className="text-base font-light text-warm-cream/80">{companyConfig.values.familyOwned}</div>
              </div>
            </div>

            {/* Center Content - Three Cards */}
            <div className="lg:col-span-3 grid grid-cols-1 md:grid-cols-3 gap-8">
              <div
                className="group bg-white/10 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-gray-100/20 hover:bg-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: mounted ? 'fadeInUp 0.4s ease-out 0.5s both' : 'none'
                }}
              >
                <div className="bg-gradient-to-br from-mint-whisper/30 to-sage-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Heart className="w-8 h-8 text-mint-whisper" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3 text-warm-cream text-center">Personal Touch</h3>
                <p className="text-warm-cream/80 font-light leading-relaxed text-center">Every order is personally handled with care. We carefully select each game to ensure quality and meaningful play experiences.</p>
              </div>

              <div
                className="group bg-white/10 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-gray-100/20 hover:bg-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: mounted ? 'fadeInUp 0.4s ease-out 0.6s both' : 'none'
                }}
              >
                <div className="bg-gradient-to-br from-mint-whisper/30 to-sage-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Truck className="w-8 h-8 text-mint-whisper" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3 text-warm-cream text-center">Fast & Careful Shipping</h3>
                <p className="text-warm-cream/80 font-light leading-relaxed text-center">We ship quickly and package with care to ensure your games arrive safely.</p>
              </div>

              <div
                className="group bg-white/10 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-gray-100/20 hover:bg-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
                style={{
                  animation: mounted ? 'fadeInUp 0.4s ease-out 0.7s both' : 'none'
                }}
              >
                <div className="bg-gradient-to-br from-mint-whisper/30 to-sage-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <Users className="w-8 h-8 text-mint-whisper" />
                </div>
                <h3 className="text-2xl font-bold tracking-tight mb-3 text-warm-cream text-center">Family Values</h3>
                <p className="text-warm-cream/80 font-light leading-relaxed text-center">We choose games that educate about God and bring families together in faith and fellowship.</p>
              </div>
            </div>

            {/* Right Badge */}
            <div
              className="lg:col-span-1 flex justify-center"
              style={{
                animation: mounted ? 'fadeInUp 0.4s ease-out 0.8s both' : 'none'
              }}
            >
              <div className="bg-white/10 backdrop-blur-sm p-8 lg:p-10 rounded-2xl border border-gray-100/20 text-center hover:bg-white/20 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 group">
                <div className="bg-gradient-to-br from-mint-whisper/30 to-sage-green/20 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                  <Award className="w-8 h-8 text-mint-whisper" />
                </div>
                <div className="text-2xl font-bold tracking-tight text-warm-cream mb-2">Hand Picked</div>
                <div className="text-base font-light text-warm-cream/80">{companyConfig.values.handPicked}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
