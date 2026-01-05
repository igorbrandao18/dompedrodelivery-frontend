'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface RegisterData {
  name: string;
  email: string;
  tenantName: string;
  phone?: string;
}

export default function RegisterPage() {
  const [formData, setFormData] = useState<RegisterData>({
    name: '',
    email: '',
    tenantName: '',
    phone: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<RegisterData>>({});
  const [showSuccess, setShowSuccess] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: Partial<RegisterData> = {};

    if (!formData.name.trim()) {
      newErrors.name = 'Nome é obrigatório';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.tenantName.trim()) {
      newErrors.tenantName = 'Nome do negócio é obrigatório';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const baseUrl = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3000';
      const response = await fetch(`${baseUrl}/auth/register`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          tenantName: formData.tenantName,
          name: formData.name,
          email: formData.email,
          phone: formData.phone || undefined,
        }),
      });

      if (!response.ok) {
        const errorBody = await response.json().catch(() => null);
        throw new Error(errorBody?.message || `HTTP ${response.status}`);
      }

      const data = (await response.json()) as {
        tenant?: { slug: string };
      };

      if (data?.tenant?.slug) {
        localStorage.setItem('tenantSlug', data.tenant.slug);
      }

      setShowSuccess(true);
      // Optional: redirect to login with message
      // router.push('/auth/login?message=registered');
    } catch (error) {
      console.error('Erro no registro:', error);
      setErrors({ ...errors, email: 'Erro ao criar conta. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof RegisterData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [field]: e.target.value,
    }));
    
    if (errors[field]) {
      setErrors(prev => ({
        ...prev,
        [field]: undefined,
      }));
    }
  };

  if (showSuccess) {
    return (
      <div className="flex items-center justify-center px-4 py-12 min-h-screen">
        <div className="w-full max-w-md">
          <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
            <CardContent className="p-8 text-center">
              <div className="mx-auto w-20 h-20 bg-gradient-to-br from-green-500 to-green-600 rounded-full flex items-center justify-center mb-6">
                <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              
              <h2 className="text-2xl font-bold text-gray-900 mb-4">
                Conta Criada com Sucesso!
              </h2>
              
              <div className="space-y-6">
                <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
                  <div className="flex items-center gap-3">
                    <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    <div className="text-left">
                      <p className="text-sm font-medium text-blue-900">
                        Verifique seu email
                      </p>
                      <p className="text-xs text-blue-700">
                        Enviamos sua senha de acesso e instruções de confirmação
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <Button
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg shadow-orange-200/50"
                  >
                    <Link href="/auth/login">
                      Ir para o Login
                    </Link>
                  </Button>
                  
                  <div className="text-center">
                    <span className="text-sm text-gray-600">
                      Não recebeu o email?{' '}
                    </span>
                    <Link
                      href="#"
                      className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                    >
                      Reenviar
                    </Link>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center px-4 py-12 min-h-screen">
      <div className="w-full max-w-6xl">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left side - Hero */}
          <div className="hidden lg:block">
            <div className="text-center space-y-8">
              <div className="inline-flex items-center gap-2 rounded-full border border-orange-200 bg-white px-6 py-3 text-sm font-semibold text-orange-600 shadow-lg">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-orange-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-orange-500"></span>
                </span>
                Dom Pedro Delivery
              </div>
              
              <h1 className="text-4xl font-black text-gray-900 leading-tight">
                Comece a vender mais
                <span className="block text-orange-600">hoje mesmo</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                Plataforma completa para restaurantes que querem crescer e otimizar suas operações.
              </p>

              <div className="space-y-6">
                <div className="grid grid-cols-3 gap-6 max-w-sm mx-auto">
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-gray-900">Cardápio</div>
                    <p className="text-sm text-gray-500">Digital</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2 2v-6a2 2 0 012-2h6a2 2 0 012 2v6a2 2 0 01-2 2z" />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-gray-900">Pedidos</div>
                    <p className="text-sm text-gray-500">Online</p>
                  </div>
                  <div className="text-center p-4 bg-white rounded-xl shadow-sm">
                    <div className="w-12 h-12 bg-orange-100 rounded-xl flex items-center justify-center mx-auto mb-2">
                      <svg className="w-6 h-6 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                      </svg>
                    </div>
                    <div className="text-lg font-bold text-gray-900">Entrega</div>
                    <p className="text-sm text-gray-500">Rápida</p>
                  </div>
                </div>

                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Cadastro em 2 minutos</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Sem cartão de crédito</span>
                  </div>
                  <div className="flex items-center gap-3 text-sm text-gray-600">
                    <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>Cancelamento fácil</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right side - Register Form */}
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center pb-8">
                <div className="mx-auto w-16 h-16 bg-gradient-to-br from-orange-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M18 9v3m0 0v3m0 0h3m-3 9h6m-6 4h6m-6 4h6" />
                  </svg>
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Criar sua conta
                </CardTitle>
                <p className="text-gray-600">
                  Comece a usar o Dom Pedro Delivery hoje mesmo
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6 pb-8">
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Nome do Negócio */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Nome do Negócio
                    </label>
                    <div>
                      <Input
                        type="text"
                        placeholder="Ex: Restaurante Sabor & Arte"
                        value={formData.tenantName}
                        onChange={handleInputChange('tenantName')}
                        error={errors.tenantName}
                        required
                      />
                    </div>
                  </div>

                  {/* Seu Nome */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Seu Nome
                    </label>
                    <div>
                      <Input
                        type="text"
                        placeholder="João Silva"
                        value={formData.name}
                        onChange={handleInputChange('name')}
                        error={errors.name}
                        required
                      />
                    </div>
                  </div>

                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div>
                      <Input
                        type="email"
                        placeholder="joao@exemplo.com"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        error={errors.email}
                        required
                      />
                    </div>
                  </div>

                  {/* Telefone */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Telefone (Opcional)
                    </label>
                    <div>
                      <Input
                        type="tel"
                        placeholder="(85) 99999-9999"
                        value={formData.phone}
                        onChange={handleInputChange('phone')}
                      />
                    </div>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="primary"
                    size="lg"
                    className="w-full shadow-lg shadow-orange-200/50"
                    disabled={isLoading}
                  >
                    {isLoading ? (
                      <span className="flex items-center gap-2">
                        <svg className="w-4 h-4 animate-spin" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 2m15.356 2H15a2 2 0 002-2V7a2 2 0 00-2-2h-.582m-15.357-2l15.357 2" />
                        </svg>
                        Criando conta...
                      </span>
                    ) : (
                      'Criar Conta Gratuitamente'
                    )}
                  </Button>
                  
                  {/* Links */}
                  <div className="text-center space-y-4">
                    <div className="text-sm text-gray-600">
                      Já tem uma conta?{' '}
                      <Link
                        href="/auth/login"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        Faça login
                      </Link>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 text-xs">
                      <Link
                        href="#"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        Termos de Serviço
                      </Link>
                      <span className="text-gray-300">•</span>
                      <Link
                        href="#"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        Privacidade
                      </Link>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
