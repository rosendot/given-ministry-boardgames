'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {
    Plus,
    Minus,
    Trash2,
    ShoppingCart,
    ArrowLeft,
    Truck,
    Shield,
    Gift,
    CheckCircle,
    Loader2
} from 'lucide-react';
import { companyConfig } from '@/config/company';

interface CartLine {
    id: string;
    quantity: number;
    merchandise: {
        id: string;
        title: string;
        product: {
            title: string;
            handle: string;
        };
        price: {
            amount: string;
            currencyCode: string;
        };
        image?: {
            url: string;
            altText: string;
        };
    };
    estimatedCost: {
        totalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
}

interface ShopifyCart {
    id: string;
    checkoutUrl: string;
    totalQuantity: number;
    estimatedCost: {
        totalAmount: {
            amount: string;
            currencyCode: string;
        };
    };
    lines: {
        edges: Array<{
            node: CartLine;
        }>;
    };
}

export default function CartPage() {
    const [cart, setCart] = useState<ShopifyCart | null>(null);
    const [loading, setLoading] = useState(true);
    const [updating, setUpdating] = useState<string | null>(null);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    // Get or create cart on mount
    useEffect(() => {
        initializeCart();
    }, []);

    const initializeCart = async () => {
        try {
            // Check if we have a cart ID in localStorage
            const existingCartId = localStorage.getItem('shopify-cart-id');

            if (existingCartId) {
                // Try to fetch existing cart
                const response = await fetch('/api/cart/get', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartId: existingCartId })
                });

                const data = await response.json();
                if (data.success && data.cart) {
                    setCart(data.cart);
                    setLoading(false);
                    return;
                }
            }

