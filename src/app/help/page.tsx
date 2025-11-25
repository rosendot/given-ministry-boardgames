'use client';

import { useState, useEffect } from 'react';
import {
    ChevronDown,
    HelpCircle,
    MessageCircle,
    Truck,
    Shield,
    XCircle
} from 'lucide-react';
import { companyConfig } from '@/config/company';

const faqs = [
    {
        id: 1,
        icon: Truck,
        question: "How long does shipping take?",
        answer: `We typically ship within ${companyConfig.policies.processingTime}. Standard shipping takes ${companyConfig.policies.deliveryTime}. Shipping cost is $${companyConfig.policies.standardShipping} for all orders.`
    },
    {
        id: 2,
        icon: Shield,
        question: "What is your return policy?",
        answer: "We do not accept returns - all sales are final. However, if you receive a damaged or defective item, please contact us immediately and we'll work with you to resolve the issue."
    },
    {
        id: 3,
        icon: HelpCircle,
        question: "Are your games authentic and new?",
        answer: "Yes, all our games are 100% authentic and brand new. We work directly with publishers to ensure you receive genuine products."
    },
    {
        id: 5,
        icon: MessageCircle,
        question: "How can I contact you?",
        answer: `You can reach us by email at ${companyConfig.email} or phone at ${companyConfig.phoneFormatted}. We typically respond within 24 hours.`
    }
];

const policies = [
    {
        id: 'returns',
        icon: XCircle,
        title: "No Returns Policy"
    },
    {
        id: 'shipping',
        icon: Truck,
        title: "Shipping"
    },
    {
        id: 'privacy',
        icon: Shield,
        title: "Privacy Policy"
    }
];

