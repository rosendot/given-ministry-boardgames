'use client';

import { useState, useEffect } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import {
    Shield,
    Share2,
    Plus,
    Minus,
    ShoppingCart,
    CheckCircle,
    ChevronLeft,
    ChevronRight,
    Loader2
} from 'lucide-react';

interface ShopifyProduct {
    id: string;
    title: string;
    handle: string;
    description: string;
    price: string;
    currency: string;
    inStock: boolean;
    quantity: number;
    variantId: string;
    images: Array<{
        url: string;
        alt: string;
    }>;
}

export default function GameDetailPage({
    params,
}: {
    params: Promise<{ handle: string }>;
}) {
    const [handle, setHandle] = useState<string>('');
    const [product, setProduct] = useState<ShopifyProduct | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [quantity, setQuantity] = useState(1);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    useEffect(() => {
        params.then(p => setHandle(p.handle));
    }, [params]);

    useEffect(() => {
        if (!handle) return;

        async function fetchProduct() {
            try {
                const response = await fetch(`/api/product/${handle}`);
                const data = await response.json();

                if (data.success) {
                    setProduct(data.product);
                } else {
                    setError(data.error);
                }
            } catch {
                setError('Failed to load product');
            } finally {
                setLoading(false);
            }
        }

        fetchProduct();
    }, [handle]);

    if (loading) {
        return (
            <div className="bg-warm-cream min-h-screen">
                <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-primary mb-4" />
                        <span className="text-xl font-light text-deep-brown">Loading game...</span>
                    </div>
                </div>
            </div>
        );
    }

    if (error || !product) {
        notFound();
    }

    const hasMultipleImages = product.images.length > 1;

    const nextImage = () => {
        setCurrentImageIndex((prev) =>
            prev === product.images.length - 1 ? 0 : prev + 1
        );
    };

    const prevImage = () => {
        setCurrentImageIndex((prev) =>
            prev === 0 ? product.images.length - 1 : prev - 1
        );
    };

    const goToImage = (index: number) => {
        setCurrentImageIndex(index);
    };

    return (
        <div className="bg-warm-cream min-h-screen">
            <div className="max-w-7xl mx-auto px-4 py-12 lg:py-16">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 xl:gap-16">
                    {/* Enhanced Game Images with Navigation */}
                    <div
                        className="space-y-6"
                        style={{
                            animation: mounted ? 'fadeInUp 0.4s ease-out 0s both' : 'none'
                        }}
                    >
                        <div className="relative h-[500px] rounded-2xl border border-gray-100 overflow-hidden group shadow-sm hover:shadow-lg transition-shadow duration-300">
                            {product.images.length > 0 ? (
                                <>
                                    <Image
                                        src={product.images[currentImageIndex].url}
                                        alt={product.images[currentImageIndex].alt}
                                        fill
                                        className="object-cover transition-transform duration-300 group-hover:scale-105"
                                        priority
                                        sizes="(max-width: 768px) 100vw, 50vw"
                                    />

                                    {/* Navigation Arrows - Only show if multiple images */}
                                    {hasMultipleImages && (
                                        <>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    prevImage();
                                                }}
                                                className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
                                                aria-label="Previous image"
                                                type="button"
                                            >
                                                <ChevronLeft className="w-6 h-6" />
                                            </button>
                                            <button
                                                onClick={(e) => {
                                                    e.preventDefault();
                                                    e.stopPropagation();
                                                    nextImage();
                                                }}
                                                className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-3 rounded-full transition-all duration-300 opacity-0 group-hover:opacity-100 hover:scale-110 z-20"
                                                aria-label="Next image"
                                                type="button"
                                            >
                                                <ChevronRight className="w-6 h-6" />
                                            </button>
                                        </>
                                    )}

                                    {/* Image Counter */}
                                    {hasMultipleImages && (
                                        <div className="absolute bottom-4 right-4 bg-black/60 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-bold tracking-tight z-10">
                                            {currentImageIndex + 1} of {product.images.length}
                                        </div>
                                    )}
                                </>
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-sage-green/20 to-mint-whisper" />
                            )}

                            <div className="absolute inset-0 bg-gradient-to-t from-primary/20 to-transparent pointer-events-none"></div>
                            <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-full flex items-center gap-2 z-10 shadow-sm">
                                <span className={`w-2.5 h-2.5 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                <span className="font-bold tracking-tight text-deep-brown">
                                    {product.inStock ? 'In Stock' : 'Out of Stock'}
                                </span>
                            </div>
                        </div>

                        {/* Enhanced Thumbnail gallery */}
                        {hasMultipleImages && (
                            <div className="grid grid-cols-4 gap-3">
                                {product.images.map((image, index) => (
                                    <button
                                        key={index}
                                        onClick={() => goToImage(index)}
                                        className={`relative h-24 rounded-xl border-2 transition-all duration-300 cursor-pointer overflow-hidden hover:scale-105 ${index === currentImageIndex
                                                ? 'border-primary shadow-lg'
                                                : 'border-gray-100 hover:border-sanctuary-green'
                                            }`}
                                        style={{
                                            animation: mounted ? `fadeInUp 0.4s ease-out ${0.1 + index * 0.05}s both` : 'none'
                                        }}
                                    >
                                        <Image
                                            src={image.url}
                                            alt={image.alt}
                                            fill
                                            className="object-cover"
                                            sizes="96px"
                                        />
                                        {index === currentImageIndex && (
                                            <div className="absolute inset-0 bg-primary/20"></div>
                                        )}
                                    </button>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Enhanced Game Details */}
                    <div className="space-y-8">
                        <div
                            style={{
                                animation: mounted ? 'fadeInUp 0.4s ease-out 0.1s both' : 'none'
                            }}
                        >
                            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-deep-brown">{product.title}</h1>
                            <div className="flex items-baseline gap-1">
                                <span className="text-5xl font-bold text-sanctuary-green">${product.price}</span>
                            </div>
                        </div>

                        {/* Product Description */}
                        <div
                            className="space-y-4"
                            style={{
                                animation: mounted ? 'fadeInUp 0.4s ease-out 0.2s both' : 'none'
                            }}
                        >
                            <div
                                className="text-gray-600 font-light leading-relaxed text-lg"
                                dangerouslySetInnerHTML={{ __html: product.description }}
                            />
                        </div>

                        {/* Stock Info */}
                        <div
                            className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm"
                            style={{
                                animation: mounted ? 'fadeInUp 0.4s ease-out 0.3s both' : 'none'
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold tracking-tight text-deep-brown">Availability:</span>
                                <div className="flex items-center gap-3">
                                    <span className={`w-3 h-3 rounded-full ${product.inStock ? 'bg-green-500' : 'bg-red-500'}`}></span>
                                    <span className={`text-lg font-bold tracking-tight ${product.inStock ? 'text-green-700' : 'text-red-700'}`}>
                                        {product.inStock ? `${product.quantity} in stock` : 'Out of stock'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Purchase Section */}
                        <div
                            className="bg-white p-8 lg:p-10 rounded-2xl border border-gray-100 shadow-sm space-y-6"
                            style={{
                                animation: mounted ? 'fadeInUp 0.4s ease-out 0.4s both' : 'none'
                            }}
                        >
                            <div className="flex items-center justify-between">
                                <span className="text-2xl font-bold tracking-tight text-deep-brown">Quantity:</span>
                                <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                    <button
                                        onClick={() => setQuantity(Math.max(1, quantity - 1))}
                                        className="p-3 hover:bg-sage-green/10 transition-all duration-300 hover:scale-110"
                                        disabled={!product.inStock}
                                    >
                                        <Minus className="w-5 h-5 text-deep-brown" />
                                    </button>
                                    <span className="px-6 py-3 text-deep-brown text-xl font-bold tracking-tight">{quantity}</span>
                                    <button
                                        onClick={() => setQuantity(Math.min(product.quantity, quantity + 1))}
                                        className="p-3 hover:bg-sage-green/10 transition-all duration-300 hover:scale-110"
                                        disabled={!product.inStock}
                                    >
                                        <Plus className="w-5 h-5 text-deep-brown" />
                                    </button>
                                </div>
                            </div>

                            {product.inStock ? (
                                <button
                                    className="w-full bg-primary text-warm-cream px-10 py-5 rounded-2xl text-lg font-bold tracking-tight hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 group"
                                    onClick={async () => {
                                        try {
                                            // Get or create cart
                                            let cartId = localStorage.getItem('shopify-cart-id');

                                            if (!cartId) {
                                                const createResponse = await fetch('/api/cart/create', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({})
                                                });
                                                const createData = await createResponse.json();
                                                if (createData.success) {
                                                    cartId = createData.cart.id;
                                                    if (cartId) {
                                                        localStorage.setItem('shopify-cart-id', cartId);
                                                    }
                                                }
                                            }

                                            if (cartId) {
                                                const response = await fetch('/api/cart/add', {
                                                    method: 'POST',
                                                    headers: { 'Content-Type': 'application/json' },
                                                    body: JSON.stringify({
                                                        cartId,
                                                        variantId: product.variantId,
                                                        quantity
                                                    })
                                                });

                                                const data = await response.json();
                                                if (data.success) {
                                                    window.dispatchEvent(new Event('cartUpdated'));
                                                    // Redirect to cart page
                                                    window.location.href = '/cart';
                                                } else {
                                                    alert('Error adding to cart');
                                                }
                                            }
                                        } catch (error) {
                                            console.error('Error adding to cart:', error);
                                            alert('Error adding to cart');
                                        }
                                    }}
                                >
                                    <ShoppingCart className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                    <span>Add to Cart - ${(parseFloat(product.price) * quantity).toFixed(2)}</span>
                                </button>
                            ) : (
                                <button disabled className="w-full bg-gray-400 text-white px-10 py-5 rounded-2xl text-lg font-bold tracking-tight cursor-not-allowed shadow-sm">
                                    Out of Stock
                                </button>
                            )}

                            <div className="flex items-center justify-between text-base">
                                <div className="flex items-center gap-2 text-sage-green font-bold tracking-tight">
                                    <Shield className="w-5 h-5" />
                                    <span>Secure checkout</span>
                                </div>

                                <button className="flex items-center gap-2 text-deep-brown/60 hover:text-primary transition-colors duration-300 font-light">
                                    <Share2 className="w-5 h-5" />
                                    <span>Share</span>
                                </button>
                            </div>
                        </div>

                        {/* Trust Badges */}
                        <div
                            className="grid grid-cols-2 gap-6"
                            style={{
                                animation: mounted ? 'fadeInUp 0.4s ease-out 0.5s both' : 'none'
                            }}
                        >
                            <div className="flex items-center gap-3 text-deep-brown/70 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <Shield className="w-6 h-6 text-sage-green" />
                                <span className="font-light">Secure checkout</span>
                            </div>
                            <div className="flex items-center gap-3 text-deep-brown/70 bg-white p-4 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow duration-300">
                                <CheckCircle className="w-6 h-6 text-sage-green" />
                                <span className="font-light">30-day returns</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
