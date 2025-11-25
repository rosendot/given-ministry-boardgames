'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    ArrowUp,
    ArrowDown,
    Grid3X3,
    List,
    Sparkles,
    Loader2
} from 'lucide-react';

interface ShopifyProduct {
    id: string;
    title: string;
    handle: string;
    price: string;
    currency: string;
    inStock: boolean;
    quantity: number;
    featuredImage: {
        url: string;
        alt: string;
    } | null;
}

export default function GamesPage() {
    const [products, setProducts] = useState<ShopifyProduct[]>([]);
    const [loading, setLoading] = useState(true);
    const [sortBy, setSortBy] = useState('name');
    const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
    const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
    const [mounted, setMounted] = useState(false);

    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Fetch products from Shopify
    useEffect(() => {
        async function fetchProducts() {
            try {
                const response = await fetch('/api/inventory');
                const data = await response.json();
                if (data.success) {
                    setProducts(data.products);
                } else {
                    setError(data.error || 'Failed to load products');
                }
            } catch (error) {
                console.error('Error fetching products:', error);
                setError('Failed to connect to the server');
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    // Sort products
    const sortedProducts = [...products].sort((a, b) => {
        let comparison = 0;
        if (sortBy === 'price') {
            comparison = parseFloat(a.price) - parseFloat(b.price);
        } else if (sortBy === 'name') {
            comparison = a.title.localeCompare(b.title);
        }
        return sortOrder === 'desc' ? -comparison : comparison;
    });

    const toggleSortOrder = () => {
        setSortOrder(prev => prev === 'asc' ? 'desc' : 'asc');
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-primary via-forest-prayer to-sanctuary-green min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-warm-cream mb-4" />
                        <span className="text-xl font-light text-warm-cream">Loading games...</span>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-gradient-to-br from-primary via-forest-prayer to-sanctuary-green min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
                {/* Enhanced Header */}
                <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-12 gap-6">
                    <div
                        style={{
                            animation: mounted ? 'fadeInUp 0.4s ease-out 0s both' : 'none'
                        }}
                    >
                        <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-warm-cream mb-3">
                            Board Games
                        </h1>
                        <p className="text-xl font-light text-warm-cream/80 leading-relaxed">Discover your next favorite game from our curated collection</p>
                    </div>

                    {/* Controls grouped together */}
                    <div
                        className="hidden md:flex flex-col items-end gap-4"
                        style={{
                            animation: mounted ? 'fadeInUp 0.4s ease-out 0.1s both' : 'none'
                        }}
                    >
                        {/* Sort Controls */}
                        <div className="flex items-center gap-3">
                            <span className="text-base text-warm-cream/80 font-light">Sort:</span>
                            <div className="flex border border-warm-cream/30 rounded-xl overflow-hidden backdrop-blur-sm shadow-sm">
                                <button
                                    onClick={() => setSortBy('name')}
                                    className={`px-5 py-3 text-sm font-bold tracking-tight transition-all duration-300 ${sortBy === 'name'
                                        ? 'bg-warm-cream text-forest-prayer'
                                        : 'bg-warm-cream/10 text-warm-cream hover:bg-warm-cream/20'
                                        }`}
                                >
                                    Name
                                </button>
                                <button
                                    onClick={() => setSortBy('price')}
                                    className={`px-5 py-3 text-sm font-bold tracking-tight transition-all duration-300 ${sortBy === 'price'
                                        ? 'bg-warm-cream text-forest-prayer'
                                        : 'bg-warm-cream/10 text-warm-cream hover:bg-warm-cream/20'
                                        }`}
                                >
                                    Price
                                </button>
                            </div>
                            <button
                                onClick={toggleSortOrder}
                                className="p-3 border border-warm-cream/30 rounded-xl bg-warm-cream/10 hover:bg-warm-cream/20 hover:scale-110 transition-all duration-300 backdrop-blur-sm shadow-sm"
                                title={sortOrder === 'asc' ? 'Sort descending' : 'Sort ascending'}
                            >
                                {sortOrder === 'asc' ? (
                                    <ArrowUp className="w-5 h-5 text-warm-cream" />
                                ) : (
                                    <ArrowDown className="w-5 h-5 text-warm-cream" />
                                )}
                            </button>
                        </div>

                        {/* View Toggle */}
                        <div className="flex border border-warm-cream/30 rounded-xl overflow-hidden backdrop-blur-sm shadow-sm">
                            <button
                                onClick={() => setViewMode('grid')}
                                className={`p-3 transition-all duration-300 ${viewMode === 'grid'
                                    ? 'bg-warm-cream text-forest-prayer'
                                    : 'bg-warm-cream/10 text-warm-cream hover:bg-warm-cream/20 hover:scale-110'
                                    }`}
                            >
                                <Grid3X3 className="w-6 h-6" />
                            </button>
                            <button
                                onClick={() => setViewMode('list')}
                                className={`p-3 transition-all duration-300 ${viewMode === 'list'
                                    ? 'bg-warm-cream text-forest-prayer'
                                    : 'bg-warm-cream/10 text-warm-cream hover:bg-warm-cream/20 hover:scale-110'
                                    }`}
                            >
                                <List className="w-6 h-6" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Mobile Controls */}
                <div
                    className="md:hidden bg-white/10 backdrop-blur-sm p-6 rounded-2xl border border-gray-100/20 mb-8"
                    style={{
                        animation: mounted ? 'fadeInUp 0.4s ease-out 0.1s both' : 'none'
                    }}
                >
                    <div className="flex flex-col gap-5">
                        {/* Mobile Sort */}
                        <div className="flex items-center justify-between">
                            <span className="text-base text-warm-cream/80 font-light">Sort by:</span>
                            <div className="flex items-center gap-2">
                                <div className="flex border border-warm-cream/30 rounded-xl overflow-hidden">
                                    <button
                                        onClick={() => setSortBy('name')}
                                        className={`px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300 ${sortBy === 'name'
                                            ? 'bg-warm-cream text-forest-prayer'
                                            : 'bg-warm-cream/10 text-warm-cream hover:bg-warm-cream/20'
                                            }`}
                                    >
                                        Name
                                    </button>
                                    <button
                                        onClick={() => setSortBy('price')}
                                        className={`px-4 py-2 text-sm font-bold tracking-tight transition-all duration-300 ${sortBy === 'price'
                                            ? 'bg-warm-cream text-forest-prayer'
                                            : 'bg-warm-cream/10 text-warm-cream hover:bg-warm-cream/20'
                                            }`}
                                    >
                                        Price
                                    </button>
                                </div>
                                <button
                                    onClick={toggleSortOrder}
                                    className="p-2 border border-warm-cream/30 rounded-xl bg-warm-cream/10 hover:bg-warm-cream/20 transition-all duration-300"
                                >
                                    {sortOrder === 'asc' ? (
                                        <ArrowUp className="w-5 h-5 text-warm-cream" />
                                    ) : (
                                        <ArrowDown className="w-5 h-5 text-warm-cream" />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Mobile View Toggle */}
                        <div className="flex items-center justify-between">
                            <span className="text-base text-warm-cream/80 font-light">View:</span>
                            <div className="flex border border-warm-cream/30 rounded-xl overflow-hidden">
                                <button
                                    onClick={() => setViewMode('grid')}
                                    className={`p-2 transition-all duration-300 ${viewMode === 'grid'
                                        ? 'bg-warm-cream text-forest-prayer'
                                        : 'bg-warm-cream/10 text-warm-cream hover:bg-warm-cream/20'
                                        }`}
                                >
                                    <Grid3X3 className="w-5 h-5" />
                                </button>
                                <button
                                    onClick={() => setViewMode('list')}
                                    className={`p-2 transition-all duration-300 ${viewMode === 'list'
                                        ? 'bg-warm-cream text-forest-prayer'
                                        : 'bg-warm-cream/10 text-warm-cream hover:bg-warm-cream/20'
                                        }`}
                                >
                                    <List className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Games Grid with Images */}
                {
                    viewMode === 'grid' ? (
                        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 xl:gap-10">
                            {sortedProducts.map((product, index) => (
                                <Link
                                    key={product.id}
                                    href={`/games/${product.handle}`}
                                    style={{
                                        animation: mounted ? `fadeInUp 0.4s ease-out ${0.2 + index * 0.05}s both` : 'none'
                                    }}
                                >
                                    <div className="group bg-white border border-gray-100 rounded-2xl p-8 hover:shadow-2xl transition-all duration-300 cursor-pointer hover:-translate-y-2">
                                        {/* Game Image with Shopify images */}
                                        <div className="relative h-48 rounded-xl mb-6 overflow-hidden">
                                            {product.featuredImage ? (
                                                <Image
                                                    src={product.featuredImage.url}
                                                    alt={product.featuredImage.alt}
                                                    fill
                                                    className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gradient-to-br from-sage-green/20 to-mint-whisper" />
                                            )}
                                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                                            <div className="absolute bottom-3 left-3 bg-white/90 backdrop-blur-sm px-3 py-1.5 rounded-full text-sm font-bold tracking-tight text-deep-brown flex items-center gap-2 shadow-sm">
                                                <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                                <span>{product.inStock ? 'In Stock' : 'Out of Stock'}</span>
                                            </div>
                                        </div>

                                        {/* Game Info */}
                                        <div className="space-y-4">
                                            <div className="flex items-start justify-between">
                                                <h3 className="text-2xl font-bold tracking-tight text-deep-brown group-hover:text-primary transition-colors duration-300">{product.title}</h3>
                                            </div>

                                            <div className="flex items-baseline justify-between pt-3 border-t border-gray-100">
                                                <div className="flex items-baseline gap-1">
                                                    <span className="text-3xl font-bold text-sanctuary-green">${product.price}</span>
                                                </div>
                                                <span className="text-sm text-gray-500 font-light">
                                                    Qty: {product.quantity}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    ) : (
                        // List View with Images
                        <div className="space-y-6">
                            {sortedProducts.map((product, index) => (
                                <Link
                                    key={product.id}
                                    href={`/games/${product.handle}`}
                                    style={{
                                        animation: mounted ? `fadeInUp 0.4s ease-out ${0.2 + index * 0.05}s both` : 'none'
                                    }}
                                >
                                    <div className="group bg-white border border-gray-100 rounded-2xl p-8 lg:p-10 hover:shadow-lg hover:-translate-y-1 transition-all duration-300 cursor-pointer">
                                        <div className="flex items-center gap-8">
                                            <div className="relative w-32 h-32 rounded-xl flex-shrink-0 overflow-hidden">
                                                {product.featuredImage ? (
                                                    <Image
                                                        src={product.featuredImage.url}
                                                        alt={product.featuredImage.alt}
                                                        fill
                                                        className="object-cover transition-transform duration-300 group-hover:scale-110"
                                                        sizes="128px"
                                                    />
                                                ) : (
                                                    <div className="w-full h-full bg-gradient-to-br from-sage-green/20 to-mint-whisper" />
                                                )}
                                            </div>

                                            <div className="flex-1 min-w-0">
                                                <div className="flex items-start justify-between mb-3">
                                                    <h3 className="text-2xl font-bold tracking-tight text-deep-brown group-hover:text-primary transition-colors duration-300">{product.title}</h3>
                                                    <div className="flex items-center gap-6">
                                                        <span className={`text-sm px-3 py-1.5 rounded-full font-bold tracking-tight shadow-sm ${product.inStock
                                                            ? 'bg-green-100 text-green-700'
                                                            : 'bg-red-100 text-red-700'
                                                            }`}>
                                                            {product.inStock ? 'In Stock' : 'Out of Stock'}
                                                        </span>
                                                        <div className="flex items-baseline gap-1">
                                                            <span className="text-3xl font-bold text-sanctuary-green">${product.price}</span>
                                                        </div>
                                                    </div>
                                                </div>

                                                <div className="flex items-center justify-between">
                                                    <div className="text-base text-gray-600 font-light">
                                                        Quantity available: {product.quantity}
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))}
                        </div>
                    )
                }

                {/* Error State */}
                {
                    error && (
                        <div
                            className="text-center py-20"
                            style={{
                                animation: mounted ? 'fadeInUp 0.4s ease-out 0.2s both' : 'none'
                            }}
                        >
                            <div className="bg-red-500/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
                                <span className="text-4xl">⚠️</span>
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-warm-cream mb-3">Unable to load games</h3>
                            <p className="text-xl font-light text-warm-cream/80 mb-4">{error}</p>
                            {error.includes('payment') && (
                                <p className="text-warm-cream/60 font-light">
                                    Please log into your Shopify admin to resolve billing issues.
                                </p>
                            )}
                        </div>
                    )
                }

                {/* No Results State */}
                {
                    !error && sortedProducts.length === 0 && !loading && (
                        <div
                            className="text-center py-20"
                            style={{
                                animation: mounted ? 'fadeInUp 0.4s ease-out 0.2s both' : 'none'
                            }}
                        >
                            <div className="bg-gradient-to-br from-warm-cream/30 to-mint-whisper/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                                <Sparkles className="w-12 h-12 text-mint-whisper animate-pulse" />
                            </div>
                            <h3 className="text-2xl font-bold tracking-tight text-warm-cream mb-3">No games available</h3>
                            <p className="text-xl font-light text-warm-cream/80">Check back soon for new additions to our collection!</p>
                        </div>
                    )
                }
            </div>
        </div>
    );
}