export default function HelpPage() {
    const [openItems, setOpenItems] = useState<(number | string)[]>([]);
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    const toggleItem = (id: number | string) => {
        setOpenItems(prev =>
            prev.includes(id)
                ? prev.filter(item => item !== id)
                : [...prev, id]
        );
    };

    return (
        <div className="bg-gradient-to-br from-primary via-forest-prayer to-sanctuary-green min-h-screen">
            <div className="max-w-4xl mx-auto px-4 py-12 lg:py-16">
                {/* FAQ Section */}
                <div className="mb-16">
                    <h1
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-warm-cream mb-4 text-center"
                        style={{
                            animation: mounted ? 'fadeInUp 0.4s ease-out 0s both' : 'none'
                        }}
                    >
                        Frequently Asked Questions
                    </h1>
                    <p
                        className="text-warm-cream/80 text-lg font-light text-center mb-12"
                        style={{
                            animation: mounted ? 'fadeInUp 0.4s ease-out 0.1s both' : 'none'
                        }}
                    >
                        Find answers to common questions about our board games and services
                    </p>
                    <div className="space-y-6">
                        {faqs.map((faq, index) => {
                            const IconComponent = faq.icon;
                            const isOpen = openItems.includes(faq.id);
                            return (
                                <div
                                    key={faq.id}
                                    className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                                    style={{
                                        animation: mounted ? `fadeInUp 0.4s ease-out ${0.2 + index * 0.1}s both` : 'none'
                                    }}
                                >
                                    <button
                                        onClick={() => toggleItem(faq.id)}
                                        className="w-full text-left p-8 lg:p-10 hover:bg-sage-green/5 focus:outline-none focus:bg-sage-green/5 rounded-2xl transition-colors"
                                    >
                                        <div className="flex justify-between items-start gap-6">
                                            <div className="flex items-start gap-6 flex-1">
                                                <div className="bg-gradient-to-br from-mint-whisper to-sage-green/20 p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                    <IconComponent className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold tracking-tight text-deep-brown">{faq.question}</h3>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <ChevronDown
                                                    className={`w-7 h-7 text-primary transition-transform duration-300 ${
                                                        isOpen ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            isOpen ? 'max-h-96' : 'max-h-0'
                                        }`}
                                    >
                                        <div className="px-8 lg:px-10 pb-8 lg:pb-10">
                                            <div className="ml-20 pt-4 border-t border-sage-green/20">
                                                <p className="text-gray-600 font-light leading-relaxed text-lg">{faq.answer}</p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Policies Section */}
                <div className="border-t border-warm-cream/30 pt-16">
                    <h1
                        className="text-5xl md:text-6xl lg:text-7xl font-extrabold tracking-tight text-warm-cream mb-4 text-center"
                        style={{
                            animation: mounted ? `fadeInUp 0.4s ease-out ${0.2 + faqs.length * 0.1}s both` : 'none'
                        }}
                    >
                        Our Policies
                    </h1>
                    <p
                        className="text-warm-cream/80 text-lg font-light text-center mb-12"
                        style={{
                            animation: mounted ? `fadeInUp 0.4s ease-out ${0.3 + faqs.length * 0.1}s both` : 'none'
                        }}
                    >
                        Clear and transparent policies for your peace of mind
                    </p>
                    <div className="space-y-6">
                        {policies.map((policy, index) => {
                            const IconComponent = policy.icon;
                            const isOpen = openItems.includes(policy.id);
                            return (
                                <div
                                    key={policy.id}
                                    className="bg-white border border-gray-100 rounded-2xl shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 group"
                                    style={{
                                        animation: mounted ? `fadeInUp 0.4s ease-out ${0.4 + faqs.length * 0.1 + index * 0.1}s both` : 'none'
                                    }}
                                >
                                    <button
                                        onClick={() => toggleItem(policy.id)}
                                        className="w-full text-left p-8 lg:p-10 hover:bg-sage-green/5 focus:outline-none focus:bg-sage-green/5 rounded-2xl transition-colors"
                                    >
                                        <div className="flex justify-between items-start gap-6">
                                            <div className="flex items-start gap-6 flex-1">
                                                <div className="bg-gradient-to-br from-mint-whisper to-sage-green/20 p-3 rounded-xl flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                                                    <IconComponent className="w-6 h-6 text-primary" />
                                                </div>
                                                <div className="flex-1">
                                                    <h3 className="text-2xl font-bold tracking-tight text-deep-brown">{policy.title}</h3>
                                                </div>
                                            </div>
                                            <div className="flex-shrink-0">
                                                <ChevronDown
                                                    className={`w-7 h-7 text-primary transition-transform duration-300 ${
                                                        isOpen ? 'rotate-180' : ''
                                                    }`}
                                                />
                                            </div>
                                        </div>
                                    </button>

                                    <div
                                        className={`overflow-hidden transition-all duration-300 ${
                                            isOpen ? 'max-h-96' : 'max-h-0'
                                        }`}
                                    >
                                        <div className="px-8 lg:px-10 pb-8 lg:pb-10">
                                            <div className="ml-20 pt-4 border-t border-sage-green/20">
                                                {policy.id === 'returns' && (
                                                    <p className="text-gray-600 font-light leading-relaxed text-lg">
                                                        We do not accept returns - all sales are final. However, if you receive a damaged or defective item, please contact us immediately and we'll work with you to resolve the issue.
                                                    </p>
                                                )}

                                                {policy.id === 'shipping' && (
                                                    <p className="text-gray-600 font-light leading-relaxed text-lg">
                                                        We ship within {companyConfig.policies.processingTime} and standard delivery takes {companyConfig.policies.deliveryTime}. Shipping cost is ${companyConfig.policies.standardShipping} for all orders. We ship within the {companyConfig.location.country} only. You'll receive tracking information via email and we package games carefully to prevent damage.
                                                    </p>
                                                )}

                                                {policy.id === 'privacy' && (
                                                    <p className="text-gray-600 font-light leading-relaxed text-lg">
                                                        As a small family-run board game business, we don't collect, store, or maintain any customer data ourselves. When you place an order, your payment and shipping information is handled directly by Shopify, our e-commerce platform. We don't have access to or store your payment details. For information about how Shopify handles your data, please visit <a href="https://www.shopify.com/legal/privacy" target="_blank" rel="noopener noreferrer" className="text-primary hover:underline transition-colors duration-200">Shopify's Privacy Policy</a>.
                                                    </p>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </div>
            </div>
        </div>
    );
}
