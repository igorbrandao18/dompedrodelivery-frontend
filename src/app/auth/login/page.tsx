'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

interface LoginData {
  email: string;
  password: string;
}

export default function LoginPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [formData, setFormData] = useState<LoginData>({
    email: '',
    password: '',
  });
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Partial<LoginData>>({});
  const [message, setMessage] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  useEffect(() => {
    const msg = searchParams.get('message');
    if (msg === 'registered') {
      setMessage('Conta criada com sucesso! Faça login para continuar.');
    }
  }, [searchParams]);

  const validateForm = (): boolean => {
    const newErrors: Partial<LoginData> = {};

    if (!formData.email.trim()) {
      newErrors.email = 'Email é obrigatório';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Email inválido';
    }

    if (!formData.password) {
      newErrors.password = 'Senha é obrigatória';
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
    setMessage('');

    try {
      // TODO: Implementar chamada à API de login
      console.log('Dados de login:', formData);
      
      // Simulação de sucesso
      setTimeout(() => {
        router.push('/dashboard');
      }, 1000);
    } catch (error) {
      console.error('Erro no login:', error);
      setErrors({ ...errors, email: 'Email ou senha incorretos. Tente novamente.' });
    } finally {
      setIsLoading(false);
    }
  };

  const handleInputChange = (field: keyof LoginData) => (e: React.ChangeEvent<HTMLInputElement>) => {
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
                Gerencie seu delivery
                <span className="block text-orange-600">com inteligência</span>
              </h1>
              
              <p className="text-xl text-gray-600 max-w-md mx-auto">
                Plataforma completa para restaurantes que querem crescer e otimizar suas operações.
              </p>

              <div className="grid grid-cols-3 gap-8 max-w-sm mx-auto">
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600">2.5K+</div>
                  <p className="text-sm text-gray-500">Pedidos/dia</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600">98%</div>
                  <p className="text-sm text-gray-500">Satisfação</p>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-black text-orange-600">24/7</div>
                  <p className="text-sm text-gray-500">Suporte</p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>SSL Seguro</span>
                </div>
                <div className="flex items-center gap-3 text-sm text-gray-600">
                  <svg className="w-4 h-4 text-green-500" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                  </svg>
                  <span>GDPR Compliant</span>
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

          {/* Right side - Login Form */}
          <div className="w-full max-w-md">
            <Card className="border-0 shadow-2xl bg-white/95 backdrop-blur-sm">
              <CardHeader className="space-y-1 text-center pb-8">
                <div className="mx-auto flex h-20 w-20 items-center justify-center overflow-hidden rounded-2xl bg-white shadow-lg ring-1 ring-black/5">
                  <Image
                    src="/logo.png"
                    alt="Dom Pedro Delivery"
                    width={80}
                    height={80}
                    className="h-full w-full object-contain"
                    priority
                  />
                </div>
                <CardTitle className="text-2xl font-bold text-gray-900">
                  Bem-vindo de volta
                </CardTitle>
                <p className="text-gray-600">
                  Acesse sua conta para continuar
                </p>
              </CardHeader>
              
              <CardContent className="space-y-6 pb-8">
                {message && (
                  <div className="p-4 bg-green-50 border border-green-200 rounded-lg text-center">
                    <p className="text-green-800 text-sm font-medium">{message}</p>
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-5">
                  {/* Email */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Email
                    </label>
                    <div className="relative">
                      <Input
                        type="email"
                        placeholder="seu@email.com"
                        value={formData.email}
                        onChange={handleInputChange('email')}
                        error={errors.email}
                        className="pl-10"
                        required
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                        </svg>
                      </div>
                    </div>
                  </div>

                  {/* Password */}
                  <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-700">
                      Senha
                    </label>
                    <div className="relative">
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="••••••••••"
                        value={formData.password}
                        onChange={handleInputChange('password')}
                        error={errors.password}
                        className="pl-10 pr-10"
                        required
                      />
                      <div className="absolute left-3 top-1/2 -translate-y-1/2">
                        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                        </svg>
                      </div>
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                      >
                        {showPassword ? (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7.757 14.121a3 3 0 104.243 4.243" />
                          </svg>
                        ) : (
                          <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.357 16.865a3 3 0 00-4.243-4.243" />
                          </svg>
                        )}
                      </button>
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
                        Entrando...
                      </span>
                    ) : (
                      'Entrar na minha conta'
                    )}
                  </Button>
                  
                  {/* Links */}
                  <div className="text-center space-y-4">
                    <div className="text-sm text-gray-600">
                      Não tem uma conta?{' '}
                      <Link
                        href="/auth/register"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        Cadastre-se gratuitamente
                      </Link>
                    </div>
                    
                    <div className="flex items-center justify-center gap-4 text-xs">
                      <Link
                        href="#"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        Esqueci minha senha
                      </Link>
                      <span className="text-gray-300">•</span>
                      <Link
                        href="#"
                        className="text-orange-600 hover:text-orange-700 font-medium hover:underline"
                      >
                        Precisa de ajuda?
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