            // Create new cart if no existing cart found
            const response = await fetch('/api/cart/create', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({})
            });

            const data = await response.json();
            if (data.success) {
                setCart(data.cart);
                localStorage.setItem('shopify-cart-id', data.cart.id);
            }
        } catch (error) {
            console.error('Error initializing cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (lineId: string, newQuantity: number) => {
        if (!cart) return;

        setUpdating(lineId);
        try {
            if (newQuantity === 0) {
                // Remove item
                const response = await fetch('/api/cart/remove', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ cartId: cart.id, lineIds: [lineId] })
                });

                const data = await response.json();
                if (data.success) {
                    setCart(data.cart);
                    window.dispatchEvent(new Event('cartUpdated'));
                }
            } else {
                // Update quantity
                const response = await fetch('/api/cart/update', {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({
                        cartId: cart.id,
                        lines: [{ id: lineId, quantity: newQuantity }]
                    })
                });

                const data = await response.json();
                if (data.success) {
                    setCart(data.cart);
                    window.dispatchEvent(new Event('cartUpdated'));
                }
            }
        } catch (error) {
            console.error('Error updating cart:', error);
        } finally {
            setUpdating(null);
        }
    };

    const handleCheckout = () => {
        if (cart?.checkoutUrl) {
            window.location.href = cart.checkoutUrl;
        }
    };

    if (loading) {
        return (
            <div className="bg-gradient-to-br from-primary via-forest-prayer to-sanctuary-green min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="w-12 h-12 animate-spin text-warm-cream mb-4" />
                        <span className="text-xl font-light text-warm-cream">Loading cart...</span>
                    </div>
                </div>
            </div>
        );
    }

    const cartItems = cart?.lines.edges || [];

    if (cartItems.length === 0) {
        return (
            <div className="bg-gradient-to-br from-primary via-forest-prayer to-sanctuary-green min-h-screen">
                <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
                    <div
                        className="bg-white p-12 lg:p-16 rounded-2xl shadow-lg border border-gray-100 text-center"
                        style={{
                            animation: mounted ? 'fadeInUp 0.4s ease-out 0s both' : 'none'
                        }}
                    >
                        <div className="bg-gradient-to-br from-sage-green/30 to-mint-whisper/20 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg">
                            <ShoppingCart className="w-12 h-12 text-sage-green" />
                        </div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight mb-4 text-deep-brown">Your Cart is Empty</h1>
                        <p className="text-xl font-light text-gray-600 mb-10">Looks like you haven't added any games yet. Let's fix that!</p>
                        <Link
                            href="/games"
                            className="inline-flex items-center gap-3 bg-primary text-warm-cream px-10 py-5 rounded-2xl text-lg font-bold tracking-tight hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 group"
                        >
                            <ArrowLeft className="w-6 h-6 group-hover:-translate-x-1 transition-transform duration-300" />
                            <span>Continue Shopping</span>
                        </Link>
                    </div>
                </div>
            </div>
        );
    }

    const subtotal = parseFloat(cart?.estimatedCost.totalAmount.amount || '0');
    const shipping = companyConfig.policies.standardShipping;
    const total = subtotal + shipping;

    return (
        <div className="bg-gradient-to-br from-primary via-forest-prayer to-sanctuary-green min-h-screen">
            <div className="max-w-6xl mx-auto px-4 py-12 lg:py-16">
                {/* Enhanced Header */}
                <div
                    className="flex items-center gap-4 mb-12"
                    style={{
                        animation: mounted ? 'fadeInUp 0.4s ease-out 0s both' : 'none'
                    }}
                >
                    <div className="bg-gradient-to-br from-warm-cream/30 to-mint-whisper/20 p-3 rounded-xl border border-warm-cream/30 shadow-sm">
                        <ShoppingCart className="w-8 h-8 text-mint-whisper" />
                    </div>
                    <div>
                        <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight text-warm-cream">Your Cart</h1>
                        <p className="text-xl font-light text-warm-cream/80">{cart?.totalQuantity || 0} {cart?.totalQuantity === 1 ? 'item' : 'items'} in your cart</p>
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 xl:gap-12">
                    {/* Cart Items */}
                    <div className="lg:col-span-2 space-y-6">
                        {cartItems.map(({ node: item }, index) => (
                            <div
                                key={item.id}
                                className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm hover:shadow-lg border border-gray-100 transition-all duration-300 hover:-translate-y-1"
                                style={{
                                    animation: mounted ? `fadeInUp 0.4s ease-out ${0.1 + index * 0.05}s both` : 'none'
                                }}
                            >
                                <div className="flex items-center gap-8">
                                    <div className="bg-gradient-to-br from-sage-green/20 to-mint-whisper w-32 h-32 rounded-xl border border-gray-100 flex-shrink-0 overflow-hidden shadow-sm">
                                        {item.merchandise.image ? (
                                            <Image
                                                src={item.merchandise.image.url}
                                                alt={item.merchandise.image.altText || item.merchandise.product.title}
                                                width={128}
                                                height={128}
                                                className="object-cover w-full h-full"
                                            />
                                        ) : null}
                                    </div>

                                    <div className="flex-1 min-w-0">
                                        <Link href={`/games/${item.merchandise.product.handle}`} className="group">
                                            <h3 className="text-2xl font-bold tracking-tight text-deep-brown group-hover:text-primary transition-colors duration-300 mb-2">
                                                {item.merchandise.product.title}
                                            </h3>
                                        </Link>
                                        <div className="flex items-center gap-3 text-base text-gray-600 font-light mb-4">
                                            <span>${item.merchandise.price.amount} each</span>
                                        </div>

                                        <div className="flex items-center justify-between">
                                            <div className="flex items-center border-2 border-gray-100 rounded-xl overflow-hidden shadow-sm">
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className="p-3 hover:bg-sage-green/10 transition-all duration-300 hover:scale-110"
                                                    disabled={updating === item.id}
                                                >
                                                    {updating === item.id ? (
                                                        <Loader2 className="w-5 h-5 animate-spin text-deep-brown" />
                                                    ) : (
                                                        <Minus className="w-5 h-5 text-deep-brown" />
                                                    )}
                                                </button>
                                                <span className="px-6 py-3 text-deep-brown text-xl font-bold tracking-tight min-w-[4rem] text-center">
                                                    {item.quantity}
                                                </span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className="p-3 hover:bg-sage-green/10 transition-all duration-300 hover:scale-110"
                                                    disabled={updating === item.id}
                                                >
                                                    <Plus className="w-5 h-5 text-deep-brown" />
                                                </button>
                                            </div>

                                            <div className="text-right">
                                                <div className="text-3xl font-bold text-sanctuary-green mb-2">
                                                    ${item.estimatedCost.totalAmount.amount}
                                                </div>
                                                <button
                                                    onClick={() => updateQuantity(item.id, 0)}
                                                    className="flex items-center gap-2 text-red-600 hover:text-red-800 transition-colors duration-300 text-base font-light"
                                                    disabled={updating === item.id}
                                                >
                                                    <Trash2 className="w-4 h-4" />
                                                    <span>Remove</span>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}

                        {/* Continue Shopping */}
                        <div
                            className="pt-4"
                            style={{
                                animation: mounted ? `fadeInUp 0.4s ease-out ${0.1 + cartItems.length * 0.05}s both` : 'none'
                            }}
                        >
                            <Link
                                href="/games"
                                className="inline-flex items-center gap-2 text-warm-cream hover:text-mint-whisper text-lg font-light transition-colors duration-300 group"
                            >
                                <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform duration-300" />
                                <span>Continue Shopping</span>
                            </Link>
                        </div>
                    </div>

                    {/* Order Summary */}
                    <div
                        className="space-y-8"
                        style={{
                            animation: mounted ? 'fadeInUp 0.4s ease-out 0.2s both' : 'none'
                        }}
                    >
                        <div className="bg-white p-8 lg:p-10 rounded-2xl shadow-sm border border-gray-100">
                            <h3 className="text-2xl font-bold tracking-tight text-deep-brown mb-6 flex items-center gap-3">
                                <Gift className="w-7 h-7 text-primary" />
                                <span>Order Summary</span>
                            </h3>

                            <div className="space-y-4 mb-8">
                                <div className="flex justify-between text-lg text-gray-600 font-light">
                                    <span>Subtotal ({cart?.totalQuantity} items):</span>
                                    <span className="font-bold text-deep-brown">${subtotal.toFixed(2)}</span>
                                </div>
                                <div className="flex justify-between text-lg text-gray-600 font-light">
                                    <span>Shipping:</span>
                                    <span className="font-bold text-deep-brown">${shipping.toFixed(2)}</span>
                                </div>
                                <div className="border-t-2 border-gray-100 pt-4">
                                    <div className="flex justify-between items-baseline">
                                        <span className="text-2xl font-bold tracking-tight text-deep-brown">Total:</span>
                                        <span className="text-3xl font-bold text-sanctuary-green">${total.toFixed(2)}</span>
                                    </div>
                                </div>
                            </div>

                            <button
                                onClick={handleCheckout}
                                className="w-full bg-primary text-warm-cream py-5 rounded-2xl text-lg font-bold tracking-tight hover:bg-primary-dark transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 hover:-translate-y-1 flex items-center justify-center gap-3 group mb-6"
                            >
                                <Shield className="w-6 h-6 group-hover:scale-110 transition-transform duration-300" />
                                <span>Secure Checkout</span>
                            </button>

                            {/* Trust Badges */}
                            <div className="space-y-3 text-base text-gray-600 font-light">
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-sage-green/5 to-mint-whisper/5 border border-gray-100">
                                    <Shield className="w-5 h-5 text-sage-green" />
                                    <span>Secure SSL encryption</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-sage-green/5 to-mint-whisper/5 border border-gray-100">
                                    <Truck className="w-5 h-5 text-sage-green" />
                                    <span>Fast & reliable shipping</span>
                                </div>
                                <div className="flex items-center gap-3 p-3 rounded-xl bg-gradient-to-r from-sage-green/5 to-mint-whisper/5 border border-gray-100">
                                    <CheckCircle className="w-5 h-5 text-sage-green" />
                                    <span>{companyConfig.policies.returnDays}-day return policy</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
